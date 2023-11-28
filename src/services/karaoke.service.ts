import { KaraokeModel } from "../models/karaoke.model";
import { IKaraoke } from "../types/karaoke.type";
import { ResponseDataType, SetResponseData, SetResponseError } from "../types/response.type";

export const createNewKaraokeService = async (karaokeData: IKaraoke) => {

    let response: ResponseDataType;
    try {
        const newKaraoke = await KaraokeModel.create<IKaraoke>({
            artist: karaokeData.artist,
            title: karaokeData.title,
            url: karaokeData.url,
            image: karaokeData.image,
            duration: karaokeData.duration,
            categorie: karaokeData.categorie,
            sousCategorie: karaokeData.sousCategorie
        })
        response = SetResponseData("Karaoke created", 200, newKaraoke)

    } catch (error) {
        response = SetResponseError("Unable to create Karaoke", 500, error)
    }
    return response

}

export const fetchKaraokeByCategorieService = async (categorieId: string) => {

    let response: ResponseDataType;
    try {
        const karaoke = await KaraokeModel.find({ categorie: categorieId });
        if (karaoke) {
            response = SetResponseData("Karaoke fetched by categorie", 200, karaoke)
        } else {
            response = SetResponseError("Karaoke by categorie not found", 404, {})
        }
    } catch (error) {
        response = SetResponseError("Unable to fetch Karaoke by categorie", 500, error)
    }
    return response

}
export const fetchKaraokeBySousCategorieService = async (sousCategorieId: string) => {

    let response: ResponseDataType;
    try {
        const karaoke = await KaraokeModel.find({ sousCategorie: sousCategorieId });
        if (karaoke) {
            response = SetResponseData("Karaoke fetched by sousCategorie", 200, karaoke)
        } else {
            response = SetResponseError("Karaoke by sousCategorie not found", 404, {})
        }
    } catch (error) {
        response = SetResponseError("Unable to fetch Karaoke by sousCategorie", 500, error)
    }
    return response

}

export const fetchKaraokeByTitleService = async (title: string) => {

    let response: ResponseDataType;
    try {

        const karaoke = await KaraokeModel.aggregate([
            {
                $match: {
                    title: {
                        $regex: new RegExp(title, 'i')
                    }
                }
            }
        ])
        if (karaoke) {
            response = SetResponseData("Karaoke fetched by Title", 200, karaoke)
        } else {
            response = SetResponseError("Karaoke by Title not found", 404, {})
        }
    } catch (error) {
        response = SetResponseError("Unable to fetch Karaoke by Title", 500, error)
    }
    return response

}

export const fetchKaraokeByArtistService = async (artist: string) => {

    let response: ResponseDataType;
    try {

        const karaoke = await KaraokeModel.aggregate([
            {
                $match: {
                    artist: {
                        $regex: new RegExp(artist, 'i')
                    }
                }
            }
        ])
        if (karaoke) {
            response = SetResponseData("Karaoke fetched by Artist", 200, karaoke)
        } else {
            response = SetResponseError("Karaoke by Artist not found", 404, {})
        }
    } catch (error) {
        response = SetResponseError("Unable to fetch Karaoke by Artist", 500, error)
    }
    return response

}

export const fetchAllKaraokeService = async () => {

    let response: ResponseDataType;
    try {
        const karaokes = await KaraokeModel.find();
        response = SetResponseData("ALl Karaoke fetched", 200, karaokes)
    } catch (error) {
        response = SetResponseError("Unable to fetch All Karaoke", 500, error)
    }
    return response

}

export const fetchAllKaraokeOrderedByViewedCountService = async () => {

    let response: ResponseDataType;
    try {
        const karaokes = await KaraokeModel.aggregate([
            {
                $sort: {
                    compteur: -1
                }
            }
        ])
        response = SetResponseData("ALl Karaoke fetched ordered by compteur", 200, karaokes)
    } catch (error) {
        response = SetResponseError("Unable to fetch All Karaoke", 500, error)
    }
    return response

}

export const upgradeKaraokeViewerCounterService = async (karaokeId: string) => {

    let response: ResponseDataType;
    try {
        const karaoke = await KaraokeModel.findOneAndUpdate(
            { _id: karaokeId },
            { $inc: { compteur: 1 } },
            { new: true })
        if (karaoke) {
            response = SetResponseData("Karaoke viewed", 200, karaoke)
        } else {
            response = SetResponseError("Karaoke not found", 404, {})
        }
    } catch (error) {
        response = SetResponseError("Unable to update karaoke viewer", 500, error)
    }
    return response

}