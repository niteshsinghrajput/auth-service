const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const logger = require('../utils/logger');
const { COMMON } = require('../constants/messages');

const errorMiddleware = (err, req, res, next) => {
  // Default fallback values
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const isOperational = err.isOperational || statusCode < 500;

  // Handle express-validator errors (if present)
  if (err.array && typeof err.array === 'function') {
    const validationErrors = err.array().map(e => ({
      field: e.param,
      message: e.msg,
    }));

    logger.warn(
      `[VALIDATION ERROR] [${req.method}] ${req.originalUrl} | ${JSON.stringify(
        validationErrors
      )}`
    );

    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: COMMON.VALIDATION_FAILED,
      details: validationErrors,
    });
  }

  // Default message
  const message = isOperational
    ? err.message || ReasonPhrases.INTERNAL_SERVER_ERROR
    : COMMON.INTERNAL_SERVER_ERROR;

  // Centralized logging
  const logMessage = `[${req.method}] ${req.originalUrl} | ${statusCode} | ${message}`;
  if (statusCode >= 500) logger.error(`${logMessage} | ${err.stack || err}`);
  else logger.warn(logMessage);

  // JSON response
  const response = {
    success: false,
    message,
    statusCode,
    ...(err.details && { details: err.details }),
  };

  // Only show stack in dev mode
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = errorMiddleware;
