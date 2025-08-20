import { SUCCESS_MESSAGES } from "../constants/successmessage";
import employee from "../models/employeeDetails";
import User from "../models/user.model";

export const findUserById = async (userId: string) => {
  const user = await User.findById(userId)
    .select("name email orgId empId departmentName")
    .lean();

  if (!user) {
    return 0;
  }
  const employeeDetails = await employee
    .findOne({ userId: user._id })
    .select(
      "photo firstName middleName lastName displayName gender dob maritalStatus bloodgroup physicallyHandicapped nationality personalEmail workEmail mobileNo workNo residenceNo skypeId about hobbies professionalSummary"
    )
    .lean();
  return {
    status: true,
    message: SUCCESS_MESSAGES.USER_FOUND,
    timestamp: new Date(),
    data: [
      {
        ...user,
        ...(employeeDetails || {}),
      },
    ],
  };
};

export const updateEmployeeProfile = async (
  userId: string,
  updatedData: any
) => {
  if (updatedData.photo) {
    updatedData.photo = updatedData.photo; 
  }
  const updated = await employee
    .findOneAndUpdate({ userId }, updatedData, { new: true })
    .lean();

  return updated;
};
