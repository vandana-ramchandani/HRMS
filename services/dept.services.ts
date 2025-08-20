import Department from "../models/department.model";
import { AppError } from "../utils/helpers/ global.error.handler";
import { ERROR_MESSAGES } from "../constants/errorMessage";
import User from "../models/user.model";
import { SUCCESS_MESSAGES } from "../constants/successmessage";

export const createDepartmentService = async (departmentName: string) => {
  const existingDepartment = await Department.findOne({ departmentName });
  if (existingDepartment) {
    throw new AppError(`Department '${departmentName}' already exists`, 400);
  }

  const department = new Department({ departmentName });
  await department.save();
  return department;
};

export const getAllDepartmentsService = async () => {
  const departments = await Department.find().select("-__v");
  return departments;
};

export const getDepartmentByIdService = async (id: string) => {
  const department = await Department.findById(id);
  if (!department) {
    throw new AppError(ERROR_MESSAGES.DEPARTMENT_NOT_FOUND, 404);
  }
  return department;
};

export const updateDepartmentService = async (
  id: string,
  departmentName: string
) => {
  const updatedDepartment = await Department.findByIdAndUpdate(
    id,
    { departmentName },
    { new: true }
  );

  if (!updatedDepartment) {
    throw new AppError(ERROR_MESSAGES.DEPARTMENT_NOT_FOUND, 404);
  }

  return updatedDepartment;
};

export const deleteDepartmentService = async (id: string) => {
  const deletedDepartment = await Department.findByIdAndDelete(id);

  if (!deletedDepartment) {
    throw new AppError(ERROR_MESSAGES.DEPARTMENT_NOT_FOUND, 404);
  }

  return deletedDepartment;
};

export const findUsersByNameAndDepartment = async (name: string, department: string) => {
 return  await User.find({
    name: { $regex: new RegExp(name, "i") },
    departmentName: { $regex: new RegExp(department, "i") }
  }).select('name email empId departmentName');

};

export const ownDept =async(req:any , res:any)=>{
  try {
    const deptname = await User.findById(req.user.userId).select("departmentId departmentName")
    return res.json({status:true,message:SUCCESS_MESSAGES.DOCUMENT_FETCHED,data:deptname})
  } catch (error) {
    res.status(400).json({ status:false,message: ERROR_MESSAGES.DEPARTMENT_NOT_FOUND});
  }
}