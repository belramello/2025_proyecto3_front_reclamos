import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { HistorialAsignacion } from "@/interfaces/historial-asignacion.dto";
import { formatearFechaArg } from "@/utils/formatear-fecha";
import { Users, MapPin, ArrowRight, UserCircle } from "lucide-react";

interface HistorialAsignacionesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticketNro: string;
  historial: HistorialAsignacion[];
}


const formatearTipoAsignacion = (t: string) => {
  const separado = t
    // caso 1: minúscula + mayúscula
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    // caso 2: mayúscula + mayúscula + minúscula
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");

  return separado
    .replace("Asignacion", "Asignación")
    .replace("Autoasignacion", "Autoasignación")
    .replace("Area", "Área")
    .replace("Subarea", "Subárea")
    .replace("Empleado", "Empleado");
};


export const HistorialAsignacionesDialog = ({ 
  open, 
  onOpenChange, 
  ticketNro, 
  historial 
}: HistorialAsignacionesDialogProps) => {

  const getDestinoNombre = (asig: HistorialAsignacion) => {
    if (asig.haciaEmpleado) return asig.haciaEmpleado.nombre; 
    if (asig.haciaSubarea) return asig.haciaSubarea.nombre;
    if (asig.haciaArea) return asig.haciaArea.nombre;
    return "N/A";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl text-slate-800 border-b pb-2">
            <Users className="text-green-600" size={24} />
            Flujo de Asignaciones - #{ticketNro}
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[450px] overflow-y-auto mt-4 pr-2 space-y-4 custom-scrollbar">
          {historial.length === 0 ? (
            <p className="text-center text-gray-500 py-10">No hay registros de asignación.</p>
          ) : (
            historial.map((asig, index) => (
              <div 
                key={asig.id} 
                className="group relative flex flex-col p-4 bg-white border border-slate-200 rounded-xl hover:border-green-200 hover:bg-green-50/30 transition-all shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-green-100 rounded-lg text-green-700">
                      {asig.haciaEmpleado ? <UserCircle size={16} /> : <MapPin size={16} />}
                    </div>

                    <span className="font-bold text-slate-700 uppercase text-xs tracking-wide">
                      {formatearTipoAsignacion(asig.tipoAsignacion)}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    {formatearFechaArg(asig.fechaAsignacion)}
                  </span>
                </div>

                <div className="text-sm text-slate-600 ml-9">
                  <span className="font-semibold text-slate-800">Asignado a:</span> {getDestinoNombre(asig)}
                </div>

                {asig.comentario && (
                  <div className="mt-3 ml-9 text-xs text-slate-500 border-l-2 border-green-200 pl-3 italic bg-slate-50/50 py-1">
                    {asig.comentario}
                  </div>
                )}
                
                {index < historial.length - 1 && (
                  <div className="absolute -bottom-5 left-7 z-10 text-slate-300">
                    <ArrowRight size={16} className="rotate-90" />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
