"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const product_route_1 = __importDefault(require("./app/product/product.route"));
const order_route_1 = __importDefault(require("./app/order/order.route"));
const revenue_route_1 = __importDefault(require("./app/revenue/revenue.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Welcome to 🏍🏍🏍 GearNode 🏍🏍🏍');
});
// App routes
app.use("/api/products", product_route_1.default);
app.use("/api/orders", order_route_1.default);
app.use("/api/orders/revenue", revenue_route_1.default);
// global error handler
app.use((error, req, res, next) => {
    let errorMessage;
    if (error instanceof zod_1.ZodError) {
        errorMessage = error.errors
            .map((err) => `${err.path.join('.')}: ${err.message}`)
            .join('; ');
    }
    else {
        errorMessage = error.message || "Something went wrong";
    }
    res.status(error.status || 500).json({ error: errorMessage });
});
exports.default = app;
