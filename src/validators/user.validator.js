import { z } from 'zod';

export const createUserSchema = z.object({
    username: z
        .string({ required_error: 'Username is required' })
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username must be at most 20 characters')
        .regex(
            /^[a-zA-Z0-9_-]+$/,
            'Username can only contain letters, numbers, underscores and dashes'
        ),

    name: z
        .string({ required_error: 'Name is required' })
        .min(1, 'Name cannot be empty')
        .max(50, 'Name is too long'),

    email: z
        .string({ required_error: 'Email is required' })
        .email('Invalid email format'),

    password: z
        .string({ required_error: 'Password is required' })
        .min(6, 'Password must be at least 6 characters')
        .max(100, 'Password is too long'),
});
