export interface CreateUsuarioDto {
  nombre: string;
  apellido: string;
  email: string;
  dni?: string;
  telefono?: string;
  direccion?: string;
  contraseña?: string;
  rol: string;
  subarea?: string;
  area?: string;
  proyecto?: {
    titulo: string;
    descripcion: string;
    descripcionDetallada?: string;
    fechaInicio: string;
    tipo: string;
  }; // El cliente lo asigna el backend según usuario
}
