const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { loginSchema } = require("../validations/authValidation");

exports.login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { email, password } = req.body;

  try {
    const result = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const passwordValida = await bcrypt.compare(password, user.password);
    if (!passwordValida) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: user.id, rol: user.rol, nombre: user.nombre },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token, usuario: { id: user.id, nombre: user.nombre, rol: user.rol } });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

exports.registrar = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO usuarios (nombre, email, password, rol) VALUES ($1, $2, $3, $4)`,
      [nombre, email, hashedPassword, rol]
    );

    res.status(201).json({ mensaje: 'Usuario creado con éxito' });
  } catch (err) {
    console.error('Error en registro:', err);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};
