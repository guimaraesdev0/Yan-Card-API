const express = require('express');
const router = express.Router();
const CupomModel = require('../controllers/cupom.controller');
const authenticateToken = require('../middleware/Auth');

router.get('/getAll', authenticateToken, CupomModel.getAllCupons);
router.get('/getcupons/:id', authenticateToken, CupomModel.getAllCuponsByUserId)




module.exports = router;
