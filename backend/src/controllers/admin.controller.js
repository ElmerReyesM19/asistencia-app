const db = require("../config/db");
const bcrypt = require("bcryptjs");
const { usuarioCrearSchema, usuarioActualizarSchema } = require("../validations/adminValidation");

//Obtener logs del sistema
exports.obtenerLogs = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT l.*, u.nombre AS usuario 
      FROM logs_sistema l
      LEFT JOIN usuarios u ON u.id = l.usuario_id
      ORDER BY l.fecha DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener logs:", error);
    res.status(500).json({ error: "Error al obtener logs del sistema" });
  }
};

//Ver configuraciones del sistema
exports.obtenerConfiguraciones = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM configuracion_sistema ORDER BY clave");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener configuraciones:", error);
    res.status(500).json({ error: "Error al obtener configuraciones" });
  }
};

//Actualizar configuración por clave
exports.actualizarConfiguracion = async (req, res) => {
  const { clave } = req.params;
  const { valor } = req.body;

  try {
    await db.query(
      "UPDATE configuracion_sistema SET valor = $1 WHERE clave = $2",
      [valor, clave]
    );
    res.json({ mensaje: "Configuración actualizada" });
  } catch (error) {
    console.error("Error al actualizar configuración:", error);
    res.status(500).json({ error: "Error al actualizar configuración" });
  }
};

//Ver sesiones activas
exports.obtenerSesiones = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT s.*, u.nombre AS usuario
      FROM sesiones_activas s
      JOIN usuarios u ON u.id = s.usuario_id
      ORDER BY s.ultima_actividad DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener sesiones:", error);
    res.status(500).json({ error: "Error al obtener sesiones activas" });
  }
};

//Forzar cierre de sesión
exports.forzarLogout = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM sesiones_activas WHERE id = $1", [id]);
    res.json({ mensaje: "Sesión cerrada correctamente" });
  } catch (error) {
    console.error("Error al forzar logout:", error);
    res.status(500).json({ error: "Error al cerrar sesión" });
  }
};

exports.listarUsuarios = async (req, res) => {
  try {
    const result = await db.query("SELECT id, nombre, email, rol FROM usuarios ORDER BY nombre");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al listar usuarios:", error);
    res.status(500).json({ error: "Error al listar usuarios" });
  }
};

exports.crearUsuario = async (req, res) => {
  const { error } = usuarioCrearSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { nombre, email, password, rol } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);
    await db.query(
      `INSERT INTO usuarios (nombre, email, password, rol) VALUES ($1, $2, $3, $4)`,
      [nombre, email, hashed, rol]
    );
    res.status(201).json({ mensaje: "Usuario creado correctamente" });
  } catch (err) {
    console.error("Error al crear usuario:", err);
    res.status(500).json({ error: "Error al crear usuario" });
  }
};
exports.actualizarUsuario = async (req, res) => {
  const { error } = usuarioActualizarSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { id } = req.params;
  const { nombre, email, rol } = req.body;

  try {
    await db.query(
      `UPDATE usuarios SET nombre=$1, email=$2, rol=$3 WHERE id=$4`,
      [nombre, email, rol, id]
    );
    res.json({ mensaje: "Usuario actualizado" });
  } catch (err) {
    console.error("Error al actualizar usuario:", err);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

exports.eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM usuarios WHERE id = $1", [id]);
    res.json({ mensaje: "Usuario eliminado" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};

