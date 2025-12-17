import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { HistorialEstado } from "@/interfaces/historial-estado.dto";
import { formatearFechaArg } from "@/utils/formatear-fecha";
import { MessageSquare, Clock, ImageIcon } from "lucide-react";

interface HistorialEstadosDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticketNro: string;
  historial: HistorialEstado[];
}

export const HistorialEstadosDialog = ({ 
  open, 
  onOpenChange, 
  ticketNro, 
  historial 
}: HistorialEstadosDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl border-b pb-2">
            <MessageSquare className="text-blue-600" size={24} />
            Historial de Estados - #{ticketNro}
          </DialogTitle>
        </DialogHeader>

        {/* Scroll nativo con div */}
        <div className="max-h-[450px] overflow-y-auto mt-6 pr-2 custom-scrollbar">
          <div className="relative border-l-2 border-slate-200 ml-4 space-y-8 pb-4">
            {historial.length === 0 ? (
              <p className="text-sm text-slate-500 pl-4">No hay registros de cambios de estado.</p>
            ) : (
              historial.map((h, index) => (
                <div key={h.id} className="relative pl-8">
                  {/* Indicador de la línea de tiempo (Timeline dot) */}
                  <div 
                    className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white shadow-sm 
                    ${index === 0 ? "bg-blue-600 ring-4 ring-blue-50" : "bg-slate-300"}`} 
                  />
                  
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-start">
                      <span className={`font-bold text-sm ${index === 0 ? "text-blue-700" : "text-slate-700"}`}>
                        {h.estado.nombre}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono bg-slate-50 px-2 py-0.5 rounded">
                        <Clock size={12} />
                        {formatearFechaArg(h.fechaHoraInicio)}
                      </span>
                    </div>

                    {/* Rango de tiempo si existe fecha de fin */}
                    {h.fechaHoraFin && (
                      <span className="text-[10px] text-slate-400 italic">
                        Finalizó: {formatearFechaArg(h.fechaHoraFin)}
                      </span>
                    )}

                    {/* Sección de Imágenes si existen */}
                    {h.imagenUrl && h.imagenUrl.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {h.imagenUrl.map((img, i) => (
                          <div key={i} className="relative group cursor-pointer">
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors rounded-md" />
                            <img 
                              src={img} 
                              alt="Evidencia estado" 
                              className="h-10 w-10 object-cover rounded-md border border-slate-200"
                            />
                            <ImageIcon size={10} className="absolute bottom-1 right-1 text-white drop-shadow-md" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};