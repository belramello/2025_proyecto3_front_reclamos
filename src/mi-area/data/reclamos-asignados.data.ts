import { TipoAsignacion } from "@/enums/tipo-asignacion.enum";
import type { ReclamoEnMovimientoDto } from "../interfaces/reclamo-en-movimiento.dto";
import { Estado } from "@/enums/estados.enum";
import { Prioridad } from "@/enums/prioridad.enum";

export const reclamosPendienteAAsignarEjemplo: ReclamoEnMovimientoDto[] = [
  {
    reclamoId: "6935970ecec84c5c3c4bb2cc",
    reclamoNroTicket: "TICKET001",
    reclamoTitulo: "Problema con el sistema de riego",
    nombreProyecto: "Edificio Las Acacias",
    nombreApellidoCliente: "Juan Pérez",
    fechaHoraInicioAsignacion: "2025-12-10T23:00:35.816Z",
    nivelCriticidad: 5,
    prioridad: Prioridad.MEDIO,
    nombreEstado: Estado.PENDIENTE_A_ASIGNAR,
    tipoAsignacion: TipoAsignacion.INICIAL,
  },
  {
    reclamoId: "6935970ecec84c5c3c4bb2cc",
    reclamoNroTicket: "TICKET002",
    reclamoTitulo: "No anda módulo de ventas de clientes",
    nombreProyecto: "Sistema de venta para kiosco",
    nombreApellidoCliente: "Juan Pérez",
    fechaHoraInicioAsignacion: "2025-12-10T23:00:35.816Z",
    nivelCriticidad: 10,
    prioridad: Prioridad.ALTO,
    nombreEstado: Estado.EN_PROCESO,
    tipoAsignacion: TipoAsignacion.DE_AREA_A_AREA,
  },
  {
    reclamoId: "6935970ecec84c5c3c4bb2cc",
    reclamoNroTicket: "TICKET002",
    reclamoTitulo: "No anda módulo de ventas de clientes",
    nombreProyecto: "Sistema de venta para kiosco",
    nombreApellidoCliente: "Juan Pérez",
    fechaHoraInicioAsignacion: "2025-12-10T23:00:35.816Z",
    nivelCriticidad: 1,
    prioridad: Prioridad.BAJO,
    nombreEstado: Estado.EN_PROCESO,
    tipoAsignacion: TipoAsignacion.DE_EMPLEADO_A_AREA,
  },
];
