import React from "react";
import { useNavigate } from "react-router-dom";

interface FeedbackConfirmationDialogProps {
  isOpen: boolean;
  rating: number;
  comment: string;
}

const FeedbackConfirmationDialog: React.FC<FeedbackConfirmationDialogProps> = ({
  isOpen,
  rating,
  comment,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleAccept = () => {
    navigate("/inicio");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icono */}
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-9 w-9 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Título */}
        <h2 className="text-center text-xl font-semibold text-gray-800">
          ¡Feedback enviado!
        </h2>

        <p className="mt-2 text-center text-sm text-gray-600">
          Gracias por ayudarnos a mejorar con tu opinión.
        </p>

        {/* Detalles */}
        <div className="mt-5 rounded-xl bg-gray-50 p-4 text-sm text-gray-700">
          <p className="font-medium">
            Calificación:
            <span className="ml-2 text-yellow-500">
              {"★".repeat(rating)}
              {"☆".repeat(5 - rating)}
            </span>
          </p>

          <p className="mt-2">
            <span className="font-medium">Comentario:</span>{" "}
            {comment?.trim() || "Sin comentarios adicionales."}
          </p>
        </div>

        {/* Acción */}
        <button
          onClick={handleAccept}
          className="mt-6 w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default FeedbackConfirmationDialog;
