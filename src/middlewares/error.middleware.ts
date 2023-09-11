import { HttpException } from '../exceptions/HttpException';
import { NextFunction, Request, Response } from 'express';

const handleDuplicateKeyError = (err: any) => {
  const field = Object.keys(err.keyValue);
  return `${field} already exists.`;
};

const handleValidationError = (err: any) => {
  let errors = Object.values(err.errors).map((el: any) => el.message);
  return errors.join(',');
};

const errorMiddleware = (
  error: HttpException & { code: number },
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (error.name === 'ValidationError') {
      error.code = 400;
      error.message = handleValidationError(error);
    }

    if (error.code && error.code == 11000) {
      error.status = 409;
      error.message = handleDuplicateKeyError(error);
    }

    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';

    console.log(message);
    res.status(status).json({ errors: message.split(','), message });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
