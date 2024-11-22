import { Document, ObjectId } from 'mongoose';

export interface IOrder {
    email: string,
    product: ObjectId,
    quantity: number,
    totalPrice: number
} 

export type TOrder = IOrder & Document;