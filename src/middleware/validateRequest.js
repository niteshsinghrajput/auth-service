const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/AppError');
const { COMMON } = require('../constants/messages');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Transform express-validator errors into simple array
    const formattedErrors = errors.array().map(err => ({
      field: err.param,
      message: err.msg,
    }));

    // Create a structured AppError
    const error = new AppError(COMMON.VALIDATION_FAILED, StatusCodes.BAD_REQUEST, true);
    error.details = formattedErrors;
    return next(error);
  }

  next();
};

module.exports = validateRequest;
