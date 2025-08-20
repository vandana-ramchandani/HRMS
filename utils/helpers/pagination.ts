import { log } from "console";

export const getPaginationParams = async (
  page: any,
  limit: any
): Promise<{ skip: number; limit: number }> => {
  const pageNum = Number(page);
  const limitNum = Number(limit);
  if(!pageNum){
    throw new Error("Page number is required");
  }
  if(!limitNum){
    throw new Error("Limit is required");
  }
  if (isNaN(pageNum) || pageNum <= 0) {
    throw new Error("Page number must be a positive number");
  }
  if (isNaN(limitNum) || limitNum <= 0) {
    throw new Error("Limit must be a positive number");
  }

  const pageSize = Math.max(1, limitNum || 10);
  const skip = (pageNum - 1) * pageSize;

  return { skip, limit: pageSize };
};
