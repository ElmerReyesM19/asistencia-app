const express = require("express");
const router = express.Router();
const adminCtrl = require("../controllers/admin.controller");
const { verifyToken, requireRole } = require("../middleware/authMiddleware");

router.use(verifyToken, requireRole("admin"));

router.get("/logs", adminCtrl.obtenerLogs);

router.get('/config', adminCtrl.obtenerConfiguraciones);
router.put('/config/:clave', adminCtrl.actualizarConfiguracion);
router.get('/ciclos', adminCtrl.obtenerCiclos);
router.post("/ciclos", adminCtrl.crearCiclo);
router.put("/ciclos/:id", adminCtrl.actualizarCiclo);
router.patch("/ciclos/:id/cerrar", adminCtrl.cerrarCiclo);
router.delete("/ciclos/:id", adminCtrl.eliminarCiclo);

router.get("/sesiones", adminCtrl.obtenerSesiones);
router.delete("/sesiones/:id", adminCtrl.forzarLogout);

router.get("/usuarios", adminCtrl.listarUsuarios);
router.post("/usuarios", adminCtrl.crearUsuario);
router.put("/usuarios/:id", adminCtrl.actualizarUsuario);
router.delete("/usuarios/:id", adminCtrl.eliminarUsuario);

module.exports = router;