"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_zodSchema_1 = require("./product.zodSchema");
const product_service_1 = require("./product.service");
class ProductController {
    // controller func for create product
    static createProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productData = req.body;
                const validatedData = product_zodSchema_1.ProductZodSchema.parse(productData);
                const data = yield product_service_1.ProductService.createProduct(validatedData);
                console.log(data);
                res.status(201).json({
                    message: "Bike created successfully",
                    status: true,
                    data
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // controller func for get all products
    static getProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield product_service_1.ProductService.getAllProducts();
                res.status(200).json({
                    message: 'Bikes retrieved successfully',
                    status: true,
                    data: products,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // controller func for get single product by id
    static getSingleProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const product = yield product_service_1.ProductService.getSingleProductById(id);
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
            }
            catch (error) {
                next(error);
            }
        });
    }
    // controller func for update a product
    static updatingProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updatedData = req.body;
                const updatedProduct = yield product_service_1.ProductService.updateProduct(id, updatedData);
                if (!updatedProduct)
                    return res
                        .status(404)
                        .json({ error: 'Product not found or deleted' });
                res.status(200).json({
                    message: 'Bike updated successfully',
                    status: true,
                    data: updatedData,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // controller func for deleting a product
    static deleteProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedProduct = yield product_service_1.ProductService.deleteProduct(id);
                if (!deletedProduct)
                    return res.status(404).json({ error: 'Product not found' });
                res.status(200).json({
                    message: 'Product successfully deleted',
                    status: true,
                    data: {},
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ProductController = ProductController;
