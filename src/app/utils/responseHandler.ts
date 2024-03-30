import { Request, Response, NextFunction } from "express";
import customLogger from "./logger";

// Response handeler in readable way
export const sendResponse = (
  res: Response,
  message: string,
  data: any,
  statusCode: number,
  token?: string
) => {
  customLogger.log("info", message);
  res.status(statusCode).json({
    message: message,
    data: data,
    token: token,
  });
};
