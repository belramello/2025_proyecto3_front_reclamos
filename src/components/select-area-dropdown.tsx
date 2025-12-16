import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AreaDto } from "@/interfaces/area-dto";
import { obtenerAreasDeUsuario } from "@/services/AreaService";
import { useEffect, useState } from "react";

interface SelectAreaDropdownProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function SelectAreaDropdown({
  value,
  onValueChange,
}: SelectAreaDropdownProps) {
  const [areas, setAreas] = useState<AreaDto[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarAreas();
  }, []);

  const cargarAreas = async () => {
    setLoading(true);
    try {
      const areas = await obtenerAreasDeUsuario();
      setAreas(areas || []);
    } catch (error) {
      console.error("Error al cargar áreas:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Select value={value} onValueChange={onValueChange} disabled={loading}>
      <SelectTrigger className="w-full">
        <SelectValue
          placeholder={loading ? "Cargando áreas..." : "Seleccionar área..."}
        />
      </SelectTrigger>
      <SelectContent>
        {areas.map((area) => (
          <SelectItem key={area.id} value={area.id}>
            {area.nombre}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
