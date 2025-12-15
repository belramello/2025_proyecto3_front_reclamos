import type { EmpleadoDto } from "@/interfaces/empleado.dto";
import api from "../utils/api";

export const obtenerEmpleados = async (
  tipoUsuario: "empleado" | "encargado"
): Promise<EmpleadoDto[] | null> => {
  try {
    if (tipoUsuario === "empleado") {
      const response = await api.get<EmpleadoDto[] | null>(
        `/usuarios/empleados-subarea`
      );
      //AGREGAR ELIMINACIÓN DEL PROPIO NOMBRE DEL USUARIO LOGUEADO.
      return response.data;
    }
    const response = await api.get<EmpleadoDto[] | null>(
      `/usuarios/empleados-area`
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
