import React from "react";
import { Link } from "react-router-dom";

export default function Inicio() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-blue-50 relative overflow-hidden">
      <header className="bg-white bg-opacity-80 border-b border-gray-300 flex justify-between items-center px-6 py-3 shadow-sm">
        <h1 className="text-xl font-bold text-blue-600 tracking-wide">Avirepro</h1>
        <Link
          to="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition"
        >
          Iniciar sesión
        </Link>
      </header>

      <img 
        src="/img/gallina-fondo.png" 
        alt="Gallina de fondo"
        className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none select-none"
      />

      <div className="relative z-10 flex flex-col justify-center items-center text-center p-6 mt-20">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-600 mb-4">Bienvenido</h1>
        <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-2">GRANJA OLIMPOS</h2>
        <p className="italic text-lg md:text-xl text-gray-700">
          "Comprometidos con la excelencia avícola"
        </p>
      </div>
    </div>
  );
}