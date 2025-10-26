const app = require('./index');
const logger = require('./utils/logger');
const connectDB = require('../config/db');

const PORT = process.env.PORT || 5001;

connectDB()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      logger.info(`🚀 Auth Service running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error('Failed to start server: %s', err.message);
  });