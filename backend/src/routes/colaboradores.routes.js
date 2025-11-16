const express = require('express');
const router = express.Router();
const { getColaboradorByQr } = require('../controllers/colaboradores.controller');

router.get('/qr/:qr_codigo', getColaboradorByQr);

module.exports = router;
