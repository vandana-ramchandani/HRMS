import { ERROR_MESSAGES } from "../constants/errorMessage";
import aboutKekaModel from "../models/aboutKeka.model";
import TeamMembers from "../models/team.members.model";
import User from "../models/user.model";
import { getPaginationParams } from "../utils/helpers/pagination";

export const getTeamDetailsService = async (limit: number, page: number) => {
  const { skip, limit: pageSize } = await getPaginationParams(page, limit);

  const totalData = await TeamMembers.countDocuments({ delete_flag: false });
  const totalPages = Math.ceil(totalData / pageSize);

  const teamMembers = await TeamMembers.find({ delete_flag: false })
    .skip(skip)
    .limit(limit)
    .select("name designation image");

  return {
    teamMembers,
    totalPages,
  };
};

export const getTeamMemberDetails = async (id: string) => {
  const teamMemberDetails = await TeamMembers.findById(id, {
    name: 1,
    designation: 1,
    image: 1,
  });

  if (!teamMemberDetails) {
    throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
  }
  return teamMemberDetails;
};

export const addTeamMember = async (
  name: string,
  designation: string,
  image: string
) => {
  const newMember = new TeamMembers({
    name,
    designation,
    image,
  });
  await newMember.save();
};

export const editTeamMember = async (
  id: string,
  name: string,
  designation: string,
  image: string | null
) => {
  const updateData: any = { name, designation };
  if (image) updateData.image = image;
  return await TeamMembers.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteMemberService = async (id: string) => {
  const user = await TeamMembers.findById(id);
  if (!user) {
    throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
  }

  await TeamMembers.findByIdAndDelete(id);

  return user;
};

export const getAllAboutKeka = async () => {
  return await aboutKekaModel.find();
};

export const getAboutKekaById = async (id: any) => {
  const data = await aboutKekaModel.findById(id);
  return data;
};

export const updateAboutKekaById = async (id: string, data: any) => {
  return await aboutKekaModel.findByIdAndUpdate(id, data, {
    new: true,
  });
};

export const deleteAboutKekaById = async (id: string) => {
  return await aboutKekaModel.findByIdAndDelete(id);
};
