import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import { connect } from './configs/db';
import { HttpException } from './exceptions/HttpException';
import errorMiddleware from './middlewares/error.middleware';
import AuthRouter from './routes/auth.routes';
import UsersRouter from './routes/users.routes';

config();
connect(process.env.MONGODB_URI || '');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const PORT = Number(process.env.PORT) || 3333;

app.use('/api/users', UsersRouter);
app.use('/api/auth', AuthRouter);

app.use((req, res, next) => next(new HttpException(404, 'Not Found')));
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
