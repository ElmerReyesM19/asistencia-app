import React, { useState, useEffect } from "react";

const roles = ["admin", "trabajador", "supervisor"];

export default function FormularioUsuario({ onGuardar, usuario = {}, modo = "crear", onCancelar }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("trabajador");

  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre || "");
      setEmail(usuario.email || "");
      setRol(usuario.rol || "trabajador");
    }
  }, [usuario]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !email.trim()) {
      alert("Nombre y Email son obligatorios.");
      return;
    }

    if (modo === "crear" && !password.trim()) {
      alert("La contraseña es obligatoria para crear un usuario.");
      return;
    }

    onGuardar({
      nombre,
      email,
      password: password.trim() ? password : undefined, // solo enviar si tiene valor
      rol
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Nombre del usuario"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="correo@ejemplo.com"
          required
        />
      </div>

      {modo === "crear" && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Contraseña"
            required
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Rol</label>
        <select
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        >
          {roles.map((r) => (
            <option key={r} value={r}>
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex space-x-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {modo === "crear" ? "Crear" : "Actualizar"}
        </button>
        <button
          type="button"
          onClick={onCancelar}
          className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
