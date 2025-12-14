import type { RespuestaUsuarioDto } from "./respuesta-usuario.dto";

export interface LoginResponseDto {
  accessToken: string;
  refreshToken: string;
  usuario: RespuestaUsuarioDto;
}
