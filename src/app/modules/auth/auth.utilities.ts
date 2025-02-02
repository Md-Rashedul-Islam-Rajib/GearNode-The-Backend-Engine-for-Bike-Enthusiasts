/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { UserModel } from '../users/user.model';
import { StringValue } from '../../types/global.types';



export const createToken = (
    jwtPayload: { email: string; role: string },
    secret: Secret,
    expiresIn: StringValue,
): string => {
    return jwt.sign(jwtPayload, secret, {
        expiresIn,
    });
};

export const verifyToken = (secret: string, token?: string) => {
    if (!token) {
        throw new Error("You're not authorized");
    }

    try {
        return jwt.verify(token, secret) as JwtPayload;
    } catch (error) {
        throw new Error('The provided token is invalid or expired');
    }
};

export const preValidatingUser = async (identifier: string) => {
    const user = await UserModel.isUserExists(identifier);
    if (!user) {
        throw new Error('this user is not found');
    }

    //   if (user?.isDeleted) {
    //     throw new Error('this user is deleted');
    //   }

    if (user.isBlocked) {
        throw new Error('this user is blocked');
    }

    return user;
};
