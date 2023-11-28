import { CategorieModel, CategorieSchema } from "../models/categorie.model";
import { SousCategorieModel } from "../models/sousCategorie.model";
import { ICategorie } from "../types/categorie.type";
import { ResponseDataType, SetResponseData, SetResponseError } from "../types/response.type";
import { ISousCategorie } from "../types/sousCategorie.type";

export const createNewCategorieService = async (categorieData: ICategorie) => {

    let response: ResponseDataType;
    try {
        const newCategorie = await CategorieModel.create<ICategorie>({
            name: categorieData.name,
            image: categorieData.image,
        })
        response = SetResponseData("Categorie created", 200, newCategorie)

    } catch (error) {
        response = SetResponseError("Unable to create Event", 500, error)
    }
    return response

}

export const addSousCategorieService = async (categorieId: string, sousCategorieData: ISousCategorie) => {

    let response: ResponseDataType;
    try {

        const newSousCategorie = await SousCategorieModel.create<ISousCategorie>({
            name: sousCategorieData.name,
            image: sousCategorieData.image,
        })

        const categorie = await CategorieModel.findByIdAndUpdate(categorieId,
            { $push: { sousCategories: newSousCategorie._id } },
            { new: true, useFindAndModify: false })

        response = SetResponseData("Sous Categorie created", 200, categorie)


    } catch (error) {
        response = SetResponseError("Unable to create sous categorie", 500, error)
    }
    return response

}

export const removeSousCategorieService = async (sousCategorieId: string) => {

    let response: ResponseDataType;
    try {

        const sousCategorie = await SousCategorieModel.findByIdAndDelete(sousCategorieId);
        await CategorieModel.updateMany({ sousCategories: sousCategorieId }, { $pull: { sousCategories: sousCategorieId } })

        response = SetResponseData("Sous Categorie removed", 200, sousCategorie)


    } catch (error) {
        response = SetResponseError("Unable to remove sous categorie", 500, error)
    }
    return response

}

export const updateSousCategorieNameService = async (sousCategorieId: string, name: string) => {

    let response: ResponseDataType;
    try {

        const sousCategorie = await SousCategorieModel.findByIdAndUpdate(sousCategorieId, { name });

        response = SetResponseData("Sous Categorie updated", 200, sousCategorie)

    } catch (error) {
        response = SetResponseError("Unable to update sous categorie", 500, error)
    }
    return response

}

export const updateCategorieNameService = async (categorieId: string, name: string) => {

    let response: ResponseDataType;
    try {

        const categorie = await CategorieModel.findByIdAndUpdate(categorieId, { name });

        response = SetResponseData("Categorie updated", 200, categorie)

    } catch (error) {
        response = SetResponseError("Unable to update categorie", 500, error)
    }
    return response

}
export const deleteCategorieService = async (categorieId: string) => {

    let response: ResponseDataType;
    try {

        const categories: any = await CategorieModel.findByIdAndDelete(categorieId);
        await SousCategorieModel.deleteMany({ _id: { $in: categories?.sousCategories } });

        response = SetResponseData("Categorie removed", 200, categories)

    } catch (error) {
        response = SetResponseError("Unable to remove categorie", 500, error)
    }
    return response

}

export const fetchAllCategorieAndSousCategorieService = async () => {

    let response: ResponseDataType;
    try {

        const categories = await CategorieModel.find().populate('sousCategories')
        response = SetResponseData("Categorie and sous categorie fetched", 200, categories)

    } catch (error) {
        response = SetResponseError("Unable to fetch all categories", 500, error)
    }
    return response

}
