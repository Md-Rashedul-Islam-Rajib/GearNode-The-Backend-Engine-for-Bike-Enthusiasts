import { OrderModel } from "./order.model";
import { IOrder } from "./order.type";
// import { OrderType } from "./order.zodSchema";


export class OrderService {

    // service func for create order
    static async createOrder(data: IOrder) {
        const order = new OrderModel(data);
        const response = await order.save();
        return response;
    }

}