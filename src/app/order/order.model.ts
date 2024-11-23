import mongoose, { Schema } from "mongoose";
import { IOrder, TOrder } from "./order.type";

export const OrderSchema = new Schema<TOrder>({
    email: {
        type: String,
        unique: true,
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
        required: true
    }
});

// middleware for setting totalPrice value and adjusting stock availability
OrderSchema.pre('save', async function (next) {
    const product = await mongoose.model('Bike').findById(this.product);
    if (!product) {
        return next(new Error('Bike not found'));
    }
    // Checking availability of selected bike
     if (product.quantity < this.quantity) {
         return next(new Error('Your selected bike is out of stock'));
    }
    
    product.quantity -= this.quantity;
    product.inStock = product.quantity > 0;
    await product.save();

    // // setting totalPrice value
    // this.totalPrice = product.price * this.quantity;
    
    next();
});


// restoring inStock availability when order removed from db
OrderSchema.pre('save', async function (next) {
    const product = await mongoose.model('Product').findById(this.product);
    if (product) {
        product.quantity += this.quantity;
        product.inStock = true;
        await product.save();
    }
    next();
});

export const OrderModel = mongoose.model<IOrder>("Order", OrderSchema);