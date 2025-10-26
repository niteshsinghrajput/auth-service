const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const AppError = require('./utils/AppError');
const { StatusCodes } = require('http-status-codes');
const logger = require('./utils/logger');

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

// Health check route
app.get('/health', (req, res) => {
  logger.info('Health endpoint hit');
  res.status(StatusCodes.OK).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Auth Service',
  });
});

// Auth routes
app.use('/api/auth', authRoutes);

// Handle unknown routes
app.use((req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, StatusCodes.NOT_FOUND));
});

// Centralized error handler
app.use(errorMiddleware);

// ✅ Export the app without starting server
module.exports = app;