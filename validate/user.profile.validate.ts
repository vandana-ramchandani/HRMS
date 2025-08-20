import Joi from "joi";
import validateRequest from "../middlewares/validate.middleware";

export const validateAddJobDetails = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    userId: Joi.string().required(), 
    dateOfJoining: Joi.date().required(),
    jobTitlePrimary: Joi.string().trim().required(),
    jobTitleSecondary: Joi.string().trim().required(),
    probationStatus: Joi.boolean().required(),
    probationDate: Joi.string().optional(),
    probationDuration: Joi.string().optional(),
    noticePeriod: Joi.string().trim().required(),
    workerType: Joi.string().valid("Permanent", "Intern").required(),
    timeType: Joi.string().valid("Full Time", "Part Time").required(),
    contractStatus: Joi.string().default("Not Applicable"),
    payBand: Joi.string().default("Not Set"),
    payGrade: Joi.string().default("Not Set"),
    shift: Joi.string().valid("General Shift", "Night Shift").required(),
    weeklyOffPolicy: Joi.string().optional(),
    leavePlan: Joi.string().trim().required(),
    holidayCalendar: Joi.string().trim().required(),
    AttendanceCaptureScheme: Joi.string().default("Head Office"),
    attendancePenalisationPolicy: Joi.string().default("Penalization Policy"),
    shiftWeeklyOffRule: Joi.string().default("Not Set"),
    shiftAllowancePolicy: Joi.string().default("Not Set"),
    Overtime: Joi.string().default("Not Set"),
  });

  validateRequest(req, res, next, schema);
}

export const validateEditJobDetails = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    dateOfJoining: Joi.date().required(),
    jobTitlePrimary: Joi.string().trim().required(),
    jobTitleSecondary: Joi.string().trim().optional(),
    probationStatus: Joi.boolean().required(),
    probationDate: Joi.string().optional(),
    probationDuration: Joi.string().optional(),
    noticePeriod: Joi.string().trim().required(),
    workerType: Joi.string().valid("Permanent", "Intern").required(),
    timeType: Joi.string().valid("Full Time", "Part Time").required(),
    contractStatus: Joi.string().default("Not Applicable").optional(),
    payBand: Joi.string().default("Not Set").optional(),
    payGrade: Joi.string().default("Not Set").optional(),
    shift: Joi.string().valid("General Shift", "Night Shift").required(),
    weeklyOffPolicy: Joi.string().optional(),
    leavePlan: Joi.string().trim().required(),
    holidayCalendar: Joi.string().trim().required(),
  });

  validateRequest(req, res, next, schema);
}

export const validateAssignAssets = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    requestItem: Joi.string().trim().required(),
  });

  validateRequest(req, res, next, schema);
}
export const validateAssetsResponse = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    requestStatus: Joi.string().valid("approved", "rejected").required(),
  });

  validateRequest(req, res, next, schema);
}