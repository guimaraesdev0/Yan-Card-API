const express = require('express');
const router = express.Router();
const cadModel = require('../controllers/cadcode.controller');

router.post('/sendcadsms', cadModel.sendCode);
router.post('/usecode', cadModel.useCode);

module.exports = router;