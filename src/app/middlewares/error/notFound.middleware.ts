import { Request, Response, NextFunction } from "express";
import customLogger from "../../utils/logger";
// Not found End Point
export const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  customLogger.error({ message: "End point not found" });
  res.status(404).json({ message: "End point not found" });
};
