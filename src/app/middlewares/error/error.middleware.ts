import { Request, Response, NextFunction } from "express";
import APIError from "../../utils/apiError";
import customLogger from "../../utils/logger";

// Global Error handeler middleware
export default (
  error: APIError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message, statusCode } = error;
  res.locals.message = message;
  customLogger.error(
    `${req.protocol} | ${req.method}| ${statusCode} | body :  ${JSON.stringify(
      req.body
    )} |${req.originalUrl} |${message}`
  );
  customLogger.error(message, statusCode);
  res.status(500).json({
    message,
  });
};
