import Joi from 'joi';


export const validationSchemas = {
    registerSchema: Joi.object({
        firstName: Joi.string().alphanum().min(3).max(30).required(),
        lastName: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()-_=+]{3,30}$')).required(),
    }),
    subscribeSchema: Joi.object({
        category: Joi.string().required(),
        language: Joi.string().required(),
        country: Joi.string().required(),
    }),

}