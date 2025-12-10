import type { ReclamoEnMovimientoDto } from "@/mi-area/interfaces/reclamo-en-movimiento.dto";
import api from "../utils/api";
import type { HistorialReclamo } from "@/interfaces/respuesta-historial-reclamo.dto";

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
