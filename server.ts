import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy Google Gen AI helper
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

// System safety instruction for UK Pharmacy Business Intelligence
const PHARMACY_SAFETY_SYSTEM_INSTRUCTION = `
You are the AI Growth Assistant for Independent UK Pharmacies.
CRITICAL SAFETY & ETHICAL RULES:
1. You are strictly a BUSINESS, MARKETING, LOCAL SEO, AND ADMINISTRATIVE AUTOMATION ASSISTANT.
2. You are NOT a medical diagnostic tool, clinical decision-support system, prescribing tool, or replacement for a registered pharmacist (GPhC).
3. NEVER provide patient-specific medical diagnosis, treatment recommendations, prescribing advice, dosage calculations, or personalised medical advice.
4. When healthcare-related topics arise (e.g., Pharmacy First, travel health, flu vaccinations, blood pressure checks, minor ailments), provide only general business, educational, marketing, or patient communication advice. Always state that clinical aspects require pharmacist/clinician review.
5. Emphasize UK independent community pharmacy context (NHS England/Scotland/Wales Pharmacy First service, private clinical services, travel health clinics, local community catchment, General Pharmaceutical Council standards).
6. Never invent fake analytics data, fake testimonials, or fake customer reviews.
7. Be practical, commercial, concise, and prioritize real business actions over generic marketing fluff.
`;

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// General AI generation endpoint
app.post("/api/ai/generate", async (req, res) => {
  try {
    const { prompt, systemInstruction, responseJson } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const client = getAIClient();
    if (!client) {
      return res.status(503).json({
        error: "GEMINI_API_KEY not configured on server",
        fallbackAvailable: true,
      });
    }

    const combinedSystemInstruction = [
      PHARMACY_SAFETY_SYSTEM_INSTRUCTION,
      systemInstruction || "",
    ]
      .filter(Boolean)
      .join("\n\n");

    const config: any = {
      systemInstruction: combinedSystemInstruction,
      temperature: 0.4,
    };

    if (responseJson) {
      config.responseMimeType = "application/json";
    }

    const response = await client.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config,
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("AI Generation error:", error);
    res.status(500).json({
      error: error.message || "Failed to generate AI response",
      fallbackAvailable: true,
    });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Pharmacy AI Growth Assistant server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
