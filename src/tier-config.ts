import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

export interface TierConfig {
  tier1: boolean; // Deterministic Regex Signatures (Known Secrets)
  tier2: boolean; // Shannon Entropy Analysis (Unknown / Random Secrets)
  tier3: boolean; // Schema & Scope Validation (Path Traversal Guard)
  tier4: boolean; // SLM & Neural Semantic Guardrail (Adversarial Intent)
}

export const DEFAULT_TIER_CONFIG: TierConfig = {
  tier1: true,
  tier2: true,
  tier3: true,
  tier4: true
};

export const TIER_CONFIG_FILE = path.join(os.homedir(), '.mcp-sentinel-tiers.json');

/**
 * Loads persistent tier configuration from ~/.mcp-sentinel-tiers.json
 */
export function loadSavedTierConfig(): TierConfig {
  try {
    if (fs.existsSync(TIER_CONFIG_FILE)) {
      const raw = fs.readFileSync(TIER_CONFIG_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      return {
        tier1: typeof parsed.tier1 === 'boolean' ? parsed.tier1 : true,
        tier2: typeof parsed.tier2 === 'boolean' ? parsed.tier2 : true,
        tier3: typeof parsed.tier3 === 'boolean' ? parsed.tier3 : true,
        tier4: typeof parsed.tier4 === 'boolean' ? parsed.tier4 : true
      };
    }
  } catch {
    // Fallback to default on any read/parse error
  }
  return { ...DEFAULT_TIER_CONFIG };
}

/**
 * Saves tier configuration to ~/.mcp-sentinel-tiers.json
 */
export function saveTierConfig(config: TierConfig): void {
  try {
    fs.writeFileSync(TIER_CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
  } catch (err: any) {
    console.error(`[MCP Sentinel] Failed to save tier config: ${err.message}`);
  }
}

/**
 * Resolves active tier configuration from CLI flags, environment variables, and persistent config.
 */
export function resolveTierConfig(cliArgs: string[] = []): TierConfig {
  const config = loadSavedTierConfig();

  // 1. Environment Variable Overrides
  if (process.env.SENTINEL_TIERS) {
    const specified = process.env.SENTINEL_TIERS.split(',').map(s => s.trim().toLowerCase());
    config.tier1 = specified.includes('1') || specified.includes('tier1') || specified.includes('regex');
    config.tier2 = specified.includes('2') || specified.includes('tier2') || specified.includes('entropy');
    config.tier3 = specified.includes('3') || specified.includes('tier3') || specified.includes('path');
    config.tier4 = specified.includes('4') || specified.includes('tier4') || specified.includes('slm');
  }

  if (process.env.SENTINEL_DISABLE_TIER1 === 'true') config.tier1 = false;
  if (process.env.SENTINEL_DISABLE_TIER2 === 'true') config.tier2 = false;
  if (process.env.SENTINEL_DISABLE_TIER3 === 'true') config.tier3 = false;
  if (process.env.SENTINEL_DISABLE_TIER4 === 'true') config.tier4 = false;

  // 2. CLI Flag Overrides
  for (const arg of cliArgs) {
    const lower = arg.toLowerCase();
    
    // --tiers=1,2,4 or --tiers=1,3
    if (lower.startsWith('--tiers=')) {
      const specified = lower.replace('--tiers=', '').split(',').map(s => s.trim());
      config.tier1 = specified.includes('1') || specified.includes('tier1');
      config.tier2 = specified.includes('2') || specified.includes('tier2');
      config.tier3 = specified.includes('3') || specified.includes('tier3');
      config.tier4 = specified.includes('4') || specified.includes('tier4');
    }

    // --disable-tier=2,4 or --disable-tiers=2,4
    if (lower.startsWith('--disable-tier=') || lower.startsWith('--disable-tiers=')) {
      const val = lower.includes('--disable-tiers=') ? lower.replace('--disable-tiers=', '') : lower.replace('--disable-tier=', '');
      const disabled = val.split(',').map(s => s.trim());
      if (disabled.includes('1')) config.tier1 = false;
      if (disabled.includes('2')) config.tier2 = false;
      if (disabled.includes('3')) config.tier3 = false;
      if (disabled.includes('4')) config.tier4 = false;
    }

    // Boolean flags: --no-tier1, --no-tier2, etc.
    if (lower === '--no-tier1' || lower === '--disable-tier1') config.tier1 = false;
    if (lower === '--no-tier2' || lower === '--disable-tier2') config.tier2 = false;
    if (lower === '--no-tier3' || lower === '--disable-tier3') config.tier3 = false;
    if (lower === '--no-tier4' || lower === '--disable-tier4') config.tier4 = false;

    if (lower === '--enable-tier1') config.tier1 = true;
    if (lower === '--enable-tier2') config.tier2 = true;
    if (lower === '--enable-tier3') config.tier3 = true;
    if (lower === '--enable-tier4') config.tier4 = true;
  }

  return config;
}

/**
 * Formats a terminal-friendly layer dashboard.
 */
export function formatLayersDashboard(config: TierConfig): string {
  const getBadge = (enabled: boolean) => enabled ? '🟢 ENABLED ' : '🔴 DISABLED';
  
  return [
    '================================================================',
    '🛡️  MCP SENTINEL: SECURITY LAYER DEFENSE MATRIX',
    '================================================================',
    ` [Tier 1] Deterministic Regex Signatures      : ${getBadge(config.tier1)}`,
    '          (Known API keys, SSH keys, AWS credentials)',
    ` [Tier 2] Shannon Entropy Analysis          : ${getBadge(config.tier2)}`,
    '          (Unknown / high-entropy custom secret tokens)',
    ` [Tier 3] Path Traversal & Scope Guard       : ${getBadge(config.tier3)}`,
    '          (Directory traversal attacks and path escapes)',
    ` [Tier 4] SLM & Neural Semantic Guardrail    : ${getBadge(config.tier4)}`,
    '          (Prompt injection, jailbreaks, obfuscation, exfiltration)',
    '================================================================',
    'Config File: ' + TIER_CONFIG_FILE,
    ''
  ].join('\n');
}
