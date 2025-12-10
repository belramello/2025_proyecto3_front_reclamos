import { Estado } from "@/enums/estados.enum";
import type { HistorialEstado } from "@/interfaces/historial-estado.dto";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

export const EstadosTimelineHorizontal = ({
  historialEstados,
}: {
  historialEstados: HistorialEstado[];
}) => {
  const estadosPosibles = [
    Estado.PENDIENTE_A_ASIGNAR,
    Estado.EN_PROCESO,
    Estado.RESUELTO,
  ];

  const getEstadoInfo = (nombreEstado: string) => {
    const estado = nombreEstado.toLowerCase();
    if (estado.includes("pendiente")) {
      return {
        titulo: Estado.PENDIENTE_A_ASIGNAR,
        descripcion:
          "Tu reclamo fue registrado y está pendiente de ser asignado a algún operario.",
        icon: Clock,
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
        borderColor: "border-yellow-600",
      };
    } else if (estado.includes("proceso")) {
      return {
        titulo: Estado.EN_PROCESO,
        descripcion:
          "Actualmente estamos trabajando en la resolución de tu reclamo.",
        icon: AlertCircle,
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        borderColor: "border-blue-600",
      };
    } else if (estado.includes("resuelto")) {
      return {
        titulo: Estado.RESUELTO,
        descripcion: "Tu estado se encuentra resuelto.",
        icon: CheckCircle2,
        color: "text-green-600",
        bgColor: "bg-green-100",
        borderColor: "border-green-600",
      };
    }
    return {
      titulo: nombreEstado,
      descripcion: "",
      icon: Clock,
      color: "text-gray-600",
      bgColor: "bg-gray-100",
      borderColor: "border-gray-600",
    };
  };

  // Determinar qué estados están activos
  const estadosActivos = historialEstados.map((e) => e.estado.nombre);

  return (
    <div className="mb-12">
      <h3 className="text-xl font-semibold mb-6">Estados del Reclamo</h3>
      <div className="relative">
        <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-300" />

        {/* Estados */}
        <div className="grid grid-cols-3 gap-4">
          {estadosPosibles.map((estado) => {
            const info = getEstadoInfo(estado);
            const Icon = info.icon;
            const isActive = estadosActivos.some(
              (e) => getEstadoInfo(e).titulo === estado
            );

            return (
              <div key={estado} className="relative flex flex-col items-center">
                {/* Círculo */}
                <div
                  className={`relative z-10 w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all ${
                    isActive
                      ? `${info.bgColor} ${info.borderColor}`
                      : "bg-gray-100 border-gray-300"
                  }`}
                >
                  <Icon
                    className={`w-8 h-8 ${
                      isActive ? info.color : "text-gray-400"
                    }`}
                  />
                </div>

                <div className="mt-4 text-center max-w-[200px]">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <p
                      className={`font-semibold text-sm ${
                        isActive ? info.color : "text-gray-400"
                      }`}
                    >
                      {info.titulo}
                    </p>
                  </div>
                  {isActive && (
                    <>
                      <p className="text-xs text-gray-600 mb-1">
                        {info.descripcion}
                      </p>
                      {historialEstados.find(
                        (e) => getEstadoInfo(e.estado.nombre).titulo === estado
                      ) && (
                        <p className="text-xs text-gray-500">
                          {new Date(
                            historialEstados.find(
                              (e) =>
                                getEstadoInfo(e.estado.nombre).titulo === estado
                            )!.fechaHoraInicio
                          ).toLocaleDateString("es-AR")}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
