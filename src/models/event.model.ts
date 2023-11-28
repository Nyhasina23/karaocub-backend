import mongoose from "mongoose";
import { IEvent } from "../types/event.type";

const EventSchema = new mongoose.Schema<IEvent>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    clientName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    playlists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "playlists"
    }],
    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "videos"
    }],
    date: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

export const EventModel = mongoose.model("events", EventSchema)