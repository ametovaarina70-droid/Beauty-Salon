import type { IncomingMessage, ServerResponse } from 'http';
import { handleChat } from '../lib/chat.js';

// Vercel serverless function: POST /api/chat
export default async function handler(
  req: IncomingMessage & { body?: any },
  res: ServerResponse,
) {
  res.setHeader('Content-Type', 'application/json');
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }
  const { status, json } = await handleChat(req.body);
  res.statusCode = status;
  res.end(JSON.stringify(json));
}
