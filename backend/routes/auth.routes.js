const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');
const { registerValidationSchema, loginValidationSchema } = require('../validators/auth.validator');
const validateMiddleware = require('../middlewares/validate.middleware');

router.post('/register', validateMiddleware(registerValidationSchema), register);
router.post('/login', validateMiddleware(loginValidationSchema), login);

module.exports = router;