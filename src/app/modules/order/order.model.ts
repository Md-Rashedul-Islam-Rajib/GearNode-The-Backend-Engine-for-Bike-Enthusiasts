import mongoose, { Schema } from 'mongoose';
import { IOrder } from './order.type';

export const OrderSchema = new Schema<IOrder>(
    {
        email: {
            type: String,
            required: [true, 'email is required'],
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Bike',
            required: [true, 'Product is required'],
        },
        status: {
            type: String,
            enum: ['pending', 'processing', 'shipped', 'delivered'],
            required: false,
            default: "pending"
        },
        quantity: {
            type: Number,
            required: [true, 'Quantity is required'],
            min: [1, 'Quantity must be a positive number'],
        },
        isDeleted: {
            type: Boolean,
            required: false,
            default: false,
        },
        isCancelled: {
            type: Boolean,
            required: false,
            default: false,
        },
        totalPrice: {
            type: Number,
            required: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const OrderModel = mongoose.model<IOrder>('Order', OrderSchema);
