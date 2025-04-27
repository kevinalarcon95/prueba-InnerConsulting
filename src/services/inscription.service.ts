import { env } from "@/config/env";
import { IFormData } from "@/types";

const API_URL = env.apiBaseUrl;

export const sendInscription = async (data: IFormData) => {
  try {
    const response = await fetch( `${API_URL}/inscripciones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    return response.json();
  } catch (error) {
    console.error("Error al enviar la inscripción:", error);
    throw new Error("Error al enviar la inscripción");
  }
};
