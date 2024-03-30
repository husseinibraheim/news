import winston, { format, transports } from "winston";
import path from "path";
const { combine, timestamp, label, printf } = format;
const CATEGORY = "winston custom format";

const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const customLogger = winston.createLogger({
  level: "info",
  format: combine(label({ label: CATEGORY }), timestamp(), customFormat),
  transports: [
    new transports.File({
      filename: path.join(__dirname, "../../../logs/fileLogs.log"),
    }),
    new transports.File({
      level: "error",
      filename: path.join(__dirname, "../../../logs/error.log"),
    }),
  ],
});

export default customLogger;
