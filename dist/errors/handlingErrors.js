"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
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
exports.handleErrors = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// import { ValidationErrorResponse } from './error.type';
const zod_1 = require("zod");
const handleErrors = (err, _req, res, _next) => {
    // handling mongoose errors
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        return res.status(400).json({
            message: 'Validation failed',
            success: false,
            error: {
                name: err.name,
                errors: err.errors,
            },
            stack: err.stack,
        });
    }
    // handling cast errors
    if (err instanceof mongoose_1.MongooseError) {
        if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
            return res.status(400).json({
                message: 'Invalid ObjectId',
                success: false,
                error: {
                    name: err.name,
                    errors: err,
                },
                stack: err.stack,
            });
        }
    }
    // handling zod validation errors
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({
            message: err.name,
            success: false,
            error: {
                name: err.name,
                errors: err.errors || err.issues,
            },
            stack: err.stack,
        });
    }
    // handling all other errors except zod and mongoose
    if (err instanceof Error) {
        return res.status(500).json({
            message: 'Something went wrong',
            success: false,
            error: err.message,
            stack: err.stack,
        });
    }
    // handling unknown errors
    return res.status(500).json({
        message: 'Unknown error occurs',
        success: false,
        error: JSON.stringify(err),
    });
};
exports.handleErrors = handleErrors;
