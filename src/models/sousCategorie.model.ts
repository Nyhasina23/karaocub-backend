import mongoose from "mongoose";
import { ISousCategorie } from "../types/sousCategorie.type";

const SousCategorieSchema = new mongoose.Schema<ISousCategorie>({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false,
        default: ""
    }
})

export const SousCategorieModel = mongoose.model('sousCategories', SousCategorieSchema)