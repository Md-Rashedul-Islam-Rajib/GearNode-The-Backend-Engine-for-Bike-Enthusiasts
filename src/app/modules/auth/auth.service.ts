import { UserModel } from './../users/user.model';
import bcrypt from 'bcrypt';
import { TUpdateUser, TUser } from "../users/user.types";
import { createToken, preValidatingUser } from "./auth.utilities";
import config from '../../config';
import QueryBuilder from "../../builder/queryBuilder";



type TLoginUser = {
    email: string;
    password: string;
}

export class AuthServices {
    static async registerCustomer(payload: TUser) {
        const userExists = await UserModel.isUserExists(payload.email);
        if (userExists) {
            throw new Error(`User with ${payload.email} already exists`);
        }
        const data = await UserModel.create(payload);
        return data;
    }

    static async loginCustomer(payload: TLoginUser) {
        const user = await preValidatingUser(payload.email);
        const isPasswordCorrect = await UserModel.isPasswordMatched(
            payload?.password,
            user?.password,
        );

        if (!isPasswordCorrect) {
            throw new Error('Password is Incorrect');
        }

        const jwtPayload = {
            email: user.email,
            role: user.role,
        };

        const accessToken = createToken(
            jwtPayload,
            config.jwt_access_secret,
            config.jwt_access_expires_in,
        );

        const refreshToken = createToken(
            jwtPayload,
            config.jwt_refresh_secret,
            config.jwt_refresh_expires_in,
        );

        return {
            accessToken,
            refreshToken,
        };
    }
    static async getAllUsers(query: Record<string, unknown>) {
        const userQuery = new QueryBuilder(UserModel.find(), query).filter();

        const result = userQuery.getQuery().exec();

        return result;
    }

    // static async getSingleUser(id: ObjectId) {
    //         const response = await UserModel.findById({
    //             _id: id
    //         });
    //         return response;
    //     }

    static async updateUser(updatedData: TUpdateUser) {
        const response = await UserModel.findOneAndUpdate(
            {
                email: updatedData?.email,
            },
            updatedData,
            { new: true },
        );
        return response;
    }

    static async getSingleUser(id: string) {
        const response = await UserModel.findById({
            _id: id,
        });
        return response;
    }

    static async toggleUserBlock(id: string, isBlocked: boolean) {
        
        const user = await UserModel.findById(id);

        if (!user) {
            throw new Error('User not found');
        }

        // Toggle block status
        user.isBlocked = isBlocked;
        await user.save();

        return {
            message: `User ${isBlocked ? 'blocked' : 'unblocked'} successfully`,
        };
    }

    static async changePassword(updatedData: {
        email: string;
        currentPassword: string;
        newPassword: string;
    }) {
        const { email, currentPassword, newPassword } = updatedData;
        const user = await UserModel.isUserExists(email);
        const passwordMatched = UserModel.isPasswordMatched(
            currentPassword,
            user.password,
        );
        if (!passwordMatched) {
            throw new Error('Current password is incorrect');
        }

        const newHashedPassword = await bcrypt.hash(
            newPassword,
            Number(config.bcrypt_salt_rounds),
        );

        await UserModel.findOneAndUpdate(
            { email },
            { password: newHashedPassword },
        );
        return { message: 'Password updated successfully' };
    }
}