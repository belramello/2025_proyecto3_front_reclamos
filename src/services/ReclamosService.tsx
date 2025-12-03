import type { ReclamoAsignadoDto } from "@/reclamos-asignados/interfaces/reclamo-asignado-dto";
import api from "../utils/api";

export const obtenerReclamosAsignadosDeEmpleado = async (): Promise<
  ReclamoAsignadoDto[] | null
> => {
  try {
    const response = await api.get<ReclamoAsignadoDto[] | null>(
      `/consultar-reclamos-asignados`
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
