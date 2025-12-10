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
import AsignarReclamoDialog from "../AsignacionReclamoDialog";
import type { ReclamoPendienteAsignarDto } from "../interfaces/reclamo-pendiente-a-asignar.dto";
import { AlertCircleIcon } from "lucide-react";
import { Prioridad } from "@/enums/prioridad.enum";
import ReclamoDetalleDialog from "../ReclamoHistorialDialog";
import TipoPrioridadBadge from "@/components/prioridad-badge";

interface ReclamoCardProps {
  reclamo: ReclamoPendienteAsignarDto;
}

const ReclamoPendienteCard = ({ reclamo }: ReclamoCardProps) => {
  const [openAsignar, setOpenAsignar] = useState(false);
  const [openDetalle, setOpenDetalle] = useState(false);

  const getPriorityStyles = () => {
    switch (reclamo.prioridad) {
      case Prioridad.ALTO:
        return {
          titleColor: "text-red-700",
          border: "border-3 border-red-700",
          icon: true,
          buttonColor: "bg-red-900 hover:bg-red-800",
        };
      case Prioridad.MEDIO:
        return {
          titleColor: "text-yellow-600",
          border: "border-3 border-yellow-600",
          icon: false,
          buttonColor: "bg-yellow-600 hover:bg-yellow-500",
        };
      default:
        return {
          titleColor: "text-black",
          border: "border border-gray-300",
          icon: false,
          buttonColor: "bg-green-950 hover:bg-green-900",
        };
    }
  };

  const { titleColor, border, icon, buttonColor } = getPriorityStyles();

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
            Derivado a área desde:{" "}
            {reclamo.fechaHoraInicioAsignacion.toLocaleDateString()}
          </p>
          <p className="mt-0.5">Estado: {reclamo.estado}</p>
          <p className="mt-0.5">
            Prioridad: <TipoPrioridadBadge tipoPrioridad={reclamo.prioridad} />
          </p>
          <p className="mt-0.5">
            Nivel de Criticidad: {reclamo.nivelCriticidad}
          </p>
        </CardContent>

        <CardFooter className="flex justify-center gap-2">
          <Button className={buttonColor} onClick={() => setOpenAsignar(true)}>
            Asignar
          </Button>
        </CardFooter>
      </Card>

      <AsignarReclamoDialog
        open={openAsignar}
        onOpenChange={setOpenAsignar}
        reclamo={reclamo}
      />

      <ReclamoDetalleDialog
        open={openDetalle}
        onOpenChange={setOpenDetalle}
        reclamoId={reclamo.reclamoId}
        reclamoNroTicket={reclamo.reclamoNroTicket}
        reclamoTitulo={reclamo.reclamoTitulo}
      />
    </>
  );
};
export default ReclamoPendienteCard;
