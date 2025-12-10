import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import ReclamoAsignadaCard from "./components/reclamo-asignado-card";
import { EmptyReclamosAsignados } from "./components/reclamos-asignados-empty";
import type { ReclamoEnMovimientoDto } from "@/mi-area/interfaces/reclamo-en-movimiento.dto";
import { obtenerReclamosAsignadosDeEmpleado } from "@/services/ReclamosService";

function ReclamosAsignadosScreen() {
  const [reclamosAsignados, setReclamosAsignados] = useState<
    ReclamoEnMovimientoDto[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleFocus = () => {
      getReclamosAsignados();
    };
    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const getReclamosAsignados = async () => {
    setLoading(true);
    try {
      const data = await obtenerReclamosAsignadosDeEmpleado();
      setReclamosAsignados(data || []);
    } catch (error) {
      console.error("Error al obtener los reclamos asignados:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResolver = (reclamoId: string) => {
    console.log("Resolver reclamo:", reclamoId);
  };

  if (loading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="p-6">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Mis reclamos asignados
      </h2>
      <p>
        En esta sección se encuentran todos los reclamos que tienes actualmente
        asignados.
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reclamosAsignados.map((reclamo) => (
          <ReclamoAsignadaCard
            key={reclamo.reclamoId}
            reclamo={reclamo}
            onResolver={handleResolver}
          />
        ))}
      </div>
      {reclamosAsignados.length === 0 && !loading && (
        <div className="flex justify-center items-center min-h-[500px] px-[400px]">
          <EmptyReclamosAsignados />
        </div>
      )}
    </div>
  );
}

export default ReclamosAsignadosScreen;
