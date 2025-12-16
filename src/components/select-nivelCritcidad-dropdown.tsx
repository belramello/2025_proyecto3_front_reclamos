import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface SelectCriticidadDropdownProps {
  value: number | "";
  onValueChange: (value: number) => void;
}

export function SelectCriticidadDropdown({
  value,
  onValueChange,
}: SelectCriticidadDropdownProps) {
  const numeros = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <Select
      value={value === "" ? "" : String(value)}
      onValueChange={(v) => onValueChange(Number(v))}
    >
      <SelectTrigger className="w-24 h-9 px-3 text-sm">
        <SelectValue placeholder="Nivel">
          {value || "Nivel"}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {numeros.map((n) => (
          <SelectItem key={n} value={String(n)}>
            {n}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
