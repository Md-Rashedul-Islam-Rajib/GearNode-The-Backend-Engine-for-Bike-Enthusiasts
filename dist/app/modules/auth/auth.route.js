"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_validation_1 = require("../users/user.validation");
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const AuthRouter = (0, express_1.Router)();
AuthRouter.post('/register', (0, validateRequest_1.default)(user_validation_1.userCreationSchema), auth_controller_1.AuthControllers.registerCustomer);
AuthRouter.post('/login', auth_controller_1.AuthControllers.loginCustomer);
AuthRouter.put('/change-password', auth_controller_1.AuthControllers.changePassword);
AuthRouter.put('/update', auth_controller_1.AuthControllers.updateUser);
AuthRouter.get('/', auth_controller_1.AuthControllers.getUsers);
AuthRouter.get('/:id', auth_controller_1.AuthControllers.getSingleUser);
AuthRouter.put('/users/:id', auth_controller_1.AuthControllers.toggleUserBlock);
exports.default = AuthRouter;
