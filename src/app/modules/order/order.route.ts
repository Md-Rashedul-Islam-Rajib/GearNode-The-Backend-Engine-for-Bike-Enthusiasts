import { Router } from 'express';
import { OrderController } from './order.controller';

const OrderRouter: Router = Router();

OrderRouter.post('/create', OrderController.createOrder);
OrderRouter.get('/', OrderController.getOrders);
OrderRouter.put('/:id', OrderController.updateOrder);
OrderRouter.delete('/:id', OrderController.deleteOrder);

export default OrderRouter;
