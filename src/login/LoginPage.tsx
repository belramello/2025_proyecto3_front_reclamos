import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginRequest } from "../services/ServicioAutenticacion";
import { AuthContext } from "../auth/context/contexto";
import logo from "../assets/logo.png";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  if (!auth) return null;
  const { login } = auth;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await loginRequest({
        email: formData.email,
        contraseña: formData.password,
      });
      login(data.usuario.permisos);
      navigate("/inicio");
    } catch {
      setError("Credenciales incorrectas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.08)]">
      <div className="flex justify-center mb-4">
          <img src={logo} alt="Logo de la empresa" className="h-24 w-auto" /> 
        </div>
        <h2 className="text-3xl font-semibold text-center mb-1 text-gray-800">
          Bienvenido
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Iniciá sesión para continuar
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="ejemplo@correo.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              required
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center mt-1">
              {error}
            </div>
          )}

          {/* BOTÓN */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-black text-white font-medium rounded-xl 
                      hover:bg-gray-900 active:scale-[0.98] transition 
                      disabled:bg-gray-400"
          >
            {loading ? "Cargando..." : "Ingresar"}
          </button>

        </form>

        <div className="mt-5 text-center">
          <Link
            to="/forgot-password"
            className="text-sm text-gray-500 hover:text-gray-900 transition font-medium"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
    </div>
  );
}
