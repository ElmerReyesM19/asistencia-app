const db = require('../config/db');

exports.reporteAsistencia = async (req, res) => {
  const { desde, hasta, colaborador_id } = req.query;

  let query = `
    SELECT a.*, c.nombre AS colaborador_nombre
    FROM asistencias a
    JOIN colaboradores c ON a.colaborador_id = c.id
    WHERE a.fecha BETWEEN $1 AND $2
  `;
  const params = [desde, hasta];
  let i = 3;

  if (colaborador_id) {
    query += ` AND a.colaborador_id = $${i++}`;
    params.push(colaborador_id);
  }

  try {
    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Error en reporte asistencia:', err);
    res.status(500).json({ error: 'Error al obtener reporte' });
  }
};
