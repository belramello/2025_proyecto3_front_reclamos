import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound, Eye, EyeOff, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { resetPassword } from "@/services/UsuariosService";

export default function RestablecerContrasenaScreen() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exito, setExito] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    contraseña: "",
    confirmarContraseña: "",
  });

  useEffect(() => {
    if (!token) {
      setError("El enlace es inválido o ha expirado. Por favor, solicita uno nuevo.");
    }
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (formData.contraseña !== formData.confirmarContraseña) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword({
        token: token,
        contraseña: formData.contraseña
      });
      setExito(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err: any) {
      const mensaje = err.response?.data?.message || "Error al actualizar la contraseña.";
      setError(Array.isArray(mensaje) ? mensaje[0] : mensaje);
    } finally {
      setLoading(false);
    }
  };

  if (exito) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <Card className="w-full max-w-md bg-white p-4 rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.08)] border-none text-center">
          <CardHeader>
            <div className="mx-auto mb-4 bg-green-100 p-3 rounded-full w-fit">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-semibold text-gray-800">¡Contraseña actualizada!</CardTitle>
            <CardDescription className="text-gray-500 pt-2 text-base">
              Tu clave ha sido cambiada con éxito. Serás redirigido al inicio de sesión en unos instantes.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button 
              className="w-full py-6 bg-black text-white hover:bg-gray-900 rounded-xl transition-all font-medium" 
              onClick={() => navigate("/login")}
            >
              Ir al Login ahora
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
          <div 
            onClick={() => navigate("/login")}
            className="flex items-center text-sm text-gray-400 hover:text-gray-600 cursor-pointer mb-4 transition-colors w-fit"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al login
          </div>
          <div className="flex items-center gap-3 mb-1">
            <div className="bg-gray-100 p-2.5 rounded-xl">
              <KeyRound className="h-6 w-6 text-gray-700" />
            </div>
            <CardTitle className="text-2xl font-semibold text-gray-800">Nueva contraseña</CardTitle>
          </div>
          <CardDescription className="text-gray-500">
            Crea una nueva clave segura para recuperar el acceso a tu cuenta.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Nueva Contraseña</Label>
              <div className="relative">
                <Input
                  name="contraseña"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-4 py-6 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all pr-12"
                  value={formData.contraseña}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Confirmar Contraseña</Label>
              <Input
                name="confirmarContraseña"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-6 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all"
                value={formData.confirmarContraseña}
                onChange={handleChange}
                required
              />
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
              disabled={loading || !token}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Spinner className="h-5 w-5" /> 
                  <span>Actualizando...</span>
                </div>
              ) : (
                "Restablecer Contraseña"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}