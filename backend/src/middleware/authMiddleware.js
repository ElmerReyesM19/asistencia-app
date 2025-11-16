const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'jwt_super_secreto';

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ error: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

exports.requireRole = (rol) => (req, res, next) => {
  if (req.usuario?.rol !== rol) return res.status(403).json({ error: 'No autorizado' });
  next();
};
