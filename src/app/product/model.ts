import { Schema } from "mongoose";
import { TProduct } from "./interface";

export const ProductSchema = new Schema<TProduct>({
    name: {
        type: String,
        required: true
    },
    
});