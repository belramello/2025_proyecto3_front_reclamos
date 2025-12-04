import { ArrowUpRightIcon } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function EmptyReclamosPendientes() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ArrowUpRightIcon />
        </EmptyMedia>
        <EmptyTitle>Sin reclamos pendientes a asignar</EmptyTitle>
        <EmptyDescription>
          No hay reclamos pendientes actualmente asignados a tu área.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
