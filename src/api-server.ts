/**
 * ============================================================================
 * MCP SENTINEL: REST + SSE API SERVER
 * ============================================================================
 *
 * Provides a local HTTP API for frontend integration (Vite / React / Vue / etc.)
 * Default port: 3456 (configure via --port or SENTINEL_API_PORT env var)
 *
 * Endpoints:
 *   GET  /api/status           — Sentinel health, version, active tier config summary
 *   GET  /api/layers           — Full current TierConfig state
 *   POST /api/layers           — Update TierConfig (body: Partial<TierConfig>)
 *   POST /api/layers/reset     — Reset all tiers to enabled defaults
 *   GET  /api/metrics          — Block counts, threat category stats, uptime
 *   GET  /api/traffic/stream   — SSE stream of live MCP traffic events
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { LIVE_LOG_FILE } from './proxy.js';
import {
  loadSavedTierConfig,
  saveTierConfig,
  DEFAULT_TIER_CONFIG,
  TIER_CONFIG_FILE,
  TierConfig
} from './tier-config.js';

const SENTINEL_VERSION = '1.0.0';
const startTime = Date.now();

// ---------------------------------------------------------------------------
// In-Memory Metrics Store
// ---------------------------------------------------------------------------

export interface SentinelMetrics {
  totalBlocked: number;
  totalSanitized: number;
  totalAllowed: number;
  blocksByTier: Record<string, number>;
  blocksByCategory: Record<string, number>;
  recentEvents: TrafficEvent[];
}

export interface TrafficEvent {
  timestamp: string;
  direction: 'INBOUND' | 'OUTBOUND' | 'BLOCKED' | 'SANITIZED';
  summary: string;
  tier?: string;
  payload?: any;
}

const MAX_RECENT_EVENTS = 500;

export const metrics: SentinelMetrics = {
  totalBlocked: 0,
  totalSanitized: 0,
  totalAllowed: 0,
  blocksByTier: {
    'Tier 1 (Regex Signature)': 0,
    'Tier 2 (Shannon Entropy)': 0,
    'Tier 3 (Path Traversal Guard)': 0,
    'Tier 4 (SLM / Neural Guardrail)': 0
  },
  blocksByCategory: {},
  recentEvents: []
};

export function recordBlock(tier: string, category?: string): void {
  metrics.totalBlocked++;
  if (metrics.blocksByTier[tier] !== undefined) {
    metrics.blocksByTier[tier]++;
  } else {
    metrics.blocksByTier[tier] = 1;
  }
  if (category) {
    metrics.blocksByCategory[category] = (metrics.blocksByCategory[category] || 0) + 1;
  }
}

export function recordSanitize(tier?: string): void {
  metrics.totalSanitized++;
  if (tier && metrics.blocksByTier[tier] !== undefined) {
    metrics.blocksByTier[tier]++;
  }
}

export function recordAllow(): void {
  metrics.totalAllowed++;
}

export function pushTrafficEvent(event: TrafficEvent): void {
  metrics.recentEvents.push(event);
  if (metrics.recentEvents.length > MAX_RECENT_EVENTS) {
    metrics.recentEvents.shift();
  }
  // Broadcast to all connected SSE clients
  broadcastSSE(event);
}

// ---------------------------------------------------------------------------
// SSE Client Registry
// ---------------------------------------------------------------------------

const sseClients = new Set<http.ServerResponse>();

function broadcastSSE(event: TrafficEvent): void {
  if (sseClients.size === 0) return;
  const data = `data: ${JSON.stringify(event)}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(data);
    } catch {
      sseClients.delete(client);
    }
  }
}

// ---------------------------------------------------------------------------
// CORS & Response Helpers
// ---------------------------------------------------------------------------

const ALLOWED_ORIGINS = [
  'http://localhost:5173', // Vite default
  'http://localhost:3000',
  'http://localhost:4173', // Vite preview
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
  process.env.SENTINEL_CORS_ORIGIN || ''
].filter(Boolean);

function setCORSHeaders(req: http.IncomingMessage, res: http.ServerResponse): void {
  const origin = req.headers.origin || '';
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  res.setHeader('Access-Control-Allow-Origin', allowed);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Vary', 'Origin');
}

function jsonResponse(res: http.ServerResponse, data: any, status = 200): void {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data, null, 2));
}

function errorResponse(res: http.ServerResponse, message: string, status = 400): void {
  jsonResponse(res, { ok: false, error: message }, status);
}

function readBody(req: http.IncomingMessage): Promise<string> {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk: Buffer) => { body += chunk.toString(); });
    req.on('end', () => resolve(body));
    req.on('error', () => resolve(''));
  });
}

// ---------------------------------------------------------------------------
// Route Handlers
// ---------------------------------------------------------------------------

function handleStatus(req: http.IncomingMessage, res: http.ServerResponse): void {
  const config = loadSavedTierConfig();
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
  jsonResponse(res, {
    ok: true,
    sentinel: 'MCP Sentinel',
    version: SENTINEL_VERSION,
    uptime: uptimeSeconds,
    uptimeHuman: formatUptime(uptimeSeconds),
    liveLogFile: LIVE_LOG_FILE,
    tierConfigFile: TIER_CONFIG_FILE,
    layers: {
      tier1: config.tier1,
      tier2: config.tier2,
      tier3: config.tier3,
      tier4: config.tier4,
      activeCount: [config.tier1, config.tier2, config.tier3, config.tier4].filter(Boolean).length
    }
  });
}

function handleGetLayers(req: http.IncomingMessage, res: http.ServerResponse): void {
  const config = loadSavedTierConfig();
  jsonResponse(res, {
    ok: true,
    layers: {
      tier1: { enabled: config.tier1, name: 'Deterministic Regex Signatures', description: 'Known secrets (SSH keys, AWS keys, GitHub tokens, sk- tokens)' },
      tier2: { enabled: config.tier2, name: 'Shannon Entropy Analysis', description: 'Unknown / custom high-entropy secrets & random tokens' },
      tier3: { enabled: config.tier3, name: 'Scope & Path Traversal Guard', description: 'Directory traversal (../) and path escape attempts' },
      tier4: { enabled: config.tier4, name: 'SLM & Neural Semantic Guardrail', description: 'Prompt injection, jailbreaks, exfiltration, obfuscated payloads (in-process, < 1ms)' }
    }
  });
}

async function handlePostLayers(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
  const raw = await readBody(req);
  let updates: Partial<TierConfig>;
  try {
    updates = JSON.parse(raw);
  } catch {
    return errorResponse(res, 'Invalid JSON body');
  }

  const config = loadSavedTierConfig();
  let changed = false;
  for (const key of ['tier1', 'tier2', 'tier3', 'tier4'] as const) {
    if (typeof updates[key] === 'boolean') {
      config[key] = updates[key] as boolean;
      changed = true;
    }
  }

  if (!changed) {
    return errorResponse(res, 'No valid tier fields (tier1, tier2, tier3, tier4) found in body');
  }

  saveTierConfig(config);
  jsonResponse(res, { ok: true, message: 'Layer configuration updated', layers: config });
}

function handleResetLayers(req: http.IncomingMessage, res: http.ServerResponse): void {
  saveTierConfig({ ...DEFAULT_TIER_CONFIG });
  jsonResponse(res, { ok: true, message: 'All layers reset to defaults', layers: { ...DEFAULT_TIER_CONFIG } });
}

function handleMetrics(req: http.IncomingMessage, res: http.ServerResponse): void {
  jsonResponse(res, {
    ok: true,
    uptime: Math.floor((Date.now() - startTime) / 1000),
    totals: {
      blocked: metrics.totalBlocked,
      sanitized: metrics.totalSanitized,
      allowed: metrics.totalAllowed
    },
    blocksByTier: metrics.blocksByTier,
    blocksByCategory: metrics.blocksByCategory,
    recentEventsCount: metrics.recentEvents.length
  });
}

function handleSSEStream(req: http.IncomingMessage, res: http.ServerResponse): void {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'X-Accel-Buffering': 'no'
  });

  // Send initial connection confirmation
  res.write(`data: ${JSON.stringify({ type: 'connected', timestamp: new Date().toISOString(), message: 'MCP Sentinel live traffic stream connected' })}\n\n`);

  // Replay last 50 recent events to bring client up to speed
  const recent = metrics.recentEvents.slice(-50);
  for (const event of recent) {
    res.write(`data: ${JSON.stringify({ type: 'replay', ...event })}\n\n`);
  }

  sseClients.add(res);

  // Heartbeat every 15s to keep connection alive through proxies
  const heartbeat = setInterval(() => {
    try {
      res.write(': heartbeat\n\n');
    } catch {
      clearInterval(heartbeat);
      sseClients.delete(res);
    }
  }, 15000);

  req.on('close', () => {
    clearInterval(heartbeat);
    sseClients.delete(res);
  });
}

function handleGetRecentTraffic(req: http.IncomingMessage, res: http.ServerResponse): void {
  const url = new URL(req.url || '/', `http://localhost`);
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '100', 10), MAX_RECENT_EVENTS);
  const events = metrics.recentEvents.slice(-limit);
  jsonResponse(res, { ok: true, count: events.length, events });
}

// ---------------------------------------------------------------------------
// Request Router
// ---------------------------------------------------------------------------

async function requestHandler(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
  setCORSHeaders(req, res);

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url || '/', `http://localhost`);
  const pathname = url.pathname.replace(/\/$/, '') || '/';
  const method = req.method || 'GET';

  // Routes
  if (pathname === '/api/status' && method === 'GET') return handleStatus(req, res);
  if (pathname === '/api/layers' && method === 'GET') return handleGetLayers(req, res);
  if (pathname === '/api/layers' && method === 'POST') return await handlePostLayers(req, res);
  if (pathname === '/api/layers/reset' && method === 'POST') return handleResetLayers(req, res);
  if (pathname === '/api/metrics' && method === 'GET') return handleMetrics(req, res);
  if (pathname === '/api/traffic/stream' && method === 'GET') return handleSSEStream(req, res);
  if (pathname === '/api/traffic/recent' && method === 'GET') return handleGetRecentTraffic(req, res);

  // 404
  errorResponse(res, `Route not found: ${method} ${pathname}`, 404);
}

// ---------------------------------------------------------------------------
// Server Bootstrap
// ---------------------------------------------------------------------------

/**
 * Starts the MCP Sentinel HTTP API server.
 */
export function startApiServer(port = parseInt(process.env.SENTINEL_API_PORT || '3456', 10)): http.Server {
  const server = http.createServer(async (req, res) => {
    try {
      await requestHandler(req, res);
    } catch (err: any) {
      console.error('[MCP Sentinel API] Unhandled error:', err.message);
      try {
        errorResponse(res, 'Internal server error', 500);
      } catch { }
    }
  });

  server.listen(port, '127.0.0.1', () => {
    console.log(`[MCP Sentinel API] 🚀 HTTP API server running at http://127.0.0.1:${port}`);
    console.log('[MCP Sentinel API]    GET  /api/status');
    console.log('[MCP Sentinel API]    GET  /api/layers');
    console.log('[MCP Sentinel API]    POST /api/layers           { tier1: bool, tier2: bool, ... }');
    console.log('[MCP Sentinel API]    POST /api/layers/reset');
    console.log('[MCP Sentinel API]    GET  /api/metrics');
    console.log('[MCP Sentinel API]    GET  /api/traffic/stream   (SSE)');
    console.log('[MCP Sentinel API]    GET  /api/traffic/recent?limit=100');
    console.log(`[MCP Sentinel API]    CORS origins: ${ALLOWED_ORIGINS.join(', ')}\n`);
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`[MCP Sentinel API] ❌ Port ${port} is already in use. Use --port=<N> or SENTINEL_API_PORT=<N>.`);
    } else {
      console.error('[MCP Sentinel API] Server error:', err.message);
    }
    process.exit(1);
  });

  return server;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatUptime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}
