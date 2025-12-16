import api from "../utils/api";
import type { ProyectoDto } from "@/interfaces/proyecto.dto";

export const obtenerProyectos = async (
  clienteId: string
): Promise<ProyectoDto[] | null> => {
  try {
    const response = await api.get<ProyectoDto[] | null>(
      `/proyectos/cliente/${clienteId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener proyectos", error);
    throw error;
  }
};
