import { FilterQuery, ObjectId } from 'mongoose';
import { ProductModel } from './product.model';
import { TBike, TProduct } from './product.types';

export class ProductService {
    // function for creating product
    static async createProduct(data: TBike) {
        const product = new ProductModel(data);
        const response = await product.save();
        return response;
    }

    // function for get all products
    static async getAllProducts(searchTerm: string) {
        // default filter parameter
        const filterOptions: FilterQuery<TProduct> = { isDeleted: false };

        // optional filter parameter
        if (searchTerm) {
            filterOptions.$or = [
                { name: { $regex: searchTerm, $options: 'i' } },
                { brand: { $regex: searchTerm, $options: 'i' } },
                { category: { $regex: searchTerm, $options: 'i' } },
            ];
        }

        const response = await ProductModel.find(filterOptions);
        return response;
    }

    // function for getting single product by id
    static async getSingleProductById(id: ObjectId) {
        const response = await ProductModel.findById({
            _id: id,
            isDeleted: false,
        });
        return response;
    }

    // function for updating a product by id
    static async updateProduct(
        id: ObjectId,
        updatedData: Partial<Omit<TProduct, 'isDeleted'>>,
    ) {
        const response = await ProductModel.findByIdAndUpdate(
            { _id: id, isDeleted: false },
            updatedData,
            { new: true },
        );
        return response;
    }

    // function for deleting a product by id
    static async deleteProduct(id: ObjectId) {
        const response = await ProductModel.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true },
        );
        return response;
    }
}
