import { Request, Response, NextFunction } from 'express';
import logger from '../helpers/logactivity'; // Import the logger

export const handleError = (err: any, res: Response) => {
  // Log the error to the database
  logger.error('API Error', {
    message: err.message || 'Unknown error',
    stack: err.stack,
    statusCode: err.status || 500,
    // You can log other useful metadata like the request URL, method, etc.
  });

  // Send the response back to the client
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
};
