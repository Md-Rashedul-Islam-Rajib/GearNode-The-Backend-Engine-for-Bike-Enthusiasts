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
exports.RevenueService = void 0;
const order_model_1 = require("../order/order.model");
class RevenueService {
    // service func for calculate revenue
    static getTotalRevenue() {
        return __awaiter(this, void 0, void 0, function* () {
            const revenue = yield order_model_1.OrderModel.aggregate([
                {
                    $lookup: {
                        from: "bikes",
                        localField: "product",
                        foreignField: "_id",
                        as: "bikeInfo",
                    },
                },
                {
                    $unwind: "$bikeInfo",
                },
                {
                    $group: {
                        _id: null,
                        totalRevenue: {
                            $sum: {
                                $multiply: ["$bikeInfo.price", "$quantity"],
                            },
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        totalRevenue: 1,
                    },
                },
            ]);
            return revenue.length ? revenue[0].totalRevenue : 0;
        });
    }
}
exports.RevenueService = RevenueService;
