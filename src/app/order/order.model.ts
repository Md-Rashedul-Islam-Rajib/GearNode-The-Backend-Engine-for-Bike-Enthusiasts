import mongoose, { Schema } from "mongoose";
import { IOrder } from "./order.type";

export const OrderSchema = new Schema<IOrder>({
    email: {
        type: String,
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Bike',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be a positive number"]
    },
    totalPrice: {
        type: Number,
        
    }
});

// OrderSchema.pre('save', async function (next) {
//     const product = await mongoose.model('Bike').findById(this.product);
//     if (!product) {
//         return next(new Error('Bike not found'));
//     }
    
//         if (!product.inStock) {
//             return next(new Error("Out of stock"));
//         }
//     // Checking availability of selected bike
//      if (product.quantity < this.quantity ) {
//          return next(new Error(`Insufficient stock. Only ${product.quantity} available`));
//     }
    
//     product.quantity -= this.quantity;
//     const availability = product.quantity === 0;
//     if (availability) {
//         product.inStock = false;
//     };
//     // setting totalPrice value
//     this.totalPrice = product.price * this.quantity;
//     await product.save();

    
//     next();
// });

export const OrderModel = mongoose.model<IOrder>("Order", OrderSchema);
