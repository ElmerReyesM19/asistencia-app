import React from "react";
import Button from "./Button";

export default function TablaUsuarios({ usuarios, onEliminar, onEditar }) {
  return (
    <div className="overflow-x-auto shadow rounded-xl">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-2 py-2 text-left font-semibold text-gray-700">Nombre</th>
            <th className="px-2 py-2 text-left font-semibold text-gray-700">Email</th>
            <th className="px-2 py-2 text-left font-semibold text-gray-700">Rol</th>
            <th className="px-2 py-2 text-center font-semibold text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {usuarios.map((usuario) => (
            <tr key={usuario.id} className="hover:bg-gray-50">
              <td className="px-2 py-2">{usuario.nombre}</td>
              <td className="px-2 py-2">{usuario.email}</td>
              <td className="px-2 py-2 capitalize">{usuario.rol}</td>
              <td className="px-2 py-2 text-center space-x-1">
                <Button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-1 rounded shadow transition-colors"
                  onClick={() => onEditar(usuario)}
                >
                  Editar
                </Button>
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded shadow transition-colors"
                  onClick={() => onEliminar(usuario.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

