export interface RolDto {
  _id: string;
  nombre: string;
  permisos: Permiso[];
}

export interface Permiso {
  nombre: string;
  descripcion?: string;
}