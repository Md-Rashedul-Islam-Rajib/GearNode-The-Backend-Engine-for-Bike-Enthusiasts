import { OrderModel } from '../order/order.model';

export class RevenueService {
    // service func for calculate revenue
    static async getTotalRevenue() {
        const revenue = await OrderModel.aggregate([
            {
                $lookup: {
                    from: 'bikes',
                    localField: 'product',
                    foreignField: '_id',
                    as: 'bikeInfo',
                },
            },
            {
                $unwind: '$bikeInfo',
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: {
                            $multiply: ['$bikeInfo.price', '$quantity'],
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    totalRevenue: 1,
                },
            },
        ]);
        return revenue.length ? revenue[0].totalRevenue : 0;
    }
}
