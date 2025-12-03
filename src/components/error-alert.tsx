import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

interface CustomAlertProps {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
}

export const ErrorAlert = ({ title, description }: CustomAlertProps) => {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        <p>{description}</p>
      </AlertDescription>
    </Alert>
  );
};
