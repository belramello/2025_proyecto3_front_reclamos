import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import type { ReclamoPendienteAsignarDto } from "./interfaces/reclamo-pendiente-a-asignar.dto";
import ReclamoCard from "@/reclamos-asignados/components/reclamo-asignado-card";
import { EmptyReclamosPendientes } from "./components/reclamos-pendientes-empty";
import { reclamosPendienteAAsignarEjemplo } from "./data/reclamos-asignados.data";
import ReclamoPendienteCard from "./components/reclamo-pendiente-card";

function MiAreaScreen() {
  const [reclamosPendientesAAsignar, setReclamosPendientesAAsginar] = useState<
    ReclamoPendienteAsignarDto[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getReclamosPendientesAAsignar();
  }, []);

  const getReclamosPendientesAAsignar = async () => {
    setLoading(true);
    try {
      // TODO: Descomentar cuando el backend esté listo
      // const data = await obtenerReclamosAsignadosDeEmpleado();
      // setReclamosAsignados(data || []);
      // Simulación con data de ejemplo
      setReclamosPendientesAAsginar(reclamosPendienteAAsignarEjemplo);
    } catch (error) {
      console.error("Error al obtener los reclamos asignados:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="p-6">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Mis reclamos pendientes de asignar
      </h2>
      <p>
        En esta sección se encuentran todos los reclamos que se encuentran
        pendientes de asignar en tu área.
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reclamosPendientesAAsignar.map((reclamo) => (
          <ReclamoPendienteCard key={reclamo.reclamoId} reclamo={reclamo} />
        ))}
      </div>
      {reclamosPendientesAAsignar.length === 0 && !loading && (
        <div className="flex justify-center items-center min-h-[500px] px-[400px]">
          <EmptyReclamosPendientes />
        </div>
      )}
    </div>
  );
}

export default MiAreaScreen;
