
import { Html5Qrcode } from "html5-qrcode";
import api from "../services/api";
import Button from "../components/UI/Button";
import { DateTime } from "luxon";

export default function Asistencia() {
  const [mensaje, setMensaje] = useState("");
  const [scannerReady, setScannerReady] = useState(false);
  const [tipo, setTipo] = useState("entrada");

  const [fecha, setFecha] = useState(() =>
    DateTime.now().setZone('America/Guatemala').toISODate()
  );

  const [ultimoQrProcesado, setUltimoQrProcesado] = useState("");
  const [qrDetectado, setQrDetectado] = useState("");
  const qrRegionId = "qr-reader";
  const html5QrCodeRef = useRef(null);

  const esFechaHoy = (fechaStr) => {
    const hoy = DateTime.now().setZone('America/Guatemala').toISODate();
    return fechaStr === hoy;
  };

  useEffect(() => {
    const startScanner = async () => {
      if (!Html5Qrcode.getCameras) return;
      try {
        const cameras = await Html5Qrcode.getCameras();
        if (cameras.length) {
          html5QrCodeRef.current = new Html5Qrcode(qrRegionId);
          await html5QrCodeRef.current.start(
            cameras[0].id,
            { fps: 10, qrbox: { width: 250, height: 250 } },
            handleScanSuccess,
            handleScanError
          );
          setScannerReady(true);
        } else {
          setMensaje("No se encontraron cámaras.");
        }
      } catch (err) {
        console.error("Error al iniciar la cámara:", err);
        setMensaje("No se pudo acceder a la cámara.");
      }
    };

    startScanner();

    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().catch(console.warn);
      }
    };
  }, []);

  const handleScanSuccess = (decodedText) => {
    const qrCode = decodedText.trim().toUpperCase();
    if (qrCode === ultimoQrProcesado) return;
    setUltimoQrProcesado(qrCode);
    setQrDetectado(qrCode);
    console.log("QR capturado:", qrCode);
  };

  const handleScanError = () => {};

  const registrarAsistencia = async () => {
    if (!qrDetectado) {
      setMensaje("⚠ Escanee un código QR primero.");
      return;
    }

    if (!esFechaHoy(fecha)) {
      setMensaje("⚠ Solo puedes registrar asistencia con la fecha de hoy.");
      return;
    }

    console.log("Registrando asistencia para:", qrDetectado);

    try {
      const resColaborador = await api.get(`/colaboradores/qr/${qrDetectado}`);
      const colaboradorId = resColaborador.data.id;

      const fechaHoraExacta = new Date().toISOString(); 

      const res = await api.post("/asistencia", {
        colaborador_id: colaboradorId,
        tipo,
        fecha: fechaHoraExacta
      });

      console.log("Respuesta:", res.data);
      setMensaje(res.data.mensaje);
    } catch (err) {
      console.error("Error al registrar asistencia:", err.response?.data || err.message);
      setMensaje(err.response?.data?.mensaje || "Error al registrar asistencia");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 space-y-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-center text-2xl font-bold text-blue-600 mb-4">
          Registro de Asistencia
        </h1>

        <div className="flex justify-center space-x-4 mb-4">
          <Button
            onClick={() => setTipo("entrada")}
            className={`px-4 py-2 rounded ${tipo === "entrada" ? "bg-green-600" : "bg-blue-600"} text-white`}
          >
            Entrada
          </Button>
          <Button
            onClick={() => setTipo("salida")}
            className={`px-4 py-2 rounded ${tipo === "salida" ? "bg-green-600" : "bg-blue-600"} text-white`}
          >
            Salida
          </Button>
        </div>

        <input
          type="date"
          value={fecha}
          min={DateTime.now().setZone('America/Guatemala').toISODate()}
          max={DateTime.now().setZone('America/Guatemala').toISODate()}
          onChange={(e) => {
            setFecha(e.target.value);
            console.log("Fecha seleccionada:", e.target.value);
          }}
          className="w-full mb-4 px-4 py-2 border rounded-md"
        />

        <div
          id={qrRegionId}
          className="rounded-lg overflow-hidden border-2 border-dashed border-blue-400 w-full h-[300px]"
        ></div>

        {qrDetectado && (
          <div className="text-center font-semibold mt-2">
            QR detectado: <span className="text-black">{qrDetectado}</span>
          </div>
        )}

        <Button
          onClick={registrarAsistencia}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Registrar Asistencia
        </Button>

        {mensaje && (
          <div className={`mt-4 text-center ${
            mensaje.includes("Error") || mensaje.includes("⚠")
              ? "text-red-600"
              : "text-green-600"
          } font-semibold`}>
            {mensaje}
          </div>
        )}
      </div>
    </div>
  );
}
