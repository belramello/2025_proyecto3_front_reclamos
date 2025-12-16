import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import type { ReclamoEnMovimientoDto } from "../mi-area/interfaces/reclamo-en-movimiento.dto";
import { EmptyReclamosPendientes } from "../mi-area/components/reclamos-pendientes-empty";
import ReclamoSubAreaCard from "./components/ReclamoSubAreaCard";
import { obtenerReclamosAsignadosAUnaSubArea } from "@/services/ReclamosService";
import { useAuth } from "@/auth/context/contexto";
import { Permisos } from "@/enums/permisos.enum";

function MiSubAreaScreen() {
  const [reclamos, setReclamos] = useState<ReclamoEnMovimientoDto[]>([]);
  const [loading, setLoading] = useState(false);
  const { permisos } = useAuth();

  // Permiso opcional: Adaptar según los permisos de tu sistema para SubÁreas
  const esResponsableSubArea = permisos?.includes(Permisos.AUTO_ASIGNAR_RECLAMO);

  const getReclamosSubArea = async () => {
    setLoading(true);
    try {
      const data = await obtenerReclamosAsignadosAUnaSubArea();
      setReclamos(data || []);
    } catch (error) {
      console.error("Error al cargar reclamos de subárea:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReclamosSubArea();
    
    // Recargar cuando la ventana recupera el foco
    const handleFocus = () => getReclamosSubArea();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            Reclamos de mi Subárea
          </h2>
          <p className="text-muted-foreground">
            Gestión de tickets asignados específicamente a tu subárea de trabajo.
          </p>
        </div>
      </div>

      {reclamos.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reclamos.map((reclamo) => (
            <ReclamoSubAreaCard
              key={reclamo.reclamoId}
              reclamo={reclamo}
              onDialogClose={getReclamosSubArea}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-[400px]">
          <EmptyReclamosPendientes />
          <p className="mt-4 text-gray-500">No hay reclamos pendientes en esta subárea.</p>
        </div>
      )}
    </div>
  );
}

export default MiSubAreaScreen;