import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import './database/connection';
import errorHandler from './errors/handler';
import userPublicRoutes from './routes/user.public.routes';
import userAuthRoutes from './routes/user.auth.routes';

require('dotenv/config');

const app = express();

const corsOptions = {
    origin: process.env.APP_URL,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    exposedHeaders: 'X-Total-Pages',
}

app.use(cors(corsOptions));

app.use(express.json());

app.use(userPublicRoutes);
app.use(userAuthRoutes);
app.use(errorHandler);

app.listen(process.env.PORT || 3333, () => {
    console.info(`> Server listening on port: ${process.env.PORT || 3333}`);
});