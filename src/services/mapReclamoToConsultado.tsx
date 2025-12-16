import type { ReclamoConsultadoDTO } from "@/reclamos/interfaces/reclamo-consultado-dto";

export function mapReclamoToConsultado(r: any): ReclamoConsultadoDTO {
  const ultimoEstado = r.historialEstado?.at(-1);
  const ultimaAsignacion = r.historialAsignacion?.at(-1);

  return {
    id: r._id,
    nroTicket: r.nroTicket,
    titulo: r.titulo,
    descripcion: r.descripcion,

    tipoReclamo: r.tipoReclamo
      ? {
          id: r.tipoReclamo._id,
          nombre: r.tipoReclamo.nombre,
        }
      : {
          id: "",
          nombre: "–",
        },

    estadoActual: {
      id: ultimoEstado?.id ?? "",
      nombre: ultimoEstado?.estado?.nombre ?? "–",
      fecha: ultimoEstado?.fechaHoraInicio ?? r.fechaCreacion ?? "",
    },

    areaActual: ultimaAsignacion
      ? {
          id:
            ultimaAsignacion.haciaArea?._id ??
            ultimaAsignacion.desdeArea?._id ??
            "",
          nombre:
            ultimaAsignacion.haciaArea?.nombre ??
            ultimaAsignacion.desdeArea?.nombre ??
            "–",
          fecha: ultimaAsignacion.fechaAsignacion ?? "",
        }
      : {
          id: "",
          nombre: "–",
          fecha: "",
        },

    fechaCreacion: r.fechaCreacion,

    proyecto: r.proyecto
      ? {
          id: r.proyecto._id,
          titulo: r.proyecto.titulo,
        }
      : {
          id: "",
          titulo: "–",
        },

    prioridad: r.prioridad,
    nivelCriticidad: r.nivelCriticidad,
    imagenes: r.imagenUrl ?? [],
  };
}
