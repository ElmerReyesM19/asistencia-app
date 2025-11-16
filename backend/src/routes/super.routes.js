const express = require('express');
const router = express.Router();
const asistenciaCtrl = require('../controllers/reporteasistencia.controller');
const { verifyToken, requireRole } = require('../middleware/authMiddleware');
router.get(
  '/reportes/asistencia',
  verifyToken,
  requireRole('supervisor'),
  asistenciaCtrl.reporteAsistencia
);
module.exports = router;
