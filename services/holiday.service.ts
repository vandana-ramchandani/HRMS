import { Holiday } from "../models/holiday.model";

export const createHoliday = async (
  title: string,
  date: any,
  description: string,
  holidayImage: string
) => {
  const holidayData = await Holiday.create({
    title,
    date,
    description,
    holidayImage
  });

  return holidayData; 
};


export const getAllHolidays = async () => {
  return await Holiday.find().sort({ date: 1 });
};

export const getHolidayById = async (id: string) => {
  return await Holiday.findById(id);
};

export const updateHoliday = async (id: string, data: any) => {
  return await Holiday.findByIdAndUpdate(id, data, { new: true });
};

export const deleteHoliday = async (id: string) => {
  return await Holiday.findByIdAndDelete(id);
};

export const getHolidaysByYear = async (year: number) => {
  return await Holiday.find({
    date: {
      $gte: new Date(`${year}-01-01`),
      $lte: new Date(`${year}-12-31`),
    },
  });
};
