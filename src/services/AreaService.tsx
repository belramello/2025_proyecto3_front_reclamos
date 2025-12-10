import api from "../utils/api";
import type { AreaDto } from "@/interfaces/area-dto";

export const obtenerAreas = async (): Promise<AreaDto[] | null> => {
  try {
    const response = await api.get<AreaDto[] | null>(`/areas`);
    return response.data;
  } catch (error) {
    console.error("Error las áreas", error);
    throw error;
  }
};
