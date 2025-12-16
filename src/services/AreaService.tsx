import api from "../utils/api";
import type { AreaDto } from "@/interfaces/area-dto";

export const obtenerAreasDeUsuario = async (): Promise<AreaDto[] | null> => {
  try {
    const response = await api.get<AreaDto[] | null>(`/areas/usuario`);
    return response.data;
  } catch (error) {
    console.error("Error las áreas", error);
    throw error;
  }
};

export const obtenerTodasLasAreas = async (): Promise<AreaDto[] | null> => {
  try {
    const response = await api.get<AreaDto[] | null>(`/areas`);
    return response.data;
  } catch (error) {
    console.error("Error las áreas", error);
    throw error;
  }
};

export const crearArea = async (data: {
  nombre: string;
  subareas?: string[];
}) => {
  try {
    const response = await api.post("/areas", data);
    return response.data;
  } catch (error) {
    console.error("Error al crear área", error);
    throw error;
  }
};

export const actualizarArea = async (id: string, data: any) => {
  try {
    const response = await api.patch(`/areas/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar área", error);
    throw error;
  }
};

export const eliminarArea = async (id: string) => {
  try {
    const response = await api.delete(`/areas/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar área", error);
    throw error;
  }
};
