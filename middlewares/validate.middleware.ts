import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
  schema: ObjectSchema
) => {
  const options = {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
  };

  const { error, value } = schema.validate(req.body, options);

  if (error) {
    const details = error.details.map((err) => ({
      status: false,
      message: err.message,
      timestamp: new Date(),
    }));

    return res.status(400).json({
      status: false,
      message: details
        .map((detail) => detail.message.replace(/"/g, ""))
        .join(", "),
      timestamp: new Date(),
    });
  }

  req.body = value;
  next();
};

export default validateRequest;
