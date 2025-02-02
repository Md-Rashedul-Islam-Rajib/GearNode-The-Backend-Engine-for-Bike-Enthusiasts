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
    status: z.enum(['pending','processing','shipped','delivered']).default('pending').optional(),
    totalPrice: z
        .number()
        .positive('TotalPrice must be a positive number')
        .optional(),
    isDeleted: z.boolean().default(false).optional(),
    isCancelled: z.boolean().default(false).optional()
});

export const UpdateOrderZodSchema = z.object({
    email: z.string().optional(),
    product: z.string().optional(),
    quantity: z
        .number()
        .int('Quantity must be an integer')
        .positive('Quantity must be a positive number').optional(),
    status: z
        .enum(['pending', 'processing', 'shipped', 'delivered'])
        .optional(),
    totalPrice: z
        .number()
        .positive('TotalPrice must be a positive number')
        .optional(),
    isDeleted: z.boolean().optional(),
    isCancelled: z.boolean().optional(),
});

export type OrderType = z.infer<typeof OrderZodSchema>;
export type TUpdateOrder = z.infer<typeof UpdateOrderZodSchema>;
