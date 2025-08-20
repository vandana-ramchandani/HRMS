import User from "../models/user.model";
import { hashPassword } from "../utils/helpers/encrypt-decrypt";
import { ERROR_MESSAGES } from "../constants/errorMessage";
import { AppError } from "../utils/helpers/ global.error.handler";
import { genrateEmpId, getDeptDetails } from "../utils/helpers/generate.Id";
import cloudinary from "../config/cloudinary.config";
import { SUCCESS_MESSAGES } from "../constants/successmessage";
import Department from "../models/department.model";
import employee from "../models/employeeDetails";

export const fetchById = async (id: string) => {
  try {
    const user = User.findById(id);
    if (!user) {
      throw new Error(ERROR_MESSAGES.NOT_FOUND);
    }
    return user;
  } catch (error) {
    throw new AppError(ERROR_MESSAGES.USER_NOT_FOUND, 404);
  }
};

export const createUserData = async (req: any) => {
  const orgId = req.user?.userId;
  const empId = await genrateEmpId();
  const { firstName, lastName, workEmail, password, departmentName } = req.body;
  const deptDetails = await getDeptDetails(departmentName);
  const existingUser = await User.findOne({ workEmail });
  if (existingUser) {
    return {
      status: false,
      message: ERROR_MESSAGES.USER_ALREADY_EXISTS,
      timestamp: new Date().toISOString(),
    };
  }
  const hashedPassword = await hashPassword(password);

  const user = new User({
    name: `${firstName} ${lastName}`,
    email: workEmail,
    password: hashedPassword,
    role: "employee",
    orgId,
    empId,
    departmentName: deptDetails.departmentName,
    departmentId: deptDetails._id,
    isActive: true,
  });
  await user.save();

  await Department.findByIdAndUpdate(
    deptDetails._id,
    { $push: { users: user._id } },
    { new: true }
  );
  return {
    status: true,
    message: SUCCESS_MESSAGES.USER_CREATED,
    timestamp: new Date().toISOString(),
    data: [
      {
        userid: user._id,
        username: user.name,
        empId,
        workEmail,
        departmentName,
      },
    ],
  };
};

export const updateUserData = async (userId: string, updates: any) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $set: updates },
    { new: true }
  );
  if (!user) {
    throw new AppError(ERROR_MESSAGES.USER_NOT_FOUND, 404);
  }

  return user;
};

export const getOrganizationData = async (id: string) => {
  const organization = await User.findById(id);

  if (!organization) {
    throw new AppError(ERROR_MESSAGES.ORG_NOT_FOUND, 404);
  }

  return organization;
};

export const updateOrganizationData = async (id: string, updates: any) => {
  const organization = await User.findByIdAndUpdate(id, updates, {
    new: true,
  });

  if (!organization) {
    throw new AppError(ERROR_MESSAGES.ORG_NOT_FOUND, 404);
  }

  return organization;
};

export const uploadLogoService = async (orgId: string, filePath: string) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "organization_logos",
    });
    const organization = await User.findByIdAndUpdate(
      orgId,
      { logo: result.secure_url },
      { new: true }
    );

    if (!organization) {
      throw new AppError(ERROR_MESSAGES.ORG_NOT_FOUND, 404);
    }

    return organization;
  } catch (error) {
    throw new AppError(ERROR_MESSAGES.LOGO_UPLOAD_FAILED, 500);
  }
};

export const deleteLogoService = async (orgId: string) => {
  try {
    const organization = await User.findById(orgId);
    if (!organization || !organization.logo) {
      throw new AppError(ERROR_MESSAGES.LOGO_NOT_FOUND, 404);
    }
    const publicId = organization.logo.split("/").pop()?.split(".")[0];
    await cloudinary.uploader.destroy(`organization_logos/${publicId}`);
    organization.logo = undefined;
    await organization.save();
    return organization;
  } catch (error) {
    throw new AppError(ERROR_MESSAGES.LOGO_NOT_DELETE, 500);
  }
};

export const createProfileService = async (req: any) => {
  const orgId = req.user?.orgId;
  const photoUrl = req.file?.path;

  const {
    userId,
    photo,
    firstName,
    middleName,
    lastName,
    displayName,
    gender,
    dob,
    maritalStatus,
    bloodgroup,
    physicallyHandicapped,
    nationality,
    personalEmail,
    workEmail,
    mobileNo,
    workNo,
    residenceNo,
    skypeId,
    about,
    hobbies,
    professionalSummary,
    reportingManager,
  } = req.body;

  if (!userId) {
    return {
      status: false,
      message: "User ID is required.",
      timestamp: new Date().toISOString(),
    };
  }

  const targetUser = await User.findById(userId);
  if (!targetUser) {
    return {
      status: false,
      message: "User not found.",
      timestamp: new Date().toISOString(),
    };
  }
  const existing = await employee.findOne({ userId });
  if (existing) {
    return {
      status: false,
      message: ERROR_MESSAGES.USER_ALREADY_EXISTS,
      timestamp: new Date().toISOString(),
    };
  }

  const employeeDetails = new employee({
    userId,
    photo: photoUrl,
    firstName,
    middleName,
    lastName,
    displayName,
    gender,
    dob,
    maritalStatus,
    bloodgroup,
    physicallyHandicapped,
    nationality,
    personalEmail,
    workEmail,
    mobileNo,
    workNo,
    residenceNo,
    skypeId,
    about,
    hobbies,
    professionalSummary,
    reportingManager,
    orgId,
  });

  await employeeDetails.save();

  return {
    status: true,
    message: SUCCESS_MESSAGES.EMPLOYEE_PROFILE_CREATED,
    timestamp: new Date().toISOString(),
    data: [
      {
        name: `${firstName}`,
        workEmail,
      },
    ],
  };
};
