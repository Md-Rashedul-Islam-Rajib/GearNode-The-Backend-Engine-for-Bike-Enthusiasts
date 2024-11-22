import { z } from 'zod';



// zod schema for create bike product 
export const ProductZodSchema = z.object({
    name: z.string({
        message: 'Product name is required',
    }).min(3,"Name must be longer than 3 characters"),
    brand: z.string({
        message: 'Brand is required',
    }).min(3,"Brand must be longer than 3 characters"),
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
    }).min(5,"Description must be longer than 5 characters"),
    quantity: z
        .number({
            message: 'Quantity is required',
        })
        .min(0, 'Quantity must be a positive number'),
    inStock: z.boolean({
        message: 'In-stock status is required',
    }),
    isDeleted: z
        .boolean()
        .default(false)
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


