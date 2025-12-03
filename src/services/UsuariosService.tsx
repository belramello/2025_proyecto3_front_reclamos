import type { EmpleadoDeSubareaDeLogueadoDto } from "@/interfaces/find-all-empleado-de-subarea-de-logueado.dto";
import api from "../utils/api";

export const obtenerEmpleadosDeSubareaDeLogueado = async (): Promise<
  EmpleadoDeSubareaDeLogueadoDto[] | null
> => {
  try {
    const response = await api.get<EmpleadoDeSubareaDeLogueadoDto[] | null>(
      `/usuarios/empleados-subarea`
    );
    //AGREGAR ELIMINACIÓN DEL PROPIO NOMBRE DEL USUARIO LOGUEADO.
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener los empleados que pertenecen a la subárea del empleado logueado",
      error
    );
    throw error;
  }
};
