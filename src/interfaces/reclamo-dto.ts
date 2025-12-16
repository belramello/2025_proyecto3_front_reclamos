export interface ReclamoFrontDto {
  titulo: string;
  tipoReclamo: string ;
  nivelCriticidad: number;
  prioridad: 'Baja' | 'Media' | 'Alta';
  proyecto: string;
  descripcion: string;
  imagenUrl: string[];
}
