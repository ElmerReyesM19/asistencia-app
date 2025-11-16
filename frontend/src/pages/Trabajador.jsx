export default function Trabajador() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white text-center px-4">
      <div className="max-w-xl">
        
        <p className="mt-4 text-lg text-gray-600 italic">
          "Comprometidos con la excelencia avícola"
        </p>

        <img
          src="/img/gallina-fondo.png" 
          alt="Gallina de fondo"
          className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none select-none"
        />
      </div>
    </div>
  );
}
