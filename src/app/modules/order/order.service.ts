import { ObjectId } from 'mongoose';
import QueryBuilder from '../../builder/queryBuilder';
import { OrderModel } from './order.model';
import { IOrder } from './order.type';
import { TUpdateOrder } from './order.zodSchema';

export class OrderService {
    // service func for create order
    static async createOrder(data: IOrder) {
        const order = new OrderModel(data);
        const response = await order.save();
        return response;
    }

    static async getAllOrders(
        query: Record<string, unknown>
    ) {
        const filters: Record<string, unknown> = {
            isDeleted: { $ne: true },
        };
        const orderQuery = new QueryBuilder(
            OrderModel.find(filters, { isDeleted: 0 }).populate('product'),
            query,
        )
            .filter();

        const result = orderQuery.getQuery().exec();

        return result;
    }

     static async updateOrder(id: ObjectId, updatedData: TUpdateOrder) {
            const response = await OrderModel.findByIdAndUpdate(
                { _id: id, isDeleted: false },
                updatedData,
                { new: true },
            );
            return response;
        }

    
     static async deleteOrder(id: ObjectId) {
            const response = await OrderModel.findByIdAndUpdate(
                id,
                { isDeleted: true },
                { new: true },
            );
            return response;
        }
}
