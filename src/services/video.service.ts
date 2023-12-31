import { EventModel } from "../models/event.model";
import { VideoModel } from "../models/video.model";
import { ResponseDataType, SetResponseData, SetResponseError } from "../types/response.type";
import { IVideo } from "../types/video.type";

export const createNewVideoService = async (eventId: string, videoData: IVideo) => {

    let response: ResponseDataType;
    try {
        const newVideo = await VideoModel.create<IVideo>({
            type: videoData.type,
            duration: videoData.duration,
            url: videoData.url
        })
        await EventModel.findByIdAndUpdate(eventId,
            { $push: { videos: newVideo._id } },
            { new: true, useFindAndModify: false })
        response = SetResponseData("Video created", 200, newVideo)

    } catch (error) {
        response = SetResponseError("Unable to create video", 500, error)
    }
    return response

}
export const getVideoByTypeService = async (type: string) => {

    let response: ResponseDataType;
    try {
        const videos = await VideoModel.find({ type })
        if (videos) {
            response = SetResponseData("Video fetched by type", 200, videos)
        } else {
            response = SetResponseError("Video by type not found", 404, {})
        }

    } catch (error) {
        response = SetResponseError("Unable to create video", 500, error)
    }
    return response
}