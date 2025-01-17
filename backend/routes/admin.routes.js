const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/admin.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.get('/', authMiddleware, roleMiddleware('Admin'), getAllUsers);

module.exports = router;