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
exports.RevenueController = void 0;
const revenue_service_1 = require("./revenue.service");
class RevenueController {
    // controller func for getting total revenue
    static getRevenue(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalRevenue = yield revenue_service_1.RevenueService.getTotalRevenue();
                return res
                    .status(200)
                    .json({
                    message: "Revenue calculated successfully",
                    status: true,
                    data: {
                        totalRevenue
                    }
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.RevenueController = RevenueController;
