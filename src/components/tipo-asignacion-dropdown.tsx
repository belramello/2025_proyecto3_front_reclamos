// components/SelectTipoAsignacionDropdown.tsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectTipoAsignacionDropdownProps {
  value?: string | null;
  onValueChange: (value: string) => void;
}

export function SelectTipoAsignacionDropdown({
  value,
  onValueChange,
}: SelectTipoAsignacionDropdownProps) {
  return (
    <Select value={value || undefined} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Reasignar a..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tipo de asignación</SelectLabel>
          <SelectItem value="area">Área</SelectItem>
          <SelectItem value="subarea">Subárea</SelectItem>
          <SelectItem value="empleado">Empleado</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
