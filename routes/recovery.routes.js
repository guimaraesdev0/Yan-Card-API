const express = require('express');
const router = express.Router();
const RecoveryController = require('../controllers/recovery.controller');

router.get('/verifyRecoveryCode', RecoveryController.verifyRecoveryCode);
router.post('/requestRecoverypass', RecoveryController.createRecovery);
router.post('/recoverypass', RecoveryController.changePassword);



module.exports = router;
