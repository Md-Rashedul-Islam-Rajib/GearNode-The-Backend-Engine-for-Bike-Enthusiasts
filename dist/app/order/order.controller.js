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
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const product_model_1 = require("../product/product.model");
const order_zodSchema_1 = require("./order.zodSchema");
class OrderController {
    // controller func for create product
    static createOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataForValidation = order_zodSchema_1.OrderZodSchema.parse(req.body);
                const { email, product, quantity, totalPrice: orderPrice, } = dataForValidation;
                const motorBike = yield product_model_1.ProductModel.findById(product);
                const totalPrice = orderPrice || motorBike.price * quantity;
                if (!motorBike.inStock) {
                    return next(new Error("Out of stock"));
                }
                // Checking availability of selected motorBike
                if (motorBike.quantity < quantity) {
                    return next(new Error(`Insufficient stock. Only ${motorBike.quantity} available`));
                }
                motorBike.quantity -= quantity;
                const availability = motorBike.quantity <= 0;
                if (availability) {
                    motorBike.inStock = false;
                }
                yield motorBike.save();
                const orderInfo = {
                    email,
                    product,
                    quantity,
                    totalPrice,
                };
                yield order_service_1.OrderService.createOrder(orderInfo);
                return res.status(201).json({
                    message: 'Order created successfully',
                    status: true,
                    data: orderInfo,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.OrderController = OrderController;
