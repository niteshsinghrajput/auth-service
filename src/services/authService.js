const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const User = require('../models/userModel');
const AppError = require('../utils/AppError');
const logger = require('../utils/logger');
const { AUTH } = require('../constants/messages');

class AuthService {
  /**
   * Register a new user
   * @param {Object} params
   * @param {string} params.email
   * @param {string} params.password
   * @param {string} params.role
   * @returns {Promise<User>}
   */
  static async register({ email, password, role }) {
    logger.debug('Register attempt for email: %s', email);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn('Registration failed - email already registered: %s', email);
      throw new AppError(AUTH.USER_ALREADY_EXISTS, StatusCodes.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({ email, password: hashedPassword, role });
    await user.save();

    logger.info('User registered successfully: %s', email);
    return user;
  }

  /**
   * Authenticate user and return JWT token
   * @param {Object} params
   * @param {string} params.email
   * @param {string} params.password
   * @returns {Promise<string>}
   */
  static async login({ email, password }) {
    logger.debug('Login attempt for email: %s', email);

    const user = await User.findOne({ email });
    if (!user) {
      logger.warn('Login failed - user not found: %s', email);
      throw new AppError(AUTH.INVALID_CREDENTIALS, StatusCodes.UNAUTHORIZED);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn('Login failed - invalid password: %s', email);
      throw new AppError(AUTH.INVALID_CREDENTIALS, StatusCodes.UNAUTHORIZED);
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    logger.info('User logged in successfully: %s', email);
    return token;
  }
}

module.exports = AuthService;
