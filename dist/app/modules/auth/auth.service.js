"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const user_model_1 = require("./../users/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_utilities_1 = require("./auth.utilities");
const config_1 = __importDefault(require("../../config"));
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
class AuthServices {
    static registerCustomer(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield user_model_1.UserModel.isUserExists(payload.email);
            if (userExists) {
                throw new Error(`User with ${payload.email} already exists`);
            }
            const data = yield user_model_1.UserModel.create(payload);
            return data;
        });
    }
    static loginCustomer(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield (0, auth_utilities_1.preValidatingUser)(payload.email);
            const isPasswordCorrect = yield user_model_1.UserModel.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password);
            if (!isPasswordCorrect) {
                throw new Error('Password is Incorrect');
            }
            const jwtPayload = {
                email: user.email,
                role: user.role,
            };
            const accessToken = (0, auth_utilities_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
            const refreshToken = (0, auth_utilities_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
            return {
                accessToken,
                refreshToken,
            };
        });
    }
    static getAllUsers(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const userQuery = new queryBuilder_1.default(user_model_1.UserModel.find(), query).filter();
            const result = userQuery.getQuery().exec();
            return result;
        });
    }
    // static async getSingleUser(id: ObjectId) {
    //         const response = await UserModel.findById({
    //             _id: id
    //         });
    //         return response;
    //     }
    static updateUser(updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield user_model_1.UserModel.findOneAndUpdate({
                email: updatedData === null || updatedData === void 0 ? void 0 : updatedData.email,
            }, updatedData, { new: true });
            return response;
        });
    }
    static getSingleUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield user_model_1.UserModel.findById({
                _id: id,
            });
            return response;
        });
    }
    static toggleUserBlock(id, isBlocked) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.findById(id);
            if (!user) {
                throw new Error('User not found');
            }
            // Toggle block status
            user.isBlocked = isBlocked;
            yield user.save();
            return {
                message: `User ${isBlocked ? 'blocked' : 'unblocked'} successfully`,
            };
        });
    }
    static changePassword(updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, currentPassword, newPassword } = updatedData;
            const user = yield user_model_1.UserModel.isUserExists(email);
            const passwordMatched = user_model_1.UserModel.isPasswordMatched(currentPassword, user.password);
            if (!passwordMatched) {
                throw new Error('Current password is incorrect');
            }
            const newHashedPassword = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.bcrypt_salt_rounds));
            yield user_model_1.UserModel.findOneAndUpdate({ email }, { password: newHashedPassword });
            return { message: 'Password updated successfully' };
        });
    }
}
exports.AuthServices = AuthServices;
