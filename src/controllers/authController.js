const { StatusCodes } = require('http-status-codes');
const AuthService = require('../services/authService');
const logger = require('../utils/logger');
const { AUTH } = require('../constants/messages');

exports.register = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    const user = await AuthService.register({ email, password, role });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: AUTH.REGISTER_SUCCESS,
      data: { userId: user._id, email: user.email, role: user.role },
    });
  } catch (err) {
    logger.error('Register controller error for %s: %s', req.body.email, err.message);
    next(err); // centralized error handling
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const token = await AuthService.login({ email, password });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: AUTH.LOGIN_SUCCESS,
      data: { token },
    });
  } catch (err) {
    logger.warn('Login controller error for %s: %s', req.body.email, err.message);
    next(err); // centralized error handling
  }
};
