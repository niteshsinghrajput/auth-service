const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/AppError');
const logger = require('../utils/logger');
const { AUTH } = require('../constants/messages');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    logger.info('Auth Header {}',authHeader);

    // 1️⃣ Ensure Authorization header exists
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      logger.warn('Authorization header missing or malformed');
      throw new AppError(AUTH.TOKEN_MISSING, StatusCodes.UNAUTHORIZED);
    }

    // 2️⃣ Extract token
    const token = authHeader.split(' ')[1];
    if (!token) {
      logger.warn('Bearer token missing after prefix');
      throw new AppError(AUTH.TOKEN_INVALID, StatusCodes.UNAUTHORIZED);
    }

    // 3️⃣ Verify JWT
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      logger.error('JWT verification failed: %s', err.message);

      if (err.name === 'TokenExpiredError') {
        throw new AppError(AUTH.TOKEN_EXPIRED, StatusCodes.UNAUTHORIZED);
      } else {
        throw new AppError(AUTH.TOKEN_INVALID, StatusCodes.UNAUTHORIZED);
      }
    }

    // 4️⃣ Attach user info to request
    req.user = decoded;
    logger.debug('Authenticated user: %s', decoded.email);

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;

