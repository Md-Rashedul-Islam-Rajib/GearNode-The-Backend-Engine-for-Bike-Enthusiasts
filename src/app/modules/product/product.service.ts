import { ObjectId } from 'mongoose';
import { ProductModel } from './product.model';
import { TBike, TUpdateBike } from './product.types';
import QueryBuilder from '../../builder/queryBuilder';

export class ProductService {
    // function for creating product
    static async createProduct(data: TBike) {
        const product = new ProductModel(data);
        const response = await product.save();
        return response;
    }

    // function for get all products
    static async getAllProducts(query: Record<string, unknown>) {
        const filters: Record<string, unknown> = {
            price: {
                ...(query.minPrice && !isNaN(Number(query.minPrice))
                    ? { $gte: Number(query.minPrice) }
                    : {}),
                ...(query.maxPrice && !isNaN(Number(query.maxPrice))
                    ? { $lte: Number(query.maxPrice) }
                    : {}),
            },
            isDeleted: { $ne: true },
        };

        // Remove empty price filter if not applicable
        // if (Object.keys(filters?.price).length === 0) {
        //     delete filters.price;
        // }

        const productQuery = new QueryBuilder(
            ProductModel.find(filters, { isDeleted: 0 }),
            query,
        )
            .search(['brand', 'name', 'category'])
            .filter();

        const result = await productQuery.getQuery().exec();

        return result;
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
    static async updateProduct(id: ObjectId, updatedData: TUpdateBike) {
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
