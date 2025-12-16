import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // 🚨 Importamos Link para la navegación
import { Plus } from "lucide-react"; // 🚨 Importamos el icono de más
import { Spinner } from "@/components/ui/spinner";
import ReclamoClienteCard from "./components/reclamo-consultado-card";
import type { ReclamoConsultadoDTO } from "./interfaces/reclamo-consultado-dto";
import { obtenerReclamosCliente } from "@/services/ReclamosService";

function ReclamosPantallaPrincipal() {
  const [reclamosCliente, setReclamosCliente] = useState<ReclamoConsultadoDTO[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarReclamosCliente();

    const handleFocus = () => {
      cargarReclamosCliente();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const cargarReclamosCliente = async () => {
    setLoading(true);
    try {
      const data = await obtenerReclamosCliente();
      setReclamosCliente(data || []);
    } catch (error) {
      console.error("Error al obtener los reclamos del cliente:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-6 relative min-h-screen"> {/* Agregamos min-h-screen y relative */}
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Mis reclamos
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
        {reclamosCliente.map((reclamo) => (
          <ReclamoClienteCard key={reclamo.id} reclamo={reclamo} />
        ))}
      </div>

      {reclamosCliente.length === 0 && !loading && (
        <div className="flex justify-center items-center min-h-[300px]">
          <p className="text-gray-500">No tienes reclamos registrados.</p>
        </div>
      )}

      <Link
        to="/crear-reclamo" 
        className="fixed bottom-8 right-8 bg-black text-white p-4 rounded-full shadow-2xl hover:bg-gray-800 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        title="Crear nuevo reclamo"
      >
        <Plus size={20} className="group-active:rotate-90 transition-transform" />
        
        {/* Opcional: Un pequeño texto que aparece al pasar el mouse */}
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 ease-in-out whitespace-nowrap font-medium">
          Nuevo Reclamo
        </span>
      </Link>
    </div>
  );
}

export default ReclamosPantallaPrincipal;