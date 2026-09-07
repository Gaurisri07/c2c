import imgShield from "@/imports/Homepage/15829d76de73831595d9c6553490e0c0e1dc6491.png";

// Circuit connector geometry (viewBox: "0 0 660 380")
// Left pill right edge: x=140, shield left edge: x=225
// Each path: M 140 labelY H bendX L 225 shieldY — all exact 45° diagonals
const CONNECTORS = [
  // label y, shield y, bend x  |  verify: from (bendX, labelY) to (225, shieldY) → Δx=Δy
  { labelY: 73,  shieldY: 105, bendX: 193 }, // Δ=32 ✓
  { labelY: 151, shieldY: 170, bendX: 206 }, // Δ=19 ✓
  { labelY: 229, shieldY: 220, bendX: 216 }, // Δ= 9 ✓
  { labelY: 307, shieldY: 278, bendX: 196 }, // Δ=29 ✓
];

const LEFT_TAGS  = ["Tools", "Permissions", "Descriptions", "Schema"];
const LEFT_TOPS  = [54, 132, 210, 288]; // pill top y values

const RIGHT_TAGS = [
  { label: "Safe",    x: 488, y: 98,  w: 80  },
  { label: "Flagged", x: 478, y: 188, w: 100 },
  { label: "Blocked", x: 476, y: 260, w: 108 },
];

const PILL_H   = 38;
const PILL_RX  = 10;
const PILL_FILL   = "rgba(129,197,255,0.4)";
const PILL_STROKE = "#fefefe";
const LINE_COLOR  = "#6B8CAD";
const DOT_COLOR   = "#8BAAC8";
const SHIELD_X = 225;
const SHIELD_W = 255;
const SHIELD_H = Math.round(SHIELD_W * 634 / 537); // preserve aspect ratio ≈ 301px

export default function Hero() {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 pt-6 pb-16">
      <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-6">

        {/* ── Left column: Heading + Body ─────────────────────────── */}
        <div className="flex-shrink-0 w-full lg:w-[50%] xl:w-[46%] flex flex-col pt-8 lg:pt-14">
          <h1 className="hero-gradient-text font-conthrax text-[48px] lg:text-[68px] leading-tight whitespace-pre-wrap mb-8">
            {`Trust Before \nYou Connect`}
          </h1>
          <p className="font-helvetica text-white text-[20px] lg:text-[26px] text-justify leading-snug max-w-[580px]" style={{ opacity: 0.95 }}>
            A security proxy that scans every MCP server&apos;s tools, permissions, and
            traffic — before your agent ever trusts them, and while it&apos;s using them.
          </p>
        </div>

        {/* ── Right column: Circuit diagram ───────────────────────── */}
        <div className="flex-1 flex flex-col items-center">

          {/* Desktop circuit diagram — pure SVG */}
          <svg
            viewBox="0 0 660 380"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hidden lg:block w-full"
            aria-label="MCP Sentinel diagram"
          >
            {/* ── Shield image ────────────────────────────────────── */}
            <image
              href={imgShield}
              x={SHIELD_X}
              y={35}
              width={SHIELD_W}
              height={SHIELD_H}
              preserveAspectRatio="xMidYMid meet"
            />

            {/* ── Circuit connector lines (left → shield) ─────────── */}
            {CONNECTORS.map((c, i) => (
              <g key={i}>
                {/* horizontal + 45° diagonal — no trailing H, ends exactly at shield left */}
                <path
                  d={`M 140 ${c.labelY} H ${c.bendX} L ${SHIELD_X} ${c.shieldY}`}
                  stroke={LINE_COLOR}
                  strokeWidth="1.2"
                />
                {/* dot at bend joint */}
                <circle cx={c.bendX} cy={c.labelY} r="2.8" fill={DOT_COLOR} />
                {/* dot at shield entry */}
                <circle cx={SHIELD_X} cy={c.shieldY} r="2.8" fill={DOT_COLOR} />
              </g>
            ))}

            {/* ── Left tag pills ──────────────────────────────────── */}
            {LEFT_TAGS.map((label, i) => {
              const ty = LEFT_TOPS[i];
              return (
                <g key={label}>
                  <rect
                    x={0} y={ty} width={140} height={PILL_H} rx={PILL_RX}
                    fill={PILL_FILL} stroke={PILL_STROKE} strokeWidth="0.8"
                  />
                  <text
                    x={70} y={ty + PILL_H / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontFamily="Arial, Helvetica, sans-serif"
                    fontSize="15"
                  >
                    {label}
                  </text>
                </g>
              );
            })}

            {/* ── Right tag pills (no connector stubs) ────────────── */}
            {RIGHT_TAGS.map(({ label, x, y, w }) => (
              <g key={label}>
                <rect
                  x={x} y={y} width={w} height={PILL_H} rx={PILL_RX}
                  fill={PILL_FILL} stroke={PILL_STROKE} strokeWidth="0.8"
                />
                <text
                  x={x + w / 2} y={y + PILL_H / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontFamily="Arial, Helvetica, sans-serif"
                  fontSize="15"
                >
                  {label}
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
              {[...LEFT_TAGS, ...RIGHT_TAGS.map(t => t.label)].map(label => (
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
