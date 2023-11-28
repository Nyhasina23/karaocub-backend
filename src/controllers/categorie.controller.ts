import { Request, Response } from "express";
import { addSousCategorieService, createNewCategorieService, deleteCategorieService, fetchAllCategorieAndSousCategorieService, removeSousCategorieService, updateCategorieNameService, updateSousCategorieNameService } from "../services/categorie.service";

export const createNewCategorieController = async (req: Request, res: Response) => {

    try {

        const { name } = req.body;
        const image: any = req.file;
        if (name) {

            const categorieData = {
                name,
                image: image?.originalname,
            }

            let response = await createNewCategorieService(categorieData)
            res.status(response.httpCode!).send(response)

        } else {
            res.status(403).send('Insufficient parameters')
        }

    } catch (error) {
        res.status(500).send('Unexpected error while creating categorie')
    }

}

export const addSousCategorieController = async (req: Request, res: Response) => {

    try {

        const { categorieId, name } = req.body;
        const image: any = req.file;
        if (categorieId && name) {

            const sousCategorieData = {
                name,
                image: image?.originalname,
            }

            let response = await addSousCategorieService(categorieId, sousCategorieData)
            res.status(response.httpCode!).send(response)

        } else {
            res.status(403).send('Insufficient parameters')
        }

    } catch (error) {
        console.log(error)
        res.status(500).send('Unexpected error while adding sous categorie')
    }

}

export const removeSousCategorieController = async (req: Request, res: Response) => {

    try {

        const { sousCategorieId } = req.params;
        if (sousCategorieId) {

            let response = await removeSousCategorieService(sousCategorieId)
            res.status(response.httpCode!).send(response)

        } else {
            res.status(403).send('Insufficient parameters')
        }

    } catch (error) {
        res.status(500).send('Unexpected error while removing sous categorie')
    }

}

export const updateSousCategorieNameController = async (req: Request, res: Response) => {

    try {

        const { sousCategorieId, name } = req.body;
        if (sousCategorieId && name) {

            let response = await updateSousCategorieNameService(sousCategorieId, name)
            res.status(response.httpCode!).send(response)

        } else {
            res.status(403).send('Insufficient parameters')
        }

    } catch (error) {
        res.status(500).send('Unexpected error while updating sous categorie')
    }

}
export const updateCategorieNameController = async (req: Request, res: Response) => {

    try {

        const { categorieId, name } = req.body;
        if (categorieId && name) {

            let response = await updateCategorieNameService(categorieId, name)
            res.status(response.httpCode!).send(response)

        } else {
            res.status(403).send('Insufficient parameters')
        }

    } catch (error) {
        res.status(500).send('Unexpected error while updating categorie')
    }

}

export const deleteCategorieController = async (req: Request, res: Response) => {

    try {

        const { categorieId } = req.params;
        if (categorieId) {

            let response = await deleteCategorieService(categorieId)
            res.status(response.httpCode!).send(response)

        } else {
            res.status(403).send('Insufficient parameters')
        }

    } catch (error) {
        res.status(500).send('Unexpected error while deleting categorie')
    }

}

export const fetchAllCategorieAndSousCategorieController = async (req: Request, res: Response) => {

    try {

        let response = await fetchAllCategorieAndSousCategorieService()
        res.status(response.httpCode!).send(response)

    } catch (error) {
        res.status(500).send('Unexpected error fetching cateogrie and sous categorie')
    }

}
