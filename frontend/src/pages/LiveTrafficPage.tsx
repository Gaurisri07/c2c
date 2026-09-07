import React, { useState, useEffect } from "react";
import logoImg from "@/imports/LiveTraffic/47202af915ec7162b9a01888274487160ee55234.png";
import {
  fetchTrafficLogs,
  clearTrafficLogs,
  simulateTrafficEvent,
  subscribeTrafficStream,
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

function IconShield() {
  return (
    <svg width="33" height="37" viewBox="0 0 33 37" fill="none">
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

function IconCheck({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="#34C759" strokeWidth="1.5" />
      <path d="M5 8L7 10L11 6" stroke="#34C759" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconAutomate() {
  return (
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
      <path d="M10.5 0C5 0 0.5 4.5 0.5 10C0.5 15.5 5 20 10.5 20C16 20 20.5 15.5 20.5 10C20.5 4.5 16 0 10.5 0ZM10.5 18C6.1 18 2.5 14.4 2.5 10C2.5 5.6 6.1 2 10.5 2C14.9 2 18.5 5.6 18.5 10C18.5 14.4 14.9 18 10.5 18Z" fill="#5B8DB8" />
      <path d="M10.5 5L13.5 10H7.5L10.5 5Z" fill="#5B8DB8" />
      <path d="M10.5 15L7.5 10H13.5L10.5 15Z" fill="#5B8DB8" />
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

function Sidebar({ currentTab, onSelectTab, onNavigate }: SidebarProps) {
  return (
    <aside className="w-[290px] shrink-0 flex flex-col pt-0 pb-8 border-r border-[rgba(91,141,184,0.2)] bg-[#010106] h-full overflow-y-auto">
      {/* Logo */}
      <button
        onClick={() => onNavigate("home")}
        className="w-[220px] mx-auto mt-[-7px] mb-4 bg-transparent border-none p-0 cursor-pointer hover:opacity-85 transition-opacity"
        title="Return to Home"
      >
        <img src={logoImg} alt="MCP Sentinel" className="w-full object-contain pointer-events-none" />
      </button>

      {/* Nav */}
      <nav className="flex flex-col gap-[10px] px-4">
        {NAV.map(({ id, label, icon: Icon }) => {
          const active = id === currentTab;
          return (
            <div
              key={id}
              onClick={() => {
                onSelectTab(id);
                if (id === "home") onNavigate("home");
                else if (id === "handshake" || id === "dashboard") onNavigate("handshake");
                else if (id === "registry") onNavigate("registry");
                else if (id === "traffic") onNavigate("traffic");
                else if (id === "threats") onNavigate("threats");
              }}
              className={`relative flex items-center gap-5 px-4 py-2 rounded-[20px] cursor-pointer transition-colors hover:bg-[rgba(129,197,255,0.05)] ${
                active ? "bg-[rgba(129,197,255,0.03)]" : ""
              }`}
            >
              {active && (
                <div className="absolute inset-0 border border-[#81c5ff] rounded-[20px] pointer-events-none" />
              )}
              <div className="w-[22px] h-[22px] flex items-center justify-center shrink-0 relative z-10 text-[#81c5ff]">
                <Icon />
              </div>
              <span
                className={`font-['Helvetica',sans-serif] text-[18px] leading-normal relative z-10 ${
                  active ? "text-[#81c5ff]" : "text-[#9c9c9c]"
                }`}
              >
                {label}
              </span>
            </div>
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
          className="text-white leading-none font-conthrax text-[36px]"
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
    blue: "border-[#0276e2] text-[rgba(255,255,255,0.75)]",
    yellow: "border-[rgba(255,213,97,0.9)] text-[rgba(255,255,255,0.75)]",
    green: "border-[#5fe3b3] text-[rgba(255,255,255,0.75)]",
  };
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-[10px] border text-[14px] whitespace-nowrap font-helvetica ${styles[color]}`}
    >
      {label}
    </span>
  );
}

function StatusBadge({ status }: { status: LogStatus }) {
  if (status === "blocked") {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[9px] text-[#ff383c] text-[12px] whitespace-nowrap bg-[rgba(255,56,60,0.1)] border border-[rgba(255,56,60,0.4)] font-helvetica"
      >
        <IconRedTriangle size={13} />
        blocked
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[9px] text-[rgba(255,255,255,0.9)] text-[12px] whitespace-nowrap bg-[rgba(95,227,179,0.1)] border border-[#5fe3b3] font-helvetica"
    >
      <IconCheck size={13} />
      allowed
    </span>
  );
}

function LogRow({ log }: { log: StructuredLog }) {
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-2 py-3 border-b border-[rgba(91,141,184,0.15)] last:border-0 font-helvetica">
      <span
        className="text-[#9c9c9c] text-[16px] shrink-0 w-[85px] tabular-nums"
      >
        {log.time}
      </span>
      <div className="flex flex-col gap-0.5 flex-1 min-w-[200px]">
        <span
          className="text-white text-[16px]"
        >
          <span className="text-[#81c5ff]/80">tools/call</span>{" "}
          <span className="font-semibold text-white">{log.call}</span>
        </span>
        <span
          className="text-[#9c9c9c] text-[13.5px] truncate"
        >
          {log.detail}
        </span>
      </div>
      <div className="flex items-center gap-3 ml-auto shrink-0">
        <Pill label={log.pill} color={log.pillColor} />
        <StatusBadge status={log.status} />
      </div>
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
    <div className="flex flex-col gap-1 min-w-[140px] font-helvetica">
      <div className="flex items-center gap-2">
        <span className="shrink-0">{icon}</span>
        <span
          className="text-white text-[24px] font-conthrax leading-none"
        >
          {value}
        </span>
      </div>
      <span
        className="text-[#9c9c9c] text-[14px]"
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
  const [isPaused, setIsPaused] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

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
  const sensitivePatternsCount = logs.filter((l) => l.pill === ".env variable" || l.pill === "API token").length;

  const handleClear = async () => {
    await clearTrafficLogs();
    setLogs([]);
  };

  const handleSimulate = async (type: "leak" | "injection" | "safe") => {
    const entry = await simulateTrafficEvent(type);
    if (entry && !isPaused) {
      setLogs((prev) => [entry, ...prev]);
    }
  };

  return (
    <div className="flex h-full min-h-screen bg-[#010106] text-white overflow-hidden w-full">
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onNavigate={onNavigate}
      />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto px-8 py-8">
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
            <span className="ml-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-mono" style={{ background: isConnected ? "rgba(52,199,89,0.15)" : "rgba(255,56,60,0.15)", color: isConnected ? "#34C759" : "#FF383C" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: isConnected ? "#34C759" : "#FF383C" }} />
              {isConnected ? "Live Stream Active" : "Polling Mode"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick simulation dropdown / buttons for testing */}
            <button
              onClick={() => handleSimulate("leak")}
              className="px-2.5 py-1 rounded text-xs border border-[#ff383c]/50 text-[#ff383c] hover:bg-[#ff383c]/10 bg-transparent cursor-pointer font-helvetica"
              title="Simulate credential leak"
            >
              + Sim Secret Leak
            </button>
            <button
              onClick={() => handleSimulate("injection")}
              className="px-2.5 py-1 rounded text-xs border border-[#ffd561]/50 text-[#ffd561] hover:bg-[#ffd561]/10 bg-transparent cursor-pointer font-helvetica"
              title="Simulate prompt injection"
            >
              + Sim Injection
            </button>
            <button
              onClick={() => handleSimulate("safe")}
              className="px-2.5 py-1 rounded text-xs border border-[#34c759]/50 text-[#34c759] hover:bg-[#34c759]/10 bg-transparent cursor-pointer font-helvetica"
              title="Simulate safe query"
            >
              + Sim Safe Query
            </button>

            <button
              onClick={() => onNavigate("home")}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#81c5ff]/30 text-[#81c5ff] hover:bg-[#81c5ff]/10 transition-colors text-sm font-helvetica bg-transparent cursor-pointer"
            >
              ← Back to Landing
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1
            className="text-[#81c5ff] leading-tight mb-1 font-conthrax text-[42px]"
          >
            Live Traffic
          </h1>
          <p
            className="text-white text-[16px] font-helvetica"
          >
            Visualizes runtime tools/call inspection and blocked exfiltration attempts in real time.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="flex flex-wrap gap-4 mb-6">
          <StatCard value={toolCallsCount} label="Tool calls" icon={<IconTool />} borderColor="rgba(91,141,184,0.6)" />
          <StatCard value={blockedCount} label="Blocked transfers" icon={<IconDanger />} borderColor="rgba(255,56,60,0.6)" />
          <StatCard value={0} label="Sensitive data leaked" icon={<IconShield />} borderColor="rgba(91,141,184,0.6)" />
        </div>

        {/* Streaming Traffic Card */}
        <div
          className="rounded-[24px] p-6 mb-5 bg-[rgba(91,141,184,0.05)] border border-[rgba(129,197,255,0.4)]"
        >
          {/* Card Header */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div className="flex items-center gap-4">
              <IconStream />
              <span
                className="text-white text-[22px] font-bold font-helvetica"
              >
                Streaming traffic
              </span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className={`flex items-center gap-2 px-4 h-9 rounded-[10px] text-[15px] transition-opacity hover:opacity-80 cursor-pointer font-helvetica ${
                  isPaused
                    ? "bg-[#ffd561]/20 border border-[#ffd561] text-[#ffd561]"
                    : "bg-[rgba(129,197,255,0.08)] border border-[#81c5ff] text-[#81c5ff]"
                }`}
              >
                <span className="font-bold tracking-widest text-[14px]">{isPaused ? "▶" : "| |"}</span>
                {isPaused ? "Resume" : "Pause"}
              </button>
              <button
                onClick={handleClear}
                className="flex items-center gap-2 px-4 h-9 rounded-[10px] text-[#81c5ff] text-[15px] transition-opacity hover:opacity-80 bg-transparent border border-[#5b8db8] cursor-pointer font-helvetica"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 4H14M6 4V2H10V4M12 4V14H4V4H12Z" stroke="#81C5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Clear
              </button>
            </div>
          </div>

          {/* Log rows */}
          <div className="max-h-[380px] overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-white/40 text-center py-8 font-helvetica">No live traffic recorded yet. Use the simulation buttons above to generate traffic events.</p>
            ) : (
              logs.map((log) => <LogRow key={log.id} log={log} />)
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
              icon={<IconAutomate />}
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
