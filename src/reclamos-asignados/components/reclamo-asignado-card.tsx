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
import type { ReclamoAsignadoDto } from "@/reclamos-asignados/interfaces/reclamo-asignado-dto";
import { useState } from "react";
import ReasignarReclamoDialog from "../ReasignacionReclamoDialog";

interface ReclamoCardProps {
  reclamo: ReclamoAsignadoDto;
  onResolver?: (reclamoId: string) => void;
}

const ReclamoAsignadaCard = ({ reclamo, onResolver }: ReclamoCardProps) => {
  const [openReasignar, setOpenReasignar] = useState(false);

  return (
    <>
      <Card className="w-96">
        <CardHeader>
          <CardTitle>
            <a href={`/reclamo/${reclamo.reclamoId}`}>
              <span>Reclamo N° {reclamo.reclamoNroTicket}</span>
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
            Asignado desde:{" "}
            {reclamo.fechaHoraInicioAsignacion.toLocaleDateString()}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-2">
          <Button variant="outline" onClick={() => setOpenReasignar(true)}>
            Reasignar
          </Button>
          <Button
            className="bg-green-950"
            onClick={() => onResolver?.(reclamo.reclamoId)}
          >
            Resolver
          </Button>
        </CardFooter>
      </Card>

      <ReasignarReclamoDialog
        open={openReasignar}
        onOpenChange={setOpenReasignar}
        reclamo={reclamo}
      />
    </>
  );
};

export default ReclamoAsignadaCard;
