import mongoose from "mongoose";
import { IVideo } from "../types/video.type";

const VideoSchema = new mongoose.Schema<IVideo>({
    type: {
        type: String,
        required: true,
        enum: ["GOLD", "GUEST"]
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