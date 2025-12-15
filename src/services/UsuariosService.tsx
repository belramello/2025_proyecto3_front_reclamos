import api from "../utils/api";
import type { LoginResponseDto } from "@/interfaces/login-response.dto";
import type { CreateUsuarioDto } from "@/interfaces/create-usuario.dto";
import type { ActivarCuentaDto } from "@/interfaces/activar-cuenta.dto";
import type { EmpleadoDto } from "@/interfaces/empleado.dto";

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

export const registrarUsuario = async (
  data: CreateUsuarioDto
): Promise<LoginResponseDto> => {
  try {
    const response = await api.post<LoginResponseDto>(
      "/usuarios/registrar-cliente",
      data
    );
    return response.data;
  } catch (error: any) {
    console.error("Error al registrar usuario", error);

    // Manejo opcional de errores de conflicto
    if (error?.response?.status === 409) {
      throw new Error("El correo electrónico ya está registrado.");
    }

    throw error;
  }
};

export const registrarEmpleado = async (
  data: CreateUsuarioDto
): Promise<LoginResponseDto> => {
  try {
    const response = await api.post<LoginResponseDto>(
      "/usuarios/gestion-empleados",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error al registrar empleado", error);
    throw error;
  }
};

export const activarCuenta = async (data: ActivarCuentaDto) => {
  try {
    const response = await api.post("/auth/activar-cuenta", data);
    return response.data;
  } catch (error) {
    console.error("Error al activar cuenta", error);
    throw error;
  }
};
