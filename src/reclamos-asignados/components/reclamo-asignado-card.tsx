import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TipoAsignacionBadge from "@/components/tipo-asignacion-badge";
import { useState } from "react";
import ReasignarReclamoDialog from "../ReasignacionReclamoDialog";
import type { ReclamoEnMovimientoDto } from "@/mi-area/interfaces/reclamo-en-movimiento.dto";
import TipoPrioridadBadge from "@/components/prioridad-badge";
import { getPriorityStyles } from "@/utils/get-priority-styles";
import ReclamoDetalleDialog from "@/mi-area/ReclamoHistorialDialog";
import { formatearFechaArg } from "@/utils/formatear-fecha";
import ResolverReclamoDialog from "./ResolverReclamoDialog";
import {
  Calendar,
  Folder,
  UserCircle,
  Users,
  ChevronRight,
} from "lucide-react";

interface ReclamoCardProps {
  reclamo: ReclamoEnMovimientoDto;
  onDialogClose: () => void;
}

const ReclamoAsignadaCard = ({ reclamo, onDialogClose }: ReclamoCardProps) => {
  const [openReasignar, setOpenReasignar] = useState(false);
  const [openDetalle, setOpenDetalle] = useState(false);
  const [openResolver, setOpenResolver] = useState(false);
  const { titleColor, border, icon, buttonColor } = getPriorityStyles(
    reclamo.prioridad
  );

  const handleResolucionSuccess = () => {
    onDialogClose();
    setOpenResolver(false);
  };

  return (
    <>
      <Card
        className={`w-96 shadow-md hover:shadow-lg transition-shadow duration-300 ${border} overflow-hidden bg-white flex flex-col`}
      >
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start mb-2">
            <CardDescription className="font-mono font-medium text-xs uppercase tracking-wider text-gray-500">
              Ticket #{reclamo.reclamoNroTicket}
            </CardDescription>
            <TipoPrioridadBadge tipoPrioridad={reclamo.prioridad} />
          </div>

          <CardTitle>
            <button
              onClick={() => setOpenDetalle(true)}
              className="group flex items-start gap-2 text-left w-full transition-colors"
            >
              <span
                className={`${titleColor} mt-1 group-hover:opacity-80 transition-opacity shrink-0`}
              >
                {icon}
              </span>
              <span className="text-xl font-bold text-gray-800 group-hover:text-blue-600 wrap-break-word">
                {reclamo.reclamoTitulo}
              </span>
              <ChevronRight className="mt-1 h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors shrink-0" />
            </button>
          </CardTitle>

          <div className="mt-2">
            <TipoAsignacionBadge tipoAsignacion={reclamo.tipoAsignacion} />
          </div>
        </CardHeader>

        <CardContent className="space-y-4 text-sm text-gray-600 grow">
          <div className="grid grid-cols-1 gap-2 border-t pt-4">
            <div className="flex items-center gap-2">
              <Folder size={16} className="text-gray-400" />
              <span className="font-semibold text-gray-700">Proyecto:</span>
              <span className="ml-auto text-gray-600 text-right">
                {reclamo.nombreProyecto}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <UserCircle size={16} className="text-gray-400" />
              <span className="font-semibold text-gray-700">Cliente:</span>
              <span className="ml-auto text-right">
                {reclamo.nombreApellidoCliente}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-400" />
              <span className="font-semibold text-gray-700">Asignado:</span>
              <span className="ml-auto">
                {formatearFechaArg(reclamo.fechaHoraInicioAsignacion)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Users size={16} className="text-gray-400" />
              <span className="font-semibold text-gray-700">Estado:</span>
              <span className="ml-auto px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium uppercase">
                {reclamo.nombreEstado}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <span className="text-xs uppercase font-bold text-gray-400 tracking-tighter">
              Nivel de Criticidad: {reclamo.nivelCriticidad}/10
            </span>
            <div className="flex gap-1 w-full">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full ${
                    i < reclamo.nivelCriticidad
                      ? "bg-orange-400"
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center gap-2 border-t pt-4 bg-gray-50">
          <Button
            variant="outline"
            onClick={() => setOpenReasignar(true)}
            className="flex-1 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300 transition-colors"
          >
            Reasignar
          </Button>
          <Button
            className={`flex-1 ${buttonColor} transition-colors`}
            onClick={() => setOpenResolver(true)}
          >
            Resolver
          </Button>
        </CardFooter>
      </Card>

      <ReasignarReclamoDialog
        open={openReasignar}
        onOpenChange={(open) => {
          setOpenReasignar(open);
          if (!open) {
            onDialogClose();
          }
        }}
        reclamo={reclamo}
      />
      <ReclamoDetalleDialog
        open={openDetalle}
        onOpenChange={(open) => {
          setOpenDetalle(open);
          if (!open) {
            onDialogClose();
          }
        }}
        reclamoId={reclamo.reclamoId}
        reclamoNroTicket={reclamo.reclamoNroTicket}
        reclamoTitulo={reclamo.reclamoTitulo}
        reclamoProyecto={reclamo.nombreProyecto}
        reclamoCliente={reclamo.nombreApellidoCliente}
      />

      <ResolverReclamoDialog
        open={openResolver}
        onOpenChange={setOpenResolver}
        reclamoId={reclamo.reclamoId}
        onSuccess={handleResolucionSuccess}
        reclamoNroTicket={reclamo.reclamoNroTicket}
      />
    </>
  );
};

export default ReclamoAsignadaCard;
