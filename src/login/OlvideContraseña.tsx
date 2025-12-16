import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { forgotPassword } from "@/services/UsuariosService";

export default function OlvideContrasenaScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError(null);

    try {
      await forgotPassword({ email } as any);
      setEnviado(true);
    } catch (err: any) {
      console.error("Error al solicitar recuperación:", err);
      const mensaje = err.response?.data?.message || "No se pudo enviar el correo.";
      setError(Array.isArray(mensaje) ? mensaje[0] : mensaje);
    } finally {
      setLoading(false);
    }
  };

  if (enviado) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <Card className="w-full max-w-md bg-white p-4 rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.08)] border-none text-center">
          <CardHeader>
            <div className="mx-auto mb-4 bg-green-100 p-3 rounded-full w-fit">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-semibold text-gray-800">¡Correo enviado!</CardTitle>
            <CardDescription className="text-gray-500 pt-2 text-base">
              Si la cuenta <strong>{email}</strong> existe, recibirás un enlace de recuperación en breve.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col gap-3">
            <Button 
              className="w-full py-6 bg-black text-white hover:bg-gray-900 rounded-xl transition-all font-medium" 
              onClick={() => navigate("/login")}
            >
              Volver al inicio de sesión
            </Button>
            <Button 
              variant="link" 
              className="text-gray-400 hover:text-gray-600" 
              onClick={() => setEnviado(false)}
            >
              ¿No recibiste nada? Reintentar
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md bg-white p-2 rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.08)] border-none">
        <CardHeader className="space-y-1">
          <button 
            onClick={() => navigate("/login")}
            className="flex items-center text-sm text-gray-400 hover:text-gray-600 transition-colors mb-6 w-fit group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> 
            Volver al login
          </button>
          <CardTitle className="text-3xl font-semibold text-gray-800">Recuperar cuenta</CardTitle>
          <CardDescription className="text-gray-500">
            Ingresa tu email institucional para enviarte las instrucciones de acceso.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium ml-1">Email institucional</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="ejemplo@empresa.com"
                  className="w-full pl-12 py-6 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-3 text-sm font-medium text-red-600 bg-red-50 p-4 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </CardContent>

          <CardFooter className="pt-2 pb-6">
            <Button 
              type="submit" 
              className="w-full py-7 bg-black text-white hover:bg-gray-900 rounded-xl transition-all font-semibold text-base shadow-lg shadow-black/10 disabled:bg-gray-300" 
              disabled={loading || !email}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Spinner className="h-5 w-5 text-white" />
                  <span>Enviando...</span>
                </div>
              ) : (
                "Enviar instrucciones"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}