import Joi from 'joi';
import validateRequest from "../middlewares/validate.middleware";

export const validateCreateRating = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    userId: Joi.string().trim().required(),
    rating: Joi.number().min(1).max(5).required(),
    platform: Joi.string().valid('G2', 'Capterra').required()
  });

  validateRequest(req, res, next, schema);
}