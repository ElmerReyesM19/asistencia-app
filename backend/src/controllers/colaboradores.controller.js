const db = require('../config/db'); 

exports.getColaboradorByQr = async (req, res) => {
  const { qr_codigo } = req.params;

  const cleanedQr = qr_codigo.trim().toUpperCase();
  console.log("QR recibido limpio:", cleanedQr);
  try {
    const result = await db.query(
      'SELECT * FROM colaboradores WHERE TRIM(UPPER(qr_codigo)) = TRIM(UPPER($1))',
      [cleanedQr]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Colaborador no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al buscar colaborador por QR:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
