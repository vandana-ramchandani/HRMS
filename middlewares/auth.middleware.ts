import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ERROR_MESSAGES } from "../constants/errorMessage";
import User from "../models/user.model";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error(ERROR_MESSAGES.JWT_NOT_DEFINED);
}

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res
      .status(401)
      .json({ message: ERROR_MESSAGES.TOKEN_MISSING_OR_MALFORMED });
    return;
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "string" || !("userId" in decoded)) {
      throw new Error(ERROR_MESSAGES.TOKEN_INVALID_OR_EXPIRED);
    }

    (req as any).user = decoded;

    const userData = await User.findById(decoded.userId);

    if (!userData) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    req.user = {
      userId: userData._id,
      name: userData.name,
      role: userData.role,
      orgId: userData.orgId,
      email: userData.email,
      isActive: userData.isActive,
    };
    next();
  } catch (err: any) {
    res.status(401).json({
      status: false,
      message: ERROR_MESSAGES.TOKEN_INVALID_OR_EXPIRED,
      timestamp: new Date(),
    });
  }
};
