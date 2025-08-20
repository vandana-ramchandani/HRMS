import { ERROR_MESSAGES } from "../constants/errorMessage";
import JobdetailsModel from "../models/job.details.model";

export const addJobdetailsService = async (data: any) => {
  try {
    const newJobDetails = await JobdetailsModel.create(data);
    return newJobDetails;
  } catch (error) {
    throw new Error(ERROR_MESSAGES.CREATING_JOB_DETAILS_ERROR);
  }
};

export const getJobDetailsService = async (userId: string) => {
  return await JobdetailsModel.findOne({ userId }).populate("userId", "name");
};

export const editJobDetailsService = async (
  userId: string,
  updateData: any
) => {
  return await JobdetailsModel.findOneAndUpdate({ userId }, updateData, {
    new: true,
  });
};

export const deleteJobDetailsService = async (userId: string) => {
  return await JobdetailsModel.findOneAndDelete({ userId });
};
