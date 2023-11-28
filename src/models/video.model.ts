import mongoose from "mongoose";
import { IVideo } from "../types/video.type";

const VideoSchema = new mongoose.Schema<IVideo>({
    type: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
        default: ""
    },
    duration: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
})

export const VideoModel = mongoose.model('videos', VideoSchema)