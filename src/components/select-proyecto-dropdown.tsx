import  { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { ProyectoDto } from "@/interfaces/proyecto.dto";
import { obtenerProyectos } from "@/services/ProyectoService";

interface SelectProyectosDropdownProps {
  clienteId: string;
  value: string | "";
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

export function SelectProyectosDropdown({
  clienteId,
  value,
  onValueChange,
  disabled = false,
}: SelectProyectosDropdownProps) {
  const [proyectos, setProyectos] = useState<ProyectoDto[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!clienteId) {
      setProyectos([]);
      return;
    }

    const cargarProyectos = async () => {
      setCargando(true);
      setError(null);

      try {
        const datos = await obtenerProyectos(clienteId);
        setProyectos(datos || []);
      } catch {
        setError("Error al cargar los proyectos.");
        setProyectos([]);
      } finally {
        setCargando(false);
      }
    };

    cargarProyectos();
  }, [clienteId]);

  const controlledValue = value ?? "";

  const selectedTitulo =
    proyectos.find((p) => String(p._id) === controlledValue)?.titulo || "";

  let placeholderText = "Seleccionar Proyecto";
  let isDisabled = disabled || cargando || !!error;

  if (cargando) placeholderText = "Cargando proyectos...";
  else if (error) placeholderText = `Error (${error})`;
  else if (!clienteId) placeholderText = "Seleccione un cliente primero";
  else if (proyectos.length === 0) placeholderText = "No hay proyectos disponibles";

  return (
    <Select
      value={controlledValue}
      onValueChange={onValueChange}
      disabled={isDisabled}
    >
      <SelectTrigger className="w-[250px] h-9 px-3 text-sm">
        <SelectValue>
          {selectedTitulo || placeholderText}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {proyectos.map((proyecto) => (
          <SelectItem key={proyecto._id} value={String(proyecto._id)}>
            {proyecto.titulo}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
