import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { activarCuentaUsuario } from "@/services/ServicioAutenticacion"; // Importamos del servicio que acabamos de editar
import { Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";

export default function ActivarCuentaScreen() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Obtenemos el token de la URL (ej: ?token=xyz...)
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Validación inicial: Si no hay token, es un acceso inválido
  useEffect(() => {
    if (!token) {
      setError("Token no proporcionado. El enlace es inválido.");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (!token) return;

    setLoading(true);
    try {
      await activarCuentaUsuario(token, formData.password);
      setSuccess(true);
    } catch (err: any) {
      const msg = err.response?.data?.message || "Ocurrió un error al activar la cuenta. El enlace puede haber expirado.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md text-center shadow-lg border-green-200">
          <CardHeader>
            <div className="mx-auto mb-4 bg-green-100 p-3 rounded-full w-fit">
                <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-700">¡Cuenta Activada!</CardTitle>
            <CardDescription>
              Tu contraseña ha sido establecida correctamente.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
                className="w-full bg-green-600 hover:bg-green-700" 
                onClick={() => navigate("/login")}
            >
              Ir al Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Activar Cuenta</CardTitle>
          <CardDescription className="text-center">
            Define tu contraseña para completar el registro y acceder al sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!token ? (
            <div className="flex flex-col items-center gap-2 text-red-500 p-4 bg-red-50 rounded">
                <AlertCircle />
                <p>Enlace inválido o incompleto.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-2">
                <Label htmlFor="password">Nueva Contraseña</Label>
                <div className="relative">
                    <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                    placeholder="Mínimo 6 caracteres"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  required
                  placeholder="Repite la contraseña"
                />
              </div>

              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-100 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Activando..." : "Activar y Acceder"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}