import type { ReclamoAsignadoDto } from "./interfaces/reclamo-asignado-dto";
import { useEffect, useState } from "react";
import { reclamosAsignadosEjemplo } from "./data/reclamos-asignados.data";
import { Spinner } from "@/components/ui/spinner";
import ReclamoAsignadaCard from "./components/reclamo-asignado-card";
import { EmptyReclamosAsignados } from "./components/reclamos-asignados-empty";

function ReclamosAsignadosScreen() {
  const [reclamosAsignados, setReclamosAsignados] = useState<
    ReclamoAsignadoDto[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getReclamosAsignados();
  }, []);

  const getReclamosAsignados = async () => {
    setLoading(true);
    try {
      // TODO: Descomentar cuando el backend esté listo
      // const data = await obtenerReclamosAsignadosDeEmpleado();
      // setReclamosAsignados(data || []);
      // Simulación con data de ejemplo
      setReclamosAsignados(reclamosAsignadosEjemplo);
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
