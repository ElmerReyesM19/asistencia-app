import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaBars } from "react-icons/fa";

export default function AdminLayout({ children }) {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const links = [
    { label: "Dashboard", path: "/admin" },
    { label: "Usuarios", path: "/admin/usuarios" },
    { label: "Configuración", path: "/admin/config" },
    { label: "Logs", path: "/admin/logs" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">

      <aside
        className={`fixed inset-y-0 left-0 bg-white shadow-md p-4 w-64 space-y-4 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out z-40`}
      >
        <h2 className="text-xl font-bold text-blue-600 mb-4">Menu</h2>
        <nav className="flex flex-col space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => {
                if (window.innerWidth < 768) setSidebarOpen(false);
              }}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex flex-col flex-1">
        <header className="bg-white shadow px-4 py-3 flex items-center justify-between w-full fixed top-0 left-0 z-50">
          <div className="flex items-center space-x-4">
            <button
              className="text-gray-600 focus:outline-none"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FaBars className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-blue-600">Menú</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-600">
              Bienvenido, {usuario?.nombre}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:underline"
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        <main className="pt-16 flex-1 ml-0 md:ml-64 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}