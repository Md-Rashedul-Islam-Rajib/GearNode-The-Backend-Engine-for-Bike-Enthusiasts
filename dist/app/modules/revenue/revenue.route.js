"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const revenue_controller_1 = require("./revenue.controller");
const RevenueRouter = (0, express_1.Router)();
RevenueRouter.get('/', revenue_controller_1.RevenueController.getRevenue);
exports.default = RevenueRouter;
