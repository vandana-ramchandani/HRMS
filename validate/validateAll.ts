import Joi, { required } from "joi";
import validateRequest from "../middlewares/validate.middleware";
import { NextFunction, Request, Response } from "express";

export const validateContactus = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    name: Joi.string()
      .trim()
      .required()
      .max(20)
      .min(1)
      .pattern(/^[A-Za-z\s]+$/)
      .messages({
        "string.pattern.base": "Name must only contain letters and spaces.",
        "string.empty": "Name is required.",
      }),
    companyName: Joi.string()
      .trim()
      .required()
      .max(20)
      .min(1)
      .pattern(/^[A-Za-z\s]+$/)
      .messages({
        "string.pattern.base": "Name must only contain letters and spaces.",
        "string.empty": "Name is required.",
      }),
    email: Joi.string().trim().required().max(200).email().lowercase(),
    countryCode: Joi.string().max(5).min(3).trim().required(),
    phone: Joi.string().trim().required().max(13).min(10),
    message: Joi.string().trim().required().max(500).min(1).messages({
      "string.empty": "Name is required.",
    }),
  });
  validateRequest(req, res, next, schema);
};

export const validateOrganization = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    name: Joi.string()
      .trim()
      .required()
      .max(20)
      .min(3)
      .pattern(/^[A-Za-z\s]+$/)
      .messages({
        "string.pattern.base": "Name must only contain letters and spaces.",
        "string.empty": "Name is required.",
      }),
    lastName: Joi.string()
      .trim()
      .required()
      .max(20)
      .min(3)
      .pattern(/^[A-Za-z\s]+$/)
      .messages({
        "string.pattern.base": "Name must only contain letters and spaces.",
        "string.empty": "Name is required.",
      }),
    email: Joi.string().trim().required().max(40).min(6).email().lowercase(),
    password: Joi.string().trim().required().max(20).min(6),
    role: Joi.string().trim().max(20).min(1),
    isActive: Joi.string(),
    companyName: Joi.string()
      .required()
      .trim()
      .min(1)
      .pattern(/^[A-Za-z\s]+$/)
      .messages({
        "string.pattern.base": "Name must only contain letters and spaces.",
        "string.empty": "Name is required.",
      }),
    orgId: Joi.string(),
    description: Joi.string().trim().max(200).min(1),
    empId: Joi.number().max(20).min(1),
    departmentName: Joi.string().trim().max(10).min(1),
    reportingmanager: Joi.string().max(10).min(1),
    phnNo: Joi.string().min(10).max(13).trim(),
  });
  validateRequest(req, res, next, schema);
};

export const validateEmployee = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .required()
      .trim()
      .min(1)
      .max(20)
      .pattern(/^[A-Za-z\s]+$/)
      .messages({
        "string.pattern.base":
          "firstname must only contain letters and spaces.",
        "string.empty": "firstname is required.",
      }),
    lastName: Joi.string()
      .required()
      .trim()
      .min(1)
      .max(20)
      .pattern(/^[A-Za-z\s]+$/)
      .messages({
        "string.pattern.base": "lastname must only contain letters and spaces.",
        "string.empty": "lastname is required.",
      }),
    workEmail: Joi.string().email().min(6).max(40).required().lowercase(),
    password: Joi.string().trim().required().max(20).min(8),
    departmentName: Joi.required(),
  });
  validateRequest(req, res, next, schema);
};

export const updateEmployee = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    firstName: Joi.string()

      .trim()
      .min(1)
      .max(20)
      .pattern(/^[A-Za-z\s]+$/)
      .messages({
        "string.pattern.base":
          "firstname must only contain letters and spaces.",
        "string.empty": "firstname is required.",
      }),
    lastName: Joi.string()

      .trim()
      .min(1)
      .max(20)
      .pattern(/^[A-Za-z\s]+$/)
      .messages({
        "string.pattern.base": "lastname must only contain letters and spaces.",
        "string.empty": "lastname is required.",
      }),
    workEmail: Joi.string().email().min(6).max(40).lowercase(),
    password: Joi.string().trim().max(20).min(8),
    departmentName: Joi.string(),
  });
  validateRequest(req, res, next, schema);
};

export const validateGlossary = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    term: Joi.string()
      .trim()
      .required()
      .max(20)
      .min(1)
      .pattern(/^[A-Za-z\s]+$/)
      .messages({
        "string.pattern.base": "term must only contain letters and spaces.",
        "string.empty": "term is required.",
      }),
    definition: Joi.string().trim().required().max(1000).min(1).messages({
      "string.empty": "definition is required.",
    }),
  });
  validateRequest(req, res, next, schema);
};

export const validateSuperadmin = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    name: Joi.string().trim().required().max(20).min(1),
    email: Joi.string().trim().required().max(20).min(1).email().lowercase(),
    password: Joi.string().trim().required().max(20).min(8),
    role: Joi.string().trim().max(20).min(1),
    isActive: Joi.string(),
  });
  validateRequest(req, res, next, schema);
};

export const validateAnnouncement = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    title: Joi.string()
      .trim()
      .required()
      .max(100)
      .min(1)
      .pattern(/^[A-Za-z\s]+$/)
      .messages({
        "string.pattern.base": "Title must only contain letters and spaces.",
        "string.empty": "Title is required.",
      }),
    message: Joi.string().trim().required().max(1000).min(3).messages({
      "string.empty": "Message is required.",
    }),
    photo: Joi.string().trim(),
    type: Joi.string().required(),
    status: Joi.string().required(),
  });

  validateRequest(req, res, next, schema);
};
export const validatePraisePost = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    mentions: Joi.string().required(),
    description: Joi.string().trim().required().max(500).min(1),
    badgeId: Joi.string().required(),
  });
  validateRequest(req, res, next, schema);
};
export const validatePDFDocument = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    name: Joi.string().trim().required().min(3).max(50),
    parentName: Joi.string().trim().required().min(3).max(50),
    gender: Joi.string()
      .valid("Male", "Female", "Non-Binary", "Prefer not to say", "Transgender")
      .required(),
    dob: Joi.string().trim().required().max(10),
    address: Joi.string().trim().required().min(5).max(200),
    documentNumber: Joi.string().trim().required().min(3).max(30),
    issuedOn: Joi.string().trim().optional().max(15),
    title: Joi.string().trim().required().min(3).max(100),
  });
  validateRequest(req, res, next, schema);
};

export const validateLeave = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    startDate: Joi.string().trim().required().max(10).min(1),
    endDate: Joi.string().trim().required().max(10).min(1),
    days: Joi.string().trim().required().max(10).min(1),
    reason: Joi.string().trim().required().max(500).min(1),
    leaveType: Joi.string().valid("paid", "unpaid").required(),
  });
  validateRequest(req, res, next, schema);
};
export const validateLeaveResponse = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    status: Joi.string().valid("approved", "rejected").required(),
    rejectReason: Joi.string().trim().max(500).min(1).optional(),
  });
  validateRequest(req, res, next, schema);
}

//project
export const validateCreateProject =(req: Request, res: Response, next: NextFunction)=>{
  const schema= Joi.object({
    projectName: Joi.string()
      .trim()
      .required()
      .max(100)
      .min(1)
      // .pattern(/^[A-Za-z\s]+$/)
      .messages({
        "string.pattern.base": "Project name must only contain letters and spaces.",
        "string.empty": "Project name is required.",
      }),
    clientName: Joi.string()
      .trim()
      .required()
      .max(100)
      .min(1)
      .messages({
        "string.pattern.base": "Client name must only contain letters and spaces.",
        "string.empty": "Client name is required.",
      }),
    billingType: Joi.string().valid("T&M", "Fixed", "Recurring", "Milestone billing").required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().optional(),
    projectManager: Joi.string().required(),
  })
   validateRequest(req, res, next, schema);
}

export const validatePoll = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    title: Joi.string().trim().required().max(40).min(1),
    options: Joi.string().trim().max(30).min(1),
  });
  validateRequest(req, res, next, schema);
};
