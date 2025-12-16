import api from "../utils/api";
import type { TipoReclamoDto } from "@/interfaces/tipo-reclamo.dto";

export const obtenerTiposReclamo = async (): Promise<TipoReclamoDto[] | null> => {
  try {
    const response = await api.get<TipoReclamoDto[] | null>(`/tipo-reclamo`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo tipos de reclamo", error);
    throw error;
  }
};
