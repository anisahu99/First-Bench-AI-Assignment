// user.routes.js
const express = require('express');
const router = express.Router();
const { reActivateAccount, deActivateAccount, updateDetails } = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const { updateValidationSchema } = require('../validators/user.validator');
const validateMiddleware = require('../middlewares/validate.middleware');

router.patch('/reactivate', authMiddleware, roleMiddleware('User'), reActivateAccount);
router.patch('/deactivate', authMiddleware, roleMiddleware('User'), deActivateAccount);
router.put('/', authMiddleware, roleMiddleware('User'), validateMiddleware(updateValidationSchema), updateDetails);

module.exports = router;