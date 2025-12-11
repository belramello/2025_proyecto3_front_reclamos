import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TipoAsignacionBadge from "@/components/tipo-asignacion-badge";
import { useState } from "react";
import ReasignarReclamoDialog from "../ReasignacionReclamoDialog";
import type { ReclamoEnMovimientoDto } from "@/mi-area/interfaces/reclamo-en-movimiento.dto";
import TipoPrioridadBadge from "@/components/prioridad-badge";
import { getPriorityStyles } from "@/utils/get-priority-styles";
import { AlertCircleIcon } from "lucide-react";
import ReclamoDetalleDialog from "@/mi-area/ReclamoHistorialDialog";
import { formatearFechaArg } from "@/utils/formatear-fecha";

interface ReclamoCardProps {
  reclamo: ReclamoEnMovimientoDto;
  onDialogClose: () => void;
  onResolver?: (reclamoId: string) => void;
}

const ReclamoAsignadaCard = ({
  reclamo,
  onDialogClose,
  onResolver,
}: ReclamoCardProps) => {
  const [openReasignar, setOpenReasignar] = useState(false);
  const [openDetalle, setOpenDetalle] = useState(false);
  const { titleColor, border, icon, buttonColor } = getPriorityStyles(
    reclamo.prioridad
  );

  return (
    <>
      <Card className={`w-96 ${border}`}>
        <CardHeader>
          <CardTitle>
            <button
              onClick={() => setOpenDetalle(true)}
              className="flex items-center gap-2 hover:underline cursor-pointer text-left w-full"
            >
              {icon && <AlertCircleIcon className="text-red-700" />}
              <span className={titleColor}>
                Reclamo N° {reclamo.reclamoNroTicket}
              </span>
            </button>
          </CardTitle>
          <CardDescription>{reclamo.reclamoTitulo}</CardDescription>
          <CardAction>
            <TipoAsignacionBadge tipoAsignacion={reclamo.tipoAsignacion} />
          </CardAction>
        </CardHeader>

        <CardContent>
          <p className="mt-0.5">Proyecto: {reclamo.nombreProyecto}</p>
          <p className="mt-0.5">Cliente: {reclamo.nombreApellidoCliente}</p>
          <p className="mt-0.5">
            Asignado desde:{" "}
            {formatearFechaArg(reclamo.fechaHoraInicioAsignacion)}
          </p>
          <p className="mt-0.5">
            Prioridad: <TipoPrioridadBadge tipoPrioridad={reclamo.prioridad} />
          </p>
          <p className="mt-0.5">
            Nivel de Criticidad: {reclamo.nivelCriticidad}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-2">
          <Button variant="outline" onClick={() => setOpenReasignar(true)}>
            Reasignar
          </Button>
          <Button
            className={buttonColor}
            onClick={() => onResolver?.(reclamo.reclamoId)}
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
      />
    </>
  );
};

export default ReclamoAsignadaCard;
