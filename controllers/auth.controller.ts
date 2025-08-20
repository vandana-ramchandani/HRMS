import { Request, Response, NextFunction } from "express";
import { loginUser } from "../services/auth.service";
import { handleError } from "../utils/helpers/ global.error.handler";
import { setRefreshTokenCookie } from "../utils/helpers/set.cookie";
import {
  refreshAccessToken,
  registerOrganizationService,
  changePasswordService,
  requestResetPasswordService,
  resetPasswordService,
} from "../services/auth.service";
import { ERROR_MESSAGES } from "../constants/errorMessage";
import { SUCCESS_MESSAGES } from "../constants/successmessage";
import User from "../models/user.model";
import { AuthenticatedRequest } from "../utils/helpers/authenticated.request";

export const registerOrganization = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      lastName,
      email,
      password,
      companyName,
      phnNo,
      noOfEmployees,
    } = req.body;
    const response = await registerOrganizationService({
      name,
      lastName,
      email,
      password,
      companyName,
      phnNo,
      noOfEmployees,
    });
    const refreshToken =
      (response.data?.[0] as { refreshToken?: string })?.refreshToken ?? null;
    setRefreshTokenCookie(res, refreshToken);
    res.status(201).json(response);
  } catch (err: any) {
    res.status(400).json({
      status: false,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      timestamp: new Date().toISOString(),
    });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    const response = await loginUser(email, password);
    const refreshToken = ((response.data ?? [])[0] as { refreshToken?: string })
      ?.refreshToken;
    setRefreshTokenCookie(res, refreshToken);
    if (!response.status) {
      return res.status(400).json(response);
    }
    res.status(200).json(response);
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      timestamp: new Date().toISOString(),
    });
  }
};

export const refreshToken = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) {
      return res.status(401).json({
        status: false,
        message: ERROR_MESSAGES.TOKEN_MISSING_OR_MALFORMED,
        timestamp: new Date().toISOString(),
      });
    }
    const response = await refreshAccessToken(token);
    if (!response.status) {
      return res.status(403).json(response);
    }
    res.status(200).json(response);
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      timestamp: new Date().toISOString(),
    });
  }
};

export const changePassword = async (
  req: AuthenticatedRequest,
  res: any
): Promise<any> => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      res.status(400).json({
        status: false,
        message: ERROR_MESSAGES.BOTH_PASSWORDS_REQUIRED,
        timestamp: new Date().toISOString(),
      });
    }
    const result = (await changePasswordService(
      req.user?.userId,
      currentPassword,
      newPassword
    )) as { status: boolean; message?: string };
    if (!result.status) {
      return res.status(400).json(result);
    }
    res.status(200).json(result);
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      timestamp: new Date().toISOString(),
    });
  }
};

export const requestResetPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email } = req.body;
    const message = (await requestResetPasswordService(email)) as {
      status: boolean;
      message?: string;
    };
    if (!message.status) {
      return res.status(400).json(message);
    }
    res.status(200).json(message);
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      timestamp: new Date().toISOString(),
    });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { token, newPassword } = req.body;
    const message = await resetPasswordService(token, newPassword);
    res.status(200).json(message);
  } catch (err) {
    res.status(400).json({
      status: false,
      message: ERROR_MESSAGES.REQUEST_FAILED,
      timestamp: new Date(),
    });
  }
};

export const checkmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email } = req.query;
    const result = await User.findOne({ email });
    if (result) {
      res.status(200).json({
        status: true,
        message: SUCCESS_MESSAGES.USER_FOUND_LOGIN,
        timestamp: new Date(),
      });
    } else {
      res.status(400).json({
        status: false,
        message: ERROR_MESSAGES.NOT_FOUND,
        timestamp: new Date(),
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      timestamp: new Date(),
    });
  }
};
