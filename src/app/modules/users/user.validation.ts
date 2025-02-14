import { z } from 'zod';

export const userCreationSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    image: z.string().url().optional(),
    password: z
        .string()
        .trim()
        .min(6, { message: 'Password must be at least 6 characters long!' })
        .max(20, { message: 'Password cannot be more than 20 characters!' }),
    role: z.enum(['customer', 'admin']).default('customer'),
    isBlocked: z.boolean().optional().default(false),
});
