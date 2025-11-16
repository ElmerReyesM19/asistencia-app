import React, { useState, useEffect } from "react";
import api from "../services/api";
import Button from "../components/UI/Button";

export default function AdminLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [filtradoFecha, setFiltradoFecha] = useState("");

  const logsPorPagina = 10;

  useEffect(() => {
    cargarLogs();
  }, []);

  const cargarLogs = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/admin/logs");
      setLogs(data);
    } catch (error) {
      console.error("Error al cargar logs:", error);
      alert("Error al cargar logs del sistema.");
    } finally {
      setLoading(false);
    }
  };

  const filtrarLogsPorFecha = (logs, fecha) => {
    if (!fecha) return logs;
    return logs.filter((log) =>
      new Date(log.fecha).toLocaleDateString() ===
      new Date(fecha).toLocaleDateString()
    );
  };

  const exportarCSV = () => {
    if (logs.length === 0) {
      alert("No hay logs para exportar.");
      return;
    }

    const filas = [
      ["Fecha/Hora", "Usuario", "Acción", "IP", "Navegador"],
      ...logs.map((log) => [
        new Date(log.fecha).toLocaleString(),
        log.usuario || "Sistema",
        log.accion,
        log.ip || "N/A",
        log.navegador || "N/A"
      ])
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      filas.map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "logs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const logsFiltrados = filtrarLogsPorFecha(logs, filtradoFecha);
  const totalPaginas = Math.ceil(logsFiltrados.length / logsPorPagina);
  const logsPaginaActual = logsFiltrados.slice(
    (pagina - 1) * logsPorPagina,
    pagina * logsPorPagina
  );

  const handlePaginaChange = (nuevaPagina) => {
    setPagina(nuevaPagina);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">
        Logs del Sistema
      </h2>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex items-center gap-2">
          <label className="font-semibold">Filtrar por Fecha:</label>
          <input
            type="date"
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
            value={filtradoFecha}
            onChange={(e) => {
              setFiltradoFecha(e.target.value);
              setPagina(1); // Reiniciar a la página 1 cuando se filtra
            }}
          />
        </div>
        <div className="flex space-x-2">
          <Button onClick={cargarLogs}>
            {loading ? "Cargando..." : "Actualizar Logs"}
          </Button>
          <Button className="bg-green-600 hover:bg-green-700" onClick={exportarCSV}>
            Exportar CSV
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Fecha/Hora
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Usuario
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Acción
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                IP
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Navegador
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {logsPaginaActual.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center text-gray-500">
                  No hay registros disponibles.
                </td>
              </tr>
            ) : (
              logsPaginaActual.map((log) => (
                <tr key={log.id}>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {new Date(log.fecha).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {log.usuario || "Sistema"}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {log.accion}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {log.ip || "N/A"}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {log.navegador || "N/A"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

     
      {totalPaginas > 1 && (
        <div className="mt-4 flex justify-center items-center space-x-2">
          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => handlePaginaChange(num)}
              className={`px-3 py-1 rounded ${
                num === pagina
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
