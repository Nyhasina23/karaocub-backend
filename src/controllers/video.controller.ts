import { Request, Response } from "express";
import { createNewVideoService, getVideoByTypeService } from "../services/video.service";

type KType = {
    image: any,
    video: any
}
export const createNewVideoController = async (req: Request, res: Response) => {
    try {

        const { type, duration } = req.body;
        const files: any = req.files as KType;
        const image: string = files.image[0].originalname;
        const url: string = files.video[0].originalname;
        if (image && url && type && duration) {

            const newVideo = {
                type,
                image,
                duration,
                url
            }
            let response = await createNewVideoService(newVideo)
            res.status(response.httpCode!).send(response)

        } else {
            res.status(403).send('Insufficient parameters')
        }

    } catch (error) {
        res.status(500).send('Unexpected error while creating video')
    }

}

export const getVideoByTypeController = async (req: Request, res: Response) => {
    try {

        const { type } = req.query;
        if (type) {
            let response = await getVideoByTypeService(type.toString())
            res.status(response.httpCode!).send(response)

        } else {
            res.status(403).send('Insufficient parameters')
        }

    } catch (error) {
        res.status(500).send('Unexpected error while getting video by type')
    }

}