import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { SelectTipoAsignacionDropdown } from "@/components/tipo-asignacion-dropdown";
import { SelectAreaDropdown } from "@/components/select-area-dropdown";
import { SelectSubareaDropdown } from "@/components/select-subarea-dropdown";
import { SelectEmpleadoDropdown } from "@/components/select-empleado-dropdown";
import { ErrorAlert } from "@/components/error-alert";
import { Loader2 } from "lucide-react";
import type { ReclamoPendienteAsignarDto } from "./interfaces/reclamo-pendiente-a-asignar.dto";
import { asignarReclamo } from "@/services/ReclamosService";
interface ReasignarReclamoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reclamo: ReclamoPendienteAsignarDto;
}

export interface AsignacionData {
  tipoAsignacion: "area" | "subarea" | "empleado";
  destinoId: string;
  comentario?: string;
}

const AsignarReclamoDialog = ({
  open,
  onOpenChange,
  reclamo,
}: ReasignarReclamoDialogProps) => {
  const [tipoAsignacion, setTipoAsignacion] = useState<
    "area" | "subarea" | "empleado" | null
  >(null);
  const [destinoId, setDestinoId] = useState("");
  const [comentario, setComentario] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tipoAsignacion || !destinoId) {
      return;
    }
    try {
      setLoading(true);
      await asignarReclamo(
        reclamo.reclamoId,
        tipoAsignacion,
        destinoId,
        comentario
      );
      handleClose();
    } catch (err: any) {
      console.error("Error al reasignar reclamo:", err);
      let mensaje = "Ocurrió un error inesperado.";
      if (err.response?.data?.message) {
        mensaje = err.response.data.message;
      }
      if (Array.isArray(err.response?.data?.message)) {
        mensaje = err.response.data.message.join(", ");
      }
      setError("Descripción: " + mensaje);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError(null);
    setTipoAsignacion(null);
    setDestinoId("");
    setComentario("");
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[700px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>
                Asignar Reclamo N° {reclamo.reclamoNroTicket} -{" "}
                {reclamo.reclamoTitulo}
              </DialogTitle>
              <DialogDescription>
                Proyecto: {reclamo.nombreProyecto}
              </DialogDescription>
              <DialogDescription>
                Cliente: {reclamo.nombreApellidoCliente}
              </DialogDescription>
              <DialogDescription>Estado: {reclamo.estado}</DialogDescription>
              <DialogDescription>
                Derivado a área desde:{" "}
                {reclamo.fechaHoraInicioAsignacion.toLocaleDateString()}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-3">
                <Label htmlFor="tipo-asignacion">Asignar a:</Label>
                <SelectTipoAsignacionDropdown
                  value={tipoAsignacion}
                  onValueChange={(value) => {
                    setTipoAsignacion(value as "area" | "subarea" | "empleado");
                    setDestinoId("");
                  }}
                />
              </div>
              {tipoAsignacion && (
                <div className="grid gap-3">
                  <Label htmlFor="destino">
                    Seleccione a quién/qué se asignará el reclamo:
                  </Label>
                  {tipoAsignacion === "area" && (
                    <SelectAreaDropdown
                      value={destinoId}
                      onValueChange={setDestinoId}
                    />
                  )}

                  {tipoAsignacion === "subarea" && (
                    <SelectSubareaDropdown
                      value={destinoId}
                      onValueChange={setDestinoId}
                    />
                  )}

                  {tipoAsignacion === "empleado" && (
                    <SelectEmpleadoDropdown
                      value={destinoId}
                      onValueChange={setDestinoId}
                      tipoUsuario="encargado"
                    />
                  )}
                </div>
              )}
              <div className="grid gap-3">
                <Label htmlFor="comentario">
                  Agregue un comentario adicional (opcional):
                </Label>
                <Textarea
                  id="comentario"
                  placeholder="Si desea, agregue un comentario significativo referente a la reasignación."
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                />
              </div>
              {error && (
                <ErrorAlert
                  title="Error al reasignar el reclamo. Por favor, inténtalo de nuevo."
                  description={error}
                />
              )}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={loading || !tipoAsignacion || !destinoId}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Asignando...
                  </>
                ) : (
                  "Asignar"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AsignarReclamoDialog;
