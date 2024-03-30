import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import APIError from "../../utils/apiError";
import dotenv from "dotenv";
import userModel from "../../models/user.model";
import { Document } from "mongoose";
import { sendResponse } from "../../utils/responseHandler";
import { UserSession } from "../../models/session.model";
dotenv.config();
import { Types } from "mongoose";

//import secrete key from .env
export const SECRET_KEY: Secret = process.env.SECRET_KEY;
// extend from Request to add token type to the req
export interface CustomRequest extends Request {
  sessionId: string | JwtPayload;
  userId: any;
  permissions: any;
}
export const auth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    //receive Token from request header
    const headerToken = req.header("Authorization");
    console.log(headerToken);
    if (!headerToken)
      throw new APIError("Please authenticate", 401);
    const token = headerToken.split(" ")[1];
    //verify received Token
    const decoded = jwt.verify(token, SECRET_KEY);
    if (!decoded) throw new APIError("In-valid Token Signature ", 401);
    const userID = decoded._id;
    const user = await userModel.findById(userID);
    const currentSession = await UserSession.findOne({
      userId: user._id, sessionId: decoded.sessionId, active: true
    });
    console.log(currentSession);
    if (!currentSession) throw new APIError("This Session is not Valid. Please Login again", 401);
    req.sessionId = decoded.sessionId;
    req.userId = user._id;
    next();
  } catch (err) {
    next(new APIError(err.message, err.status));
  }
};
