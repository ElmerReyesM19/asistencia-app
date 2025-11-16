import React from "react";

export default function TablaReporte({ columnas, datos }) {
  return (
    <div className="overflow-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {columnas.map((col) => (
              <th key={col.key} className="border px-4 py-2">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datos.map((fila, index) => (
            <tr key={index}>
              {columnas.map((col) => (
                <td key={col.key} className="border px-4 py-2">
                  {fila[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
