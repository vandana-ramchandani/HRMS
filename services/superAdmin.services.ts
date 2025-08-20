import { hashPassword } from "../utils/helpers/encrypt-decrypt";
import { AppError } from "../utils/helpers/ global.error.handler";
import { ERROR_MESSAGES } from "../constants/errorMessage";
import User from "../models/user.model";

export const fetchAllOrganizations = async (
  pageNumber: number,
  pageSize: number
) => {
  const totalOrganisations = await User.countDocuments({
    role: "organisation",
  });
  const totalPages = Math.ceil(totalOrganisations / pageSize);

  const organisations = await User.find({ role: "organisation" })
    .sort({ createdAt: -1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .select("name email noOfEmployees companyName logo isActive");

  return {
    data: organisations,
    totalPages,
    currentPage: pageNumber,
    pageSize,
  };
};

export const fetchOrganizationById = async (id: string) => {
  const organization = await User.findById(id);
  if (!organization) {
    throw new AppError(ERROR_MESSAGES.ORG_NOT_FOUND, 404);
  }
  return organization;
};

export const createNewOrganization = async (data: any) => {
  const { name, email, secondaryEmail, phone, secondaryPhone, password, role } =
    data;

  const existingOrg = await User.findOne({ email });
  if (existingOrg) {
    throw new AppError(ERROR_MESSAGES.ORG_ALREADY_EXISTS, 400);
  }

  const hashedPassword = await hashPassword(password);

  const organization = new User({
    name,
    email,
    secondaryEmail,
    phone,
    role: "organisation",
    secondaryPhone,
    password: hashedPassword,
  });

  return await organization.save();
};

export const updateOrganizationById = async (id: string, updates: any) => {
  const organization = await User.findByIdAndUpdate(id, updates, { new: true });
  if (!organization) {
    throw new AppError(ERROR_MESSAGES.ORG_NOT_FOUND, 404);
  }
  return organization;
};

export const deleteOrganizationById = async (id: string) => {
  const organization = await User.findByIdAndDelete(id);
  if (!organization) {
    throw new AppError(ERROR_MESSAGES.ORG_NOT_FOUND, 404);
  }
  return organization;
};
