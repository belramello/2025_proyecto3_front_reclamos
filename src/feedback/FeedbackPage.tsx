import React, { useState, useCallback } from "react";

const FeedbackPage: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const handleSubmit = useCallback(() => {
    alert(`Feedback enviado:\nCalificación: ${rating}\nComentario: ${comment}`);
  }, [rating, comment]);

  return (
    <div className="min-h-screen flex bg-gray-100 p-6 justify-center">

      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md p-8">

        <h1 className="text-3xl font-bold mb-2">Hola, Usuario 👋</h1>
        <h2 className="text-xl text-gray-600 mb-8">
          ¿Cómo te pareció el servicio?
        </h2>

        {/* --- Sección en fila: rating + reclamo --- */}
        <div className="flex gap-6 mb-8">

          {/* Rating Card */}
          <div className="flex items-center gap-6 bg-white p-5 rounded-2xl shadow-sm w-fit">
            <div className="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center font-bold text-white text-xl">
              M
            </div>

            <div className="flex gap-3 text-3xl cursor-pointer select-none">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={
                    star <= rating
                      ? "text-yellow-400 hover:scale-110 transition"
                      : "text-gray-300 hover:text-yellow-300 hover:scale-110 transition"
                  }
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* Right Card (Reclamo Activo) */}
          <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">
              Tu Último Reclamo Activo
            </h3>

            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
              <div className="w-11 h-11 bg-indigo-300 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>

              <div>
                <p className="font-semibold text-gray-800">Mi Reclamo N°1</p>
                <p className="text-sm text-gray-500">Proyecto X</p>
              </div>
            </div>
          </div>

        </div>

        {/* Comentarios */}
        <label className="font-medium text-gray-700">
          Comentarios adicionales (Opcional)
        </label>

        <textarea
          className="w-full h-28 border border-gray-300 rounded-xl p-3 mt-2
                     resize-none focus:ring-2 focus:ring-blue-400 outline-none transition"
          placeholder="Escribe tu comentario aquí..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* Botón negro */}
        <button
          disabled={rating === 0}
          onClick={handleSubmit}
          className="mt-6 w-full bg-black text-white py-3 rounded-xl 
                     font-medium hover:bg-gray-900 
                     active:scale-[0.98] transition 
                     disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Enviar Feedback
        </button>
      </div>
    </div>
  );
};

export default FeedbackPage;
