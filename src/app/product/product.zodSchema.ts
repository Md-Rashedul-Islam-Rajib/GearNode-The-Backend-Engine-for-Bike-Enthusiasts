import { z } from 'zod';

export const ProductZodSchema = z.object({
    name: z.string({
        required_error: 'Product name is required',
    }),
    brand: z.string({
        required_error: 'Brand is required',
    }),
    price: z
        .number({
            required_error: 'Price is required',
        })
        .min(0, 'Price must be a positive number'),
    category: z.enum(['Mountain', 'Road', 'Hybrid', 'Electric'], {
        required_error: 'Category is required',
    }),
    description: z.string({
        required_error: 'Description is required',
    }),
    quantity: z
        .number({
            required_error: 'Quantity is required',
        })
        .min(0, 'Quantity must be a positive number'),
    inStock: z.boolean({
        required_error: 'In-stock status is required',
    }),
});
