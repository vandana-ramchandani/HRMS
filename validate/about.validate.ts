import Joi from "joi";

import validateRequest from "../middlewares/validate.middleware";

export const validateCreateTeamMember = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    name: Joi.string().trim().required(),
    designation: Joi.string().trim().required(),
  });

  validateRequest(req, res, next, schema);
};
export const validateEditTeamMember = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    name: Joi.string().trim().required(),
    designation: Joi.string().trim().required(),
  });

  validateRequest(req, res, next, schema);
}