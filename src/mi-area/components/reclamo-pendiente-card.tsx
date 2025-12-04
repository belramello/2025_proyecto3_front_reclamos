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

interface ReclamoCardProps {
  reclamo: ReclamoPendienteAsignarDto;
}

const ReclamoPendienteCard = ({ reclamo }: ReclamoCardProps) => {
  const [openAsignar, setOpenAsignar] = useState(false);

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
            <a
              href={`/reclamo/${reclamo.reclamoId}`}
              className="flex items-center gap-2"
            >
              {icon && <AlertCircleIcon className="text-red-700" />}
              <span className={titleColor}>
                Reclamo N° {reclamo.reclamoNroTicket}
              </span>
            </a>
          </CardTitle>
          <CardDescription>{reclamo.reclamoTitulo}</CardDescription>
          <CardAction>
            <TipoAsignacionBadge tipoAsignacion={reclamo.tipoAsignacion} />
          </CardAction>
        </CardHeader>

        <CardContent>
          <p>Proyecto: {reclamo.nombreProyecto}</p>
          <p>Cliente: {reclamo.nombreApellidoCliente}</p>
          <p>
            Derivado a área desde:{" "}
            {reclamo.fechaHoraInicioAsignacion.toLocaleDateString()}
          </p>
          <p>Estado: {reclamo.estado}</p>
          <p>Prioridad: {reclamo.prioridad}</p>
          <p>Nivel de Criticidad: {reclamo.nivelCriticidad}</p>
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
    </>
  );
};

export default ReclamoPendienteCard;
