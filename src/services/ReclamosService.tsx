import type { ReclamoEnMovimientoDto } from "@/mi-area/interfaces/reclamo-en-movimiento.dto";
import api from "../utils/api";
import type { HistorialReclamo } from "@/interfaces/respuesta-historial-reclamo.dto";
import type { AreaDto } from "@/interfaces/area-dto";
import type { ReclamoAsignadoDto } from "@/reclamos-asignados/interfaces/reclamo-asignado-dto";

export const obtenerReclamosAsignadosDeEmpleado = async (): Promise<
  ReclamoEnMovimientoDto[]
> => {
  try {
    const response = await api.get<ReclamoEnMovimientoDto[]>(
      `/reclamos/consultar-reclamos-asignados`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener los reclamos asignados del usuario:",
      error
    );
    throw error;
  }
};

export const obtenerReclamosAsignadosAUnArea = async (): Promise<
  ReclamoEnMovimientoDto[]
> => {
  try {
    const response = await api.get<ReclamoEnMovimientoDto[]>(
      `/reclamos/reclamos-area`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener los reclamos asignados del usuario:",
      error
    );
    throw error;
  }
};

export const reasignarReclamo = async (
  reclamoId: string,
  tipoAsignacion: "area" | "subarea" | "empleado",
  destinoId: string,
  comentario: string | undefined
): Promise<void> => {
  try {
    if (tipoAsignacion === "area") {
      const response = await api.patch<void>(
        `/reclamos/reasignar-area/${reclamoId}`,
        { areaId: destinoId, comentario }
      );
      return response.data;
    } else if (tipoAsignacion === "subarea") {
      const response = await api.patch<void>(
        `/reclamos/reasignar-subarea/${reclamoId}`,
        { subareaId: destinoId, comentario }
      );
      return response.data;
    } else if (tipoAsignacion === "empleado") {
      const response = await api.patch<void>(
        `/reclamos/reasignar-empleado/${reclamoId}`,
        { empleadoId: destinoId, comentario }
      );
      return response.data;
    }
  } catch (error) {
    console.error("Error al reasignar el reclamo:", error);
    throw error;
  }
};

export const obtenerHistorialReclamo = async (
  reclamoId: string
): Promise<HistorialReclamo> => {
  const response = await api.get<HistorialReclamo>(
    `/reclamos/historial/${reclamoId}`
  );
  return response.data;
};

export const asignarReclamo = async (
  reclamoId: string,
  tipoAsignacion: "area" | "subarea" | "empleado",
  destinoId: string,
  comentario: string | undefined
): Promise<void> => {
  try {
    if (tipoAsignacion === "area") {
      const response = await api.patch<void>(
        `/reclamos/asignar-area/${reclamoId}`,
        { areaId: destinoId, comentario }
      );
      return response.data;
    } else if (tipoAsignacion === "subarea") {
      const response = await api.patch<void>(
        `/reclamos/asignar-subarea/${reclamoId}`,
        { subareaId: destinoId, comentario }
      );
      return response.data;
    } else if (tipoAsignacion === "empleado") {
      const response = await api.patch<void>(
        `/reclamos/asignar-empleado/${reclamoId}`,
        { empleadoId: destinoId, comentario }
      );
      return response.data;
    }
  } catch (error) {
    console.error("Error al asignar el reclamo:", error);
    throw error;
  }
};


export const cerrarReclamo = async (
  reclamoId: string,
  resumenResolucion: string
): Promise<void> => {
  try {
    const response = await api.post<void>(
      `/reclamos/cerrar`,
      { reclamoId, resumenResolucion }
    );
    return response.data;
  } catch (error) {
    console.error("Error al cerrar el reclamo:", error);
    throw error;
  }
};

export const obtenerReclamo = async (
  reclamoId: string
): Promise<ReclamoEnMovimientoDto> => {
  try {
  const response = await api.get<ReclamoEnMovimientoDto>(
    `/reclamos/${reclamoId}`
  );
  return response.data;
}
catch (error) {
  console.error("Error al obtener el reclamo:", error);
  throw error;
}
};

export const obtenerReclamosDelUsuario = async (): Promise<ReclamosDelClienteDto[]> => {
  try {
    const response = await api.get<ReclamosDelClienteDto[]>(
      `/reclamos/reclamos-cliente`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener los reclamos del usuario:", error);
    throw error;
  }
};

export interface ReclamosDelClienteDto {
  _id: string;
  nroTicket: string;
  titulo: string;
  descripcion: string;
  resumenResolucion?: string;

  prioridad: "Baja" | "Media" | "Alta";
  nivelCriticidad: number;

  tipoReclamo: TipoReclamoDto;
  proyecto: ProyectoDto;

  historialEstado: HistorialEstadoDto[];
  historialAsignacion: HistorialAsignacionDto[];
}

export interface TipoReclamoDto {
  _id: string;
  nombre: string;
  area: string;
  reclamos: ReclamoAsignadoDto[];
}

export interface ProyectoDto {
  _id: string;
  titulo: string;
  descripcion: string;
  descripcionDetallada: string;
  fechaInicio: string; // ISO string
  tipo: string;
  cliente: string;
  createdAt: string;
  updatedAt: string;
}

export interface HistorialAsignacionDto {
  id: string;

  desdeArea: AreaDto | null;
  haciaArea: AreaDto | null;

  desdeSubarea: SubareaDto | null;
  haciaSubarea: SubareaDto | null;

  deEmpleado: EmpleadoDto | null;
  haciaEmpleado: EmpleadoDto | null;

  tipoAsignacion:
    | "Inicial"
    | "AsignacionDeAreaAEmpleado"
    | "AsignacionDeEmpleadoAEmpleado"
    | "AsignacionDeEmpleadoASubarea"
    | "AsignacionDeAreaASubarea"
    | "Autoasignacion"
    | "AsignacionDeEmpleadoAArea";

  comentario: string | null;
  fechaAsignacion: string;
  fechaHoraFin: string | null;
}

export interface AreaDto {
  id: string;
  nombre: string;
}

export interface SubareaDto {
  id: string;
  nombre: string;
}

export interface EmpleadoDto {
  id: string;
  nombre: string;
}

export interface HistorialEstadoDto {
  id: string;
  fechaHoraInicio: string;
  fechaHoraFin: string | null;
  estado: EstadoDto;
}

export interface EstadoDto {
  id: string;
  nombre: string;
}

