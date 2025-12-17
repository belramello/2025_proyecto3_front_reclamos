import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Folder, 
  UserCircle, 
  MessageSquare, 
  History, 
  Users, 
  Loader2 
} from "lucide-react";

import TipoPrioridadBadge from "@/components/prioridad-badge";
import { getPriorityStyles } from "@/utils/get-priority-styles";
import { formatearFechaArg } from "@/utils/formatear-fecha";
import type { ReclamoConsultadoDTO } from "../interfaces/reclamo-consultado-dto";

import { HistorialAsignacionesDialog } from "../HistorialAsignacionesDialog";
import { HistorialEstadosDialog } from "../HistorialEstadosDialog";

import { obtenerHistorialReclamo } from "@/services/ReclamosService";
import type { HistorialAsignacion } from "@/interfaces/historial-asignacion.dto";
import type { HistorialEstadoDto } from "@/services/ReclamosService";

interface ReclamoCardProps {
  reclamo: ReclamoConsultadoDTO;
}

const ReclamoClienteCard = ({ reclamo }: ReclamoCardProps) => {
  const [,setOpenDetalle] = useState<boolean>(false);
  const { titleColor, border, icon } = getPriorityStyles(reclamo.prioridad);

  const [openEstados, setOpenEstados] = useState(false);
  const [openAsignaciones, setOpenAsignaciones] = useState(false);

  const [historialEstados, setHistorialEstados] = useState<HistorialEstadoDto[]>([]);
  const [historialAsig, setHistorialAsig] = useState<HistorialAsignacion[]>([]);
  const [loading, setLoading] = useState(false);

  const cargarYMostrarHistorial = async (tipo: "estados" | "asignaciones") => {
    if (historialEstados.length > 0 || historialAsig.length > 0) {
      if (tipo === "estados") setOpenEstados(true);
      else setOpenAsignaciones(true);
      return;
    }

    setLoading(true);
    try {
      const data = await obtenerHistorialReclamo(reclamo.id);

      // 🔥 Normalización para evitar el error de undefined
      setHistorialEstados(
        (data.historialEstados || []).map(e => ({
          ...e,
          fechaHoraFin: e.fechaHoraFin ?? null,
        }))
      );

      setHistorialAsig(data.historialAsignaciones || []);

      if (tipo === "estados") setOpenEstados(true);
      else setOpenAsignaciones(true);
    } catch (error) {
      console.error("Error al obtener el historial completo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card
        className={`w-96 shadow-md hover:shadow-lg transition-shadow duration-300 ${border} overflow-hidden bg-white flex flex-col`}
      >
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
              <span className={`${titleColor} mt-1 group-hover:opacity-80 transition-opacity shrink-0`}>
                {icon}
              </span>
              <span className="text-xl font-bold text-gray-800 group-hover:text-blue-600 wrap-break-word">
                {reclamo.titulo}
              </span>
            </button>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-sm text-gray-600 grow">
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 italic">
            <p className="text-gray-700 whitespace-pre-wrap wrap-break-word">
              "{reclamo.descripcion}"
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 border-t pt-4">
            <div className="flex items-center gap-2">
              <Folder size={16} className="text-gray-400" />
              <span className="font-semibold text-gray-700">Proyecto:</span>
              <span className="ml-auto text-gray-600 text-right">
                {reclamo.proyecto?.titulo ?? "N/A"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <MessageSquare size={16} className="text-gray-400" />
              <span className="font-semibold text-gray-700">Estado Actual:</span>
              <span className="ml-auto px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium uppercase">
                {reclamo.estadoActual.nombre}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <UserCircle size={16} className="text-gray-400" />
              <span className="font-semibold text-gray-700">Área Actual:</span>
              <span className="ml-auto text-right">
                {reclamo.areaActual?.nombre ?? "Sin asignar"}
              </span>
            </div>

            <div className="flex items-center gap-2 border-b pb-2 mb-1">
              <Calendar size={16} className="text-gray-400" />
              <span className="font-semibold text-gray-700">Fecha Actualización:</span>
              <span className="ml-auto">
                {formatearFechaArg(reclamo.estadoActual.fecha)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              disabled={loading}
              className="flex items-center gap-2 text-[11px] h-9 px-2 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all shadow-sm"
              onClick={() => cargarYMostrarHistorial("estados")}
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <History size={14} />}
              Historial Estados
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              disabled={loading}
              className="flex items-center gap-2 text-[11px] h-9 px-2 hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-all shadow-sm"
              onClick={() => cargarYMostrarHistorial("asignaciones")}
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Users size={14} />}
              Historial Asignaciones
            </Button>
          </div>
        </CardContent>
      </Card>

      <HistorialEstadosDialog 
        open={openEstados} 
        onOpenChange={setOpenEstados} 
        ticketNro={reclamo.nroTicket} 
        historial={historialEstados} 
      />

      <HistorialAsignacionesDialog 
        open={openAsignaciones} 
        onOpenChange={setOpenAsignaciones} 
        ticketNro={reclamo.nroTicket} 
        historial={historialAsig} 
      />
    </>
  );
};

export default ReclamoClienteCard;
