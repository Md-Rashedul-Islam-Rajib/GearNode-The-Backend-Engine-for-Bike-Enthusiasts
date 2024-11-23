import { Document, Types } from 'mongoose';

export interface IOrder {
    email: string,
    product: Types.ObjectId,
    quantity: number,
    totalPrice: number
} 

// export type TOrder = IOrder & Document;