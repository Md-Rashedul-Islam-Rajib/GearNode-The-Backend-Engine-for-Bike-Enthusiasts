import { z } from 'zod';



// zod schema for create bike product 
export const ProductZodSchema = z.object({
    name: z.string({
        message: 'Product name is required',
    }),
    brand: z.string({
        message: 'Brand is required',
    }),
    price: z
        .number({
            message: 'Price is required',
        })
        .min(0, 'Price must be a positive number'),
        category: z.enum(['Mountain', 'Road', 'Hybrid', 'Electric'], {
            message: 'Category is required',
        }),
        description: z.string({
            message: 'Description is required',
        }),
        quantity: z
        .number({
            message: 'Quantity is required',
        })
        .min(0, 'Quantity must be a positive number'),
        inStock: z.boolean({
            message: 'In-stock status is required',
        }),
    });
    
    
    // zod schema for update bike product
    export const UpdateProductZodSchema = z.object({
        price: z
        .number({
            message: 'Price is required',
        })
        .min(0, 'Price must be a positive number'),
        quantity: z
        .number({
            message: 'Quantity is required',
        })
        .min(0, 'Quantity must be a positive number'),
        
    });


