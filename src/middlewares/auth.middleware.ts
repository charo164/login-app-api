import { RequestHandler } from 'express';
import { verifyToken } from '../configs/jwt';
import { HttpException } from '../exceptions/HttpException';
import { getUserById } from '../services/users.services';
import { RequestWithUser } from '../types/api';

export const requireAuth: RequestHandler = async (req: RequestWithUser, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return next(new HttpException(401, 'You are not logged in!'));

    const decoded: any = verifyToken(token);

    const user = await getUserById(decoded.id);

    if (!user) return next(new HttpException(401, 'You are not logged in!'));

    req.user = user;

    return next();
  } catch (error) {
    return next(error);
  }
};
