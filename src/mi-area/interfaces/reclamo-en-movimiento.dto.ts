import type { Estado } from "@/enums/estados.enum";
import type { Prioridad } from "@/enums/prioridad.enum";
import type { TipoAsignacion } from "@/enums/tipo-asignacion.enum";

export interface ReclamoEnMovimientoDto {
  reclamoId: string;
  reclamoNroTicket: string;
  reclamoTitulo: string;
  nombreProyecto: string;
  nombreApellidoCliente: string;
  fechaHoraInicioAsignacion: string;
  nivelCriticidad: number;
  prioridad: Prioridad;
  nombreEstado: Estado;
  tipoAsignacion: TipoAsignacion;
}
