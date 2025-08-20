import { Request, Response, NextFunction } from "express";
import { ERROR_MESSAGES } from "../constants/errorMessage";

export const isOrganisation = (
  req: any,
  res: Response,
  next: NextFunction
): void => {
  const userRole = req.user?.role;

  if (userRole !== "organisation") {
    res.status(403).json({ message: ERROR_MESSAGES.ACCESS_DENIED });
    return;
  }

  next();
};

export const isSuperAdmin = (
  req: any,
  res: Response,
  next: NextFunction
): void => {
  const userRole = req.user?.role;
  if (userRole !== "superAdmin") {
    res
      .status(403)
      .json({ message: ERROR_MESSAGES.ACCESS_DENIED_NOT_SUPER_ADMIN });
    return;
  }

  next();
};
