import mongoose from "mongoose";
import { ICategorie } from "../types/categorie.type";

export const CategorieSchema = new mongoose.Schema<ICategorie>({
    image: {
        type: String,
        required: false,
        default: ""
    },
    name: {
        type: String,
        required: true,
    },
    sousCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "sousCategories"
    }],

})

export const CategorieModel = mongoose.model<ICategorie>("categories", CategorieSchema)