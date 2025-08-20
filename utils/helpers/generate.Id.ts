import { ERROR_MESSAGES } from "../../constants/errorMessage";
import departmentModel from "../../models/department.model";
import User from "../../models/user.model";

export const genrateEmpId = async () => {
  const result = await User.find({ role: "employee" });
  const empId = (await result.length) + 1;
  return empId;
};


export const getDeptDetails = async (departmentName: string) => {
  try {
    const department = await departmentModel.findOne({ departmentName });
    if (!department) {
      throw new Error(ERROR_MESSAGES.DEPARTMENT_NOT_FOUND);
    }
    return department;
  } catch (error) {
    console.error(ERROR_MESSAGES.DELETE_FAILED);
    throw error;
  }
};