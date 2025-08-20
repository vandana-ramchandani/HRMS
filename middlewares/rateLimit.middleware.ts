import rateLimit from 'express-rate-limit';
import { VALIDATION } from '../constants/validationMessage';

export const resetPasswordLimit = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 5,
  message: {
    status: false,
    message: VALIDATION.RATE_LIMIT_EXCEEDED,
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const forgetPasswordLimit = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 5,
  message: {
    status: false,
    message: VALIDATION.RATE_LIMIT_EXCEEDED,
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const loginLimit = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 5,
  message: {
    status: false,
    message: VALIDATION.RATE_LIMIT_EXCEEDED,
  },
  standardHeaders: true,
  legacyHeaders: false,
});