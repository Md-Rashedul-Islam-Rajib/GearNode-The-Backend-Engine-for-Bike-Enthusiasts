"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderZodSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
// custom zod schema for handling mongoDB objectId type
const ObjectIdSchema = zod_1.z
    .string()
    .refine((value) => mongoose_1.default.Types.ObjectId.isValid(value), {
    message: 'Invalid ObjectId',
});
exports.OrderZodSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address').min(1),
    product: ObjectIdSchema,
    quantity: zod_1.z
        .number()
        .int('Quantity must be an integer')
        .positive('Quantity must be a positive number'),
    totalPrice: zod_1.z
        .number()
        .positive('TotalPrice must be a positive number')
        .optional(),
});
