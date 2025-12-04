import { TipoAsignacion } from "@/enums/tipo-asignacion.enum";
import type { ReclamoPendienteAsignarDto } from "../interfaces/reclamo-pendiente-a-asignar.dto";
import { Estado } from "@/enums/estados.enum";
import { Prioridad } from "@/enums/prioridad.enum";

export const reclamosPendienteAAsignarEjemplo: ReclamoPendienteAsignarDto[] = [
  {
    reclamoId: "REC001",
    reclamoNroTicket: "TICKET001",
    reclamoTitulo: "Problema con el sistema de riego",
    nombreProyecto: "Edificio Las Acacias",
    nombreApellidoCliente: "Juan Pérez",
    fechaHoraInicioAsignacion: new Date("2024-12-01T09:30:00"),
    nivelCriticidad: 5,
    prioridad: Prioridad.MEDIO,
    estado: Estado.PENDIENTE_A_ASIGNAR,
    tipoAsignacion: TipoAsignacion.INICIAL,
  },
  {
    reclamoId: "REC002",
    reclamoNroTicket: "TICKET002",
    reclamoTitulo: "No anda módulo de ventas de clientes",
    nombreProyecto: "Sistema de venta para kiosco",
    nombreApellidoCliente: "Juan Pérez",
    fechaHoraInicioAsignacion: new Date("2024-12-01T09:30:00"),
    nivelCriticidad: 10,
    prioridad: Prioridad.ALTO,
    estado: Estado.EN_PROCESO,
    tipoAsignacion: TipoAsignacion.DE_AREA_A_AREA,
  },
  {
    reclamoId: "REC002",
    reclamoNroTicket: "TICKET002",
    reclamoTitulo: "No anda módulo de ventas de clientes",
    nombreProyecto: "Sistema de venta para kiosco",
    nombreApellidoCliente: "Juan Pérez",
    fechaHoraInicioAsignacion: new Date("2024-12-01T09:30:00"),
    nivelCriticidad: 1,
    prioridad: Prioridad.BAJO,
    estado: Estado.EN_PROCESO,
    tipoAsignacion: TipoAsignacion.DE_EMPLEADO_A_AREA,
  },
];
