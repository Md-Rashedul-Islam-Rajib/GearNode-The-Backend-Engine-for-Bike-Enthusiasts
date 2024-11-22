import mongoose, { Schema } from "mongoose";
import { IOrder, TOrder } from "./order.type";

export const OrderSchema = new Schema<TOrder>({
    email: {
        type: String,
        unique: true,
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'ProductSchema',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be a positive number"]
    },
    totalPrice: {
        type: Number,
        required: true,
        min: [1, "TotalPrice must be a positive number"]
    }
});

export const OrderModel = mongoose.model<IOrder>("Order", OrderSchema);