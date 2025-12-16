import type { RespuestaUsuarioDto } from "./respuesta-usuario.dto";

export interface ProyectoDto {
  _id: string;
  titulo: string;
  descripcion: string;
  descripcionDetallada?: string;
  fechaInicio: string; // viene como string ISO desde el backend
  tipo: string;        // Ej: "Desarrollo de Software", "Marketing"
  cliente: string | RespuestaUsuarioDto; // puede venir como ID o populado
  createdAt: string;
  updatedAt: string;
}
