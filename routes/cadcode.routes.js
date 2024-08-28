const express = require('express');
const router = express.Router();
const cadModel = require('../controllers/cadcode.controller');
const authenticateToken = require('../middleware/Auth');



router.post('/sendcadsms', cadModel.sendCode);
router.post('/usecode', authenticateToken, cadModel.useCode);

module.exports = router;
