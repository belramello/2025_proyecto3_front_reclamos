import type { EstadoDto } from "./estado-dto";

export interface HistorialEstado {
  id: string;
  fechaHoraInicio: string;
  fechaHoraFin?: string | null;
  estado: EstadoDto;
  imagenUrl?: string[];
}
