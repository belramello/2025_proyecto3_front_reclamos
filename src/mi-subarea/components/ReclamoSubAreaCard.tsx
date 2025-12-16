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
import AsignarReclamoDialog from "@/mi-area/AsignacionReclamoDialog";
import ReclamoDetalleDialog from "@/mi-area/ReclamoHistorialDialog";
import type { ReclamoEnMovimientoDto } from "@/mi-area/interfaces/reclamo-en-movimiento.dto";
import { AlertCircleIcon } from "lucide-react";
import TipoPrioridadBadge from "@/components/prioridad-badge";
import { getPriorityStyles } from "@/utils/get-priority-styles";
import { formatearFechaArg } from "@/utils/formatear-fecha";
import { autoAsignarReclamo } from "@/services/ReclamosService";

interface ReclamoCardProps {
  reclamo: ReclamoEnMovimientoDto;
  onDialogClose: () => void;
}

const ReclamoSubAreaCard = ({ reclamo, onDialogClose }: ReclamoCardProps) => {
  const [openAsignar, setOpenAsignar] = useState(false);
  const [openDetalle, setOpenDetalle] = useState(false);

  const { titleColor, border, icon, buttonColor } = getPriorityStyles(
    reclamo.prioridad
  );

  return (
    <>
      <Card
        className={`w-96 shadow-sm hover:shadow-md transition-shadow ${border}`}
      >
        <CardHeader>
          <CardTitle>
            <button
              onClick={() => setOpenDetalle(true)}
              className="flex items-center gap-2 hover:underline cursor-pointer text-left w-full"
            >
              {icon && <AlertCircleIcon className="text-red-700" size={20} />}
              <span className={titleColor}>
                Reclamo N° {reclamo.reclamoNroTicket}
              </span>
            </button>
          </CardTitle>
          <CardDescription className="font-medium">
            {reclamo.reclamoTitulo}
          </CardDescription>
          <CardAction>
            <TipoAsignacionBadge tipoAsignacion={reclamo.tipoAsignacion} />
          </CardAction>
        </CardHeader>

        <CardContent className="text-sm space-y-1">
          <p>
            <span className="font-semibold">Proyecto:</span>{" "}
            {reclamo.nombreProyecto}
          </p>
          <p>
            <span className="font-semibold">Cliente:</span>{" "}
            {reclamo.nombreApellidoCliente || "No especificado"}
          </p>
          <p>
            <span className="font-semibold">Recibido en Subárea:</span>{" "}
            {formatearFechaArg(reclamo.fechaHoraInicioAsignacion)}
          </p>
          <p>
            <span className="font-semibold">Estado:</span>{" "}
            {reclamo.nombreEstado}
          </p>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Prioridad:</span>
            <TipoPrioridadBadge tipoPrioridad={reclamo.prioridad} />
          </div>
          <p>
            <span className="font-semibold">Nivel de Criticidad:</span>{" "}
            {reclamo.nivelCriticidad}
          </p>
        </CardContent>

        <CardFooter className="flex justify-center gap-2">
          <Button
            className={buttonColor}
            onClick={() => autoAsignarReclamo(reclamo.reclamoId)}
          >
            Asignar | Autoasignar
          </Button>
        </CardFooter>
      </Card>

      <AsignarReclamoDialog
        open={openAsignar}
        onOpenChange={(open) => {
          setOpenAsignar(open);
          if (!open) onDialogClose();
        }}
        reclamo={reclamo}
      />

      <ReclamoDetalleDialog
        open={openDetalle}
        onOpenChange={(open) => {
          setOpenDetalle(open);
          if (!open) onDialogClose();
        }}
        reclamoId={reclamo.reclamoId}
        reclamoNroTicket={reclamo.reclamoNroTicket}
        reclamoTitulo={reclamo.reclamoTitulo}
        reclamoProyecto={reclamo.nombreProyecto}
        reclamoCliente={reclamo.nombreApellidoCliente}
      />
    </>
  );
};

export default ReclamoSubAreaCard;
