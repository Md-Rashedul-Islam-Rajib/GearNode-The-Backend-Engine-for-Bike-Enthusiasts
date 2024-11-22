import { z } from 'zod';

export const OrderSchema = z.object({
    email: z
        .string()
        .email('Invalid email address')
        .nonempty('Customer email is required'),
    product: z.string().nonempty('Product reference (ID) is required'), // ObjectId as string
    quantity: z
        .number()
        .int('Quantity must be an integer')
        .positive('Quantity must be a positive number')
        
});

export type OrderType = z.infer<typeof OrderSchema>;
