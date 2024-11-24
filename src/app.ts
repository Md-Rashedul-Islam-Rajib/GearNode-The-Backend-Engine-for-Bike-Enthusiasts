import express, { Application, NextFunction, Request, Response } from 'express';

import ProductRouter from './app/product/product.route';
import OrderRouter from './app/order/order.route';
import RevenueRouter from './app/revenue/revenue.route';
import { handleErrors } from './errors/handlingErrors';

const app: Application = express();

// parser
app.use(express.json());

// home route
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to 🏍🏍🏍 GearNode 🏍🏍🏍');
});

// App routes
app.use('/api/products', ProductRouter);
app.use('/api/orders', OrderRouter);
app.use('/api/orders/revenue', RevenueRouter);

// global error handler
app.use(handleErrors);

export default app;
