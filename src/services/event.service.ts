import { EventModel } from "../models/event.model";
import { IEvent } from "../types/event.type";
import { ResponseDataType, SetResponseData, SetResponseError } from "../types/response.type";
import { generateToken } from "../utils/generateJwtToken";


export const createNewEventService = async (eventData: IEvent) => {

    let response: ResponseDataType;
    try {
        const newEvent = await EventModel.create<IEvent>({
            name: eventData.name,
            clientName: eventData.clientName,
            image: eventData.image,
            email: eventData.email,
            password: eventData.password,

        })
        response = SetResponseData("Event created", 200, newEvent)

    } catch (error) {
        response = SetResponseError("Unable to create Event", 500, error)
    }
    return response

}

export const getEventByIdService = async (eventId: string) => {

    let response: ResponseDataType;
    try {
        const event = await EventModel.findById(eventId).populate(['playlist', 'videos']);
        if (event) {
            response = SetResponseData("Event fetched", 200, event)
        } else {
            response = SetResponseError("Event not found", 404, {})
        }

    } catch (error) {
        response = SetResponseError("Unable to fetch Event", 500, error)
    }
    return response

}

export const getAllEventService = async () => {

    let response: ResponseDataType;
    try {
        const event = await EventModel.find();
        if (event) {
            response = SetResponseData("Event fetched", 200, event)
        } else {
            response = SetResponseError("Event not found", 404, {})
        }

    } catch (error) {
        response = SetResponseError("Unable to fetch Event", 500, error)
    }
    return response

}

export const authenticationEventService = async (email: string, password: string) => {

    let response: ResponseDataType;
    try {
        const event = await EventModel.findOne({ email, password });
        if (event) {
            const token = generateToken(event._id, event.name, event.email)
            response = SetResponseData("Event logged", 200, token)
        } else {
            response = SetResponseError("Email or password incorrect!", 403, {})
        }

    } catch (error) {
        console.log(error)
        response = SetResponseError("Unable to log in Event", 500, error)
    }
    return response

}