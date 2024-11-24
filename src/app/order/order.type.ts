import { Types } from 'mongoose';

export interface IOrder {
    email: string;
    product: Types.ObjectId | string;
    quantity: number;
    totalPrice?: number;
}
