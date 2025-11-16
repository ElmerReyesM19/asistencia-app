const express = require("express");
const router = express.Router();

const { registrarAsistencia } = require("../controllers/asistencia.controller");
const { getColaboradorByQr } = require("../controllers/colaboradores.controller");

// Buscar colaborador por código QR
router.get("/colaboradores/:qr_codigo", getColaboradorByQr);

// Registrar asistencia
router.post("/asistencia", registrarAsistencia);

module.exports = router;
