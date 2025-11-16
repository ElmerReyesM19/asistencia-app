import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaSignOutAlt, FaClipboardList, FaSignInAlt, FaBars, FaSync } from "react-icons/fa"; // <-- añadimos FaSync como ícono de ciclos
import { useAuth } from "../../context/AuthContext";

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isAdminRoute = pathname.startsWith("/admin");
  const isPublicRoute = pathname === "/" || pathname === "/login" || pathname === "/inicio";

  const tabs = [
    { label: "Inicio", path: "/inicio", icon: <FaHome /> },
    ...(usuario?.rol === "trabajador"
      ? [
          { label: "Asistencia", path: "/asistencia", icon: <FaClipboardList /> },
        ]
      : usuario?.rol === "supervisor"
      ? [
          { label: "Reporte Asistencia", path: "/supervisor/reportes/asistencia", icon: <FaClipboardList /> },
        ]
      : []),
    {
      label: usuario ? "Cerrar sesión" : "Iniciar sesión",
      path: usuario ? "#" : "/login",
      icon: usuario ? <FaSignOutAlt /> : <FaSignInAlt />,
    },
  ];

  const handleClick = (label) => {
    if (label === "Cerrar sesión") {
      logout();
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      {!isAdminRoute && !isPublicRoute && (
        <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
          <button
            className="text-gray-600 focus:outline-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FaBars className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-blue-600">Avirepro</h1>
        </header>
      )}

      <div className="flex flex-1">
        {/* Sidebar */}
        {!isAdminRoute && !isPublicRoute && (
          <aside
            className={`bg-white shadow-md p-4 space-y-4 w-64 transform ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-200 ease-in-out z-50`}
          >
            <h2 className="text-xl font-bold text-blue-600 mb-4">Menú</h2>
            {tabs.map((tab) => (
              <Link
                key={tab.label}
                to={tab.path}
                onClick={() => {
                  handleClick(tab.label);
                  setSidebarOpen(false);
                }}
                className={`flex items-center space-x-2 p-2 rounded-md transition ${
                  pathname === tab.path
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </Link>
            ))}
          </aside>
        )}

        {/* Main */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
