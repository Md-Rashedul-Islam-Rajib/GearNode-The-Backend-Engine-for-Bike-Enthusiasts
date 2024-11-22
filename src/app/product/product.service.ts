import { ObjectId } from 'mongoose';
import { ProductModel } from './product.model';
import { TBike, TProduct } from './product.types';

export class ProductService {
    // function for creating product
    static async createProduct(data: TBike) {
        const product = new ProductModel(data);
        return product.save();
    }

    // function for get all products
    static async getAllProducts() {
        return ProductModel.find({ isDeleted: false });
    }

    // function for getting single product by id
    static async getSingleProductById(id: ObjectId) {
        return ProductModel.findById({ _id: id, isDeleted: false });
    }

    // function for updating a product by id
    static async updateProduct(id: ObjectId, updatedData: Partial<TProduct>) {
        return ProductModel.findByIdAndUpdate(
            { _id: id, isDeleted: false },
            updatedData,
            { new: true },
        );
    }

    // function for deleting a product by id
    static async deleteProduct(id: ObjectId) {
        return ProductModel.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true },
        );
    }
}
