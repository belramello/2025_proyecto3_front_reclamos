import type { Prioridad } from "@/enums/prioridad.enum";

export interface ReclamoFeedbackDto {
  _id: string; // El ID del reclamo
  nroTicket: string;
  titulo: string;
  proyecto: {
    titulo: string;
    cliente: {
      nombre: string;
    };
  };
  prioridad: Prioridad;
  nivelCriticidad: number;
  // Puedes añadir más si los necesitas para la card de 'Último Reclamo Activo'
}