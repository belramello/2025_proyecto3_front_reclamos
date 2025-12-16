import type { SubareaDto } from "@/interfaces/subarea.dto";
import api from "../utils/api";

export const obtenerSubareasDeUsuario = async (): Promise<
  SubareaDto[] | null
> => {
  try {
    const response = await api.get<SubareaDto[] | null>(
      `/subareas/subareas-de-usuario`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener las subáreas del  usuario", error);
    throw error;
  }
};

export const obtenerTodasLasSubareas = async (
  id: string
): Promise<SubareaDto[]> => {
  try {
    const response = await api.get<SubareaDto[]>(`/subareas/area/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todas las subáreas por área", error);
    throw error;
  }
};
