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
exports.ProductService = void 0;
const product_model_1 = require("./product.model");
class ProductService {
    // function for creating product
    static createProduct(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = new product_model_1.ProductModel(data);
            const response = yield product.save();
            return response;
        });
    }
    // function for get all products
    static getAllProducts(searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            const filterOptions = { isDeleted: false };
            if (searchTerm) {
                filterOptions.$or = [
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { brand: { $regex: searchTerm, $options: 'i' } },
                    { category: { $regex: searchTerm, $options: 'i' } },
                ];
            }
            const response = yield product_model_1.ProductModel.find(filterOptions);
            return response;
        });
    }
    // function for getting single product by id
    static getSingleProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield product_model_1.ProductModel.findById({ _id: id, isDeleted: false });
            return response;
        });
    }
    // function for updating a product by id
    static updateProduct(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield product_model_1.ProductModel.findByIdAndUpdate({ _id: id, isDeleted: false }, updatedData, { new: true });
            return response;
        });
    }
    // function for deleting a product by id
    static deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield product_model_1.ProductModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
            return response;
        });
    }
}
exports.ProductService = ProductService;
