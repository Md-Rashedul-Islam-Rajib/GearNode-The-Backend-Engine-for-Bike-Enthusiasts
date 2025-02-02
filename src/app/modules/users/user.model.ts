import { model, Schema } from 'mongoose';
import config from '../../config';
import bcrypt from 'bcrypt';
import { TUser, UserStatics } from './user.types';

const userSchema = new Schema<TUser>(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            required: true
         },
        
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['customer', 'admin'],
            default: 'customer',
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this; // doc
    // hashing password and save into DB
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds),
    );
    next();
});

userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});

userSchema.statics.isUserExists = async function (identifier: string) {
    // Check if the identifier is an email
    if (identifier.includes('@')) {
        return await UserModel.findOne({ email: identifier }).select(
            '+password',
        );
    } else {
        // Otherwise, treat it as an ID
        return await UserModel.findById(identifier).select('+password');
    }
};

userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const UserModel = model<TUser, UserStatics>('user', userSchema);
