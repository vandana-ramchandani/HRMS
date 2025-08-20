import { Request, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: any,
  next: NextFunction
) {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
}

export const notFoundHandler = (req: Request, res: any, next: NextFunction) => {
  res.status(404).json({
    status: false,
    message: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString(),
  });
};

module.exports = { errorHandler, notFoundHandler };
