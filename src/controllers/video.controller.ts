import { Request, Response } from "express";
import { createNewVideoService, getVideoByTypeService } from "../services/video.service";

type KType = {
    image: any,
    video: any
}
export const createNewVideoController = async (req: Request, res: Response) => {
    try {

        const { type, duration, eventId } = req.body;
        const url = req.file;
        if (url && type && duration) {

            const newVideo = {
                type,
                duration,
                url: url?.originalname
            }
            let response = await createNewVideoService(eventId, newVideo)
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