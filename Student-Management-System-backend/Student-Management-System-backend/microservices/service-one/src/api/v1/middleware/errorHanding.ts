require('dotenv').config();
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import * as Sentry from "@sentry/node";

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
};

const sendErrorDev = (err: Error, res: Response) => {
  // console.error('Error in development environment:', err);
  const statusCode = (err as AppError).statusCode || 500;

  if (err instanceof ZodError) {
    const errorMessages = (err as ZodError).errors.map((validationError) => {
      const fieldName = validationError.path.join('.');
      return `Invalid value for field '${fieldName}'. Please enter a valid '${validationError.message}'`;
    });
    // console.error('Validation error:', errorMessages);
    res.status(422).json({ success: false, message: errorMessages, stack: err.stack });
  } else {
    res.status(statusCode).json({
      success: false,
      message: [err.message],
      stack: err.stack,
    });
  }
};

const sendErrorProd = (err: Error, res: Response) => {
  // console.error('Error in production environment:', err);
  const statusCode = (err as AppError).statusCode || 500;

  if (err instanceof ZodError) {
    const errorMessages = (err as ZodError).errors.map((validationError) => {
      const fieldName = validationError.path.join('.');
      return `Invalid value for field '${fieldName}'. Please enter a valid '${validationError.message}'`;
    });
    // console.error('Validation error:', errorMessages);
    res.status(422).json({ success: false, message: errorMessages });
  } else if ((err as AppError).isOperational) {
    res.status(statusCode).json({
      success: false,
      message: [err.message],
    });
  } else {
    res.status(statusCode).json({
      success: false,
      message: ['Something Went Wrong'],
    });
  }
};

const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {

  Sentry.captureException(err);

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }
  else {
    sendErrorProd(err, res)
  }
};

export default errorMiddleware;