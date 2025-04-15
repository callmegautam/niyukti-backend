import dotenv from 'dotenv';
import { app } from './app.js';
import { env } from './config/env.js';

dotenv.config({
    path: './.env',
});

app.listen(env.PORT || 3000, () => {
    console.log(`Server is running at port : ${env.PORT}`);
});
