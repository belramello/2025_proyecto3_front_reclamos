import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { ErrorAlert } from "@/components/error-alert";
import { Spinner } from "@/components/ui/spinner";
import ReclamoTimeline from "@/components/dual-timeline";
import type { HistorialAsignacion } from "@/interfaces/historial-asignacion.dto";
import type { HistorialEstado } from "@/interfaces/historial-estado.dto";
import { obtenerHistorialReclamo } from "@/services/ReclamosService";
import TipoPrioridadBadge from "@/components/prioridad-badge";

interface ReclamoDetalleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reclamoId: string;
  reclamoNroTicket: string;
  reclamoTitulo: string;
}

const ReclamoDetalleDialog = ({
  open,
  onOpenChange,
  reclamoId,
  reclamoNroTicket,
  reclamoTitulo,
}: ReclamoDetalleDialogProps) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [reclamoDetalle, setReclamoDetalle] = useState<any>(null);
  const [historialAsignaciones, setHistorialAsignaciones] = useState<
    HistorialAsignacion[]
  >([]);
  const [historialEstados, setHistorialEstados] = useState<HistorialEstado[]>(
    []
  );

  useEffect(() => {
    if (open) {
      cargarReclamo();
    }
  }, [open, reclamoId]);

  const cargarReclamo = async () => {
    setLoading(true);
    setError(null);
    try {
      const { historialAsignaciones, historialEstados, ...detalles } =
        await obtenerHistorialReclamo(reclamoId);
      setReclamoDetalle(detalles);
      setHistorialAsignaciones(historialAsignaciones);
      setHistorialEstados(historialEstados);
    } catch (error: any) {
      setError(error.message || "Error al cargar el reclamo");
      console.error("Error al cargar el reclamo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Reclamo N° {reclamoNroTicket} - {reclamoTitulo}
          </DialogTitle>
          {reclamoDetalle && (
            <>
              <DialogDescription>
                Descripcion: {reclamoDetalle.descripcion || "N/A"}
              </DialogDescription>
              <DialogDescription>
                Proyecto: {reclamoDetalle.proyecto?.nombre || "N/A"}
              </DialogDescription>
              <DialogDescription>
                Cliente: {reclamoDetalle.cliente?.nombre || "N/A"}
              </DialogDescription>
              <DialogDescription>
                Prioridad:{" "}
                <TipoPrioridadBadge tipoPrioridad={reclamoDetalle.prioridad} />
              </DialogDescription>
              <DialogDescription>
                Nivel de Criticidad: {reclamoDetalle.nivelCriticidad}
              </DialogDescription>
              <ReclamoTimeline
                historialAsignaciones={historialAsignaciones}
                historialEstados={historialEstados}
              />
            </>
          )}
        </DialogHeader>
        {loading && (
          <div className="flex justify-center items-center min-h-[200px]">
            <Spinner />
          </div>
        )}
        {error && (
          <ErrorAlert
            title="Error al obtener información del reclamo"
            description={error}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReclamoDetalleDialog;
