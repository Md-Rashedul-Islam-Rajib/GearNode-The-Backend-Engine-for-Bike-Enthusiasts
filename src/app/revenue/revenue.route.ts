import { Router } from 'express';
import { RevenueController } from './revenue.controller';

const RevenueRouter: Router = Router();

RevenueRouter.get('/', RevenueController.getRevenue);

export default RevenueRouter;
