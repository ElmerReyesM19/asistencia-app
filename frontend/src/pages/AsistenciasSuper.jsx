import React, { useEffect, useState } from "react";
import api from "../services/api";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export default function AsistenciasSuper() {
  const [datos, setDatos] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);
  const [filtros, setFiltros] = useState({
    desde: "",
    hasta: "",
    colaborador_id: ""
  });

  useEffect(() => {
    api.get("/colaboradores").then((res) => setColaboradores(res.data));
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get("/supervisor/reportes/asistencia", {
        params: filtros,
      });
      setDatos(res.data);
    } catch (error) {
      console.error("Error al cargar asistencias:", error);
    }
  };

  const exportarExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(datos);
    XLSX.utils.book_append_sheet(wb, ws, "Asistencias");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "asistencias.xlsx");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Reporte de Asistencias</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <input
          type="date"
          value={filtros.desde}
          onChange={(e) => setFiltros({ ...filtros, desde: e.target.value })}
          className="border px-2 py-1 rounded"
        />
        <input
          type="date"
          value={filtros.hasta}
          onChange={(e) => setFiltros({ ...filtros, hasta: e.target.value })}
          className="border px-2 py-1 rounded"
        />
        <select
          value={filtros.colaborador_id}
          onChange={(e) => setFiltros({ ...filtros, colaborador_id: e.target.value })}
          className="border px-2 py-1 rounded"
        >
          <option value="">Todos los colaboradores</option>
          {colaboradores.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={fetchData}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
        <button
          onClick={exportarExcel}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Exportar Excel
        </button>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Fecha</th>
              <th className="border px-2 py-1">Trabajador</th>
              <th className="border px-2 py-1">Hora de Entrada</th>
              <th className="border px-2 py-1">Hora de Salida</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((asistencia, idx) => (
              <tr key={idx} className="even:bg-gray-50">
                <td className="border px-2 py-1">{asistencia.fecha}</td>
                <td className="border px-2 py-1">{asistencia.colaborador_nombre}</td>
                <td className="border px-2 py-1">{asistencia.hora_entrada}</td>
                <td className="border px-2 py-1">{asistencia.hora_salida || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
