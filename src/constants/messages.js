module.exports = {
    VALIDATION: {
      EMAIL_REQUIRED: 'Valid email is required',
      PASSWORD_REQUIRED: 'Password is required',
      PASSWORD_MIN_LENGTH: 'Password must be at least 8 characters long',
      PASSWORD_UPPERCASE: 'Password must contain at least one uppercase letter',
      PASSWORD_LOWERCASE: 'Password must contain at least one lowercase letter',
      PASSWORD_NUMBER: 'Password must contain at least one number',
      ROLE_INVALID: 'Invalid role. Allowed values: student, teacher, admin',
    },
    AUTH: {
      REGISTER_SUCCESS: 'User registered successfully',
      LOGIN_SUCCESS: 'Login successful',
      INVALID_CREDENTIALS: 'Invalid email or password',
      USER_ALREADY_EXISTS: 'User already exists with this email',
      TOKEN_MISSING: 'Authorization token is missing',
      TOKEN_INVALID: 'Invalid or malformed token',
      TOKEN_EXPIRED: 'Token has expired. Please login again',
    },
    COMMON: {
      VALIDATION_FAILED: 'Validation failed',
      INTERNAL_SERVER_ERROR: 'Something went wrong',
      UNAUTHORIZED: 'Unauthorized access',
    },
  };
  