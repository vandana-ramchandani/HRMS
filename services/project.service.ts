import { ERROR_MESSAGES } from "../constants/errorMessage";
import ProjectModel from "../models/project.model";
import User from "../models/user.model";
import { AssignProjectEmail } from "../utils/helpers/mailer";
import { getPaginationParams } from "../utils/helpers/pagination";

export const addProjectService = async (
  orgId: string,
  projectName: string,
  clientName: string,
  billingType: string,
  startDate: string,
  endDate: string,
  projectManager: string
) => {
  const checkProject = await ProjectModel.find({ projectName });
  if (checkProject.length >= 1) {
    throw new Error(ERROR_MESSAGES.PROJECT_EXISTS);
  }
  const newProject = new ProjectModel({
    orgId,
    projectName,
    clientName,
    billingType,
    startDate,
    endDate,
    projectManager,
  });
  const projectmanager = await User.findById(projectManager, "email");
  console.log("Project Manager Email:", projectmanager?.email);
  await AssignProjectEmail(
    projectmanager?.email || "",
    projectName
  )
  return await newProject.save();
};

export const getProjectService = async (
  page: number,
  limit: number,
  orgId: string,
  status: string,
  billingType: string,
  search: string
) => {
  const { skip, limit: pageSize } = await getPaginationParams(page, limit);
  const totalprojects = await ProjectModel.countDocuments({ orgId });
  const totalPages = Math.ceil(totalprojects / pageSize);

  const query: any = { orgId };

  if (status) {
    query.status = status;
  }

  if (billingType) {
    query.billingType = billingType;
  }

  if (search) {
    query.projectName = { $regex: search, $options: "i" };
  }

  const projects = await ProjectModel.find(query)
    .populate("projectManager", "name email")
    .skip(skip)
    .limit(pageSize)
    .select("-__v")
    .sort({ createdAt: -1 });
  if (!projects || projects.length === 0) {
    throw new Error(ERROR_MESSAGES.NO_PROJECTS_FOUND);
  }

  return { projects, totalPages };
};
