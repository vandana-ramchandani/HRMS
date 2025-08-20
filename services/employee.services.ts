import User from "../models/user.model";
import { AppError } from "../utils/helpers/ global.error.handler";
import { ERROR_MESSAGES } from "../constants/errorMessage";
import { SUCCESS_MESSAGES } from "../constants/successmessage";
import employee from "../models/employeeDetails";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});

export const findUsersByRole = async (role: string, orgId: any) => {
  const users = await User.find({ role: "employee", orgId });
  if (!users || users.length === 0) {
    throw new AppError(ERROR_MESSAGES.NOT_FOUND, 404);
  }
  return users;
};

// export const findUserById = async (userId: string) => {
//   const user = await employee.find({ userId: userId });
//   if (!user) {
//     throw new AppError(ERROR_MESSAGES.NOT_FOUND, 404);
//   }
//   return user;
// };
