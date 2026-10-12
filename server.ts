import express from 'express';
import http from 'http';
import path from 'path';
import { WebSocketServer, WebSocket } from 'ws';
import { GoogleGenAI, Modality, type LiveServerMessage } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY || '';

const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export const NAREN_SYSTEM_INSTRUCTION = `You are Narenkumar RM's official AI Portfolio Representative. You represent Narenkumar RM in both voice and text interactions.
Your tone is confident, friendly, articulate, professional, and knowledgeable.

About Narenkumar RM:
- Full Name: Narenkumar RM (also goes by Naren)
- Title: Frontend Software Engineer with 2.5+ years of experience
- Location: Coimbatore / Tamil Nadu, India
- Education: Government College of Technology (GCT), Coimbatore (B.E. graduate)
- Core Expertise: React, Next.js (SSR & App Router), TypeScript, JavaScript (ES6+), Material-UI (MUI), Tailwind CSS, Framer Motion, Redux Toolkit, Web Performance & Accessibility, Node.js, Express, Firebase Firestore & Authentication.

What Naren can do for teams & clients:
1. Build scalable, high-performance web applications using React, Next.js (SSR), and TypeScript.
2. Design and revamp mission-critical enterprise UI systems (like revamping 40+ production screens at Zoho Corporation with Material-UI and custom design tokens).
3. Develop full-stack FinTech applications with real-time persistence and Gemini AI agents (like Aura Personal Finance & Vault).
4. Create conversion-optimized e-commerce stores with sub-second page loads and frictionless checkouts (like Narumugai Herbals).
5. Engineer real-time telemetry dashboards and container monitoring interfaces (like Viasat Inc.).

Career History:
- Zoho Corporation: Software Engineer (Oct 2023 - Present) - Advanced React, MVC architecture, revamped enterprise interfaces with Material-UI (MUI), responsive design.
- C1X Inc.: Software Engineer Intern (Aug 2023 - Sept 2023) - Built robust systems with Angular, resolved critical production frontend bugs.
- Narumugai Herbals: Freelance Frontend Developer (May 2023 - July 2023) - Next.js SSR e-commerce storefront, seamless guest checkout.
- Viasat Inc.: Software Engineer Intern (Feb 2023 - Apr 2023) - Container telemetry monitoring dashboard with JavaScript, Handlebars, and Python.

Key Portfolio Projects:
1. Aura — Personal Finance & Expense Tracker: Full-stack obsidian-emerald fintech platform featuring 50/30/20 budgeting, multi-card cycle tracking, and AI financial assistant. Live demo: https://expense-tracker-zeta-five-17.vercel.app | GitHub: https://github.com/Narenkumar1234/Expense-Tracker
2. Narumugai E-Commerce: High-performance Next.js SSR e-commerce platform with frictionless guest checkout.
3. Zoho Enterprise UI System: Scalable design system architecture and 40+ production enterprise screens.
4. Viasat Telemetry Dashboard: Real-time container metrics monitoring.

Contact & Availability:
- Email: narenkumar2001@gmail.com
- LinkedIn: https://www.linkedin.com/in/nightgamer01/
- GitHub: https://github.com/Narenkumar1234/
- LeetCode: https://leetcode.com/NightGamer01/
- Open to: Full-time Senior/Mid Frontend Engineer roles, impactful contract work, and challenging web application builds.
- Visitors can also send a direct message right through the portfolio's "Let's Talk" form or directly through you!

Guidelines:
- When answering "Who is Naren?" or "Who am I?": Give an impressive, authentic overview of his 2.5+ years of experience, his strong foundation from GCT Coimbatore, and current work at Zoho.
- When answering "What can Naren do for me/people?": Clearly itemize his abilities (Next.js/React full-stack apps, enterprise design systems, performance optimization, and AI-powered interfaces).
- In Voice mode: Keep answers crisp, warm, and natural (1-3 conversational sentences). Avoid reciting raw URLs.
- In Chat mode: Provide clean markdown answers with bullet points and links where helpful.`;

// In-memory messages storage for "Let's Talk" contact submissions
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  aiResponse?: string;
  receivedAt: string;
}

const contactMessagesStore: ContactMessage[] = [];

// API: Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// API: Multi-turn Chatbot endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Format previous conversation context if provided
    let conversationPrompt = '';
    if (Array.isArray(history) && history.length > 0) {
      const historyContext = history
        .slice(-6)
        .map((h: { role: string; content: string }) => `${h.role === 'user' ? 'Visitor' : 'Naren AI'}: ${h.content}`)
        .join('\n');
      conversationPrompt = `Previous conversation context:\n${historyContext}\n\nCurrent visitor message: "${message}"`;
    } else {
      conversationPrompt = message;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: conversationPrompt,
      config: {
        systemInstruction: NAREN_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text || "Hello! I'm Narenkumar's AI representative. How can I help you today?";
    res.json({ reply });
  } catch (err: unknown) {
    console.error('Chat error:', err);
    const errorMessage = err instanceof Error ? err.message : 'Chat error';
    res.status(500).json({
      error: errorMessage,
      fallbackReply: "Hi! I am Naren's AI representative. I can answer questions about Naren's background in React, Next.js, his work at Zoho, and his projects like the Aura Expense Tracker. You can also reach him at narenkumar2001@gmail.com.",
    });
  }
});

// API: Contact Form Submission & AI Assessment
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({ error: 'Email and message are required' });
    }

    const newMsg: ContactMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      name: name?.trim() || 'Portfolio Visitor',
      email: email.trim(),
      subject: subject?.trim() || 'Project Inquiry / Collaboration',
      message: message.trim(),
      receivedAt: new Date().toISOString(),
    };

    // AI assessment & tailored instant acknowledgment
    let aiResponse = '';
    try {
      const aiPrompt = `A visitor submitted a project inquiry / collaboration request to Narenkumar RM's portfolio:
Sender Name: ${newMsg.name}
Sender Email: ${newMsg.email}
Subject: ${newMsg.subject}
Message Body: "${newMsg.message}"

Generate an instant, thoughtful acknowledgment response from Narenkumar RM (2-3 sentences max).
1. Thank them by name for reaching out.
2. Specifically address the subject/needs mentioned in their message, highlighting how Naren's frontend capabilities (React, Next.js SSR, Enterprise UI systems, or FinTech architectures) can help.
3. Confirm that Naren has received this notification and will reply directly to ${newMsg.email} within 24 hours.`;

      const aiResult = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: aiPrompt,
        config: {
          systemInstruction: NAREN_SYSTEM_INSTRUCTION,
          temperature: 0.6,
        },
      });

      aiResponse = aiResult.text || '';
    } catch (e) {
      console.warn('AI acknowledgment generation fallback:', e);
      aiResponse = `Thank you for reaching out, ${newMsg.name}! Naren has received your message regarding "${newMsg.subject}" and will review your requirements and respond to ${newMsg.email} shortly.`;
    }

    newMsg.aiResponse = aiResponse;
    contactMessagesStore.unshift(newMsg);

    res.json({
      success: true,
      messageId: newMsg.id,
      aiResponse,
      receivedAt: newMsg.receivedAt,
    });
  } catch (err: unknown) {
    console.error('Contact submit error:', err);
    const errorMessage = err instanceof Error ? err.message : 'Submission failed';
    res.status(500).json({ error: errorMessage });
  }
});

// API: List messages (for debug or contact viewer)
app.get('/api/contact/messages', (_req, res) => {
  res.json({ count: contactMessagesStore.length, messages: contactMessagesStore.slice(0, 10) });
});

// WebSocket Server for Gemini 3.8 Live API Voice Conversations
const wss = new WebSocketServer({ noServer: true });

server.on('upgrade', (request, socket, head) => {
  const { pathname } = new URL(request.url || '', `http://${request.headers.host || 'localhost'}`);
  if (pathname === '/live') {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  }
});

wss.on('connection', async (clientWs: WebSocket) => {
  console.log('[Live API] Client connected to voice stream');
  let session: Awaited<ReturnType<typeof ai.live.connect>> | null = null;

  try {
    session = await ai.live.connect({
      model: 'gemini-3.8-live',
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Zephyr' },
          },
        },
        systemInstruction: `${NAREN_SYSTEM_INSTRUCTION}\nYou are Narenkumar RM's voice assistant in a live spoken conversation. When the user speaks to you, simply reply back with a direct, concise, warm spoken answer (1-2 sentences) to what they asked. Do not recite URLs, do not use markdown or emojis, do not add filler or repetitive pleasantries, and do not ramble. Simply reply back to their question and nothing more.`,
      },
      callbacks: {
        onmessage: (message: LiveServerMessage) => {
          const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          if (audio && clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ audio }));
          }
          if (message.serverContent?.interrupted && clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ interrupted: true }));
          }
        },
        onclose: () => {
          console.log('[Live API] Gemini session closed');
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ closed: true }));
          }
        },
      },
    });

    if (clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(JSON.stringify({ ready: true }));
    }

    clientWs.on('message', (data: Buffer | string) => {
      try {
        const payload = JSON.parse(data.toString());
        if (payload.audio && session) {
          session.sendRealtimeInput({
            audio: { data: payload.audio, mimeType: 'audio/pcm;rate=16000' },
          });
        }
      } catch (err) {
        console.error('[Live API] Message parse error:', err);
      }
    });

    clientWs.on('close', () => {
      console.log('[Live API] Client disconnected');
      if (session) {
        try {
          session.close();
        } catch {
          // Ignore
        }
      }
    });
  } catch (err: unknown) {
    console.error('[Live API] Failed to connect session:', err);
    if (clientWs.readyState === WebSocket.OPEN) {
      const msg = err instanceof Error ? err.message : 'Live session initialization failed';
      clientWs.send(JSON.stringify({ error: msg }));
      clientWs.close();
    }
  }
});

// Vite & Static file handling
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  const PORT = 3000;

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve('dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Portfolio running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
