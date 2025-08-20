import Joi, { string } from "joi";
import validateRequest from "../middlewares/validate.middleware";
export const holidayValidation = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    date: Joi.date().required(),
    description: Joi.string().max(500).optional(),
  });
  validateRequest(req, res, next, schema);
};
export const postValidation = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    content: Joi.string().min(3).trim().required(),
  });
  validateRequest(req, res, next, schema);
};
export const addDescriptionValidation = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    description: Joi.string().min(5).max(100).required(),
  });
  validateRequest(req, res, next, schema);
};
export const updateUserProfileValidation = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(50)
      .optional()
      .pattern(/^[A-Za-z\s]+$/)
      .messages({
        "string.pattern.base": "name must only contain letters and spaces.",
        "string.empty": "name is required.",
      }),
    title: Joi.string()
      .min(3)
      .max(50)
      .optional()
      .pattern(/^[A-Za-z\s]+$/)
      .messages({
        "string.pattern.base": "title must only contain letters and spaces.",
        "string.empty": "title is required.",
      }),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
  });
  validateRequest(req, res, next, schema);
};
export const jobCreateValidation = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    title: Joi.string()
      .trim()
      .min(3)
      .max(50)
      .required()
      .pattern(/^[A-Za-z\s]+$/)
      .messages({
        "string.pattern.base": "title must only contain letters and spaces.",
        "string.empty": "title is required.",
      }),
    location: Joi.string().trim().min(2).max(30).required(),
    description: Joi.string()
      .min(5)
      .max(1000)
      .required()
      .pattern(/^[A-Za-z\s]+$/)
      .messages({
        "string.pattern.base":
          "description must only contain letters and spaces.",
        "string.empty": "description is required.",
      }),
    applyLink: Joi.string().uri().label("Apply_Link").allow("").required(),
  });
  validateRequest(req, res, next, schema);
};
export const updateJobValidation = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    title: Joi.string()
      .trim()
      .min(3)
      .max(50)
      .optional()
      .pattern(/^[A-Za-z\s]+$/)
      .messages({
        "string.pattern.base": "title must only contain letters and spaces.",
        "string.empty": "title is required.",
      }),
    location: Joi.string().trim().min(2).max(30).optional(),
    description: Joi.string()
      .min(5)
      .max(1000)
      .optional()
      .pattern(/^[A-Za-z\s]+$/)
      .messages({
        "string.pattern.base":
          "description must only contain letters and spaces.",
        "string.empty": "description is required.",
      }),
    applyLink: Joi.string().uri().label("Apply_Link").optional().allow(""),
  });
  validateRequest(req, res, next, schema);
};
export const aboutKekaValidation = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(5).max(50).required(),
    subtile: Joi.string().trim().min(5).max(100).required(),
    description: Joi.string().trim().min(5).required(),
  });
  validateRequest(req, res, next, schema);
};
export const createProfileValidation = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    photo: Joi.string().trim(),
    userId: Joi.string(),
    firstName: Joi.string()
      .trim()
      .min(2)
      .max(20)
      .pattern(/^[A-Za-z\s]+$/)
      .messages({
        "string.pattern.base":
          "firstName must only contain letters and spaces.",
        "string.empty": "firstName is required.",
      }),
    lastName: Joi.string()
      .trim()
      .min(2)
      .max(20)
      .pattern(/^[A-Za-z\s]+$/)
      .messages({
        "string.pattern.base": "lastName must only contain letters and spaces.",
        "string.empty": "lastName is required.",
      }),
    middleName: Joi.string()
      .trim()
      .min(2)
      .max(20)
      .pattern(/^[A-Za-z\s]+$/)
      .messages({
        "string.pattern.base":
          "middleName must only contain letters and spaces.",
        "string.empty": "middleName is required.",
      }),
    displayName: Joi.string()
      .trim()
      .min(2)
      .max(20)
      .pattern(/^[A-Za-z\s]+$/)
      .messages({
        "string.pattern.base":
          "displayName must only contain letters and spaces.",
        "string.empty": "displayName is required.",
      }),
    gender: Joi.string(),
    DOB: Joi.date(),
    maritalStatus: Joi.string(),
    bloodGrp: Joi.string(),
    physicallyHandicapped: Joi.string(),
    nationality: Joi.string(),
    personalEmail: Joi.string().email().min(5).max(20),
    workEmail: Joi.string().email().min(5).max(20),
    mobileNo: Joi.string().min(10).max(13),
    workNo: Joi.string().min(10).max(13).trim(),
    residenceNo: Joi.string().min(10).max(13).trim(),
    skypeId: Joi.string().trim(),
    about: Joi.string().trim().min(5).max(1000),
    hobbies: Joi.string().trim().min(3).max(100),
    professionalSummary: Joi.string()
      .trim()
      .min(3)
      .max(1000)
      .pattern(/^[A-Za-z\s]+$/),
  });
  // .min(1)
  // .unknown(false);
  validateRequest(req, res, next, schema);
};
