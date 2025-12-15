import { CheckCircle, XCircle } from "lucide-react";

export interface AlertProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const RegistrationAlert = ({ message, type, onClose }: AlertProps) => {
  // Definición de colores y iconos basados en el tipo
  const Icon = type === 'success' ? CheckCircle : XCircle;
  
  // Estilos de color
  const baseClasses = "flex items-center justify-between p-4 mb-4 rounded-xl shadow-md transition-all duration-300 transform";
  const successClasses = "bg-green-100 border-green-400 text-green-700";
  const errorClasses = "bg-red-100 border-red-400 text-red-700";
  
  // Clases del botón de cerrar
  const closeButtonClasses = `ml-4 p-1 rounded-full hover:bg-opacity-50 transition ${
    type === 'success' ? 'text-green-700 hover:bg-green-200' : 'text-red-700 hover:bg-red-200'
  }`;

  return (
    <div className={`${baseClasses} ${type === 'success' ? successClasses : errorClasses}`}>
      <div className="flex items-center">
        <Icon className="w-5 h-5 mr-3" />
        <p className="font-medium text-sm">{message}</p>
      </div>
      <button 
        onClick={onClose} 
        className={closeButtonClasses}
        aria-label="Cerrar alerta"
      >
        <XCircle className="w-4 h-4" />
      </button>
    </div>
  );
};

export default RegistrationAlert;