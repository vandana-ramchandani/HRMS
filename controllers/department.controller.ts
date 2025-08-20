import { Request, Response } from "express";
import {
  createDepartmentService,
  getAllDepartmentsService,
  getDepartmentByIdService,
  updateDepartmentService,
  deleteDepartmentService,
  findUsersByNameAndDepartment,
} from "../services/dept.services";
import { SUCCESS_MESSAGES } from "../constants/successmessage";
import { AppError } from "../utils/helpers/ global.error.handler";
import { ERROR_MESSAGES } from "../constants/errorMessage";
import Department from "../models/department.model";
import User from "../models/user.model";

export const createDepartment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { departmentName } = req.body;
    const data = await createDepartmentService(departmentName);

    res.status(201).json({
      status: true,
      message: SUCCESS_MESSAGES.DEPARTMENT_CREATED,
      timestamp: new Date(),
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      timestamp: new Date(),
    });
  }
};

export const getAllDepartments = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await getAllDepartmentsService();

    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.DATA_FOUND,
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      timestamp: new Date(),
    });
  }
};

export const getDepartmentById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await getDepartmentByIdService(id);

    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.DATA_FOUND,
      data,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      timestamp: new Date(),
    });
  }
};

export const updateDepartment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { departmentName } = req.body;

    const updatedDepartment = await updateDepartmentService(id, departmentName);

    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.DEPARTMENT_UPDATED,
      timeStamp: new Date(),
      department: updatedDepartment,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      timestamp: new Date(),
    });
  }
};

export const deleteDepartment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    await deleteDepartmentService(id);

    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.DEPARTMENT_DELETED,
      timeStamp: new Date(),
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      timestamp: new Date(),
    });
  }
};

export const getUsersByDepartment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { departmentId } = req.params;
    const department = await Department.findById(departmentId).populate(
      "users",
      "name email role empId departmentName"
    );
    if (!department) {
      throw new AppError(ERROR_MESSAGES.DEPARTMENT_NOT_FOUND, 404);
    }

    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.DATA_FOUND,
      departmentName: department.departmentName,
      data: { data: department.users },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      timestamp: new Date(),
    });
  }
};

export const findUserByName = async (req: any, res: any) => {
  try {
    const name = req.query.name as string;
    const department = req.query.department as string;

    if (!name || !department) {
      return res.status(400).json({
        status: false,
        message: ERROR_MESSAGES.SEARCH_USER_IN_DEPT,
      });
    }

    const users = await findUsersByNameAndDepartment(name, department);

    if (users.length === 0) {
      return res.status(404).json({
        status: false,
        message: ERROR_MESSAGES.USERS_NOT_FOUND,
      });
    }

    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.USERS_FOUND,
      data: users.map(user => ({
        name: user.name,
        email: user.email,
        location: "Indore",
        empId: user.empId,
        departmentName: user.departmentName,
      })),
    });

  } catch (error) {
    res.status(500).json({ status: false, message: "Server error", error });
  }
};

