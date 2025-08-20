import { error } from "console";
import { Response } from "express";

export class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const handleError = (err: any, res: Response): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message;
  console.log(err);
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};
