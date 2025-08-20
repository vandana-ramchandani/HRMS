import User from "../models/user.model";
import { ERROR_MESSAGES } from "../constants/errorMessage";
import { SUCCESS_MESSAGES } from "../constants/successmessage";
import {
  generateToken,
  generateRefreshToken,
  verifyRefreshToken,
  generateResetToken,
  verifyResetToken,
} from "../utils/helpers/jwt";
import {
  hashPassword,
  comparePassword,
} from "../utils/helpers/encrypt-decrypt";
import { AppError } from "../utils/helpers/global.error.handler";
import path from "path";
import ejs from "ejs";
import { sendEmail } from "../utils/helpers/mailer";
import logger from "../utils/helpers/logactivity";

export const registerOrganizationService = async (orgData: any) => {
  const { name, lastName, email, password, companyName, phnNo, noOfEmployees } =
    orgData;
  const existingOrg = await User.findOne({ email });
  if (existingOrg) {
    return {
      status: false,
      message: ERROR_MESSAGES.ORG_ALREADY_EXISTS,
      timestamp: new Date().toISOString(),
    };
  }
  const hashedPassword = await hashPassword(password);
  const user = new User({
    name,
    lastName,
    email,
    password: hashedPassword,
    companyName,
    phnNo,
    noOfEmployees,
    status: "active",
    role: "organisation",
  });
  await user.save();
  const templatePath = path.join(
    __dirname,
    "..",
    "templates",
    "registration.templates.ejs"
  );
  const htmlContent = await ejs.renderFile(templatePath, {
    organizationName: name,
  });
  await sendEmail({
    to: email,
    subject: "Welcome to Our Platform",
    text: `Hello ${name}, your organisation has been registered successfully!`,
    html: htmlContent,
  });
  const token = generateToken({ userId: user._id, role: user.role });
  const refreshToken = generateRefreshToken({ userId: user._id });
  return {
    status: true,
    message: SUCCESS_MESSAGES.ORG_REGISTER_LOGIN,
    timestamp: new Date().toISOString(),
    data: [
      {
        userid: user._id,
        username: user.name,
        companyName: user.companyName,
        token,
        refreshToken,
      },
    ],
  };
};
export const loginUser = async (email: string, password: string) => {
  let user: any = await User.findOne({ email });
  if (!user) {
    return {
      status: false,
      message: ERROR_MESSAGES.INVALID_CREDENTIALS,
      timestamp: new Date().toISOString(),
    };
  }
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return {
      status: false,
      message: ERROR_MESSAGES.INVALID_CREDENTIALS,
      timestamp: new Date().toISOString(),
    };
  }
  const token = generateToken({
    userId: user._id,
    role: user.role,
    orgId: user.orgId || user._id,
    empId: user.empID,
  });
  const refreshToken = generateRefreshToken({ userId: user._id });
  logger.info(SUCCESS_MESSAGES.LOGIN_SUCCESSFUL, {
    email,
    userId: user._id,
    role: user.role,
  });
  if (user.role == "organisation") {
    const companyName = user.companyName;
    return {
      status: true,
      message: SUCCESS_MESSAGES.LOGIN_SUCCESSFUL,
      timestamp: new Date().toISOString(),
      data: [
        {
          userid: user._id,
          companyName: companyName,
          role: user.role,
          token,
          refreshToken,
        },
      ],
    };
  }
  return {
    status: true,
    message: SUCCESS_MESSAGES.LOGIN_SUCCESSFUL,
    timestamp: new Date().toISOString(),
    data: [
      {
        userid: user._id,
        username: user.name,
        role: user.role,
        token,
        refreshToken,
      },
    ],
  };
};
export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded || !decoded.userId) {
      return {
        status: false,
        message: ERROR_MESSAGES.TOKEN_INVALID_OR_EXPIRED,
        timestamp: new Date().toISOString(),
      };
    }
    const newAccessToken = generateToken({
      userId: decoded.userId,
      role: decoded.role,
    });
    return {
      status: true,
      message: SUCCESS_MESSAGES.ACCESS_TOKEN_REFRESHED,
      timestamp: new Date().toISOString(),
      data: [{ token: newAccessToken }],
    };
  } catch (err: any) {
    return {
      status: false,
      message: ERROR_MESSAGES.FAILED_FETCH_REFRESH,
      timestamp: new Date().toISOString(),
    };
  }
};
export const changePasswordService = async (
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<any> => {
  const user = await User.findById(userId);
  if (!user) {
    return {
      status: false,
      message: ERROR_MESSAGES.USER_NOT_FOUND,
      timestamp: new Date().toISOString(),
    };
  }
  if (!user.password) {
    return {
      status: false,
      message: ERROR_MESSAGES.INVALID_CREDENTIALS,
      timestamp: new Date().toISOString(),
    };
  }
  const isMatch = await comparePassword(currentPassword, user.password);
  if (!isMatch) {
    return {
      status: false,
      message: ERROR_MESSAGES.INVALID_CREDENTIALS,
      timestamp: new Date().toISOString(),
    };
  }
  const hashedPassword = await hashPassword(newPassword);
  await User.findByIdAndUpdate(userId, { password: hashedPassword });
  return {
    status: true,
    message: SUCCESS_MESSAGES.PASSWORD_CHANGED,
    timestamp: new Date().toISOString(),
    data: [{ userid: user._id, username: user.name, useremail: user.email }],
  };
};
export const requestResetPasswordService = async (
  email: string
): Promise<object> => {
  const user: any = await User.findOne({ email });
  if (!user)
    return {
      status: false,
      message: ERROR_MESSAGES.USER_NOT_FOUND,
      timestamp: new Date().toISOString(),
    };
  const token = generateResetToken({ userId: user._id });
  const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
  console.log("Reset Link:", resetLink);
  await sendEmail({
    to: email,
    subject: "Reset Your Password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    text: "",
  });
  return {
    status: true,
    message: SUCCESS_MESSAGES.EMAIL_SENT,
    timestamp: new Date().toISOString(),
  };
};
export const resetPasswordService = async (
  token: string,
  newPassword: string
): Promise<object> => {
  const decoded = verifyResetToken(token) as { userId: string };
  if (!decoded?.userId) {
    throw new AppError(ERROR_MESSAGES.TOKEN_INVALID_OR_EXPIRED, 400);
  }
  const user: any = await User.findById(decoded.userId);
  if (!user) {
    return {
      status: false,
      message: ERROR_MESSAGES.USER_NOT_FOUND,
      timestamp: new Date().toISOString(),
    };
  }
  const hashedPassword = await hashPassword(newPassword);
  user.password = hashedPassword;
  await user.save();
  return {
    status: true,
    message: SUCCESS_MESSAGES.PASSWORD_RESET,
    timestamp: new Date().toISOString(),
  };
};
