import type { Feedback } from "../feedback/interfaces/feedback-interface";
import api from "../utils/api";

export const feedback= async (
    feedbackData: Feedback
): Promise<void> => {
  try {
    console.log("Enviando feedback:", feedbackData);
    const response = await api.post<void>(`/feedback`, feedbackData);
    return response.data;
  } catch (error) {
    console.error("Error al hacer feedback:", error);
    throw error;
  }
};