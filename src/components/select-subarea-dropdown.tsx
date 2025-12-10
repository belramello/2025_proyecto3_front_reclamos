import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SubareaDeUsuarioDto } from "@/interfaces/subarea.dto";
import { obtenerSubareasDeUsuario } from "@/services/SubareaService";
import { useEffect, useState } from "react";

interface SelectSubareaDropdownProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function SelectSubareaDropdown({
  value,
  onValueChange,
}: SelectSubareaDropdownProps) {
  const [subareas, setSubareas] = useState<SubareaDeUsuarioDto[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarSubareas();
  }, []);

  const cargarSubareas = async () => {
    setLoading(true);
    try {
      const subareas = await obtenerSubareasDeUsuario();
      setSubareas(subareas || []);
    } catch (error) {
      console.error("Error al cargar subáreas:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Select value={value} onValueChange={onValueChange} disabled={loading}>
      <SelectTrigger className="w-full">
        <SelectValue
          placeholder={
            loading ? "Cargando subáreas..." : "Seleccionar subárea..."
          }
        />
      </SelectTrigger>
      <SelectContent>
        {subareas.map((subarea) => (
          <SelectItem key={subarea.id} value={subarea.id}>
            {subarea.nombre}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
