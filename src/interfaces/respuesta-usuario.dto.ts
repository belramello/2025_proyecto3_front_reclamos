import type { AreaDto } from "./area-dto";
import type { ProyectoDto } from "./proyecto-dto";
import type { RolDto } from "./rol-dto";
import type { SubareaDto } from "./subarea.dto";

export interface RespuestaUsuarioDto {
  _id: string;
  nombre: string;
  apellido: string;
  email: string;
  dni?: string;
  telefono?: string;
  direccion?: string;
  rol: string | RolDto;
  subarea?: string | SubareaDto;
  area?: AreaDto;
  proyecto?: ProyectoDto; // ← actualizado
  fechaCreacion: string;
  estado: string;
}
