import type { TipoAsignacion } from "@/enums/tipo-asignacion.enum";

export interface ReclamoAsignadoDto {
  reclamoId: string;
  reclamoNroTicket: string;
  reclamoTitulo: string;
  nombreProyecto: string;
  nombreApellidoCliente: string;
  fechaHoraInicioAsignacion: Date;
  tipoAsignacion: TipoAsignacion;
}
