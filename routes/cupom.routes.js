const express = require('express');
const router = express.Router();
const CupomModel = require('../controllers/cupom.controller');

router.get('/getAll', CupomModel.getAllCupons);
router.get('/getcupons/:id', CupomModel.getAllCuponsByUserId)




module.exports = router;
