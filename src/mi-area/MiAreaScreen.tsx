import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import type { ReclamoEnMovimientoDto } from "./interfaces/reclamo-en-movimiento.dto";
import { EmptyReclamosPendientes } from "./components/reclamos-pendientes-empty";
import ReclamoPendienteCard from "./components/reclamo-pendiente-card";
import { obtenerReclamosAsignadosAUnArea } from "@/services/ReclamosService";
import { CrearEmpleadoDialog } from "./components/CrearEmpleadoDialog";
import { useAuth } from "@/auth/context/contexto";

// CORREGIDO: Importamos 'Permisos' tal como está declarado en tu archivo
import { Permisos } from "@/enums/permisos.enum"; 

function MiAreaScreen() {
  const [reclamosPendientesAAsignar, setReclamosPendientesAAsginar] = useState<
    ReclamoEnMovimientoDto[]
  >([]);
  const [loading, setLoading] = useState(false);

  // --- LÓGICA DE PERMISOS ---
  const { permisos } = useAuth();
  
  // Verificamos si el usuario tiene permiso para crear empleados.
  // Usamos 'Permisos.CREAR_USUARIOS'
  // Si TS se queja de que CREAR_USUARIOS no existe en Permisos, revisa tu archivo enums/permisos.enum.ts
  const esEncargado = permisos?.includes(Permisos.CREAR_USUARIOS) || permisos?.includes("CREAR_USUARIOS");

  useEffect(() => {
    getReclamosPendientesAAsignar();
    const handleFocus = () => {
      getReclamosPendientesAAsignar();
    };
    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const getReclamosPendientesAAsignar = async () => {
    setLoading(true);
    try {
      const data = await obtenerReclamosAsignadosAUnArea();
      setReclamosPendientesAAsginar(data || []);
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
      {/* --- CABECERA CON BOTÓN A LA DERECHA --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Mis reclamos pendientes de asignar
          </h2>
          <p className="text-muted-foreground">
            En esta sección se encuentran todos los reclamos que se encuentran
            pendientes de asignar en tu área.
          </p>
        </div>

        {/* Solo mostramos el botón si es Encargado */}
        {esEncargado && (
          <CrearEmpleadoDialog />
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reclamosPendientesAAsignar.map((reclamo) => (
          <ReclamoPendienteCard
            key={reclamo.reclamoId}
            reclamo={reclamo}
            onDialogClose={getReclamosPendientesAAsignar}
          />
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