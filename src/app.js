import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler.middleware.js';

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));
app.use(cookieParser());

app.use(errorHandler);

export { app };
