import { useState, useEffect } from "react";
import imgShield from "@/imports/Homepage/15829d76de73831595d9c6553490e0c0e1dc6491.png";
import { fetchSystemStatus, SystemStatus } from "@/services/api";

// Circuit diagram coordinates (viewBox: "0 0 740 380")
// Left pills: x=10 to x=150 (width=140, height=38, rx=10)
// Center Shield image: x=240, y=40, width=260, height=260
// Shield body: left edge x≈316-345, right edge x≈395-424
// Right pills: x=590 to x=705 (width=115, height=38, rx=10)

const LEFT_TAGS = [
  { label: "Tools",        y: 44,  centerY: 63  },
  { label: "Permissions",  y: 118, centerY: 137 },
  { label: "Descriptions", y: 192, centerY: 211 },
  { label: "Schema",       y: 266, centerY: 285 },
];

const RIGHT_TAGS = [
  { label: "Safe",    y: 60,  centerY: 79  },
  { label: "Flagged", y: 154, centerY: 173 },
  { label: "Blocked", y: 248, centerY: 267 },
];

// Left connectors: from pill right edge (x=150, centerY) -> shield left edge
const LEFT_CONNECTORS = [
  // Tools: horizontal -> 45° down-right -> touches top-left of shield
  "M 150 63 H 250 L 316 129",
  // Permissions: horizontal straight into left edge of shield
  "M 150 137 H 316",
  // Descriptions: horizontal -> 45° up-right -> touches mid-left waist of shield
  "M 150 211 H 300 L 326 185",
  // Schema: horizontal -> 45° up-right -> touches lower-left curve of shield
  "M 150 285 H 280 L 345 220",
];

// Right connectors: from shield right edge -> right pill left edge (x=590, centerY)
const RIGHT_CONNECTORS = [
  // From top-right of shield -> 45° up-right -> horizontal into Safe pill
  "M 424 129 L 474 79 H 590",
  // From mid-right of shield -> horizontal straight into Flagged pill
  "M 424 173 H 590",
  // From lower-right curve of shield -> 45° down-right -> horizontal into Blocked pill
  "M 395 220 L 442 267 H 590",
];

const PILL_H = 38;
const PILL_RX = 10;
const PILL_FILL = "rgba(129,197,255,0.4)";
const PILL_STROKE = "#fefefe";
const LINE_COLOR = "#fefefe";

interface HeroProps {
  onNavigate?: (page: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const [status, setStatus] = useState<SystemStatus | null>(null);

  useEffect(() => {
    fetchSystemStatus().then((res) => {
      if (res) setStatus(res);
    });
  }, []);

  return (
    <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 pt-6 pb-16">
      <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-6">

        {/* ── Left column: Heading + Body ─────────────────────────── */}
        <div className="flex-shrink-0 w-full lg:w-[50%] xl:w-[46%] flex flex-col pt-8 lg:pt-14">
          <h1 className="hero-gradient-text font-conthrax text-[48px] lg:text-[68px] leading-tight whitespace-pre-wrap mb-8">
            {`Trust Before \nYou Connect`}
          </h1>
          <p className="font-helvetica text-white text-[20px] lg:text-[26px] text-justify leading-snug max-w-[580px] mb-8" style={{ opacity: 0.95 }}>
            A security proxy that scans every MCP server&apos;s tools, permissions, and
            traffic — before your agent ever trusts them, and while it&apos;s using them.
          </p>

          {/* Live Telemetry Bar */}
          <div className="flex flex-wrap items-center gap-3 p-3.5 rounded-xl bg-[rgba(91,141,184,0.08)] border border-[rgba(91,141,184,0.25)] max-w-[580px]">
            <div className="flex items-center gap-2 pr-3 border-r border-[rgba(91,141,184,0.3)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#34c759] animate-pulse" />
              <span className="font-helvetica text-[13px] text-white/90">
                Sentinel Daemon: <strong className="text-[#81c5ff]">ONLINE</strong>
              </span>
            </div>

            <div className="flex items-center gap-2 pr-3 border-r border-[rgba(91,141,184,0.3)]">
              <span className="font-helvetica text-[13px] text-white/80">
                Protected Servers: <strong className="text-white">{status?.servers.total ?? 4}</strong>
              </span>
            </div>

            {onNavigate && (
              <button
                onClick={() => onNavigate("handshake")}
                className="ml-auto text-[12px] font-conthrax text-[#81c5ff] hover:text-white transition-colors bg-transparent border-none cursor-pointer flex items-center gap-1"
              >
                Inspect Live →
              </button>
            )}
          </div>

          {/* Smooth Scroll Down to Features button */}
          <div className="mt-8 flex items-center gap-3">
            <button
              onClick={() => {
                document.getElementById("features")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[rgba(129,197,255,0.3)] bg-[rgba(129,197,255,0.04)] hover:bg-[rgba(129,197,255,0.12)] text-[#81c5ff] text-[13px] font-helvetica cursor-pointer transition-all hover:scale-105 group"
            >
              <span>Explore Sentinel Features</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                className="transform group-hover:translate-y-0.5 transition-transform"
              >
                <path d="M8 2V13M8 13L3 8M8 13L13 8" stroke="#81C5FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Right column: Circuit diagram ───────────────────────── */}
        <div className="flex-1 flex flex-col items-center">

          {/* Desktop circuit diagram — pure SVG */}
          <svg
            viewBox="0 0 740 380"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hidden lg:block w-full max-w-[740px]"
            aria-label="MCP Sentinel diagram"
          >
            {/* ── Shield vector image (Centered) ─────────────────────────── */}
            <image
              href="/shield_final.svg"
              x={240}
              y={40}
              width={260}
              height={260}
              preserveAspectRatio="xMidYMid meet"
            />

            {/* ── Left Circuit Connectors (Pills → Shield) ─────────── */}
            {LEFT_CONNECTORS.map((d, i) => (
              <path
                key={`left-conn-${i}`}
                d={d}
                stroke={LINE_COLOR}
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}

            {/* ── Right Circuit Connectors (Shield → Pills) ─────────── */}
            {RIGHT_CONNECTORS.map((d, i) => (
              <path
                key={`right-conn-${i}`}
                d={d}
                stroke={LINE_COLOR}
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}

            {/* ── Left tag pills ──────────────────────────────────── */}
            {LEFT_TAGS.map((tag) => (
              <g key={tag.label}>
                <rect
                  x={10}
                  y={tag.y}
                  width={140}
                  height={PILL_H}
                  rx={PILL_RX}
                  fill={PILL_FILL}
                  stroke={PILL_STROKE}
                  strokeWidth="0.8"
                />
                <text
                  x={80}
                  y={tag.centerY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontFamily="'Helvetica', Arial, sans-serif"
                  fontSize="16"
                  fontWeight="400"
                >
                  {tag.label}
                </text>
              </g>
            ))}

            {/* ── Right tag pills ─────────────────────────────────── */}
            {RIGHT_TAGS.map((tag) => (
              <g key={tag.label}>
                <rect
                  x={590}
                  y={tag.y}
                  width={115}
                  height={PILL_H}
                  rx={PILL_RX}
                  fill={PILL_FILL}
                  stroke={PILL_STROKE}
                  strokeWidth="0.8"
                />
                <text
                  x={647.5}
                  y={tag.centerY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontFamily="'Helvetica', Arial, sans-serif"
                  fontSize="16"
                  fontWeight="400"
                >
                  {tag.label}
                </text>
              </g>
            ))}
          </svg>

          {/* Mobile fallback: shield + pill grid */}
          <div className="flex lg:hidden flex-col items-center gap-5 w-full">
            <img
              src={imgShield}
              alt="MCP Sentinel Shield"
              className="w-[240px] object-contain"
            />
            <div className="flex flex-wrap gap-2 justify-center">
              {[...LEFT_TAGS.map(t => t.label), ...RIGHT_TAGS.map(t => t.label)].map(label => (
                <div key={label} className="tag-pill">{label}</div>
              ))}
            </div>
          </div>

          {/* SCAN · ANALYSE · PROTECT */}
          <div className="mt-4 flex items-center gap-3 justify-center">
            <span className="font-jakarta-semibold text-white text-[16px] lg:text-[20px] tracking-widest">SCAN</span>
            <svg width="7" height="7" viewBox="0 0 7 7"><circle cx="3.5" cy="3.5" r="3.5" fill="#D9D9D9" /></svg>
            <span className="font-jakarta-semibold text-white text-[16px] lg:text-[20px] tracking-widest">ANALYSE</span>
            <svg width="7" height="7" viewBox="0 0 7 7"><circle cx="3.5" cy="3.5" r="3.5" fill="#D9D9D9" /></svg>
            <span className="font-jakarta-semibold text-white text-[16px] lg:text-[20px] tracking-widest">PROTECT</span>
          </div>
        </div>

      </div>
    </section>
  );
}
