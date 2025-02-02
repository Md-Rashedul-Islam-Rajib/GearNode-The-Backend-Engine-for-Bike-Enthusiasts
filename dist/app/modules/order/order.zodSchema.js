"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderZodSchema = exports.OrderZodSchema = void 0;
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
    status: zod_1.z.enum(['pending', 'processing', 'shipped', 'delivered']).default('pending').optional(),
    totalPrice: zod_1.z
        .number()
        .positive('TotalPrice must be a positive number')
        .optional(),
    isDeleted: zod_1.z.boolean().default(false).optional(),
    isCancelled: zod_1.z.boolean().default(false).optional()
});
exports.UpdateOrderZodSchema = zod_1.z.object({
    email: zod_1.z.string().optional(),
    product: zod_1.z.string().optional(),
    quantity: zod_1.z
        .number()
        .int('Quantity must be an integer')
        .positive('Quantity must be a positive number').optional(),
    status: zod_1.z
        .enum(['pending', 'processing', 'shipped', 'delivered'])
        .optional(),
    totalPrice: zod_1.z
        .number()
        .positive('TotalPrice must be a positive number')
        .optional(),
    isDeleted: zod_1.z.boolean().optional(),
    isCancelled: zod_1.z.boolean().optional(),
});
