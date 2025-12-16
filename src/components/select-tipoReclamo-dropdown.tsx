import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TipoReclamoDto } from "@/interfaces/tipo-reclamo.dto";
import { obtenerTiposReclamo } from "@/services/TipoReclamoService";
import { useEffect, useState } from "react";

interface SelectTipoReclamoDropdownProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function SelectTipoReclamoDropdown({
  value,
  onValueChange,
}: SelectTipoReclamoDropdownProps) {
  const [tipos, setTipos] = useState<TipoReclamoDto[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarTipos();
  }, []);

  const cargarTipos = async () => {
    setLoading(true);
    try {
      const data = await obtenerTiposReclamo();
      setTipos(data || []);
    } catch (error) {
      console.error("Error al cargar tipos de reclamo:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectedNombre =
    tipos.find((t) => String(t._id) === value)?.nombre || "";

  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      disabled={loading}
    >
      <SelectTrigger className="w-full">
        <SelectValue>
          {loading
            ? "Cargando tipos de reclamo..."
            : selectedNombre || "Seleccionar tipo de reclamo..."}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {tipos.map((tipo) => (
          <SelectItem
            key={tipo._id}
            value={String(tipo._id)}
          >
            {tipo.nombre}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
