const express = require('express');
const router = express.Router();
const { reActivateAccount, deActivateAccount, updateDetails } = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.patch('/reactivate', authMiddleware, reActivateAccount);
router.patch('/deactivate', authMiddleware, deActivateAccount);
router.put('/update', authMiddleware, updateDetails);

module.exports = router;