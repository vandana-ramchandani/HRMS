import { ERROR_MESSAGES } from "../constants/errorMessage";
import { SUCCESS_MESSAGES } from "../constants/successmessage";
import {
  findUserById,
  updateEmployeeProfile,
} from "../services/userprofile.service";
import { AuthenticatedRequest } from "../utils/helpers/authenticated.request";
import cloudinary from "../config/cloudinary.config";

cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});

export const getUserProfile = async (
  req: AuthenticatedRequest,
  res: any
): Promise<any> => {
  try {
    const userId = req.user.userId;
    const profile = await findUserById(userId);

    if (!profile) {
      return res.status(404).json({
        status: false,
        message: ERROR_MESSAGES.NOT_FOUND,
        timestamp: new Date(),
      });
    }

    res.status(200).json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      timestamp: new Date(),
    });
  }
};

export const updateUserProfile = async (
  req: AuthenticatedRequest,
  res: any
): Promise<any> => {
  try {
    const userId = req.user.userId;
    const updateData = req.body;
    const photoUrl = req.file?.path;

    if (req.file?.path) {
      updateData.photo = req.file.path;
    }

    const updatableFields = [
      "photo",
      "firstName",
      "middleName",
      "lastName",
      "displayName",
      "gender",
      "dob",
      "maritalStatus",
      "bloodgroup",
      "physicallyHandicapped",
      "nationality",
      "personalEmail",
      "workEmail",
      "mobileNo",
      "workNo",
      "residenceNo",
      "skypeId",
      "about",
      "hobbies",
      "professionalSummary",
    ];

    const hasValidField = updatableFields.some((field) => field in updateData);

    if (!hasValidField) {
      return res.status(400).json({
        status: false,
        message: ERROR_MESSAGES.INVALID_FIELDS,
        timestamp: new Date(),
      });
    }
    const updatedProfile = await updateEmployeeProfile(userId, updateData);
    if (!updatedProfile) {
      return res.status(401).json({
        status: false,
        message: ERROR_MESSAGES.UNAUTHORIZED,
        timestamp: new Date(),
      });
    }

    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.USER_UPDATED,
      timestamp: new Date(),
      data: updatedProfile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      timestamp: new Date(),
    });
  }
};
