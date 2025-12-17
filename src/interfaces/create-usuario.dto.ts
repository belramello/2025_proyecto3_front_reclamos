export interface CreateUsuarioDto {
  nombre: string;
  email: string;
  telefono?: string;
  direccion?: string;
  rol: string;
  subarea?: string;
  area?: string;
  /*
  proyecto?: {
    titulo: string;
    descripcion: string;
    descripcionDetallada?: string;
    fechaInicio: string;
    tipo: string;
  };
  */
}
