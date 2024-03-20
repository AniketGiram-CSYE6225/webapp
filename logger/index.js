import winston from "winston"
const { createLogger, format } = winston;
// import {LoggingWinston} from "@google-cloud/logging-winston";

// const loggingWinston = new LoggingWinston();

export const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ level, message, timestamp }) => {
      return JSON.stringify({
        severity: level.toUpperCase(),
        message,
        timestamp
      });
    })
  ),
  transports: [
    new winston.transports.File({ filename: '/var/log/webapp/nscc-webapp.log' })
  ]
});
// loggingWinston,
