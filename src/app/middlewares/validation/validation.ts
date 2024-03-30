import Joi from "joi";

// implement user Interface
interface Iuser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles?: [string];
}

//implement userSchema for Joi validation
const userSchema = Joi.object<Iuser>({
  firstName: Joi.string().min(3).max(15).required(),
  lastName: Joi.string().min(3).max(15).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required()
});
// Export to validate just to path req.body data to validateUser in Controller
export const validateUser = (data: Iuser) => {
  return userSchema.validate(data);
};
