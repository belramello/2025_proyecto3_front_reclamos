import React from 'react';

// Definición de las props para el componente
interface FeedbackConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  rating: number;
  comment: string;
}

const FeedbackConfirmationDialog: React.FC<FeedbackConfirmationDialogProps> = ({
  isOpen,
  onClose,
  rating,
  comment,
}) => {
  if (!isOpen) {
    return null;
  }

  // Clases base para Tailwind CSS
  const dialogClasses = "fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 transition-opacity";
  const contentClasses = "bg-white rounded-xl shadow-2xl p-6 w-11/12 max-w-md transform transition-all scale-100";

  return (
    <div className={dialogClasses} onClick={onClose}>
      <div className={contentClasses} onClick={(e) => e.stopPropagation()}>
        
        <div className="flex flex-col items-center">
          <svg className="w-16 h-16 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h2 className="text-xl font-bold mb-2 text-gray-800">¡Feedback Enviado con Éxito!</h2>
          <p className="text-gray-600 mb-4 text-center">Gracias por compartir tu experiencia. Tu opinión es muy valiosa para nosotros.</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="font-semibold text-gray-700">Detalles del Feedback:</p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Calificación:</span> {rating} {'★'.repeat(rating)}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <span className="font-medium">Comentario:</span> {comment || "No se proporcionó ningún comentario adicional."}
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Aceptar
        </button>

      </div>
    </div>
  );
};

export default FeedbackConfirmationDialog;