import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { cerrarReclamo } from "@/services/ReclamosService";

interface ResolverReclamoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reclamoId: string;
  onSuccess: () => void;
  reclamoNroTicket: string;
}

const ResolverReclamoDialog = ({
  open,
  onOpenChange,
  reclamoId,
  onSuccess,
  reclamoNroTicket,
}: ResolverReclamoDialogProps) => {
  const [resumenResolucion, setResumenResolucion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCerrarReclamo = async () => {
    if (!resumenResolucion.trim()) {
      setError("El comentario sobre la resolución es obligatorio.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await cerrarReclamo(reclamoId, resumenResolucion);
      // Llama a onSuccess para recargar la lista o actualizar el estado
      onSuccess();
      // Cierra el diálogo
      onOpenChange(false);
      // Limpia el estado
      setResumenResolucion("");
    } catch (err) {
      console.error("Fallo al resolver el reclamo:", err);
      setError("Hubo un error al intentar resolver el reclamo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Resolver Reclamo N° {reclamoNroTicket}</DialogTitle>
          <DialogDescription>
            Deja un comentario sobre la resolución del reclamo. Este comentario
            será registrado.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="resolucion">Comentario de Resolución</Label>
            <Textarea
              id="resolucion"
              placeholder="Describe cómo se resolvió el reclamo..."
              value={resumenResolucion}
              onChange={(e) => {
                setResumenResolucion(e.target.value);
                if (error) setError(null); // Limpiar error al empezar a escribir
              }}
              className="resize-none"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            onClick={handleCerrarReclamo}
            disabled={isLoading || !resumenResolucion.trim()}
          >
            {isLoading ? "Resolviendo..." : "RESOLVER RECLAMO"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResolverReclamoDialog;