import mongoose, { Schema } from 'mongoose';
import { TProduct } from './product.types';

const ProductSchema = new Schema<TProduct>(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
        },
        brand: {
            type: String,
            required: [true, 'Product brand is required'],
        },
        price: {
            type: Number,
            required: [true, 'Product price is required'],
        },
        category: {
            type: String,
            enum: ['Mountain', 'Road', 'Hybrid', 'Electric'],
            required: [true, 'Product category is required'],
        },
        description: {
            type: String,
            required: [true, 'Product description is required'],
        },
        quantity: {
            type: Number,
            required: [true, 'Product quantity is required'],
        },
        inStock: {
            type: Boolean,
            required: [true, 'Product status is required'],
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

export const ProductModel = mongoose.model('Bike', ProductSchema);
