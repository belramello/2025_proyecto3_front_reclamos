import { TipoAsignacion } from "@/enums/tipo-asignacion.enum";
import type { ReclamoAsignadoDto } from "../interfaces/reclamo-asignado-dto";

export const reclamosAsignadosEjemplo: ReclamoAsignadoDto[] = [
  {
    reclamoId: "REC001",
    reclamoNroTicket: "TICKET001",
    reclamoTitulo: "Problema con el sistema de riego",
    nombreProyecto: "Edificio Las Acacias",
    nombreApellidoCliente: "Juan Pérez",
    fechaHoraInicioAsignacion: new Date("2024-12-01T09:30:00"),
    tipoAsignacion: TipoAsignacion.AUTOASIGNACION,
  },
  {
    reclamoId: "REC002",
    reclamoNroTicket: "TICKET002",
    reclamoTitulo: "Filtración en el techo del estacionamiento",
    nombreProyecto: "Torre del Sol",
    nombreApellidoCliente: "María González",
    fechaHoraInicioAsignacion: new Date("2024-12-01T14:15:00"),
    tipoAsignacion: TipoAsignacion.DE_EMPLEADO_A_EMPLEADO,
  },
  {
    reclamoId: "REC001",
    reclamoNroTicket: "TICKET001",
    reclamoTitulo: "Problema con el sistema de riego",
    nombreProyecto: "Edificio Las Acacias",
    nombreApellidoCliente: "Juan Pérez",
    fechaHoraInicioAsignacion: new Date("2024-12-01T09:30:00"),
    tipoAsignacion: TipoAsignacion.DE_AREA_A_EMPLEADO,
  },
  {
    reclamoId: "REC002",
    reclamoNroTicket: "TICKET002",
    reclamoTitulo: "Filtración en el techo del estacionamiento",
    nombreProyecto: "Torre del Sol",
    nombreApellidoCliente: "María González",
    fechaHoraInicioAsignacion: new Date("2024-12-01T14:15:00"),
    tipoAsignacion: TipoAsignacion.AUTOASIGNACION,
  },
  {
    reclamoId: "REC001",
    reclamoNroTicket: "TICKET001",
    reclamoTitulo: "Problema con el sistema de riego",
    nombreProyecto: "Edificio Las Acacias",
    nombreApellidoCliente: "Juan Pérez",
    fechaHoraInicioAsignacion: new Date("2024-12-01T09:30:00"),
    tipoAsignacion: TipoAsignacion.AUTOASIGNACION,
  },
  {
    reclamoId: "REC002",
    reclamoNroTicket: "TICKET002",
    reclamoTitulo: "Filtración en el techo del estacionamiento",
    nombreProyecto: "Torre del Sol",
    nombreApellidoCliente: "María González",
    fechaHoraInicioAsignacion: new Date("2024-12-01T14:15:00"),
    tipoAsignacion: TipoAsignacion.AUTOASIGNACION,
  },
];
