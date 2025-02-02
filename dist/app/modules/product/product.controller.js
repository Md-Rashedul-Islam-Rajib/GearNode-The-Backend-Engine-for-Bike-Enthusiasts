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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
                const _a = data.toObject(), { isDeleted: _ } = _a, restData = __rest(_a, ["isDeleted"]);
                return res.status(201).json({
                    message: 'Bike created successfully',
                    status: true,
                    data: restData,
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
                const products = yield product_service_1.ProductService.getAllProducts(req.query);
                return res.status(200).json({
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
                const updatedData = product_zodSchema_1.UpdateProductZodSchema.parse(req.body);
                // adjusting stock status when quantity is 0
                if (updatedData.quantity && updatedData.quantity == 0) {
                    updatedData.inStock = false;
                }
                // adjusting stock status when quantity greater than 0
                if (updatedData.quantity && updatedData.quantity > 0) {
                    updatedData.inStock = true;
                }
                const updatedProduct = yield product_service_1.ProductService.updateProduct(id, updatedData);
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
                    return res.status(404).json({
                        message: 'Bike not found',
                        status: false
                    });
                return res.status(200).json({
                    message: 'Bike successfully deleted',
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
