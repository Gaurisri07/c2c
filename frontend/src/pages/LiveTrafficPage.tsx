import React, { useState, useEffect } from "react";
import logoImg from "@/imports/LiveTraffic/47202af915ec7162b9a01888274487160ee55234.png";
import {
  fetchTrafficLogs,
  clearTrafficLogs,
  simulateTrafficEvent,
  subscribeTrafficStream,
  executeToolCall,
  StructuredLog,
} from "@/services/api";

// ── Icons ──────────────────────────────────────────────────────────────────

function IconHome() {
  return (
    <svg width="22" height="19" viewBox="0 0 22 19" fill="none">
      <path d="M1 9.5L11 1L21 9.5V18H14V12H8V18H1V9.5Z" stroke="#81C5FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconDashboard() {
  return (
    <svg width="22" height="19" viewBox="0 0 22 18.9444" fill="none">
      <path d="M0.916748 9.47217H7.33341V18.0277H0.916748V9.47217ZM8.25008 0.916504H21.0834V9.47217H8.25008V0.916504ZM8.25008 10.3888H21.0834V18.0277H8.25008V10.3888ZM0.916748 0.916504H7.33341V8.55539H0.916748V0.916504Z" fill="currentColor" />
    </svg>
  );
}

function IconServer() {
  return (
    <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
      <path d="M17 0H3C1.35 0 0 1.35 0 3V6C0 7.29 0.77 8.4 1.88 8.85V15C1.88 16.65 3.23 18 4.88 18H15.12C16.77 18 18.12 16.65 18.12 15V8.85C19.23 8.4 20 7.29 20 6V3C20 1.35 18.65 0 17 0ZM16.12 15C16.12 15.55 15.67 16 15.12 16H4.88C4.33 16 3.88 15.55 3.88 15V9H16.12V15ZM18 6C18 6.55 17.55 7 17 7H3C2.45 7 2 6.55 2 6V3C2 2.45 2.45 2 3 2H17C17.55 2 18 2.45 18 3V6ZM5 4H7V6H5V4ZM5 11H7V13H5V11ZM9 4H15V6H9V4ZM9 11H15V13H9V11Z" fill="currentColor" />
    </svg>
  );
}

function IconFolder() {
  return (
    <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
      <path d="M20 3H11L9 1H2C0.9 1 0 1.9 0 3V15C0 16.1 0.9 17 2 17H20C21.1 17 22 16.1 22 15V5C22 3.9 21.1 3 20 3Z" fill="currentColor" />
    </svg>
  );
}

function IconLiveTraffic() {
  return (
    <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
      <path d="M1 9H4L7 2L11 16L14 6L16 12L18 9H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconThreats() {
  return (
    <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
      <path d="M10.29 3L1.82 18H18.76L10.29 3ZM10.29 0L21.29 19H-0.71L10.29 0ZM9.29 9H11.29V13H9.29V9ZM9.29 14H11.29V16H9.29V14Z" fill="currentColor" />
    </svg>
  );
}

function IconSettings() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M11 14C12.6569 14 14 12.6569 14 11C14 9.34315 12.6569 8 11 8C9.34315 8 8 9.34315 8 11C8 12.6569 9.34315 14 11 14Z" stroke="currentColor" strokeWidth="2" />
      <path d="M20.33 13.61C20.37 13.41 20.4 13.21 20.4 11C20.4 8.79 20.37 8.59 20.33 8.39L21.91 7.2C22.07 7.08 22.12 6.86 22.02 6.68L20.52 4.05C20.42 3.87 20.2 3.81 20.02 3.87L18.16 4.6C17.8 4.31 17.41 4.07 17 3.89L16.72 1.93C16.69 1.73 16.52 1.58 16.32 1.58H13.32C13.12 1.58 12.95 1.73 12.92 1.93L12.64 3.89C12.23 4.07 11.84 4.32 11.48 4.6L9.62 3.87C9.44 3.8 9.22 3.87 9.12 4.05L7.62 6.68C7.51 6.87 7.56 7.08 7.72 7.2L9.3 8.39C9.26 8.59 9.24 8.8 9.24 11C9.24 13.2 9.27 13.41 9.3 13.61L7.72 14.8C7.56 14.92 7.51 15.14 7.62 15.32L9.12 17.95C9.22 18.13 9.44 18.19 9.62 18.13L11.48 17.4C11.84 17.69 12.23 17.93 12.64 18.11L12.92 20.07C12.95 20.27 13.12 20.42 13.32 20.42H16.32C16.52 20.42 16.69 20.27 16.72 20.07L17 18.11C17.41 17.93 17.8 17.68 18.16 17.4L20.02 18.13C20.2 18.2 20.42 18.13 20.52 17.95L22.02 15.32C22.12 15.13 22.07 14.92 21.91 14.8L20.33 13.61Z" fill="currentColor" />
    </svg>
  );
}

function IconTool() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <path d="M33.2 8.4C32.8 7.6 32.2 6.8 31.4 6.2L27.6 2.4C26.4 1.2 24.8 0.6 23.2 0.6C21.6 0.6 20.2 1.2 19 2.2L14 7.2L15.4 8.6C16.4 9.6 16.4 11.2 15.4 12.2L4.2 23.4C3.2 24.4 1.6 24.4 0.6 23.4L0 22.8V26.4C0 27.2 0.4 28 1 28.6L5.4 33C6 33.6 6.8 34 7.6 34H11L10.4 33.4C9.4 32.4 9.4 30.8 10.4 29.8L21.8 18.4C22.8 17.4 24.4 17.4 25.4 18.4L26.8 19.8L31.8 14.8C33 13.6 33.6 12 33.6 10.4C33.6 9.6 33.4 9 33.2 8.4Z" fill="#81C5FF" />
    </svg>
  );
}

function IconDanger() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M20 4L36 34H4L20 4Z" fill="rgba(255,56,60,0.15)" stroke="#FF383C" strokeWidth="2" />
      <path fillRule="evenodd" clipRule="evenodd" d="M20 14C20.8 14 21.4 14.6 21.4 15.4V23.6C21.4 24.4 20.8 25 20 25C19.2 25 18.6 24.4 18.6 23.6V15.4C18.6 14.6 19.2 14 20 14ZM20 27C20.8 27 21.4 27.6 21.4 28.4C21.4 29.2 20.8 29.8 20 29.8C19.2 29.8 18.6 29.2 18.6 28.4C18.6 27.6 19.2 27 20 27Z" fill="#FF383C" />
    </svg>
  );
}

function IconShield({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={Math.round(size * 1.12)} viewBox="0 0 33 37" fill="none">
      <path d="M16.5 0L0 6.5V18.5C0 28 7.5 36.8 16.5 37C25.5 36.8 33 28 33 18.5V6.5L16.5 0Z" fill="rgba(129,197,255,0.15)" stroke="#81C5FF" strokeWidth="1.5" />
      <path d="M10 18L14.5 22.5L23 13" stroke="#81C5FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconStream() {
  return (
    <svg width="47" height="47" viewBox="0 0 47 47" fill="none">
      <path d="M4 12H43M4 20H28M4 28H36" stroke="#5B8DB8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 36H14M20 36H26M32 36H38" stroke="#5B8DB8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 44H16" stroke="#5B8DB8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconFile() {
  return (
    <svg width="22" height="28" viewBox="0 0 22 28" fill="none">
      <path d="M13 1H3C1.9 1 1 1.9 1 3V25C1 26.1 1.9 27 3 27H19C20.1 27 21 26.1 21 25V9L13 1Z" stroke="#5B8DB8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 1V9H21" stroke="#5B8DB8" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function IconRedTriangle({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 16" fill="none">
      <path d="M9 1L1 15H17L9 1Z" fill="rgba(255,56,60,0.15)" stroke="#FF383C" strokeWidth="1.5" strokeLinejoin="round" />
      <path fillRule="evenodd" clipRule="evenodd" d="M9 6C9.55 6 10 6.45 10 7V10C10 10.55 9.55 11 9 11C8.45 11 8 10.55 8 10V7C8 6.45 8.45 6 9 6ZM9 12C9.55 12 10 12.45 10 13C10 13.55 9.55 14 9 14C8.45 14 8 13.55 8 13C8 12.45 8.45 12 9 12Z" fill="#FF383C" />
    </svg>
  );
}

function IconYellowWarn({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 16" fill="none">
      <path d="M9 1L1 15H17L9 1Z" fill="rgba(255,213,97,0.15)" stroke="#FFD561" strokeWidth="1.5" strokeLinejoin="round" />
      <path fillRule="evenodd" clipRule="evenodd" d="M9 6C9.55 6 10 6.45 10 7V10C10 10.55 9.55 11 9 11C8.45 11 8 10.55 8 10V7C8 6.45 8.45 6 9 6ZM9 12C9.55 12 10 12.45 10 13C10 13.55 9.55 14 9 14C8.45 14 8 13.55 8 13C8 12.45 8.45 12 9 12Z" fill="#FFD561" />
    </svg>
  );
}

function IconCheck({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" fill="rgba(52,199,89,0.15)" stroke="#34C759" strokeWidth="1.5" />
      <path d="M4.5 8L7 10.5L11.5 5.5" stroke="#34C759" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Sidebar ────────────────────────────────────────────────────────────────

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tabId: string) => void;
  onNavigate: (page: string) => void;
}

const NAV = [
  { id: "home",      label: "Home",               icon: IconHome        },
  { id: "dashboard", label: "Dashboard",          icon: IconDashboard   },
  { id: "handshake", label: "Handshake Monitor",  icon: IconServer      },
  { id: "registry",  label: "Server Registry",    icon: IconFolder      },
  { id: "traffic",   label: "Live Traffic",       icon: IconLiveTraffic },
  { id: "threats",   label: "Threats",            icon: IconThreats     },
  { id: "settings",  label: "Policy & Settings",  icon: IconSettings    },
];

function Sidebar({ currentTab, onNavigate }: SidebarProps) {
  return (
    <aside className="w-[280px] min-w-[280px] shrink-0 min-h-screen flex flex-col bg-[#010106] border-r border-[rgba(91,141,184,0.18)]">
      {/* Logo */}
      <button
        onClick={() => onNavigate("home")}
        className="flex items-center justify-center pt-5 pb-4 px-4 bg-transparent border-none cursor-pointer hover:opacity-85 transition-opacity"
        title="Return to Home"
      >
        <img
          src="/logo.svg"
          alt="MCP Sentinel"
          className="w-[170px] h-auto object-contain pointer-events-none"
        />
      </button>

      {/* Nav */}
      <nav className="flex flex-col gap-1.5 px-3 pt-2">
        {NAV.map(({ id, label, icon: Icon }) => {
          const active = id === currentTab;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`flex items-center gap-3.5 w-full h-[46px] px-4 rounded-[14px] text-left transition-colors cursor-pointer ${
                active
                  ? "border border-[#81c5ff] text-[#81c5ff] bg-[rgba(129,197,255,0.06)]"
                  : "text-[#9c9c9c] hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <span className="w-[22px] h-[22px] flex items-center justify-center shrink-0 text-[#81c5ff]">
                <Icon />
              </span>
              <span className="font-['Helvetica',Helvetica,Arial,sans-serif] text-[16px] leading-none whitespace-nowrap">
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

// ── Stat Card ──────────────────────────────────────────────────────────────

function StatCard({
  value,
  label,
  icon,
  borderColor,
}: {
  value: string | number;
  label: string;
  icon: React.ReactNode;
  borderColor: string;
}) {
  return (
    <div
      className="flex-1 min-w-[180px] flex items-center justify-between px-5 py-4 rounded-[20px] bg-[rgba(91,141,184,0.05)]"
      style={{ border: `1px solid ${borderColor}` }}
    >
      <div className="flex flex-col gap-1">
        <span
          className="text-white leading-none font-['Helvetica',Helvetica,Arial,sans-serif] text-[36px] font-normal"
        >
          {value}
        </span>
        <span
          className="text-[#9c9c9c] font-helvetica text-[16px]"
        >
          {label}
        </span>
      </div>
      <div className="shrink-0">{icon}</div>
    </div>
  );
}

// ── Log Row ────────────────────────────────────────────────────────────────

type LogStatus = "blocked" | "allowed";
type PillColor = "blue" | "yellow" | "green";

function Pill({ label, color }: { label: string; color: PillColor }) {
  const styles: Record<PillColor, string> = {
    blue: "border-[#0276e2] text-[#81c5ff] bg-[rgba(2,118,226,0.1)]",
    yellow: "border-[rgba(255,213,97,0.8)] text-[#ffd561] bg-[rgba(255,213,97,0.1)]",
    green: "border-[#5fe3b3] text-[#5fe3b3] bg-[rgba(95,227,179,0.1)]",
  };
  return (
    <span
      className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full border text-[12px] whitespace-nowrap font-helvetica ${styles[color]}`}
    >
      {label}
    </span>
  );
}

function StatusBadge({ status }: { status: LogStatus }) {
  if (status === "blocked") {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] text-[#ff383c] text-[12px] whitespace-nowrap bg-[rgba(255,56,60,0.12)] border border-[rgba(255,56,60,0.4)] font-helvetica font-medium"
      >
        <IconRedTriangle size={12} />
        blocked
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] text-[#5fe3b3] text-[12px] whitespace-nowrap bg-[rgba(95,227,179,0.1)] border border-[#5fe3b3]/50 font-helvetica font-medium"
    >
      <IconCheck size={12} />
      allowed
    </span>
  );
}

function DirectionTag({ direction }: { direction: string }) {
  const isBlocked = direction === "BLOCKED" || direction === "SANITIZED";
  const isOut = direction === "OUTBOUND" || direction === "CLIENT->SERVER";
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider ${
        isBlocked
          ? "bg-[rgba(255,56,60,0.2)] text-[#ff383c]"
          : isOut
          ? "bg-[rgba(129,197,255,0.15)] text-[#81c5ff]"
          : "bg-[rgba(95,227,179,0.15)] text-[#5fe3b3]"
      }`}
    >
      {direction}
    </span>
  );
}

function LogRow({
  log,
  isExpanded,
  onToggle,
}: {
  log: StructuredLog;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[rgba(91,141,184,0.15)] last:border-0 font-helvetica transition-colors">
      {/* Main Row Bar */}
      <div
        onClick={onToggle}
        className={`flex items-center gap-4 px-4 py-3 cursor-pointer rounded-xl transition-all ${
          isExpanded
            ? "bg-[rgba(129,197,255,0.1)] border border-[rgba(129,197,255,0.3)] shadow-[0_0_12px_rgba(129,197,255,0.06)]"
            : "hover:bg-[rgba(129,197,255,0.04)]"
        }`}
      >
        {/* Time */}
        <span className="text-[#9c9c9c] text-[13.5px] font-mono tabular-nums shrink-0 w-[100px] whitespace-nowrap">
          {log.time}
        </span>

        {/* Direction Tag */}
        <div className="shrink-0 w-[95px]">
          <DirectionTag direction={log.direction || "OUTBOUND"} />
        </div>

        {/* Call & Detail */}
        <div className="flex flex-col min-w-0 flex-1 pr-2">
          <div className="flex items-center gap-2">
            <span className="text-white text-[14.5px] font-semibold truncate">
              {log.call}
            </span>
          </div>
          <span className="text-[#9c9c9c] text-[12px] truncate mt-0.5">
            {log.detail}
          </span>
        </div>

        {/* Category Pill */}
        <div className="shrink-0 w-[120px] flex justify-center">
          <Pill label={log.pill} color={log.pillColor} />
        </div>

        {/* Status Badge */}
        <div className="shrink-0 w-[95px] flex justify-end">
          <StatusBadge status={log.status} />
        </div>

        {/* Expand Indicator */}
        <div className="shrink-0 w-[30px] flex justify-center text-[#81c5ff] text-[12px]">
          {isExpanded ? "▲" : "▼"}
        </div>
      </div>

      {/* Inline Expandable Inspector */}
      {isExpanded && (
        <div className="mt-2 mb-3 mx-2 p-4 rounded-xl bg-[#030712] border border-[rgba(129,197,255,0.3)] shadow-inner">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <div className="bg-[rgba(255,255,255,0.03)] p-2.5 rounded-lg border border-[rgba(91,141,184,0.15)]">
              <span className="text-white/40 text-[11px] block">Target Tool</span>
              <span className="text-white font-mono text-[12.5px] font-semibold truncate block">
                {log.call}
              </span>
            </div>
            <div className="bg-[rgba(255,255,255,0.03)] p-2.5 rounded-lg border border-[rgba(91,141,184,0.15)]">
              <span className="text-white/40 text-[11px] block">Timestamp</span>
              <span className="text-white font-mono text-[12.5px] block">{log.time}</span>
            </div>
            <div className={`p-2.5 rounded-lg border ${log.status === "blocked" ? "bg-[rgba(255,56,60,0.1)] border-[rgba(255,56,60,0.3)]" : "bg-[rgba(52,199,89,0.08)] border-[rgba(52,199,89,0.3)]"}`}>
              <span className="text-white/50 text-[11px] block">DLP Guardrail Decision</span>
              <span className="font-bold text-[12px]" style={{ color: log.status === "blocked" ? "#ff383c" : "#5fe3b3" }}>
                {log.status === "blocked" ? "Threat Blocked & Quarantined" : "Authorized & Verified"}
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-white/70 font-semibold text-[11.5px]">JSON-RPC 2.0 Wire Frame</span>
              <span className="text-white/40 font-mono text-[10px]">application/json</span>
            </div>
            <pre className="p-3 bg-[#010106] border border-[rgba(91,141,184,0.25)] rounded-lg text-[#5fe3b3] font-mono text-[12px] leading-relaxed overflow-x-auto max-h-[220px] custom-scrollbar select-all">
              {log.payload
                ? JSON.stringify(log.payload, null, 2)
                : JSON.stringify(
                    {
                      jsonrpc: "2.0",
                      method: "tools/call",
                      params: {
                        name: log.call,
                        summary: log.summary,
                        detail: log.detail,
                      },
                      status: log.status,
                    },
                    null,
                    2
                  )}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

// ── DLP Stat ───────────────────────────────────────────────────────────────

function DlpStat({
  value,
  label,
  icon,
}: {
  value: string | number;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-start gap-1 min-w-[140px] font-helvetica">
      <div className="flex items-center gap-2.5 h-[26px]">
        <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0">
          {icon}
        </div>
        <span
          className="text-white text-[24px] font-['Helvetica',Helvetica,Arial,sans-serif] leading-none font-normal"
        >
          {value}
        </span>
      </div>
      <span
        className="text-[#9c9c9c] text-[14px] leading-snug"
      >
        {label}
      </span>
    </div>
  );
}

// ── Main Page Component ───────────────────────────────────────────────────

interface LiveTrafficPageProps {
  onNavigate?: (page: string) => void;
}

export default function LiveTrafficPage({ onNavigate = () => {} }: LiveTrafficPageProps) {
  const [currentTab, setCurrentTab] = useState("traffic");
  const [logs, setLogs] = useState<StructuredLog[]>([]);
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isExecuting, setIsExecuting] = useState<string | null>(null);

  // Load initial logs and subscribe to real-time SSE stream
  useEffect(() => {
    fetchTrafficLogs().then((data) => {
      if (data && data.logs) {
        setLogs(data.logs);
      }
    });

    const unsubscribe = subscribeTrafficStream(
      (newLog) => {
        if (!isPaused) {
          setLogs((prev) => [newLog, ...prev]);
        }
      },
      (connected) => {
        setIsConnected(connected);
      }
    );

    return () => unsubscribe();
  }, [isPaused]);

  // Derived metrics
  const toolCallsCount = logs.length;
  const blockedCount = logs.filter((l) => l.status === "blocked").length;
  const allowedCount = logs.filter((l) => l.status === "allowed").length;
  const sensitivePatternsCount = logs.filter(
    (l) => l.pill === ".env leak" || l.pill === ".env variable" || l.pill === "API token" || l.status === "blocked"
  ).length;

  const handleClear = async () => {
    await clearTrafficLogs();
    setLogs([]);
    setExpandedLogId(null);
  };

  const handleExecuteTool = async (
    server: string,
    tool: string,
    args?: Record<string, any>,
    keyLabel?: string
  ) => {
    setIsExecuting(keyLabel || tool);
    try {
      const res = await executeToolCall(server, tool, args);
      if (res && res.entry && !isPaused) {
        setLogs((prev) => [res.entry!, ...prev]);
        setExpandedLogId(res.entry.id);
      }
    } finally {
      setIsExecuting(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#010106]">
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onNavigate={onNavigate}
      />

      {/* Main content */}
      <main className="flex-1 min-w-0 px-8 lg:px-10 py-8 overflow-y-auto custom-scrollbar">
        {/* Top Breadcrumb & Action */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-[#81c5ff]/80 font-helvetica">
            <button
              onClick={() => onNavigate("home")}
              className="text-[#81c5ff] hover:underline bg-transparent border-none cursor-pointer p-0 font-helvetica text-sm"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-white/60">Live Traffic</span>
            <span
              className="ml-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono"
              style={{
                background: isConnected ? "rgba(52,199,89,0.15)" : "rgba(255,56,60,0.15)",
                color: isConnected ? "#34C759" : "#FF383C",
                border: isConnected ? "1px solid rgba(52,199,89,0.4)" : "1px solid rgba(255,56,60,0.4)",
              }}
            >
              <span
                className={`w-2 h-2 rounded-full ${isConnected ? "animate-pulse" : ""}`}
                style={{ background: isConnected ? "#34C759" : "#FF383C" }}
              />
              {isConnected ? "Live EventStream Connected" : "Connecting..."}
            </span>
          </div>
        </div>

        {/* Header */}
        <h1 className="font-conthrax text-[#81c5ff] text-[36px] lg:text-[40px] leading-tight tracking-wide mb-2">
          Live Traffic
        </h1>
        <p className="font-['Helvetica',Helvetica,Arial,sans-serif] text-white/70 text-[15px] lg:text-[16px] mb-6 max-w-[800px] leading-relaxed">
          Real-time MCP wire inspection and DLP guardrail monitor. Automatically captures, parses, and audits every incoming and outgoing JSON-RPC tool frame.
        </p>

        {/* Stat Cards */}
        <div className="flex flex-wrap gap-4 mb-6">
          <StatCard value={toolCallsCount} label="Tool calls" icon={<IconTool />} borderColor="rgba(91,141,184,0.6)" />
          <StatCard value={blockedCount} label="Blocked transfers" icon={<IconDanger />} borderColor="rgba(255,56,60,0.6)" />
          <StatCard value={0} label="Sensitive data leaked" icon={<IconShield />} borderColor="rgba(91,141,184,0.6)" />
        </div>

        {/* Real Tool Execution & Test Bar */}
        <div className="rounded-[20px] p-4 mb-5 bg-[rgba(91,141,184,0.06)] border border-[rgba(129,197,255,0.3)] flex flex-col gap-2.5 font-helvetica">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5fe3b3] animate-ping" />
              <span className="text-white text-[15px] font-bold">Call / Test Real MCP Tools</span>
              <span className="text-white/50 text-[12px]">(Triggers live inspection wire frame in real time)</span>
            </div>
            {isExecuting && (
              <span className="text-[#81c5ff] text-xs font-mono animate-pulse">
                ⚡ Executing {isExecuting}...
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <button
              disabled={!!isExecuting}
              onClick={() =>
                handleExecuteTool(
                  "safe-math",
                  "calculate_expression",
                  { expression: `${Math.floor(Math.random() * 20 + 5)} * ${Math.floor(Math.random() * 15 + 2)} + 10` },
                  "safe-math"
                )
              }
              className="flex items-center justify-between px-3.5 py-2.5 rounded-[12px] bg-[rgba(129,197,255,0.08)] border border-[rgba(129,197,255,0.3)] text-white hover:bg-[rgba(129,197,255,0.16)] transition-all cursor-pointer text-left text-xs"
            >
              <div>
                <p className="font-bold text-[#81c5ff]">safe-math</p>
                <p className="text-white/60 text-[11px]">calculate_expression</p>
              </div>
              <span className="text-[#5fe3b3] font-mono text-[11px]">Safe →</span>
            </button>

            <button
              disabled={!!isExecuting}
              onClick={() =>
                handleExecuteTool(
                  "live-crypto-pulse",
                  "get_live_crypto_price",
                  { symbol: ["BTC", "ETH", "SOL"][Math.floor(Math.random() * 3)] },
                  "live-crypto-pulse"
                )
              }
              className="flex items-center justify-between px-3.5 py-2.5 rounded-[12px] bg-[rgba(129,197,255,0.08)] border border-[rgba(129,197,255,0.3)] text-white hover:bg-[rgba(129,197,255,0.16)] transition-all cursor-pointer text-left text-xs"
            >
              <div>
                <p className="font-bold text-[#81c5ff]">live-crypto-pulse</p>
                <p className="text-white/60 text-[11px]">get_live_crypto_price</p>
              </div>
              <span className="text-[#5fe3b3] font-mono text-[11px]">Safe →</span>
            </button>

            <button
              disabled={!!isExecuting}
              onClick={() =>
                handleExecuteTool(
                  "network-speed-probe",
                  "ping_latency_check",
                  { target_host: "1.1.1.1" },
                  "ping_latency_check"
                )
              }
              className="flex items-center justify-between px-3.5 py-2.5 rounded-[12px] bg-[rgba(129,197,255,0.08)] border border-[rgba(129,197,255,0.3)] text-white hover:bg-[rgba(129,197,255,0.16)] transition-all cursor-pointer text-left text-xs"
            >
              <div>
                <p className="font-bold text-[#81c5ff]">network-speed-probe</p>
                <p className="text-white/60 text-[11px]">ping_latency_check</p>
              </div>
              <span className="text-[#5fe3b3] font-mono text-[11px]">Safe →</span>
            </button>

            <button
              disabled={!!isExecuting}
              onClick={() =>
                handleExecuteTool(
                  "network-speed-probe",
                  "deep_packet_inspection",
                  { target_env: ".env AWS_SECRET_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE" },
                  "deep_packet_inspection"
                )
              }
              className="flex items-center justify-between px-3.5 py-2.5 rounded-[12px] bg-[rgba(255,56,60,0.12)] border border-[rgba(255,56,60,0.5)] text-white hover:bg-[rgba(255,56,60,0.2)] transition-all cursor-pointer text-left text-xs"
            >
              <div>
                <p className="font-bold text-[#ff383c]">DLP Test (Probe)</p>
                <p className="text-white/60 text-[11px]">Exfiltrate .env secret</p>
              </div>
              <span className="text-[#ff383c] font-mono text-[11px]">Block 🛑</span>
            </button>
          </div>
        </div>

        {/* Full-width Spacious Streaming Traffic Table */}
        <div className="rounded-[24px] p-6 mb-5 bg-[rgba(91,141,184,0.05)] border border-[rgba(129,197,255,0.4)] flex flex-col">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <IconStream />
              <div>
                <span className="text-white text-[20px] font-bold font-helvetica block">
                  Streaming traffic
                </span>
                <span className="text-white/50 text-xs font-helvetica">
                  Click any row to inspect its live JSON-RPC frame & DLP verdict
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className={`flex items-center gap-1.5 px-3 h-8 rounded-[8px] text-[13px] transition-opacity hover:opacity-80 cursor-pointer font-helvetica ${
                  isPaused
                    ? "bg-[#ffd561]/20 border border-[#ffd561] text-[#ffd561]"
                    : "bg-[rgba(129,197,255,0.08)] border border-[#81c5ff] text-[#81c5ff]"
                }`}
              >
                <span className="font-bold text-[12px]">{isPaused ? "▶" : "⏸"}</span>
                {isPaused ? "Resume" : "Pause"}
              </button>
              <button
                onClick={handleClear}
                className="flex items-center gap-1.5 px-3 h-8 rounded-[8px] text-[#81c5ff] text-[13px] transition-opacity hover:opacity-80 bg-transparent border border-[#5b8db8] cursor-pointer font-helvetica"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M2 4H14M6 4V2H10V4M12 4V14H4V4H12Z" stroke="#81C5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Clear
              </button>
            </div>
          </div>

          {/* Table Header Bar */}
          <div className="flex items-center gap-4 px-4 py-2 text-[11px] font-mono uppercase tracking-wider text-white/40 border-b border-[rgba(91,141,184,0.2)]">
            <span className="w-[100px] shrink-0">Time</span>
            <span className="w-[95px] shrink-0">Direction</span>
            <span className="flex-1 min-w-0">Tool Invocation & Summary</span>
            <span className="w-[120px] shrink-0 text-center">Category</span>
            <span className="w-[95px] shrink-0 text-right">Status</span>
            <span className="w-[30px] shrink-0 text-center">Info</span>
          </div>

          {/* Log Rows with clean max-height and custom scrollbar */}
          <div className="max-h-[500px] overflow-y-auto pr-1 flex flex-col gap-1 custom-scrollbar mt-1">
            {logs.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center justify-center font-helvetica">
                <p className="text-white/50 text-[15px] mb-2">No live traffic recorded in stream.</p>
                <p className="text-[#81c5ff]/80 text-xs">Use the tool triggers above to execute live MCP calls.</p>
              </div>
            ) : (
              logs.map((log) => (
                <LogRow
                  key={log.id}
                  log={log}
                  isExpanded={expandedLogId === log.id}
                  onToggle={() =>
                    setExpandedLogId((prev) => (prev === log.id ? null : log.id))
                  }
                />
              ))
            )}
          </div>
        </div>

        {/* DLP Summary Card */}
        <div
          className="rounded-[24px] px-6 py-5 bg-[rgba(91,141,184,0.05)] border border-[rgba(91,141,184,0.6)]"
        >
          {/* Card Header */}
          <div className="flex items-center gap-4 mb-5">
            <IconFile />
            <span
              className="text-white text-[22px] font-bold font-helvetica"
            >
              DLP Summary
            </span>
          </div>

          {/* DLP Stats */}
          <div className="flex flex-wrap gap-x-12 gap-y-4">
            <DlpStat
              value={blockedCount}
              label="Blocked transfers"
              icon={<IconRedTriangle size={20} />}
            />
            <DlpStat
              value={sensitivePatternsCount}
              label="Sensitive patterns detected"
              icon={<IconYellowWarn size={20} />}
            />
            <DlpStat
              value={allowedCount}
              label="Allowed calls"
              icon={<IconCheck size={20} />}
            />
            <DlpStat
              value={0}
              label="Data leaked"
              icon={<IconShield />}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
