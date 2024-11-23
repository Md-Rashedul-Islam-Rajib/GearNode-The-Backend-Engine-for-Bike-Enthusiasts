import { OrderModel } from "./order.model";
import { TOrder } from "./order.type";


export class OrderService {

    // service func for create order
    static async createOrder(data: TOrder) {
        const order = new OrderModel(data);
        const response = await order.save();
        return response;
    }

}