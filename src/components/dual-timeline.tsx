interface DualTimelineProps {
  historialEstados: HistorialEstado[];
  historialAsignaciones: HistorialAsignacion[];
}

import { AsignacionesTimelineVertical } from "./asignacion-timeline";
import { EstadosTimelineHorizontal } from "./estado-timeline";
import type { HistorialEstado } from "@/interfaces/historial-estado.dto";
import type { HistorialAsignacion } from "@/interfaces/historial-asignacion.dto";

export default function DualTimeline({
  historialEstados,
  historialAsignaciones,
}: DualTimelineProps) {
  return (
    <div className="space-y-12 p-6">
      <EstadosTimelineHorizontal historialEstados={historialEstados} />
      <AsignacionesTimelineVertical
        historialAsignaciones={historialAsignaciones}
      />
    </div>
  );
}
