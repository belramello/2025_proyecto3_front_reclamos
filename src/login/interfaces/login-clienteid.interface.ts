export interface UsuarioMongo {
  id: string;
  nombreUsuario: string;
  email: string;
  rol: string;
  permisos: number[];
}
