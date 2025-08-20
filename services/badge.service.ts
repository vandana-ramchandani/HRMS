import { title } from "process";
import BadgeModel from "../models/badge.model";

export const createBadge = async (
  orgId: string,
  title: string,
  description: string,
  image: string
) => {
  const newBadge = new BadgeModel({
    orgId,
    title,
    description,
    image
  });
  return await newBadge.save();
};

export const getAllBadges = async () => {
  return await BadgeModel.find().select("title description image ");
};

export const getBadgeById = async (id: string) => {
  return await BadgeModel.findById(id).select("-__v");
};

export const updateBadge = async (id: string, data: any) => {
  return await BadgeModel.findByIdAndUpdate(id, data, { new: true });
};

export const deleteBadge = async (id: string) => {
  return await BadgeModel.findByIdAndDelete(id);
};
