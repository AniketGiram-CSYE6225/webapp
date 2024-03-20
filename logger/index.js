import winston from "winston"
const { createLogger, format } = winston;

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
