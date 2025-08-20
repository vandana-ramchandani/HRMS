import Joi from "joi";
import validateRequest from "../middlewares/validate.middleware";

export const validateCreateLandingCard = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    title: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
  });
  validateRequest(req, res, next, schema);
};
