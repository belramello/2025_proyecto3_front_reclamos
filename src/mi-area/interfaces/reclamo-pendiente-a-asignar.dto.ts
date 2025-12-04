import type { Estado } from "@/enums/estados.enum";
import type { Prioridad } from "@/enums/prioridad.enum";
import type { TipoAsignacion } from "@/enums/tipo-asignacion.enum";

export interface ReclamoPendienteAsignarDto {
  reclamoId: string;
  reclamoNroTicket: string;
  reclamoTitulo: string;
  nombreProyecto: string;
  nombreApellidoCliente: string;
  fechaHoraInicioAsignacion: Date;
  nivelCriticidad: number;
  prioridad: Prioridad;
  estado: Estado;
  tipoAsignacion: TipoAsignacion;
}
