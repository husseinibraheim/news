import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export function validate(schema: Joi.ObjectSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    req.body = value;
    next();
  };
}

