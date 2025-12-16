export interface RespuestaFindOneRolesDto {
  id: string;
  nombre: string;
  permisos: {
    nombre: string;
    roles: string[];
  };
}
