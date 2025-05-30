import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.string().optional().default('3000'),
    SECRET_KEY: z.string().min(1, 'SECRET_KEY is required'),
    EXPIRE_IN: z.string().default('10d'),
    DATABASE_URL: z.string().url(),
    CORS_ORIGIN: z.string(),
});

export const env = envSchema.parse(process.env);
