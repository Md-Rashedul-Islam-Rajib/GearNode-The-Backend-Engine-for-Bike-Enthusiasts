"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = exports.OrderSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
exports.OrderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.OrderModel = mongoose_1.default.model("Order", exports.OrderSchema);
