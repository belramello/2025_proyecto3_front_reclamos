import type { RespuestaFindOneRolesDto } from "@/interfaces/respuesta-find-one-roles.dto";
import api from "../utils/api";

export const obtenerRoles = async (): Promise<RespuestaFindOneRolesDto[]> => {
  try {
    const response = await api.get<RespuestaFindOneRolesDto[]>("/roles");
    return response.data;
  } catch (error) {
    console.error("Error al obtener roles", error);
    throw error;
  }
};

export const obtenerRolPorId = async (
  id: string
): Promise<RespuestaFindOneRolesDto> => {
  try {
    const response = await api.get<RespuestaFindOneRolesDto>(`/roles/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener rol por ID", error);
    throw error;
  }
};
