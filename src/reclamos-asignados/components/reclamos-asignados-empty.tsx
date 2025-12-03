import { ArrowUpRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useNavigate } from "react-router-dom";

export function EmptyReclamosAsignados() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ArrowUpRightIcon />
        </EmptyMedia>
        <EmptyTitle>Sin reclamos asignados</EmptyTitle>
        <EmptyDescription>
          No tienes reclamos asignados actualmente. Consultá la sección de tu
          subárea para auto-asignarte uno.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>
            <a href="/mi-subarea">Ir a mi Subárea</a>
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
}
