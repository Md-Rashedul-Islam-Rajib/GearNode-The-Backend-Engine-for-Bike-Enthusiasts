"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const OrderRouter = (0, express_1.Router)();
OrderRouter.post("/", order_controller_1.OrderController.createOrder);
exports.default = OrderRouter;
