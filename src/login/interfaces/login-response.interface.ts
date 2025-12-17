export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  usuario: {
    id: number;
    nombreUsuario: string;
    email: string;
    rol: string;
    permisos: string[];
  };
}
