import { NextFunction,Response, Request } from "express";
import { OrderZodSchema } from "./order.zodSchema";
import { OrderService } from "./order.service";
import mongoose from "mongoose";
import { IOrder } from "./order.type";

export class OrderController {
    // controller func for create product
    static async createOrder(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const orderData = OrderZodSchema.parse(req.body);
            const validatedData: IOrder = {
                ...orderData,
                product: new mongoose.Types.ObjectId(orderData.product),
            };
            await OrderService.createOrder(validatedData);
            return res.status(201).json({
                message: "Order created successfully",
                status: true,
                data : validatedData
            });
        } catch (error) {
            next(error);
        }
    }
}