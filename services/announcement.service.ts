import Announcement from "../models/announcement.model";
import { ERROR_MESSAGES } from "../constants/errorMessage";
import { AppError } from "../utils/helpers/ global.error.handler";

export const fetchById = async (id: string) => {
  try {
    const announcement = Announcement.findById(id);
    if (!announcement) {
      throw new Error(ERROR_MESSAGES.ANN_NOT_FOUND);
    }
    return announcement;
  } catch (error) {
    throw new AppError(ERROR_MESSAGES.FETCH_ANN_ERROR, 404);
  }
};

export const createAnnouncementService = async (announcementData: any) => {
  const { title, message, author, authorId, photo, type, status } =
    announcementData;
  const announcement = new Announcement({
    title,
    message,
    author,
    authorId,
    photo,
    type,
    status,
  }).save();
  return announcement;
};

export const filterAnnouncementsService = async (query: any) => {
  const { range, type, status, startdate, enddate } = query;
  const match: any = {};

  if (range === "7" || range === "14" || range === "30") {
    const days = parseInt(range as string, 10);
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);
    match.createdAt = { $gte: fromDate };
  } else if (startdate && enddate) {
    const start = new Date(startdate as string);
    const end = new Date(enddate as string);
    end.setHours(23, 59, 59, 999);
    match.createdAt = { $gte: start, $lte: end };
  }

  if (type && type !== "all" && (type === "general" || type === "event")) {
    match.type = type;
  }

  if (status === "active" || status === "closed") {
    match.status = status;
  }

  const pipeline = [{ $match: match }];
  return Announcement.aggregate(pipeline);
};

export const updateAnnouncementService = async (id: any, updateData: any) => {
  const updatedAnnouncement = await Announcement.findByIdAndUpdate(
    id,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedAnnouncement) {
    throw new Error("Announcement not found");
  }
  return updatedAnnouncement;
};
