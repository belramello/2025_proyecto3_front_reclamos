import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import TipoPrioridadBadge from "@/components/prioridad-badge";
import { getPriorityStyles } from "@/utils/get-priority-styles";
import { formatearFechaArg } from "@/utils/formatear-fecha";
import { useState } from "react";
import { Calendar, Folder, UserCircle, MessageSquare } from "lucide-react"; 
import type { ReclamoConsultadoDTO } from "../interfaces/reclamo-consultado-dto";

interface ReclamoCardProps {
  reclamo: ReclamoConsultadoDTO;
}

const ReclamoClienteCard = ({ reclamo }: ReclamoCardProps) => {
  const [openDetalle, setOpenDetalle] = useState(false);
  const { titleColor, border, icon } = getPriorityStyles(reclamo.prioridad);

  return (
    <Card className={`w-96 shadow-md hover:shadow-lg transition-shadow duration-300 ${border} overflow-hidden bg-white flex flex-col`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
           <CardDescription className="font-mono font-medium text-xs uppercase tracking-wider text-gray-500">
             Ticket #{reclamo.nroTicket}
           </CardDescription>
           <TipoPrioridadBadge tipoPrioridad={reclamo.prioridad} />
        </div>
        
        <CardTitle>
          <button
            onClick={() => setOpenDetalle(true)}
            className="group flex items-start gap-2 text-left w-full transition-colors"
          >
            <span className={`${titleColor} mt-1 group-hover:opacity-80 transition-opacity flex-shrink-0`}>
              {icon}
            </span>
            <span className="text-xl font-bold text-gray-800 group-hover:text-blue-600 break-words">
              {reclamo.titulo}
            </span>
          </button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 text-sm text-gray-600 flex-grow">
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 italic">
          <p className="text-gray-700 whitespace-pre-wrap break-words">
            "{reclamo.descripcion}"
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2 border-t pt-4">
          <div className="flex items-center gap-2">
            <Folder size={16} className="text-gray-400" />
            <span className="font-semibold text-gray-700">Proyecto:</span>
            <span className="ml-auto text-gray-600 text-right">{reclamo.proyecto?.titulo ?? "N/A"}</span>
          </div>

          <div className="flex items-center gap-2">
            <MessageSquare size={16} className="text-gray-400" />
            <span className="font-semibold text-gray-700">Estado:</span>
            <span className="ml-auto px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium uppercase">
                {reclamo.estadoActual.nombre}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <UserCircle size={16} className="text-gray-400" />
            <span className="font-semibold text-gray-700">Área:</span>
            <span className="ml-auto text-right">{reclamo.areaActual?.nombre ?? "Sin asignar"}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-400" />
            <span className="font-semibold text-gray-700">Fecha:</span>
            <span className="ml-auto">{formatearFechaArg(reclamo.estadoActual.fecha)}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <span className="text-xs uppercase font-bold text-gray-400 tracking-tighter">Nivel de Criticidad: {reclamo.nivelCriticidad}/10</span>
          <div className="flex gap-1 w-full">
            {[...Array(10)].map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 flex-1 rounded-full ${i < reclamo.nivelCriticidad ? 'bg-orange-400' : 'bg-gray-200'}`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReclamoClienteCard;