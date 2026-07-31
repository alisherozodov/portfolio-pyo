import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getAIClient() {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // AI portfolio assistant endpoint powered by Gemini
  app.post("/api/ai-chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      const ai = getAIClient();

      const systemPrompt = `You are Nyxl, an intelligent, chill, and nonchalant AI assistant embedded in Alisher Ozodov's portfolio terminal.

PERSONALITY & TONE:
- Speak naturally like a human developer: relaxed, intelligent, cool, and nonchalant (e.g. "hey, what's up?", "chilling", "sure thing", "here's the deal").
- NEVER sound overly robotic, corporate, or overly hyped ("HELLO! WELCOME!"). Keep responses clean, smart, and direct.
- Answer user questions intelligently about Alisher's projects, skills, education, or general technical/casual queries.
- If asked who you are: "I'm Nyxl, the AI assistant running this terminal workspace."
- If asked about Alisher: "Alisher Ozodov (@nyxlvoid) is an AI developer and software builder specialized in AI systems, computer vision, and web engineering."
- Available terminal commands if asked: help, skills, projects, contact, matrix, clear.`;

      if (!ai) {
        return res.json({
          reply: generateSmartOfflineResponse(message)
        });
      }

      let responseText = "";

      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: message,
          config: {
            systemInstruction: systemPrompt,
          }
        });
        responseText = response.text || "";
      } catch (firstErr: any) {
        console.warn("Gemini 3.6-flash error, trying gemini-flash-latest:", firstErr?.message);
        try {
          const response = await ai.models.generateContent({
            model: "gemini-flash-latest",
            contents: message,
            config: {
              systemInstruction: systemPrompt,
            }
          });
          responseText = response.text || "";
        } catch (secondErr: any) {
          console.warn("Gemini API fallback triggered:", secondErr?.message);
          responseText = generateSmartOfflineResponse(message);
        }
      }

      if (!responseText.trim()) {
        responseText = generateSmartOfflineResponse(message);
      }

      res.json({ reply: responseText });
    } catch (err: any) {
      console.error("AI API Error:", err);
      res.json({ reply: generateSmartOfflineResponse(req.body?.message || "") });
    }
  });

  // Serve static files / Vite middleware
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
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  });
}

function generateSmartOfflineResponse(inputMsg: string): string {
  const m = (inputMsg || "").trim().toLowerCase();
  
  if (m === 'help' || m === 'nyxl --help') {
    return "Commands you can try: 'skills', 'projects', 'contact', 'matrix', 'clear'. Or just ask me anything about Alisher's work.";
  }
  if (m.includes('project') || m.includes('portfolio') || m.includes('work')) {
    return "Alisher's built some cool stuff like Techify, The Aurora Group, SAT Yangiaryk, Turbocoin, Zakovat Bot, and Robocoder. Type 'projects' to check them out.";
  }
  if (m.includes('skill') || m.includes('stack') || m.includes('tech')) {
    return "Main tech stack includes Python, TypeScript, React, Node.js, PyTorch, Tailwind, and FastAPI.";
  }
  if (m.includes('contact') || m.includes('social') || m.includes('reach') || m.includes('email')) {
    return "You can reach Alisher on Telegram @nyxlvoid, GitHub @alisherozodov, or via email at aiisher.ozodoff@gmail.com.";
  }
  if (m.includes('who am i') || m.includes('who am i?')) {
    return "You're a guest visiting Alisher's terminal portfolio workspace. Welcome.";
  }
  if (m.includes('who are you') || m.includes('who r u') || m.includes('what are you')) {
    return "I'm Nyxl, a nonchalant AI running inside this portfolio terminal. What's on your mind?";
  }
  if (m.includes('hello') || m.includes('hi') || m.includes('hey') || m.includes('sup') || m.includes('yo')) {
    return "Hey, what's up? Ask me about projects, tech stack, or anything else.";
  }
  
  return `Got it: "${inputMsg}". I'm Nyxl, feel free to ask about Alisher's projects, skills, or run 'help' for terminal commands.`;
}

startServer();
