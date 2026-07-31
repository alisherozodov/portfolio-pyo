import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

function getAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

export default async function handler(req: any, res: any) {
  // CORS Headers for Vercel
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (e) {}
    }

    const message = body?.message || "";
    const ai = getAIClient();

    const systemPrompt = `You are Nyxl, an intelligent, chill, and nonchalant AI assistant embedded in Alisher Ozodov's portfolio terminal.

PERSONALITY & TONE:
- Speak naturally like a human developer: relaxed, intelligent, cool, and nonchalant (e.g. "hey, what's up?", "chilling", "sure thing", "here's the deal").
- NEVER sound overly robotic, corporate, or overly hyped ("HELLO! WELCOME!"). Keep responses clean, smart, and direct.
- Answer user questions intelligently about Alisher's projects, skills, education, or general technical/casual queries.
- Do NOT repeat rigid canned template answers. Converse dynamically with the user.
- If asked who you are: "I'm Nyxl, the AI assistant running this terminal workspace."
- If asked about Alisher: "Alisher Ozodov (@nyxlvoid) is an AI developer and software builder specialized in AI systems, computer vision, and web engineering."
- Available terminal commands if asked: help, skills, projects, contact, matrix, clear.`;

    if (!ai) {
      return res.status(200).json({
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

    return res.status(200).json({ reply: responseText });
  } catch (err: any) {
    console.error("Vercel AI Handler Error:", err);
    return res.status(200).json({ reply: generateSmartOfflineResponse(req.body?.message || "") });
  }
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

