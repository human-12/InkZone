import { GoogleGenAI, Type, Schema } from "@google/genai";
import { GeneratedInk } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const inkSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    name: {
      type: Type.STRING,
      description: "A premium name for the textile ink color.",
    },
    hex: {
      type: Type.STRING,
      description: "The CSS hex color code for the ink.",
    },
    description: {
      type: Type.STRING,
      description: "A technical yet marketing-savvy description suitable for fashion designers (max 30 words).",
    },
    composition: {
      type: Type.OBJECT,
      properties: {
        viscosity: {
          type: Type.NUMBER,
          description: "Viscosity rating from 0 (Water) to 100 (Thick Plastisol).",
        },
        saturation: {
          type: Type.NUMBER,
          description: "Pigment load rating from 0 to 100.",
        },
        sheen: {
          type: Type.STRING,
          description: "Finish on fabric (e.g., Matte, Soft Hand, Gloss, Puff, Metallic).",
        }
      },
      required: ["viscosity", "saturation", "sheen"],
    },
  },
  required: ["name", "hex", "description", "composition"],
};

export const generateInkFromMood = async (mood: string): Promise<GeneratedInk> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Create a unique textile printing ink or dye definition based on this fashion mood or fabric inspiration: "${mood}". 
      The brand "InkZone" creates high-end screen printing inks (Plastisol, Water-based, Discharge).
      Focus on properties like opacity, hand feel, and vibrancy on cotton/poly blends.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: inkSchema,
        temperature: 0.8,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as GeneratedInk;
  } catch (error) {
    console.error("Error generating ink:", error);
    // Fallback in case of error
    return {
      name: "Carbon Black Plastisol",
      hex: "#101010",
      description: "The industry standard for high-opacity black. Creamy consistency for high-speed automatic presses.",
      composition: { viscosity: 85, saturation: 100, sheen: "Satin" }
    };
  }
};