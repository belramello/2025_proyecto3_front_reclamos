import type { Prioridad } from "@/enums/prioridad.enum";
import type { HistorialAsignacion } from "./historial-asignacion.dto";
import type { HistorialEstado } from "./historial-estado.dto";

export interface HistorialReclamo {
  imagenUrl: string[] | null;
  nroTicket: string;
  titulo: string;
  //tipoReclamo: string;
  prioridad: Prioridad;
  nivelCriticidad: number;
  historialAsignaciones: HistorialAsignacion[];
  historialEstados: HistorialEstado[];
}
