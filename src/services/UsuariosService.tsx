import api from "../utils/api";
import type { LoginResponseDto } from "@/interfaces/login-response.dto";
import type { CreateUsuarioDto } from "@/interfaces/create-usuario.dto";
import type { ActivarCuentaDto } from "@/interfaces/activar-cuenta.dto";
import type { EmpleadoDto } from "@/interfaces/empleado.dto";
import type { OlvidarContraseñaDto } from "@/interfaces/olvidar-contraseña.dto";
import type { RecuperarContraseñaDto } from "@/interfaces/recuperar-contraseña.dto";

export const obtenerEmpleados = async (
  tipoUsuario: "empleado" | "encargado"
): Promise<EmpleadoDto[] | null> => {
  try {
    if (tipoUsuario === "empleado") {
      const response = await api.get<EmpleadoDto[] | null>(
        `/usuarios/empleados-subarea`
      );
      return response.data;
    }
    const response = await api.get<EmpleadoDto[] | null>(
      `/usuarios/empleados-area`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener los empleados", error);
    throw error;
  }
};

export const registrarUsuario = async (
  data: CreateUsuarioDto
): Promise<LoginResponseDto> => {
  try {
    const response = await api.post<LoginResponseDto>(
      "/usuarios/create-usuario",
      data
    );
    return response.data;
  } catch (error: any) {
    console.error("Error al registrar usuario", error);
    if (error?.response?.status === 409) {
      throw new Error("El correo electrónico ya está registrado.");
    }
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
export const actualizarEmpleado = async (id: string, data: any) => {
  try {
    const response = await api.patch(`/usuarios/gestion-empleados/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar empleado", error);
    throw error;
  }
};

export const eliminarEmpleado = async (id: string) => {
  try {
    const response = await api.delete(`/usuarios/gestion-empleados/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar empleado", error);
    throw error;
  }
};

export const forgotPassword = async (payload: OlvidarContraseñaDto) => {
  try {
    return await api.post(`/usuarios/forgot-password`, payload);
  } catch (error: any) {
    const msg =
      error.response?.data?.message ||
      "Error al solicitar recuperación de contraseña";
    throw new Error(msg);
  }
};

export const resetPassword = async (
  resetPasswordDto: RecuperarContraseñaDto
) => {
  try {
    return await api.post<void>(`/usuarios/reset-password`, {
      token: resetPasswordDto.token,
      contraseña: resetPasswordDto.contraseña,
    });
  } catch (error: any) {
    const msg =
      error.response?.data?.message || "Error al restablecer contraseña";
    throw new Error(msg);
  }
};
