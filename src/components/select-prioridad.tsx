import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Prioridad } from "@/enums/prioridad.enum";

interface SelectPrioridadDropdownProps {
  value: Prioridad | "";
  onValueChange: (value: Prioridad) => void;
}

const colores: Record<Prioridad, string> = {
  Alta: "text-red-600",
  Media: "text-yellow-600",
  Baja: "text-green-600",
};

export function SelectPrioridadDropdown({
  value,
  onValueChange,
}: SelectPrioridadDropdownProps) {
  return (
    <Select
      value={value}
      onValueChange={(v) => onValueChange(v as Prioridad)} // ← FIX REAL
    >
      <SelectTrigger className="w-32 h-9 px-3 text-sm">
        <SelectValue>
          <span className={value ? colores[value as Prioridad] : ""}>
            {value || "Prioridad"}
          </span>
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {Object.values(Prioridad).map((p) => (
          <SelectItem key={p} value={p}>
            <span className={colores[p]}>{p}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
