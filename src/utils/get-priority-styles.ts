import { Prioridad } from "@/enums/prioridad.enum";

export const getPriorityStyles = (
  prioridad: Prioridad
): {
  titleColor: string;
  border: string;
  icon: boolean;
  buttonColor: string;
} => {
  switch (prioridad) {
    case Prioridad.ALTO:
      return {
        titleColor: "text-red-700",
        border: "border-3 border-red-700",
        icon: true,
        buttonColor: "bg-red-900 hover:bg-red-800",
      };
    case Prioridad.MEDIO:
      return {
        titleColor: "text-yellow-600",
        border: "border-3 border-yellow-600",
        icon: false,
        buttonColor: "bg-yellow-600 hover:bg-yellow-500",
      };
    default:
      return {
        titleColor: "text-black",
        border: "border border-gray-300",
        icon: false,
        buttonColor: "bg-green-950 hover:bg-green-900",
      };
  }
};
