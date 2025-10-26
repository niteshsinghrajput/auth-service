const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/authController');
const { registerValidator, loginValidator } = require('../validators/authValidator');
const validateRequest = require('../middleware/validateRequest');
const authMiddleware = require('../middleware/authMiddleware'); 

router.post('/register', registerValidator, validateRequest, AuthController.register);
router.post('/login', loginValidator, validateRequest, AuthController.login);
router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({
      message: 'You have accessed a protected route!',
      user: req.user, // info from JWT
    });
  });

module.exports = router;

