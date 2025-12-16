import type { ReclamoEnMovimientoDto } from "@/mi-area/interfaces/reclamo-en-movimiento.dto";
import api from "../utils/api";
import type { HistorialReclamo } from "@/interfaces/respuesta-historial-reclamo.dto";
import type { ReclamoConsultadoDTO } from "@/reclamos/interfaces/reclamo-consultado-dto";
import type { ReclamoFrontDto } from "@/interfaces/reclamo-dto";
import { mapReclamoToConsultado } from "./mapReclamoToConsultado";
import type { ReclamoAsignadoDto } from "@/reclamos-asignados/interfaces/reclamo-asignado-dto";
export const obtenerReclamosAsignadosDeEmpleado = async (): Promise<
  ReclamoEnMovimientoDto[]
> => {
  try {
    const response = await api.get<ReclamoEnMovimientoDto[]>(
      `/reclamos/consultar-reclamos-asignados`
    );
    console.log("response.data:", response.data);
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
    console.log("response.data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los reclamos asignados del área:", error);
    throw error;
  }
};

export const obtenerReclamosAsignadosAUnSubArea = async (): Promise<
  ReclamoEnMovimientoDto[]
> => {
  try {
    const response = await api.get<ReclamoEnMovimientoDto[]>(
      `/reclamos/reclamos-subarea`
    );
    console.log("response.data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los reclamos asignados del Sub área:", error);
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
    const payloads = {
      area: {
        url: `/reclamos/reasignar-area/${reclamoId}`,
        data: { areaId: destinoId, comentario },
      },
      subarea: {
        url: `/reclamos/reasignar-subarea/${reclamoId}`,
        data: { subareaId: destinoId, comentario },
      },
      empleado: {
        url: `/reclamos/reasignar-empleado/${reclamoId}`,
        data: { empleadoId: destinoId, comentario },
      },
    };

    const { url, data } = payloads[tipoAsignacion];
    await api.patch(url, data);
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
  console.log("response.data:", response.data);
  return response.data;
};

export const asignarReclamo = async (
  reclamoId: string,
  tipoAsignacion: "area" | "subarea" | "empleado",
  destinoId: string,
  comentario: string | undefined
): Promise<void> => {
  try {
    const payloads = {
      area: {
        url: `/reclamos/asignar-area/${reclamoId}`,
        data: { areaId: destinoId, comentario },
      },
      subarea: {
        url: `/reclamos/asignar-subarea/${reclamoId}`,
        data: { subareaId: destinoId, comentario },
      },
      empleado: {
        url: `/reclamos/asignar-empleado/${reclamoId}`,
        data: { empleadoId: destinoId, comentario },
      },
    };

    const { url, data } = payloads[tipoAsignacion];
    await api.patch(url, data);
  } catch (error) {
    console.error("Error al asignar el reclamo:", error);
    throw error;
  }
};

// 🚨 AQUÍ ESTABA EL ERROR (Ya corregido)
export const crearReclamo = async (reclamo: ReclamoFrontDto): Promise<void> => {
  try {
    await api.post(`/reclamos`, reclamo);
  } catch (error) {
    console.error("Error al crear el reclamo", error);
    throw error;
  }
};

export const cerrarReclamo = async (
  reclamoId: string,
  resumenResolucion: string
): Promise<void> => {
  try {
    await api.post(`/reclamos/cerrar`, { reclamoId, resumenResolucion });
  } catch (error) {
    console.error("Error al cerrar el reclamo:", error);
    throw error;
  }
};

export const obtenerReclamosCliente = async (): Promise<
  ReclamoConsultadoDTO[]
> => {
  try {
    const response = await api.get<ReclamoConsultadoDTO[]>(
      `/reclamos/reclamos-cliente`
    );
    return response.data.map(mapReclamoToConsultado);
  } catch (error) {
    console.error("Error obteniendo los reclamos", error);
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
  } catch (error) {
    console.error("Error al obtener el reclamo:", error);
    throw error;
  }
};

export const obtenerReclamosDelUsuario = async (): Promise<
  ReclamosDelClienteDto[]
> => {
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

// --- INTERFACES ---

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
  fechaInicio: string;
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
  tipoAsignacion: string;
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
