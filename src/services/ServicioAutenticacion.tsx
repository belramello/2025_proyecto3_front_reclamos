import type { LoginResponse } from "../login/interfaces/login-response.interface";
import type { LoginCredentials } from "../login/interfaces/login.interface";
import { eliminarTokens, guardarToken } from "../utils/almacenamiento";
import api from "../utils/api";

export const loginRequest = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>(`/auth/login`, credentials);
    const { accessToken, refreshToken, usuario } = response.data;
    guardarToken(accessToken, refreshToken, usuario.permisos);
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

export const cerrarSesion = () => {
  try {
    eliminarTokens();
    window.location.href = "login";
  } catch (error) {
    console.error("Error al cerrar sesión");
  }
};

export const activarCuentaUsuario = async (
  token: string,
  nuevaContrasena: string
) => {
  try {
    const response = await api.post("/auth/activar-cuenta", {
      token,
      contraseña: nuevaContrasena,
    });
    return response.data;
  } catch (error) {
    console.error("Error al activar cuenta:", error);
    throw error;
  }
};
