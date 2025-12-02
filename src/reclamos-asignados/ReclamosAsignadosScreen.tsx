import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function ReclamosAsignadosScreen() {
  return (
    <>
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Mis reclamos asignados
      </h2>
      <p>
        En esta sección se encuentran todos los reclamos que tienes actualmente
        asignados.
      </p>
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>Reclamo N°</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent>
          <p>Hola como estas querido amigo</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </>
  );
}

export default ReclamosAsignadosScreen;
