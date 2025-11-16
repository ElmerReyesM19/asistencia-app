require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const reporteRoutes = require("./routes/reporte.routes");
app.use("/api", reporteRoutes);

const colaboradoresRoutes = require('./routes/colaboradores.routes');
app.use('/api/colaboradores', colaboradoresRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

const superRoutes = require('./routes/super.routes');
app.use('/api/supervisor', superRoutes);

const adminRoutes = require('./routes/admin.routes');
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
