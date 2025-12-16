export interface ReclamoConsultadoDTO {
  id: string;
  nroTicket: string;
  titulo: string;
  descripcion: string;

  tipoReclamo: {
    id: string;
    nombre: string;
  } | null;

  estadoActual: {
    id: string;
    nombre: string;
    fecha: string;
  };

  areaActual: {
    id: string;
    nombre: string;
    fecha: string;
  } | null;

  fechaCreacion: string;

  proyecto: {
    id: string;
    titulo: string;
  } | null;

  prioridad: "Baja" | "Media" | "Alta";
  nivelCriticidad: number;
  imagenes: string[];
}
