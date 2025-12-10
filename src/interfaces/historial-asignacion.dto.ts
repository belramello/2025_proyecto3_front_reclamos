import type { AreaDto } from "./area-dto";
import type { EmpleadoDto } from "./empleado.dto";
import type { SubareaDto } from "./subarea.dto";

export interface HistorialAsignacion {
  id: string;
  desdeArea?: AreaDto | null;
  haciaArea?: AreaDto | null;
  desdeSubarea?: SubareaDto | null;
  haciaSubarea?: SubareaDto | null;
  deEmpleado?: EmpleadoDto | null;
  haciaEmpleado?: EmpleadoDto | null;
  tipoAsignacion: string;
  comentario?: string | null;
  fechaAsignacion: string;
  fechaHoraFin?: string | null;
}
