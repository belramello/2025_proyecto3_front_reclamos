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
      return response.data;
    }
    const response = await api.get<EmpleadoDto[] | null>(
      `/usuarios/empleados-area`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener los empleados",
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

export const registrarEncargado = async (
  data: CreateUsuarioDto
): Promise<LoginResponseDto> => {
  try {
    const response = await api.post<LoginResponseDto>("/usuarios/encargados", data);
    return response.data;
  } catch (error) {
    console.error("Error al registrar encargado", error);
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
      // Apunta al endpoint que hicimos en el back: PATCH /usuarios/gestion-empleados/:id
      const response = await api.patch(`/usuarios/gestion-empleados/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar empleado", error);
      throw error;
    }
  };

  // --- ELIMINAR EMPLEADO (DELETE) ---
  export const eliminarEmpleado = async (id: string) => {
    try {
      // Apunta al endpoint del back: DELETE /usuarios/gestion-empleados/:id
      // El Back validará si tiene reclamos y tirará error si no se puede borrar.
      const response = await api.delete(`/usuarios/gestion-empleados/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al eliminar empleado", error);
      throw error;
    }
  };