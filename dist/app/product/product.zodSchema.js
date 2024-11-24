"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductZodSchema = exports.ProductZodSchema = void 0;
const zod_1 = require("zod");
// zod schema for create bike product
exports.ProductZodSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        message: 'Product name is required',
    })
        .trim()
        .min(3, 'Name must be longer than 3 characters'),
    brand: zod_1.z
        .string({
        message: 'Brand is required',
    })
        .min(3, 'Brand must be longer than 3 characters'),
    price: zod_1.z
        .number({
        message: 'Price is required',
    })
        .min(0, 'Price must be a positive number'),
    category: zod_1.z.enum(['Mountain', 'Road', 'Hybrid', 'Electric'], {
        message: 'Category is required',
    }),
    description: zod_1.z
        .string({
        message: 'Description is required',
    })
        .min(5, 'Description must be longer than 5 characters'),
    quantity: zod_1.z
        .number({
        message: 'Quantity is required',
    })
        .min(0, 'Quantity must be a positive number'),
    inStock: zod_1.z.boolean({
        message: 'In-stock status is required',
    }),
    isDeleted: zod_1.z.boolean().default(false),
});
// zod schema for update bike product
exports.UpdateProductZodSchema = exports.ProductZodSchema.partial()
    .omit({ isDeleted: true })
    .strict();
