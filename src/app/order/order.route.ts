import { Router } from "express";
import { OrderController } from "./order.controller";

const OrderRouter: Router = Router();

OrderRouter.post("/", OrderController.createOrder);

export default OrderRouter;