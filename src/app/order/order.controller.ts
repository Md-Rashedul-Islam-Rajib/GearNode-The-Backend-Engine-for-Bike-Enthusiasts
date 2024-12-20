import { NextFunction, Response, Request } from 'express';
import { OrderService } from './order.service';
import { ProductModel } from '../product/product.model';
import { OrderZodSchema } from './order.zodSchema';

export class OrderController {
    // controller func for create product
    static async createOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const dataForValidation = OrderZodSchema.parse(req.body);
            const {
                email,
                product,
                quantity,
                totalPrice: orderPrice,
            } = dataForValidation;

            const motorBike = await ProductModel.findById(product);
            const totalPrice = orderPrice || motorBike!.price * quantity;

            // checking availability of stock
            if (!motorBike!.inStock) {
                return next(new Error('Out of stock'));
            }
            // Checking availability of selected motorBike
            if (motorBike!.quantity < quantity) {
                return next(
                    new Error(
                        `Insufficient stock. Only ${motorBike!.quantity} available`,
                    ),
                );
            }

            // adjusting quantity after successful order
            motorBike!.quantity -= quantity;

            // update stock status when 0 bike left
            const availability = motorBike!.quantity <= 0;
            if (availability) {
                motorBike!.inStock = false;
            }

            await motorBike!.save();
            const orderInfo = {
                email,
                product,
                quantity,
                totalPrice,
            };
            await OrderService.createOrder(orderInfo);
            return res.status(201).json({
                message: 'Order created successfully',
                status: true,
                data: orderInfo,
            });
        } catch (error) {
            next(error);
        }
    }
}
