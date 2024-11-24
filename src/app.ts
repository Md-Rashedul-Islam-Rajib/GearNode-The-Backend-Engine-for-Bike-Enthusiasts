import { StatusfullError } from './types/error.type';
import express, { Application, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import ProductRouter from './app/product/product.route';
import OrderRouter from './app/order/order.route';
import RevenueRouter from './app/revenue/revenue.route';

const app: Application = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to 🏍🏍🏍 GearNode 🏍🏍🏍');
});


// App routes
app.use("/api/products", ProductRouter);
app.use("/api/orders", OrderRouter);
app.use("/api/orders/revenue", RevenueRouter);

// global error handler
app.use((error: StatusfullError, req: Request, res: Response, next: NextFunction) => {
  let errorMessage;
  if (error instanceof ZodError) { 
    errorMessage = error.errors
				.map((err) => `${err.path.join('.')}: ${err.message}`)
				.join('; ');
  } else {
    errorMessage = error.message || "Something went wrong";
  }
  res.status(error.status || 500).json({ error: errorMessage });
});

export default app;
