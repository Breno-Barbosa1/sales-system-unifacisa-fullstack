import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { Task, ApiCallLog, BackendStats } from "./src/types.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Set up server-side state
let tasks: Task[] = [
  {
    id: "1",
    title: "Configurar o Backend Node.js",
    description: "Criar o servidor Express com suporte a rotas de API e integração com o frontend Vite.",
    completed: true,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "2",
    title: "Integrar chamadas com fetch() no React",
    description: "Consumir os endpoints do backend para listagem, criação, atualização e remoção de tarefas.",
    completed: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "3",
    title: "Experimentar o Chat de IA",
    description: "Enviar uma pergunta ao assistente virtual que utiliza o modelo Gemini 3.5 Flash de forma segura no backend.",
    completed: false,
    createdAt: new Date().toISOString(),
  }
];

let apiCallLogs: ApiCallLog[] = [];
let totalRequestsCounter = 0;
const serverStartTime = Date.now();

// Parse JSON bodies
app.use(express.json());

// API traffic logger middleware
app.use((req, res, next) => {
  const start = Date.now();
  totalRequestsCounter++;

  // Log only API routes to avoid cluttering with static assets logs
  if (req.url.startsWith("/api")) {
    res.on("finish", () => {
      const duration = Date.now() - start;
      const logEntry: ApiCallLog = {
        id: Math.random().toString(36).substring(2, 9),
        method: req.method,
        url: req.url,
        status: res.statusCode,
        responseTimeMs: duration,
        timestamp: new Date().toISOString(),
      };
      
      // Maintain maximum of 50 logs in memory
      apiCallLogs.unshift(logEntry);
      if (apiCallLogs.length > 50) {
        apiCallLogs.pop();
      }
    });
  }
  next();
});

// Helper to initialize Gemini Client lazily
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY_MISSING");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API Endpoints

// 1. Backend Stats
app.get("/api/stats", (req, res) => {
  const uptimeSeconds = Math.floor((Date.now() - serverStartTime) / 1000);
  const memoryUsage = process.memoryUsage();
  const memoryUsageMb = Math.round(memoryUsage.heapUsed / 1024 / 1024);

  const stats: BackendStats = {
    uptimeSeconds,
    totalRequests: totalRequestsCounter,
    memoryUsageMb,
    activeTasks: tasks.filter(t => !t.completed).length,
  };

  res.json(stats);
});

// 2. HTTP Traffic Logs
app.get("/api/logs", (req, res) => {
  res.json(apiCallLogs);
});

// 3. Tasks CRUD
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const { title, description } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: "O título da tarefa é obrigatório." });
  }

  const newTask: Task = {
    id: Math.random().toString(36).substring(2, 9),
    title: title.trim(),
    description: (description || "").trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.unshift(newTask);
  res.status(201).json(newTask);
});

app.put("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const taskIndex = tasks.findIndex(t => t.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Tarefa não encontrada." });
  }

  const updatedTask = {
    ...tasks[taskIndex],
    ...(title !== undefined && { title: title.trim() }),
    ...(description !== undefined && { description: description.trim() }),
    ...(completed !== undefined && { completed: !!completed }),
  };

  tasks[taskIndex] = updatedTask;
  res.json(updatedTask);
});

app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(t => t.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Tarefa não encontrada." });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

// 4. Secure Gemini AI Integration Chat Routing
app.post("/api/chat", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "O prompt de texto é obrigatório." });
  }

  try {
    const ai = getGeminiClient();
    const systemInstruction = 
      "Você é o assistente virtual do Console React Full-Stack. " +
      "Seu papel é responder perguntas sobre desenvolvimento de software, " +
      "ensinar a conectar React com o Express, e ajudar a organizar as tarefas do usuário. " +
      "Responda sempre em português, com tom amigável, conciso e profissional.";

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
      }
    });

    res.json({ text: response.text || "Sem resposta gerada pelo modelo." });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    if (error.message === "GEMINI_API_KEY_MISSING") {
      return res.status(400).json({
        error: "Chave do Gemini ausente",
        setupGuide: "A chave API do Gemini não está configurada. Para usar o chat inteligente, configure a variável 'GEMINI_API_KEY' no painel de Segredos (Settings > Secrets) do Google AI Studio."
      });
    }

    res.status(500).json({ 
      error: "Falha na comunicação com o assistente de IA.",
      details: error.message || error 
    });
  }
});

// Start server and handle Vite development mode
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Vite middleware for fast development feedback
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware loaded.");
  } else {
    // In production, serve built static files from /dist
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static server enabled.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
