import mongoose from "mongoose";
import { IKaraoke } from "../types/karaoke.type";

const KaraokeSchema = new mongoose.Schema<IKaraoke>({
    artist: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
        default: ""
    },
    compteur: {
        type: Number,
        required: true,
        default: 0,
    },
    duration: {
        type: String,
        required: true,
    },
    categorie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories"
    },
    sousCategorie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sousCategories"
    },
})

export const KaraokeModel = mongoose.model("karaokes", KaraokeSchema)