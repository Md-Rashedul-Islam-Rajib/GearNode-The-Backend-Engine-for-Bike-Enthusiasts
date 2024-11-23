import { z } from 'zod';

export const OrderSchema = z.object({
    email: z
        .string()
        .email('Invalid email address')
        .min(1),
    product: z.string().min(1,'Product id is required'), 
    quantity: z
        .number()
        .int('Quantity must be an integer')
        .positive('Quantity must be a positive number'),
    totalPrice: z
        .number()
        .positive("TotalPrice must be a positive number")
        
});

export type OrderType = z.infer<typeof OrderSchema>;
