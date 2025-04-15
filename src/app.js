import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import { env } from './config/env.js';

const app = express();

// Middlewares
app.use(
    cors({
        origin: env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

// Health check route
app.get('/healthcheck', (_, res) => {
    res.status(200).json({
        success: true,
        message: 'API is running',
        data: null,
    });
});

// Import routes
import userRoutes from './routes/user.route.js';
import { env } from './config/env.js';

// User routes
app.use('/api/v1', userRoutes);

// 404 handler
app.use('*', (_, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        data: null,
    });
});

// Global error handler
app.use(errorHandler);

export { app };
