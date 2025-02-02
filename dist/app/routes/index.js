"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_route_1 = __importDefault(require("../modules/product/product.route"));
const order_route_1 = __importDefault(require("../modules/order/order.route"));
const revenue_route_1 = __importDefault(require("../modules/revenue/revenue.route"));
const auth_route_1 = __importDefault(require("../modules/auth/auth.route"));
const router = (0, express_1.Router)();
const allRoutes = [
    {
        path: '/products',
        route: product_route_1.default,
    },
    {
        path: '/auth',
        route: auth_route_1.default,
    },
    {
        path: '/orders',
        route: order_route_1.default,
    },
    {
        path: '/orders/revenue',
        route: revenue_route_1.default,
    },
];
allRoutes.forEach((singleRoute) => router.use(singleRoute.path, singleRoute.route));
exports.default = router;
