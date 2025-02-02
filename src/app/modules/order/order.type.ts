import { Types } from 'mongoose';

export interface IOrder {
    email: string;
    product: Types.ObjectId | string;
    quantity: number;
    status?: "pending" | "processing" |"shipped"| "delivered";
    totalPrice?: number;
    isDeleted?: boolean;
    isCancelled?: boolean;
}
