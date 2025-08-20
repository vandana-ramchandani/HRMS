import { Request, Response } from "express";
import Contact from "../models/contact.model";
import { ERROR_MESSAGES } from "../constants/errorMessage";
import { SUCCESS_MESSAGES } from "../constants/successmessage";

export const contactUs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, companyName, email, countryCode, phone, message } = req.body;

    if (!name || !companyName || !email || !countryCode || !phone || !message) {
      res.status(400).json({ message: ERROR_MESSAGES.MISSING_FIELDS });
      return;
    }

    const newContact = new Contact({
      name,
      companyName,
      email,
      countryCode,
      phone,
      message,
    });

    await newContact.save();

    res.status(201).json({
      status: true,
      message: SUCCESS_MESSAGES.CONTACT_SUBMITTED,
      timestamp: new Date(),
      data: newContact,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: ERROR_MESSAGES.CONTACT_NOT_CREATED,
      timestamp: new Date(),
    });
  }
};

export const getContactDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { page = 1, limit = 9 } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);

    const contactDetails = await Contact.aggregate([
      {
        $skip: (pageNumber - 1) * pageSize,
      },
      {
        $limit: pageSize,
      },
    ]);

    const totalContacts = await Contact.countDocuments();
    const totalPages = Math.ceil(totalContacts / pageSize);

    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.CONTACT_FETCHED,
      timeStamp: new Date(),
      data: { data: contactDetails, totalPages },
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: ERROR_MESSAGES.DATA_NOT_FOUND,
      timestamp: new Date(),
    });
  }
};

export const deleteContact = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);

    if (!deletedContact) {
      res.status(400).json({
        status: false,
        message: ERROR_MESSAGES.CONTACT_NOT_FOUND,
        timestamp: new Date(),
      });
      return;
    }
    res.status(200).json({
      status: true,
      message: SUCCESS_MESSAGES.CONTACT_DELETED,
      timestamp: new Date(),
    });
    return;
  } catch (error) {
    res.status(400).json({
      status: false,
      message: ERROR_MESSAGES.CONTACT_NOT_DELETED,
      timestamp: new Date(),
    });
  }
};
