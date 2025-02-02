/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUser = {
    name: string;
    email: string;
    image: string;
    password: string;
    role: 'customer' | 'admin';
    isBlocked?: boolean;
};

export type TUpdateUser = Partial<TUser>;

export interface UserStatics extends Model<TUser> {
    //instance methods for checking if the user exist
    isUserExists(email: string, id?: string): Promise<TUser>;
    //instance methods for checking if passwords are matched
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string,
    ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
