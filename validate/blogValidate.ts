import Joi from 'joi';
import validateRequest from "../middlewares/validate.middleware";


export const validateCreateblogCategory  = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    name: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    image: Joi.string().trim().optional()
  });

  validateRequest(req, res, next, schema);
};
export const validateEditblogCategory  = (req: any, res: any, next: any) => {
    const schema = Joi.object({
        name: Joi.string().trim().required(),
        description: Joi.string().trim().required(),
        image: Joi.string().trim().optional()
    });
    
    validateRequest(req, res, next, schema);
    }

export const validatecreateBlog = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    title: Joi.string().trim().required(),
    content: Joi.string().trim().required(),
    image: Joi.string().trim().optional(),
    category: Joi.string().trim().required(),
  });

  validateRequest(req, res, next, schema);
}