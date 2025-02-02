import dotenv from 'dotenv';
import path from 'path';
import { StringValue } from '../types/global.types';

dotenv.config({
    path: path.join(process.cwd(), '.env'),
});

export default {
    port: process.env.PORT,
    db_url: process.env.DB_URL,
    bcrypt_salt_rounds: process.env.SALT_ROUND as string,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET as string,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET as string,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN as StringValue,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN as StringValue,
};
