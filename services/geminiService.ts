import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult, InsulatorStatus } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelId = "gemini-2.5-flash";

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    status: {
      type: Type.STRING,
      enum: [
        InsulatorStatus.NORMAL,
        InsulatorStatus.FLASHOVER,
        InsulatorStatus.BROKEN,
        InsulatorStatus.UNKNOWN,
      ],
      description: "The condition of the electrical insulator.",
    },
    confidence: {
      type: Type.NUMBER,
      description: "Confidence score between 0 and 100.",
    },
    description: {
      type: Type.STRING,
      description: "A detailed visual description of the findings in Thai language.",
    },
    recommendation: {
      type: Type.STRING,
      description: "Recommended action for the patrol officer in Thai language.",
    },
  },
  required: ["status", "confidence", "description", "recommendation"],
};

export const analyzeInsulatorImage = async (base64Image: string, mimeType: string): Promise<AnalysisResult> => {
  try {
    const prompt = `
      You are an expert electrical grid inspector AI designed to assist patrol officers.
      Analyze the provided image of an electrical insulator (ลูกถ้วยไฟฟ้า).
      
      Look specifically for:
      1. Flashover marks: Burn marks, carbon tracking, or scorching on the surface.
      2. Physical damage: Cracks, chipped sheds, broken parts, or missing components.
      3. Normal condition: Clean surface, intact structure, no visible defects.
      
      If the image does not contain an insulator, return status UNKNOWN.
      Provide a clear description and a safety recommendation in Thai language (ภาษาไทย).
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image,
            },
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.2, // Low temperature for consistent analysis
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI model.");
    }

    const result = JSON.parse(text) as AnalysisResult;
    return result;

  } catch (error) {
    console.error("Analysis failed:", error);
    throw new Error("ไม่สามารถวิเคราะห์ภาพได้ กรุณาลองใหม่อีกครั้ง");
  }
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the Data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};