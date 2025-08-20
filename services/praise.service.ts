import PraiseModel from "../models/praise.model";
import { getPaginationParams } from "../utils/helpers/pagination";

export const createPraise = async (
  orgId: string,
  parsedMentions: string[],
  description: string,
  badgeId: string,
  attachments: string[]
) => {
  const data = {
    orgId,
    mentions: parsedMentions,
    description,
    badgeId: badgeId,
    attachments,
  };
  const newPraise = new PraiseModel(data);
  return await newPraise.save();
};


export const getAllPraisesService = async (
  limit: number,
  page: number,
  orgId: string
) => {
  const { skip, limit: pageSize } = await getPaginationParams(page, limit);
  const totalPraises = await PraiseModel.countDocuments();
  const totalPages = Math.ceil(totalPraises / pageSize);
  const praises = await PraiseModel.find({ orgId })
    .populate("mentions", "name")
    .populate("badgeId", "title description")
    .skip(skip)
    .limit(pageSize)
    .select("-__v ")
    .sort({ createdAt: -1 });
  return { praises, totalPages };
};

export const updatePraiseService = async (
  id: string,
  parsedMentions: string[],
  description: string,
  badgeId: string
) => {
  const updateData = {
    mentions:parsedMentions,
    description,
    badgeId,
  };
  const updatedPraise = await PraiseModel.findByIdAndUpdate(
    id,
    updateData,
    { new: true }
  );
  return updatedPraise;
};

export const deletePraiseService = async (id: string) => {
  return await PraiseModel.findByIdAndDelete(id);
};
export const getPraiseByIdService = async (id: string) => {
  return await PraiseModel.findById(id)
    .populate("mentions", "name")
    .populate("badgeId", "title description")
    .select("-__v");
}