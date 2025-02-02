import { Router } from 'express';
import ProductRouter from '../modules/product/product.route';
import OrderRouter from '../modules/order/order.route';
import RevenueRouter from '../modules/revenue/revenue.route';
import AuthRouter from '../modules/auth/auth.route';

const router: Router = Router();

const allRoutes = [
    {
        path: '/products',
        route: ProductRouter,
    },
    {
        path: '/auth',
        route: AuthRouter,
    },
    {
        path: '/orders',
        route: OrderRouter,
    },
    {
        path: '/orders/revenue',
        route: RevenueRouter,
    },
];

allRoutes.forEach((singleRoute) =>
    router.use(singleRoute.path, singleRoute.route),
);



export default router;
