import { ObjectId } from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import { ProductZodSchema, UpdateProductZodSchema } from './product.zodSchema';
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
            const { isDeleted: _, ...restData } = data.toObject();
            return res.status(201).json({
                message: 'Bike created successfully',
                status: true,
                data: restData,
            });
        } catch (error) {
            next(error);
        }
    }

    // controller func for get all products
    static async getProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const { searchTerm } = req.query;
            const products = await ProductService.getAllProducts(
                searchTerm as string,
            );

            // handling not found error
            if (products.length === 0) {
                return res.status(404).json({
                    message: 'No 🏍 bike found',
                    status: false,
                });
            }
            return res.status(200).json({
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

            // handling not found error
            if (!product) {
                return res.status(404).json({
                    message: 'Bike 🏍🏍🏍 is not found',
                    status: false,
                });
            }
            return res.status(200).json({
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
            const updatedData = UpdateProductZodSchema.parse(req.body);

            // adjusting stock status when quantity is 0
            if (updatedData.quantity && updatedData.quantity == 0) {
                updatedData.inStock = false;
            }
            // adjusting stock status when quantity greater than 0
            if (updatedData.quantity && updatedData.quantity > 0) {
                updatedData.inStock = true;
            }

            const updatedProduct = await ProductService.updateProduct(
                id,
                updatedData,
            );

            // handling not found error
            if (!updatedProduct)
                return res
                    .status(404)
                    .json({ error: 'Bike not found or deleted' });

            return res.status(200).json({
                message: 'Bike updated successfully',
                status: true,
                data: updatedProduct,
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
                return res.status(404).json({ error: 'Bike not found' });
            return res.status(200).json({
                message: 'Bike successfully deleted',
                status: true,
                data: {},
            });
        } catch (error) {
            next(error);
        }
    }
}
