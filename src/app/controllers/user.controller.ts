import { Request, Response, NextFunction } from "express";
import userModel from "../models/user.model";
import { sendResponse } from "../utils/responseHandler";
import APIError from "../utils/apiError";
import UserServices from "../services/servicesFactory.services";
import bcrypt from "bcryptjs";
import { CustomRequest } from "../middlewares/authorization/jwt.utils";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { UserSession } from "../models/session.model";
import { v4 as uuidv4 } from 'uuid';

const userServices = new UserServices(userModel);
const SECRET_KEY = process.env.SECRET_KEY;

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const createUser = new userModel(req.body);
    const user = await userServices.create(createUser);
    sendResponse(res, "User created successfully", user, 200);
  } catch (err) {
    next(new APIError(err.message, err.status));
  }
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userServices.getAll();
    sendResponse(res, "User retrieved successfully", users, 200);
  } catch (err) {
    next(new APIError(err.message, err.status));
  }
};


export const updateUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const decoded = req.userId
    if (id !== decoded)
      throw new APIError("can't change other users data", 409);
    const updatedUser = await userServices.update(id, data);
    sendResponse(res, "User updated successfully", updatedUser, 200);
  } catch (err) {
    next(new APIError(err.message, err.status));
  }
};


export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) throw new APIError("invalid Email or Password", 404);
    const passMatched = await bcrypt.compare(password, user.password);
    if (!passMatched) throw new APIError("invalid Email or Password", 404);
    const sessionId = uuidv4();
    const token = jwt.sign(
      { _id: user._id, name: user.firstName, email: user.email, sessionId: sessionId },
      SECRET_KEY,
      {
        expiresIn: "1 day",
      }
    );
    console.log(sessionId, token)
    const newUserSession = new UserSession({
      userId: user._id,
      sessionId: sessionId,
    });
    await newUserSession.save();
    return sendResponse(
      res,
      `Welcome ${user.firstName}, you logged in successfully`,
      user._id,
      200,
      token
    );
  } catch (err) {
    next(new APIError(err.message, err.status));
  }
};


export async function logout(
  req: CustomRequest,
  res: Response,
  next: NextFunction) {
  const { userId, sessionId } = req
  const session = await UserSession.findOneAndUpdate({ userId, sessionId }, { active: false });
  if (!session) throw new APIError("Failed to log out. Please try again", 404)
  sendResponse(
    res,
    `you logged out successfully`,
    null,
    200
  );
};