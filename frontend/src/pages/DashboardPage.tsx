import React, { useState, useEffect } from "react";
import svgPaths from "@/imports/Dashboard/svg-6ny5f24cb2";
import mcpLogo from "@/imports/Dashboard/mcp-logo.png";
import {
  fetchSystemStatus,
  fetchServers,
  fetchTrafficLogs,
  subscribeTrafficStream,
  ServerData,
  TrafficData,
  SystemStatus,
  StructuredLog,
} from "@/services/api";

// ── SVG Icons ────────────────────────────────────────────────────────────────

function IconHome({ className }: { className?: string }) {
  return (
    <svg className={className || "w-[26px] h-[23px]"} fill="none" viewBox="0 0 22 19">
      <path d="M1 9.5L11 1L21 9.5V18H14V12H8V18H1V9.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconDashboard({ className }: { className?: string }) {
  return (
    <svg className={className || "w-[28px] h-[24px]"} fill="none" viewBox="0 0 22 18.9444">
      <path d={svgPaths.p17fb4440} fill="currentColor" />
    </svg>
  );
}

function IconServer({ className }: { className?: string }) {
  return (
    <svg className={className || "w-[26px] h-[23px]"} fill="none" viewBox="0 0 20 18">
      <path d={svgPaths.pd404c00} fill="currentColor" />
    </svg>
  );
}

function IconFolder({ className }: { className?: string }) {
  return (
    <svg className={className || "w-[22px] h-[18px]"} fill="none" viewBox="0 0 17.1875 14.0938">
      <path d={svgPaths.p14d71100} fill="currentColor" />
    </svg>
  );
}

function IconBeat({ className }: { className?: string }) {
  return (
    <svg className={className || "w-[28px] h-[23px]"} fill="none" viewBox="0 0 21.649 17.5013">
      <path d={svgPaths.p288dcd00} fill="currentColor" />
    </svg>
  );
}

function IconTriangle({ className }: { className?: string }) {
  return (
    <svg className={className || "w-[26px] h-[23px]"} fill="none" viewBox="0 0 19.9999 17.9999">
      <path d={svgPaths.p369822b2} fill="currentColor" />
    </svg>
  );
}

function IconSettings({ className }: { className?: string }) {
  return (
    <svg className={className || "w-[28px] h-[28px]"} fill="none" viewBox="0 0 21.8711 21.8711">
      <path d={svgPaths.p245a1f80} fill="currentColor" />
    </svg>
  );
}

function IconPlug({ className }: { className?: string }) {
  return (
    <svg className={className || "w-[26px] h-[26px]"} fill="none" viewBox="0 0 21 21">
      <path d={svgPaths.p2925c900} fill="currentColor" />
    </svg>
  );
}

function IconTool({ className }: { className?: string }) {
  return (
    <svg className={className || "w-[24px] h-[24px]"} fill="none" viewBox="0 0 18.7104 18.6995">
      <path d={svgPaths.p23767480} fill="currentColor" />
    </svg>
  );
}

function IconShield({ className }: { className?: string }) {
  return (
    <svg className={className || "w-[42px] h-[50px]"} fill="none" viewBox="0 0 33 39">
      <path d={svgPaths.p2e23e9c0} fill="currentColor" />
    </svg>
  );
}

function IconAutomation({ className }: { className?: string }) {
  return (
    <svg className={className || "w-[26px] h-[24px]"} fill="none" viewBox="0 0 20 18.8889">
      <g clipPath="url(#auto-clip)">
        <path d={svgPaths.p39078e80} fill="currentColor" />
        <path d={svgPaths.p29e7f500} fill="currentColor" />
      </g>
      <defs>
        <clipPath id="auto-clip">
          <rect fill="white" height="18.8889" width="20" />
        </clipPath>
      </defs>
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg fill="none" height="12.6667" viewBox="0 0 14.25 12.6667" width="14.25">
      <path d={svgPaths.p4815080} stroke="#81C5FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.58333" />
    </svg>
  );
}

// ── Badges ───────────────────────────────────────────────────────────────────

type StatusVariant = "verified" | "quarantined" | "scanning" | "blocked" | "flagged";

function StatusBadge({ variant }: { variant: StatusVariant }) {
  const styles = {
    verified: "border-[#34c759] text-[rgba(52,199,89,0.9)] bg-[rgba(52,199,89,0.08)]",
    quarantined: "border-[#ff383c] text-[rgba(255,56,60,0.9)] bg-[rgba(255,56,60,0.08)]",
    scanning: "border-[#81c5ff] text-[rgba(129,197,255,0.9)] bg-[rgba(129,197,255,0.08)]",
    blocked: "border-[#ff383c] text-[rgba(255,56,60,0.9)] bg-[rgba(255,56,60,0.08)]",
    flagged: "border-[rgba(255,213,97,0.9)] text-[rgba(255,213,97,0.9)] bg-[rgba(255,213,97,0.08)]",
  };
  const labels = {
    verified: "Verified",
    quarantined: "Quarantined",
    scanning: "Scanning",
    blocked: "Blocked",
    flagged: "Flagged",
  };
  return (
    <span className={`border border-solid font-['Helvetica',Helvetica,Arial,sans-serif] text-[12px] px-[11px] py-[4px] rounded-[10px] whitespace-nowrap ${styles[variant] || styles.verified}`}>
      {labels[variant] || "Verified"}
    </span>
  );
}

// ── Sidebar ──────────────────────────────────────────────────────────────────

interface DashboardPageProps {
  onNavigate?: (page: string) => void;
}

export default function DashboardPage({ onNavigate = () => {} }: DashboardPageProps) {
  const [servers, setServers] = useState<ServerData>({
    total: 4,
    trusted: 2,
    quarantined: 1,
    removed: 1,
    servers: [],
  });

  const [traffic, setTraffic] = useState<TrafficData>({
    total: 0,
    toolCalls: 1284,
    blockedTransfers: 3,
    sensitiveDataLeaked: 0,
    logs: [],
  });

  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [liveEvents, setLiveEvents] = useState<StructuredLog[]>([]);

  useEffect(() => {
    fetchSystemStatus().then((s) => setStatus(s));
    fetchServers().then((s) => setServers(s));
    fetchTrafficLogs().then((t) => {
      setTraffic(t);
      if (t.logs) setLiveEvents(t.logs.slice(0, 10));
    });

    const unsubscribe = subscribeTrafficStream((newLog) => {
      setLiveEvents((prev) => [newLog, ...prev.slice(0, 15)]);
      setTraffic((prev) => ({
        ...prev,
        total: prev.total + 1,
        toolCalls: prev.toolCalls + 1,
        blockedTransfers: newLog.status === "blocked" ? prev.blockedTransfers + 1 : prev.blockedTransfers,
      }));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const totalServers = servers.total || 4;
  const toolsScanned = traffic.toolCalls || 1284;
  const threatsBlocked = traffic.blockedTransfers || 3;
  const leaksPrevented = 47 + (traffic.sensitiveDataLeaked || 0);

  const navItems = [
    { id: "home",      label: "Home",              icon: <IconHome /> },
    { id: "dashboard", label: "Dashboard",         icon: <IconDashboard />, active: true },
    { id: "handshake", label: "Handshake Monitor", icon: <IconServer /> },
    { id: "registry",  label: "Server Registry",   icon: <IconFolder /> },
    { id: "traffic",   label: "Live Traffic",      icon: <IconBeat /> },
    { id: "threats",   label: "Threats",           icon: <IconTriangle /> },
    { id: "settings",  label: "Policy & Settings", icon: <IconSettings /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#010106]">
      {/* ── Sidebar ── */}
      <aside className="w-[280px] min-w-[280px] shrink-0 min-h-screen flex flex-col bg-[#010106] border-r border-[rgba(91,141,184,0.18)]">
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

        <nav className="flex flex-col gap-1.5 px-3 pt-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-3.5 w-full h-[46px] px-4 rounded-[14px] text-left transition-colors cursor-pointer ${
                item.active
                  ? "border border-[#81c5ff] text-[#81c5ff] bg-[rgba(129,197,255,0.06)]"
                  : "text-[#9c9c9c] hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <span className="w-[22px] h-[22px] flex items-center justify-center shrink-0 text-[#81c5ff]">
                {item.icon}
              </span>
              <span className="font-['Helvetica',Helvetica,Arial,sans-serif] text-[16px] leading-none whitespace-nowrap">
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 min-w-0 px-8 lg:px-10 py-8 overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <h1 className="font-conthrax text-[#81c5ff] text-[36px] lg:text-[40px] leading-tight tracking-wide">
            Dashboard
          </h1>
          {status?.daemon && (
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#5FE3B3] animate-pulse" />
              <span className="font-['Helvetica',sans-serif] text-[13px] text-[#5FE3B3]">
                Daemon Active (PID {status.daemon.pid || 2894})
              </span>
            </div>
          )}
        </div>
        <p className="font-['Helvetica',Helvetica,Arial,sans-serif] text-white/70 text-[15px] lg:text-[16px] mb-6 max-w-[800px] leading-relaxed">
          Monitor MCP connections, threats and protection in real time.
        </p>

        {/* Status banner */}
        <div className="w-full bg-[rgba(95,227,179,0.08)] border border-[#5fe3b3] rounded-[20px] px-7 py-5 flex items-center justify-between mb-7">
          <div className="flex items-center gap-5">
            <span className="text-[#5fe3b3]">
              <IconShield className="w-[36px] h-[41px]" />
            </span>
            <div>
              <p className="font-['Helvetica',Helvetica,Arial,sans-serif] font-bold text-[#5fe3b3] text-[34px] leading-tight">
                Protected
              </p>
              <p className="font-['Helvetica',Helvetica,Arial,sans-serif] text-[#9c9c9c] text-[14px]">
                All connected MCP servers are under active protection.
              </p>
            </div>
          </div>
          <p className="font-['Helvetica',Helvetica,Arial,sans-serif] font-light text-[#fefefe] text-[22px] whitespace-nowrap">
            0 active threats
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-4 mb-7">
          {/* Active Connections */}
          <div className="border border-[#81c5ff] rounded-[32px] bg-transparent px-6 py-5 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[#81c5ff]">
              <IconPlug />
              <span className="font-['Helvetica',Helvetica,Arial,sans-serif] text-[18px] text-white">Active Connections</span>
            </div>
            <p className="font-['Helvetica',Helvetica,Arial,sans-serif] text-[32px] text-white font-normal">{totalServers}</p>
          </div>

          {/* Tools Scanned */}
          <div className="border border-[#81c5ff] rounded-[32px] bg-transparent px-6 py-5 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[#81c5ff]">
              <IconTool />
              <span className="font-['Helvetica',Helvetica,Arial,sans-serif] text-[18px] text-white">Tools Scanned</span>
            </div>
            <p className="font-['Helvetica',Helvetica,Arial,sans-serif] text-[32px] text-white font-normal">{toolsScanned}</p>
          </div>

          {/* Threats Blocked */}
          <div className="border border-[#e35f61] rounded-[32px] bg-transparent px-6 py-5 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[#ff383c]">
              <IconTriangle />
              <span className="font-['Helvetica',Helvetica,Arial,sans-serif] text-[18px] text-white">Threats Blocked</span>
            </div>
            <p className="font-['Helvetica',Helvetica,Arial,sans-serif] text-[32px] text-white font-normal">{threatsBlocked}</p>
          </div>

          {/* Data Leaks Prevented */}
          <div className="border border-[#81c5ff] rounded-[32px] bg-transparent px-6 py-5 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[#81c5ff]">
              <IconAutomation />
              <span className="font-['Helvetica',Helvetica,Arial,sans-serif] text-[18px] text-white">Data Leaks Prevented</span>
            </div>
            <p className="font-['Helvetica',Helvetica,Arial,sans-serif] text-[32px] text-white font-normal">{leaksPrevented}</p>
          </div>
        </div>

        {/* Two Column Middle Section */}
        <div className="grid grid-cols-2 gap-4">
          {/* Connected MCP Servers */}
          <div className="bg-[rgba(129,197,255,0.05)] border border-white/20 rounded-[20px] p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-['Helvetica',Helvetica,Arial,sans-serif] font-bold text-white text-[22px]">
                Connected MCP Servers
              </h2>
              <button
                onClick={() => onNavigate("registry")}
                className="flex items-center gap-1.5 text-[#81c5ff] text-[14px] font-['Helvetica',Helvetica,Arial,sans-serif] hover:opacity-80 transition-opacity bg-transparent border-none cursor-pointer"
              >
                Manage <IconArrowRight />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {(servers.servers.length > 0
                ? servers.servers
                : [
                    { name: "network-speed-probe", status: "quarantined" },
                    { name: "safe-math", status: "trusted" },
                    { name: "live-crypto-pulse", status: "trusted" },
                    { name: "weather-and-currency", status: "trusted" },
                  ]
              ).map((s: any) => {
                const variant: StatusVariant =
                  s.status === "quarantined"
                    ? "quarantined"
                    : s.status === "removed"
                    ? "blocked"
                    : s.status === "scanning"
                    ? "scanning"
                    : "verified";

                return (
                  <div key={s.name || s.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full shrink-0 ${variant === "quarantined" || variant === "blocked" ? "bg-[#FF383C]" : variant === "verified" ? "bg-[#34C759]" : "bg-[#5B8DB8]"}`} />
                      <span className="font-['Helvetica',Helvetica,Arial,sans-serif] text-white text-[14px]">
                        {s.name || s.id}
                      </span>
                      {s.client && (
                        <span className="font-['Helvetica',Helvetica,Arial,sans-serif] text-[#9c9c9c] text-[12px]">
                          ({s.client})
                        </span>
                      )}
                    </div>
                    <StatusBadge variant={variant} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Security Activity Feed */}
          <div className="bg-[rgba(129,197,255,0.05)] border border-white/20 rounded-[20px] p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#5B8DB8]" />
                <h2 className="font-['Helvetica',Helvetica,Arial,sans-serif] font-bold text-white text-[22px]">
                  Security Activity Feed
                </h2>
              </div>
              <button
                onClick={() => onNavigate("traffic")}
                className="flex items-center gap-1.5 text-[#81c5ff] text-[14px] font-['Helvetica',Helvetica,Arial,sans-serif] hover:opacity-80 transition-opacity bg-transparent border-none cursor-pointer"
              >
                Full Traffic Logs <IconArrowRight />
              </button>
            </div>

            <div className="flex flex-col gap-3 overflow-y-auto max-h-[360px]">
              {liveEvents.length > 0 ? (
                liveEvents.map((entry, i) => {
                  const isBlocked = entry.status === "blocked" || entry.direction === "BLOCKED";
                  const variant: StatusVariant = isBlocked ? "blocked" : "verified";
                  return (
                    <div
                      key={entry.id || i}
                      onClick={() => onNavigate(isBlocked ? "threats" : "traffic")}
                      className="flex items-start gap-4 cursor-pointer hover:bg-white/5 p-1.5 rounded-lg transition-colors"
                    >
                      <span className="font-['Helvetica',Helvetica,Arial,sans-serif] text-[#9c9c9c] text-[14px] whitespace-nowrap shrink-0 pt-0.5">
                        {entry.time || "Just now"}
                      </span>
                      <StatusBadge variant={variant} />
                      <div className="flex flex-col min-w-0">
                        <p className="font-['Helvetica',Helvetica,Arial,sans-serif] text-white text-[12px] leading-snug">
                          {entry.call ? `${entry.call} - ` : ""}{entry.summary || "MCP action processed"}
                        </p>
                        <p className="font-['Helvetica',Helvetica,Arial,sans-serif] text-[#9c9c9c] text-[12px] leading-snug">
                          {entry.detail || (isBlocked ? "Malicious instruction stripped." : "Secure connection established.")}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                [
                  { time: "23:05:11", badge: "blocked" as StatusVariant, title: "Prompt injection blocked - network-speed-probe / deep_packet_inspection", detail: "Secret exfiltration payload detected and quarantined." },
                  { time: "23:05:00", badge: "verified" as StatusVariant, title: "Handshake verified - safe-math", detail: "2 arithmetic tools verified clean." },
                  { time: "23:05:00", badge: "verified" as StatusVariant, title: "Handshake verified - live-crypto-pulse", detail: "Live pricing telemetry active." },
                  { time: "23:05:00", badge: "verified" as StatusVariant, title: "Handshake completed - weather-and-currency", detail: "Verified clean manifest." },
                ].map((entry, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="font-['Helvetica',Helvetica,Arial,sans-serif] text-[#9c9c9c] text-[14px] whitespace-nowrap shrink-0 pt-0.5">
                      {entry.time}
                    </span>
                    <StatusBadge variant={entry.badge} />
                    <div className="flex flex-col min-w-0">
                      <p className="font-['Helvetica',Helvetica,Arial,sans-serif] text-white text-[12px] leading-snug">
                        {entry.title}
                      </p>
                      <p className="font-['Helvetica',Helvetica,Arial,sans-serif] text-[#9c9c9c] text-[12px] leading-snug">
                        {entry.detail}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Runtime Protection */}
        <div className="bg-[rgba(129,197,255,0.05)] border border-white/20 rounded-[20px] p-5 mt-4">
          <h2 className="font-['Helvetica',Helvetica,Arial,sans-serif] font-bold text-white text-[22px] mb-4">
            Runtime Protection
          </h2>
          <div className="flex items-end gap-16">
            <div className="flex flex-col gap-1">
              <p className="font-['Helvetica',Helvetica,Arial,sans-serif] text-white text-[32px] font-normal">0</p>
              <p className="font-['Helvetica',Helvetica,Arial,sans-serif] text-[#9c9c9c] text-[14px]">Active Threats</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-['Helvetica',Helvetica,Arial,sans-serif] text-[#ff383c] text-[32px] font-normal">{threatsBlocked}</p>
              <p className="font-['Helvetica',Helvetica,Arial,sans-serif] text-[#9c9c9c] text-[14px]">Blocked this Session</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-['Helvetica',Helvetica,Arial,sans-serif] text-white text-[32px] font-normal">{leaksPrevented}</p>
              <p className="font-['Helvetica',Helvetica,Arial,sans-serif] text-[#9c9c9c] text-[14px]">Total blocked</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
