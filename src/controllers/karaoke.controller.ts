import { Request, Response } from "express";
import { createNewKaraokeService, fetchAllKaraokeOrderedByViewedCountService, fetchAllKaraokeService, fetchKaraokeByArtistService, fetchKaraokeByCategorieService, fetchKaraokeBySousCategorieService, fetchKaraokeByTitleService, upgradeKaraokeViewerCounterService } from "../services/karaoke.service";
import { IKaraoke } from "../types/karaoke.type";
type KType = {
    image: any,
    video: any
}
export const createNewKaraokeController = async (req: Request, res: Response) => {

    try {

        const { artist, title, duration, categorieId, sousCategorieId } = req.body;
        const files: any = req.files as KType;
        const image: string = files.image[0].originalname;
        const url: string = files.video[0].originalname;
        if (artist && title && url && image && duration) {

            const karaokeData: IKaraoke = {
                artist,
                title,
                url,
                image,
                duration,
                categorie: categorieId,
                sousCategorie: sousCategorieId
            }

            let response = await createNewKaraokeService(karaokeData)
            res.status(response.httpCode!).send(response)

        } else {
            res.status(403).send('Insufficient parameters')
        }

    } catch (error) {
        res.status(500).send('Unexpected error while creating karaoke')
    }

}

export const fetchKaraokeByCategorieController = async (req: Request, res: Response) => {

    try {

        const { categorieId } = req.params;
        if (categorieId) {


            let response = await fetchKaraokeByCategorieService(categorieId)
            res.status(response.httpCode!).send(response)

        } else {
            res.status(403).send('Insufficient parameters')
        }

    } catch (error) {
        res.status(500).send('Unexpected error while fetching karaoke by categorie')
    }

}

export const fetchKaraokeBySousCategorieController = async (req: Request, res: Response) => {

    try {

        const { sousCategorieId } = req.params;
        if (sousCategorieId) {


            let response = await fetchKaraokeBySousCategorieService(sousCategorieId)
            res.status(response.httpCode!).send(response)

        } else {
            res.status(403).send('Insufficient parameters')
        }

    } catch (error) {
        res.status(500).send('Unexpected error while fetching karaoke by sous categorie')
    }

}

export const fetchKaraokeByTitleController = async (req: Request, res: Response) => {

    try {

        const { title } = req.query;
        if (title) {
            let response = await fetchKaraokeByTitleService(title.toString())
            res.status(response.httpCode!).send(response)
        } else {
            res.status(403).send('Insufficient parameters')
        }

    } catch (error) {
        res.status(500).send('Unexpected error while fetching karaoke by title')
    }

}
export const fetchKaraokeByArtistController = async (req: Request, res: Response) => {

    try {

        const { artist } = req.query;
        if (artist) {
            let response = await fetchKaraokeByArtistService(artist.toString())
            res.status(response.httpCode!).send(response)
        } else {
            res.status(403).send('Insufficient parameters')
        }

    } catch (error) {
        res.status(500).send('Unexpected error while fetching karaoke by artist')
    }

}

export const fetchAllKaraokeController = async (req: Request, res: Response) => {

    try {
        let response = await fetchAllKaraokeService()
        res.status(response.httpCode!).send(response)

    } catch (error) {
        res.status(500).send('Unexpected error while fetching all karaokes')
    }

}

export const fetchAllKaraokeOrderedByViewedCountController = async (req: Request, res: Response) => {

    try {
        let response = await fetchAllKaraokeOrderedByViewedCountService()
        res.status(response.httpCode!).send(response)

    } catch (error) {
        res.status(500).send('Unexpected error while fetching all karaokes orderer by viewer')
    }

}

export const upgradeKaraokeViewerCounterController = async (req: Request, res: Response) => {
    try {
        const { karaokeId } = req.params;
        if (karaokeId) {
            let response = await upgradeKaraokeViewerCounterService(karaokeId)
            res.status(response.httpCode!).send(response)
        } else {
            res.status(403).send('Insufficient parameters')
        }

    } catch (error) {
        res.status(500).send('Unexpected error while fetching all karaokes orderer by viewer')
    }

}
