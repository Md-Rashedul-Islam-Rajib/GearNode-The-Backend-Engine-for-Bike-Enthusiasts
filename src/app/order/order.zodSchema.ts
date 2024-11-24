import mongoose from 'mongoose';
import { z } from 'zod';

// custom zod schema for handling mongoDB objectId type
const ObjectIdSchema = z
    .string()
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
        message: 'Invalid ObjectId',
    });

export const OrderZodSchema = z.object({
    email: z.string().email('Invalid email address').min(1),
    product: ObjectIdSchema,
    quantity: z
        .number()
        .int('Quantity must be an integer')
        .positive('Quantity must be a positive number'),
    totalPrice: z.number().positive('TotalPrice must be a positive number'),
});

export type OrderType = z.infer<typeof OrderZodSchema>;
