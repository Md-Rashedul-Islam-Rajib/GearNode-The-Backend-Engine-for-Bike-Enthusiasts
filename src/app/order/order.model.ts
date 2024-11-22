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
        ref: 'Bike',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be a positive number"]
    },
    totalPrice: {
        type: Number
    }
});

// middleware for setting totalPrice value automatically
OrderSchema.pre('save', async function (next) {
    const product = await mongoose.model('Bike').findById(this.product);
    if (product) {
        this.totalPrice = product.price * this.quantity;
    }
    next();
});

export const OrderModel = mongoose.model<IOrder>("Order", OrderSchema);