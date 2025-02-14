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
                // checking availability of stock
                if (!motorBike.inStock) {
                    return next(new Error('Out of stock'));
                }
                // Checking availability of selected motorBike
                if (motorBike.quantity < quantity) {
                    return next(new Error(`Insufficient stock. Only ${motorBike.quantity} available`));
                }
                // adjusting quantity after successful order
                motorBike.quantity -= quantity;
                // update stock status when 0 bike left
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
    static getOrders(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield order_service_1.OrderService.getAllOrders(req.query);
                return res.status(200).json({
                    message: 'Orders retrieved successfully',
                    status: true,
                    data: orders,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static updateOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updatedData = order_zodSchema_1.UpdateOrderZodSchema.parse(req.body);
                const updatedOrder = yield order_service_1.OrderService.updateOrder(id, updatedData);
                // handling not found error
                if (!updatedOrder)
                    return res
                        .status(404)
                        .json({ error: 'Order not found' });
                return res.status(200).json({
                    message: 'Order updated successfully',
                    status: true,
                    data: updatedOrder,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedOrder = yield order_service_1.OrderService.deleteOrder(id);
                if (!deletedOrder)
                    return res.status(404).json({
                        message: 'Order not found',
                        status: false
                    });
                return res.status(200).json({
                    message: 'Order successfully deleted',
                    status: true,
                    data: {},
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.OrderController = OrderController;
