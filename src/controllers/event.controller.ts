import { Request, Response } from "express";
import { generateRandomPassword } from "../utils/generateRandomPassword";
import { authenticationEventService, createNewEventService, getAllEventService, getEventByIdService } from "../services/event.service";
import { IEvent } from "../types/event.type";

export const createNewEventController = async (req: Request, res: Response) => {
    try {
        const { name, clientName, email } = req.body;
        const image: any = req.file;
        const password: string = generateRandomPassword();

        if (image) {
            if (name && clientName && email && password) {

                let eventData: IEvent = {
                    name,
                    email,
                    clientName,
                    image: image?.originalname as string,
                    password
                }

                let response = await createNewEventService(eventData)
                res.status(response.httpCode!).send(response)

            } else {
                res.status(403).send('Insufficient parameters')
            }
        } else {
            res.status(403).send('Image field required')
        }

    } catch (error) {
        res.status(500).send('Unexpected error while creating event')
    }

}

export const getEventByIdController = async (req: Request, res: Response) => {
    try {
        const { eventId } = req.params;

        if (eventId) {

            let response = await getEventByIdService(eventId)
            res.status(response.httpCode!).send(response)

        } else {
            res.status(403).send('Insufficient parameters')
        }

    } catch (error) {
        res.status(500).send('Unexpected error while creating event')
    }

}

export const getAllEventController = async (req: Request, res: Response) => {
    try {
        let response = await getAllEventService()
        res.status(response.httpCode!).send(response)
    } catch (error) {
        res.status(500).send('Unexpected error while creating event')
    }

}
export const authenticationEventController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        let response = await authenticationEventService(email, password)
        res.status(response.httpCode!).send(response)
    } catch (error) {
        res.status(500).send('Unexpected error while log in event')
    }

}