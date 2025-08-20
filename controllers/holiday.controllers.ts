import { NextFunction, Request, Response } from "express";
import * as holidayService from "../services/holiday.service";
import { ERROR_MESSAGES } from "../constants/errorMessage";
import { SUCCESS_MESSAGES } from "../constants/successmessage";
import { timeStamp } from "console";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, date, description } = req.body;
    const holidayImage = req.file?.path ?? "";

    const holiday = await holidayService.createHoliday(
      title,
      date,
      description,
      holidayImage
    );

    res.status(201).json({
      status: true,
      message: SUCCESS_MESSAGES.HOLIDAY_CREATED,
      timeStamp: new Date(),
      data: holiday,
    });
  } catch (err) {
    next(err);
  }
};

export const getAll = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const holidays = await holidayService.getAllHolidays();
    res.json({
      status: true,
      message: SUCCESS_MESSAGES.HOLIDAY_RETRIVED,
      timestamp: new Date(),
      data: holidays,
    });
  } catch (err) {
    next(err);
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const holiday = await holidayService.getHolidayById(req.params.id);
    if (!holiday) {
      res.status(404).json({ status:false,message: ERROR_MESSAGES.HOLIDAY_NOT_FOUND });
      return;
    }
    res.json({
      status: true,
      message: SUCCESS_MESSAGES.HOLIDAY_RETRIVED,
      timestamp: new Date(),
      data: holiday,
    });
  } catch (err) {
    next(err);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updated = await holidayService.updateHoliday(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({status:false, message: ERROR_MESSAGES.NOT_FOUND });
      return;
    }
    res.json({
      status: true,
      message: SUCCESS_MESSAGES.HOLIDAY_UPDATED,
      timestamp: new Date(),
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const deleted = await holidayService.deleteHoliday(req.params.id);
    if (!deleted) {
      res.status(404).json({ status:false,message: ERROR_MESSAGES.NOT_FOUND });
      return;
    }
    res.status(200).json({status:true,message: SUCCESS_MESSAGES.Holiday_Deleted });
  } catch (err) {
    next(err);
  }
};

export const filterByYear = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const year = parseInt(req.params.year);
    if (isNaN(year)) {
      res.status(400).json({ status:false,message: ERROR_MESSAGES.INVALID_INPUT });
      return;
    }

    const holidays = await holidayService.getHolidaysByYear(year);
    res.json({
      status: true,
      message: SUCCESS_MESSAGES.HOLIDAY_RETRIVED,
      timestamp: new Date(),
      data: holidays,
    });
  } catch (err) {
    next(err);
  }
};
