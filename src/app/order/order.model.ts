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
        quantity: {
            type: Number,
            required: [true, 'Quantity is required'],
            min: [1, 'Quantity must be a positive number'],
        },
        totalPrice: {
            type: Number,
            required : false
        },
    },
    {
        timestamps: true,
        versionKey: false
    },
);

export const OrderModel = mongoose.model<IOrder>('Order', OrderSchema);
