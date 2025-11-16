import React, { useEffect, useState } from "react";
import TablaUsuarios from "../components/UI/TablaUsuarios";
import FormularioUsuario from "../components/UI/FormularioUsuario";
import Button from "../components/UI/Button";
import api from "../services/api";

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoFormulario, setModoFormulario] = useState("crear"); 
  const [usuarioEditar, setUsuarioEditar] = useState(null);

  const obtenerUsuarios = async () => {
    try {
      const { data } = await api.get("/admin/usuarios");
      setUsuarios(data);
    } catch (err) {
      console.error("Error al obtener usuarios", err);
    }
  };

  const eliminarUsuario = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;
    try {
      await api.delete(`/admin/usuarios/${id}`);
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Error al eliminar usuario", err);
    }
  };

  const crearUsuario = async (usuario) => {
    try {
      await api.post("/admin/usuarios", usuario);
      alert("Usuario creado correctamente");
      setMostrarFormulario(false);
      obtenerUsuarios();
    } catch (err) {
      console.error("Error al crear usuario", err);
    }
  };

  const editarUsuario = async (usuario) => {
    try {
      await api.put(`/admin/usuarios/${usuario.id}`, usuario);
      alert("Usuario actualizado correctamente");
      setMostrarFormulario(false);
      obtenerUsuarios();
    } catch (err) {
      console.error("Error al actualizar usuario", err);
    }
  };

  const handleGuardar = (usuario) => {
    if (modoFormulario === "crear") {
      crearUsuario(usuario);
    } else {
      editarUsuario(usuario);
    }
  };

  const handleEditar = (usuario) => {
    setUsuarioEditar(usuario);
    setModoFormulario("editar");
    setMostrarFormulario(true);
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-blue-700">Gestión de Usuarios</h1>

      {!mostrarFormulario && (
        <div className="flex justify-end">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow-md transition-colors"
            onClick={() => {
              setUsuarioEditar(null);
              setModoFormulario("crear");
              setMostrarFormulario(true);
            }}
          >
            Crear nuevo usuario
          </Button>
        </div>
      )}

      {mostrarFormulario ? (
        <FormularioUsuario
          onGuardar={handleGuardar}
          usuario={usuarioEditar}
          modo={modoFormulario}
          onCancelar={() => setMostrarFormulario(false)}
        />
      ) : (
        <TablaUsuarios
          usuarios={usuarios}
          onEliminar={eliminarUsuario}
          onEditar={handleEditar}
        />
      )}
    </div>
  );
}

