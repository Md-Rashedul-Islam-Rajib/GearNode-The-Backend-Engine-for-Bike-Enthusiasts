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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const order_model_1 = require("./order.model");
class OrderService {
    // service func for create order
    static createOrder(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = new order_model_1.OrderModel(data);
            const response = yield order.save();
            return response;
        });
    }
    static getAllOrders(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const filters = {
                isDeleted: { $ne: true },
            };
            const orderQuery = new queryBuilder_1.default(order_model_1.OrderModel.find(filters, { isDeleted: 0 }).populate('product'), query)
                .filter();
            const result = orderQuery.getQuery().exec();
            return result;
        });
    }
    static updateOrder(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield order_model_1.OrderModel.findByIdAndUpdate({ _id: id, isDeleted: false }, updatedData, { new: true });
            return response;
        });
    }
    static deleteOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield order_model_1.OrderModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
            return response;
        });
    }
}
exports.OrderService = OrderService;
