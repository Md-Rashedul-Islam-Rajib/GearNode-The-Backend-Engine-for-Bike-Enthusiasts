import { ObjectId } from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import { ProductZodSchema } from './product.zodSchema';
import { TBike } from './product.types';
import { ProductService } from './product.service';

export class ProductController {
    // controller func for create product
    static async createProduct(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const productData: TBike = req.body;
            const validatedData = ProductZodSchema.parse(productData);
            const data = await ProductService.createProduct(validatedData); 
            console.log(data);
            res.status(201).json({
                message: "Bike created successfully",
                status: true,
                data
            });
        } catch (error) {
            next(error);
        }
    }

    // controller func for get all products
    static async getProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await ProductService.getAllProducts();
            res.status(200).json({
                message: 'Bikes retrieved successfully',
                status: true,
                data: products,
            });
        } catch (error) {
            next(error);
        }
    }

    // controller func for get single product by id
    static async getSingleProduct(
        req: Request<{ id: ObjectId }>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            const product = await ProductService.getSingleProductById(id);
            if (!product) {
                return res.status(404).json({
                    message: 'Bike is not found',
                    status: false,
                });
            }
            res.status(200).json({
                message: 'Bike retrieved successfully',
                status: true,
                data: product,
            });
        } catch (error) {
            next(error);
        }
    }

    // controller func for update a product
    static async updatingProduct(
        req: Request<{ id: ObjectId }>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            const updatedData = req.body;
            const updatedProduct = await ProductService.updateProduct(
                id,
                updatedData,
            );
            if (!updatedProduct)
                return res
                    .status(404)
                    .json({ error: 'Product not found or deleted' });
            res.status(200).json({
                message: 'Bike updated successfully',
                status: true,
                data: updatedData,
            });
        } catch (error) {
            next(error);
        }
    }

    // controller func for deleting a product
    static async deleteProduct(
        req: Request<{ id: ObjectId }>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            const deletedProduct = await ProductService.deleteProduct(id);
            if (!deletedProduct)
                return res.status(404).json({ error: 'Product not found' });
            res.status(200).json({
                message: 'Product successfully deleted',
                status: true,
                data: {},
            });
        } catch (error) {
            next(error);
        }
    }
}
