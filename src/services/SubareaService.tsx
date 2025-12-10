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
    console.error(
      "Error al obtener las subáreas del área a la que pertenece el usuario",
      error
    );
    throw error;
  }
};
