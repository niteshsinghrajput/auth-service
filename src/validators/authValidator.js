// src/validators/validationMiddleware.js
const { body } = require('express-validator');
const { AUTH } = require('../constants/messages');

exports.registerValidator = [
  body('email')
    .isEmail().withMessage(AUTH.INVALID_EMAIL)
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 }).withMessage(AUTH.PASSWORD_MIN_LENGTH)
    .matches(/[A-Z]/).withMessage(AUTH.PASSWORD_UPPERCASE)
    .matches(/[a-z]/).withMessage(AUTH.PASSWORD_LOWERCASE)
    .matches(/\d/).withMessage(AUTH.PASSWORD_NUMBER)
    .trim(),
  body('role')
    .optional()
    .isIn(['student', 'teacher', 'admin']).withMessage(AUTH.INVALID_ROLE),
];

exports.loginValidator = [
  body('email')
    .isEmail().withMessage(AUTH.INVALID_EMAIL)
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage(AUTH.PASSWORD_REQUIRED)
    .trim(),
];
