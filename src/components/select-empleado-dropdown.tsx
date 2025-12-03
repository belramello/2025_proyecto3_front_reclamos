import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { EmpleadoDeSubareaDeLogueadoDto } from "@/interfaces/find-all-empleado-de-subarea-de-logueado.dto";
import { obtenerEmpleadosDeSubareaDeLogueado } from "@/services/UsuariosService";
import { useEffect, useState } from "react";

interface SelectEmpleadoDropdownProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function SelectEmpleadoDropdown({
  value,
  onValueChange,
}: SelectEmpleadoDropdownProps) {
  const [empleados, setEmpleados] = useState<EmpleadoDeSubareaDeLogueadoDto[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    setLoading(true);
    try {
      const empleados = await obtenerEmpleadosDeSubareaDeLogueado();
      setEmpleados(empleados || []);
    } catch (error) {
      console.error("Error al cargar empleados:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Select value={value} onValueChange={onValueChange} disabled={loading}>
      <SelectTrigger className="w-full">
        <SelectValue
          placeholder={
            loading ? "Cargando empleados..." : "Seleccionar empleado..."
          }
        />
      </SelectTrigger>
      <SelectContent>
        {empleados.map((empleado) => (
          <SelectItem key={empleado.id} value={empleado.id}>
            {empleado.nombre}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
