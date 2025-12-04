import type { SubareaDeUsuarioDto } from "@/interfaces/find-all-subarea-de-empleado.dto";
import api from "../utils/api";

export const obtenerSubareasDeUsuario = async (): Promise<
  SubareaDeUsuarioDto[] | null
> => {
  try {
    const response = await api.get<SubareaDeUsuarioDto[] | null>(
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
