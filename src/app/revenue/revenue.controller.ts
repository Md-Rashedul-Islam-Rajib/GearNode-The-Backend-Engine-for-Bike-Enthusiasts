import { NextFunction, Request, Response } from 'express';
import { RevenueService } from './revenue.service';

export class RevenueController {
    // controller func for getting total revenue
    static async getRevenue(req: Request, res: Response, next: NextFunction) {
        try {
            const totalRevenue = await RevenueService.getTotalRevenue();

            // handling revenue generation error
            if (!totalRevenue) {
                return res.status(404).json({
                    message: 'Revenue calculation failed',
                    status: false,
                });
            }
            return res.status(200).json({
                message: 'Revenue calculated successfully',
                status: true,
                data: {
                    totalRevenue,
                },
            });
        } catch (error) {
            next(error);
        }
    }
}
