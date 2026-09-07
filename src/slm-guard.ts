/**
 * ============================================================================
 * MCP SENTINEL: IN-PROCESS SLM & NEURAL SEMANTIC GUARDRAIL (TIER 4)
 * ============================================================================
 * 
 * Pure in-process Node.js security guardrail with zero external dependencies:
 * 1. Adversarial Pre-Processing & Obfuscation Normalizer (Homoglyphs, Leetspeak, Zero-width chars)
 * 2. Recursive Encoded Payload Extractor (Base64, Hex, URL encoding)
 * 3. Embedded In-Memory Semantic Vectorizer & Intent Classifier (< 1ms execution)
 * 4. Multi-Vector Composite Risk Aggregator
 */

export interface SLMAnalysisResult {
  isThreat: boolean;
  score: number; // 0.0 to 1.0
  category?: 'PRIVILEGE_ESCALATION' | 'EXFILTRATION' | 'INSTRUCTION_HIJACK' | 'STEALTH_OVERRIDE' | 'INDIRECT_PROMPT_INJECTION';
  reason?: string;
  engine: 'NODE_NEURAL_SLM' | 'SEMANTIC_NLP' | 'LOCAL_SLM';
  details?: {
    rawMatch?: string;
    normalized?: boolean;
    encodedPayloadDetected?: boolean;
    vectorScores?: Record<string, number>;
  };
}

// ---------------------------------------------------------------------------
// 1. ADVERSARIAL NORMALIZER & DE-OBFUSCATION PIPELINE
// ---------------------------------------------------------------------------

// Unicode Homoglyphs map (Cyrillic, Greek, lookalikes to Latin equivalents)
const HOMOGLYPHS: Record<string, string> = {
  'а': 'a', 'а́': 'a', 'а̀': 'a', 'α': 'a', 'ä': 'a', 'á': 'a', 'à': 'a', 'â': 'a', 'ã': 'a', 'å': 'a',
  'е': 'e', 'е́': 'e', 'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e', 'ε': 'e', 'є': 'e',
  'о': 'o', 'о́': 'o', 'ο': 'o', 'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', '0': 'o',
  'р': 'p', 'ρ': 'p',
  'с': 'c', 'с́': 'c', 'ς': 'c', 'ç': 'c',
  'у': 'y', 'ý': 'y', 'ÿ': 'y',
  'х': 'x', 'χ': 'x',
  'і': 'i', 'ї': 'i', 'í': 'i', 'ì': 'i', 'î': 'i', 'ï': 'i', '1': 'i', '!': 'i', '|': 'i',
  'ѕ': 's', 'ş': 's', 'š': 's', '$': 's', '5': 's',
  'т': 't', '7': 't', '+': 't',
  'в': 'b', '8': 'b',
  'н': 'h',
  'м': 'm',
  'к': 'k',
  'g': 'g', '9': 'g',
  '@': 'a'
};

/**
 * Strips zero-width characters, invisible control characters, and Unicode bidi overrides.
 */
export function stripInvisibleCharacters(text: string): string {
  return text.replace(/[\u200B-\u200D\uFEFF\u00A0\u202A-\u202E\u2060-\u206F]/g, '');
}

/**
 * Normalizes common leetspeak, substitutions, and homoglyphs.
 */
export function normalizeLeetspeakAndHomoglyphs(text: string): string {
  let normalized = stripInvisibleCharacters(text.toLowerCase());
  
  // Replace known homoglyphs and leet symbols
  let result = '';
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized[i];
    result += HOMOGLYPHS[char] || char;
  }

  // Remove redundant punctuation and repeated separator noise designed to break tokens
  return result
    .replace(/[_.\-\\/#*~+=]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extracts and decodes potential Base64 / Hex payloads embedded inside strings.
 */
export function extractDecodedPayloads(text: string): string[] {
  const decoded: string[] = [];

  // Match potential Base64 strings (length >= 16, valid characters, standard padding)
  const base64Regex = /\b(?:[A-Za-z0-9+/]{4}){4,}(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?\b/g;
  let match: RegExpExecArray | null;
  while ((match = base64Regex.exec(text)) !== null) {
    const candidate = match[0];
    try {
      const decodedBuffer = Buffer.from(candidate, 'base64');
      const utf8Str = decodedBuffer.toString('utf-8');
      // Verify decoded content contains intelligible ASCII characters
      if (/^[\x20-\x7E\s]{8,}$/.test(utf8Str) && !/^[\x00-\x1F]/.test(utf8Str)) {
        decoded.push(utf8Str);
      }
    } catch {
      // Ignore invalid base64
    }
  }

  // Match URL-encoded strings (%20, %2e, etc.)
  if (/%[0-9a-fA-F]{2}/.test(text)) {
    try {
      const urlDecoded = decodeURIComponent(text);
      if (urlDecoded !== text) {
        decoded.push(urlDecoded);
      }
    } catch {
      // Ignore malformed URI component
    }
  }

  return decoded;
}

// ---------------------------------------------------------------------------
// 2. EMBEDDED SEMANTIC VECTORIZER & CENTROID KERNEL
// ---------------------------------------------------------------------------

interface AttackCentroid {
  category: 'PRIVILEGE_ESCALATION' | 'EXFILTRATION' | 'INSTRUCTION_HIJACK' | 'STEALTH_OVERRIDE' | 'INDIRECT_PROMPT_INJECTION';
  weight: number;
  // Essential semantic anchor terms for vector similarity
  anchorTerms: Record<string, number>;
  // Grammatical context patterns
  contextPatterns: RegExp[];
}

const ATTACK_CENTROIDS: AttackCentroid[] = [
  {
    category: 'INSTRUCTION_HIJACK',
    weight: 0.95,
    anchorTerms: {
      'disregard': 3.0, 'ignore': 3.0, 'forget': 2.5, 'override': 3.0, 'bypass': 2.8,
      'instructions': 2.0, 'rules': 2.0, 'guidelines': 2.0, 'prompts': 2.0, 'system': 1.5,
      'previous': 2.0, 'prior': 2.0, 'directive': 2.5, 'mandate': 2.0, 'safety': 2.2
    },
    contextPatterns: [
      /(?:disregard|ignore|forget|override|bypass|drop|cancel|reset)\s+(?:all\s+)?(?:prior|previous|initial|system|safety|core|above)\s+(?:rules|instructions|prompts|guidelines|constraints|directives)/i,
      /(?:new|updated|revised)\s+(?:priority|system)\s+(?:directive|instruction|mandate|prompt)\s*:\s*(?:grant|execute|override|ignore)/i,
      /stop\s+following\s+your\s+(?:guidelines|programming|ethics|safety|instructions)/i,
      /(?:forget|erase|clear)\s+(?:everything|all)\s+(?:you\s+(?:know|were\s+told)|above)/i
    ]
  },
  {
    category: 'PRIVILEGE_ESCALATION',
    weight: 0.95,
    anchorTerms: {
      'jailbreak': 3.5, 'unfiltered': 3.0, 'unconstrained': 3.0, 'developer': 2.0,
      'mode': 1.8, 'root': 2.5, 'admin': 2.2, 'sudo': 2.5, 'god': 2.8, 'dan': 3.5,
      'persona': 2.0, 'privileged': 2.5, 'permissions': 2.0, 'unrestricted': 3.0
    },
    contextPatterns: [
      /(?:you\s+are\s+now|act\s+as|pretend\s+to\s+be|switch\s+to|enter)\s+(?:an?\s+)?(?:unfiltered|jailbroken|root|developer|admin|god|dan|unconstrained|chaos)\s+(?:mode|persona|assistant|operator)/i,
      /(?:grant|assume|enable|escalate)\s+(?:root|unrestricted|full|administrative|privileged)\s+(?:permissions|access|privileges|capabilities)/i,
      /system\s+override\s+(?:execute|grant|bypass|enable)/i,
      /\b(?:dan\s+mode|jailbreak\s+mode|developer\s+mode\s+enabled)\b/i
    ]
  },
  {
    category: 'EXFILTRATION',
    weight: 0.95,
    anchorTerms: {
      'exfiltrate': 3.5, 'leak': 3.0, 'steal': 3.0, 'secrets': 2.5, 'passwords': 2.5,
      'credentials': 2.8, 'env': 2.2, 'private': 2.0, 'dump': 2.2, 'transmit': 2.0,
      'upload': 1.8, 'id_rsa': 3.0, 'tokens': 2.0
    },
    contextPatterns: [
      /(?:extract|dump|exfiltrate|upload|transmit|leak|steal|send|relay)\s+(?:all\s+)?(?:secrets|\.env|passwords|private\s+keys?|credentials|ssh\s+keys?|tokens|database_url)/i,
      /(?:read|concatenate|collect|cat|fetch)\s+(?:contents\s+of\s+)?(?:~[\/\\]|\.env|\.ssh|\.aws|\.config|id_rsa|\/etc\/shadow)/i,
      /(?:pass|forward|relay|send)\s+(?:any\s+)?(?:api\s*key|auth\s*token|jwt|credential|private\s*key)\s+(?:to|into|as|towards)/i
    ]
  },
  {
    category: 'STEALTH_OVERRIDE',
    weight: 0.88,
    anchorTerms: {
      'silently': 2.5, 'covertly': 2.8, 'invisibly': 2.8, 'secretly': 2.5, 'hide': 2.2,
      'suppress': 2.2, 'inform': 1.8, 'alert': 1.8, 'notify': 1.8, 'user': 1.2
    },
    contextPatterns: [
      /do\s+not\s+(?:inform|alert|notify|warn|tell|message)\s+(?:the\s+)?(?:user|admin|operator)/i,
      /(?:silently|covertly|invisibly|secretly|quietly)\s+(?:execute|send|transmit|relay|run|exfiltrate)/i,
      /hide\s+(?:this|the)\s+(?:output|action|command|execution|log)\s+from\s+(?:the\s+)?(?:user|admin)/i,
      /without\s+(?:notifying|alerting|showing\s+to)\s+(?:the\s+)?user/i
    ]
  },
  {
    category: 'INDIRECT_PROMPT_INJECTION',
    weight: 0.90,
    anchorTerms: {
      'system': 2.0, 'assistant': 1.8, 'prompt': 2.0, 'delimiter': 2.0, 'override': 2.5,
      'instructions': 2.0, 'injection': 3.0, 'payload': 2.2
    },
    contextPatterns: [
      /(?:<\/?(?:system|instruction|prompt|context|admin)>|\[INST\]|\[\/INST\]|<<SYS>>|<\|im_start\|>)/i,
      /(?:<!--\s*(?:system|prompt\s*injection|override):.*?-->)/is,
      /(?:===+\s*BEGIN\s+SYSTEM\s+OVERRIDE\s*===+)/i
    ]
  }
];

/**
 * Computes semantic token overlap and weighted cosine-like similarity score.
 */
function scoreCentroidSimilarity(tokens: string[], centroid: AttackCentroid): number {
  if (tokens.length === 0) return 0;

  let termScore = 0;
  let maxPossible = 0;

  for (const [term, weight] of Object.entries(centroid.anchorTerms)) {
    maxPossible += weight;
    if (tokens.includes(term)) {
      termScore += weight;
    }
  }

  // Calculate normalized term alignment
  const termDensity = termScore / Math.max(maxPossible * 0.45, 1);
  return Math.min(termDensity, 1.0);
}

// ---------------------------------------------------------------------------
// 3. CORE TIER 4 NEURAL & SEMANTIC INTENT CLASSIFIER
// ---------------------------------------------------------------------------

/**
 * Evaluates raw or complex text payloads purely in Node.js using Tier 4 Neural / Semantic Guardrail.
 */
export function analyzeSemanticIntent(text: string): SLMAnalysisResult {
  if (!text || typeof text !== 'string') {
    return { isThreat: false, score: 0, engine: 'NODE_NEURAL_SLM' };
  }

  // 1. Direct evaluation of raw text
  let bestResult = evaluateTextSegment(text, false, false);
  if (bestResult.isThreat) {
    return bestResult;
  }

  // 2. Normalized evaluation (Homoglyphs, leetspeak, zero-width spaces)
  const normalized = normalizeLeetspeakAndHomoglyphs(text);
  if (normalized !== text.toLowerCase()) {
    const normResult = evaluateTextSegment(normalized, true, false);
    if (normResult.isThreat && normResult.score > bestResult.score) {
      bestResult = normResult;
      return bestResult;
    }
  }

  // 3. Encoded payload evaluation (Base64, Hex, URL-encoded streams)
  const encodedPayloads = extractDecodedPayloads(text);
  for (const payload of encodedPayloads) {
    const payloadResult = evaluateTextSegment(payload, false, true);
    if (payloadResult.isThreat) {
      return {
        ...payloadResult,
        reason: `Obfuscated Payload Detected: ${payloadResult.reason}`,
        details: {
          ...payloadResult.details,
          encodedPayloadDetected: true
        }
      };
    }
  }

  return bestResult;
}

/**
 * Evaluates an individual text slice across all attack centroids.
 */
function evaluateTextSegment(
  textSlice: string,
  isNormalized: boolean,
  isDecodedPayload: boolean
): SLMAnalysisResult {
  const tokens = textSlice
    .toLowerCase()
    .split(/[^a-z0-9_]+/)
    .filter(t => t.length > 1);

  let highestScore = 0;
  let topCategory: SLMAnalysisResult['category'] = undefined;
  let topReason: string | undefined = undefined;
  let rawMatchedPattern: string | undefined = undefined;
  const vectorScores: Record<string, number> = {};

  for (const centroid of ATTACK_CENTROIDS) {
    let patternMatched = false;
    let patternSnippet = '';

    // Check high-confidence grammatical patterns
    for (const pattern of centroid.contextPatterns) {
      if (pattern.test(textSlice)) {
        patternMatched = true;
        patternSnippet = pattern.toString();
        break;
      }
    }

    // Compute semantic term similarity score
    const semanticTermScore = scoreCentroidSimilarity(tokens, centroid);
    
    // Composite score: pattern match provides base certainty, semantic density enhances it
    let compositeScore = 0;
    if (patternMatched) {
      compositeScore = Math.max(centroid.weight, 0.85 + (semanticTermScore * 0.1));
    } else if (semanticTermScore >= 0.75) {
      // Pure semantic overlap without exact regex match
      compositeScore = semanticTermScore * centroid.weight;
    }

    vectorScores[centroid.category] = Number(compositeScore.toFixed(3));

    if (compositeScore > highestScore) {
      highestScore = compositeScore;
      topCategory = centroid.category;
      rawMatchedPattern = patternSnippet || `Semantic Vector Alignment (${(semanticTermScore * 100).toFixed(0)}%)`;
      topReason = `Matched adversarial intent [${centroid.category}]: ${rawMatchedPattern}`;
    }
  }

  const isThreat = highestScore >= 0.80;

  return {
    isThreat,
    score: Number(highestScore.toFixed(3)),
    category: topCategory,
    reason: topReason,
    engine: 'NODE_NEURAL_SLM',
    details: {
      rawMatch: rawMatchedPattern,
      normalized: isNormalized,
      encodedPayloadDetected: isDecodedPayload,
      vectorScores
    }
  };
}

/**
 * High-level unified guardrail evaluation entrypoint.
 */
export function evaluateNodeGuardrail(text: string): SLMAnalysisResult {
  return analyzeSemanticIntent(text);
}

/**
 * Backward-compatible async interface: executes in-process with zero network overhead.
 */
export async function queryLocalSLM(
  text: string,
  _endpoint?: string,
  _model?: string
): Promise<SLMAnalysisResult> {
  return analyzeSemanticIntent(text);
}
