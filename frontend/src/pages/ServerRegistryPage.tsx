import React, { useState } from "react";
import svgPaths from "@/imports/Server/svg-smh4dtcf2k";
import logoImg from "@/imports/Server/47202af915ec7162b9a01888274487160ee55234.png";

// ─── Status pill ────────────────────────────────────────────────────────────
type PillVariant = "trusted" | "quarantined" | "removed" | "connected";

const pillStyles: Record<PillVariant, string> = {
  trusted:
    "bg-[rgba(95,227,179,0.1)] border-[#5fe3b3] text-[#5fe3b3]",
  quarantined:
    "bg-[rgba(208,141,23,0.1)] border-[#d08d17] text-[#d08d17]",
  removed:
    "bg-[rgba(2,118,226,0.1)] border-[#0276e2] text-[#0276e2]",
  connected:
    "bg-[rgba(95,227,179,0.1)] border-[#5fe3b3] text-[#5fe3b3]",
};

function StatusPill({ variant, label }: { variant: PillVariant; label: string }) {
  return (
    <span
      className={`inline-flex items-center border border-solid rounded-[9px] px-2.5 h-[25px] text-[11px] whitespace-nowrap font-['Helvetica',sans-serif] ${pillStyles[variant]}`}
    >
      {label}
    </span>
  );
}

// ─── Sidebar nav items ───────────────────────────────────────────────────────
function SidebarItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`relative flex items-center gap-5 px-4 py-2 rounded-[20px] cursor-pointer transition-colors hover:bg-[rgba(129,197,255,0.05)] ${
        active ? "bg-[rgba(129,197,255,0.03)]" : ""
      }`}
    >
      {active && (
        <div className="absolute inset-0 border border-[#81c5ff] rounded-[20px] pointer-events-none" />
      )}
      <div className="w-[22px] h-[22px] flex items-center justify-center shrink-0 relative z-10">
        {icon}
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
}

interface ServerRegistryPageProps {
  onNavigate?: (page: string) => void;
}

export default function ServerRegistryPage({ onNavigate = () => {} }: ServerRegistryPageProps) {
  const [currentTab, setCurrentTab] = useState("registry");

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    if (tabId === "home") {
      onNavigate("home");
    } else if (tabId === "handshake" || tabId === "dashboard") {
      onNavigate("handshake");
    } else if (tabId === "registry") {
      onNavigate("registry");
    } else if (tabId === "traffic") {
      onNavigate("traffic");
    }
  };

  return (
    <div className="flex h-full min-h-screen bg-[#010106] text-white overflow-x-hidden w-full">
      {/* ── Sidebar ── */}
      <aside className="w-[290px] shrink-0 flex flex-col pt-0 pb-8 border-r border-[rgba(91,141,184,0.2)]">
        {/* Logo */}
        <button
          onClick={() => onNavigate("home")}
          className="w-[220px] mx-auto mt-[-7px] mb-4 bg-transparent border-none p-0 cursor-pointer hover:opacity-85 transition-opacity"
          title="Return to Home"
        >
          <img
            src={logoImg}
            alt="MCP Sentinel"
            className="w-full object-contain pointer-events-none"
          />
        </button>

        {/* Nav */}
        <nav className="flex flex-col gap-[10px] px-4">
          {/* Home */}
          <SidebarItem
            onClick={() => handleNavClick("home")}
            icon={
              <svg width="22" height="19" viewBox="0 0 22 19" fill="none">
                <path d="M1 9.5L11 1L21 9.5V18H14V12H8V18H1V9.5Z" stroke="#81C5FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            label="Home"
          />

          {/* Dashboard */}
          <SidebarItem
            onClick={() => handleNavClick("handshake")}
            icon={
              <svg width="22" height="18.94" viewBox="0 0 22 18.9444" fill="none">
                <path d={svgPaths.p5955d00} fill="#81C5FF" />
              </svg>
            }
            label="Dashboard"
          />

          {/* Handshake Monitor */}
          <SidebarItem
            onClick={() => handleNavClick("handshake")}
            active={currentTab === "handshake"}
            icon={
              <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
                <path d={svgPaths.pd404c00} fill="#81C5FF" />
              </svg>
            }
            label="Handshake Monitor"
          />

          {/* Server Registry – active */}
          <SidebarItem
            onClick={() => handleNavClick("registry")}
            active={currentTab === "registry"}
            icon={
              <svg width="17.19" height="14.09" viewBox="0 0 17.1875 14.0938" fill="none">
                <path d={svgPaths.p14d71100} fill="#81C5FF" />
              </svg>
            }
            label="Server Registry"
          />

          {/* Live Traffic */}
          <SidebarItem
            onClick={() => handleNavClick("traffic")}
            active={currentTab === "traffic"}
            icon={
              <svg width="21.65" height="17.5" viewBox="0 0 21.649 17.5013" fill="none">
                <path d={svgPaths.p288dcd00} fill="#81C5FF" />
              </svg>
            }
            label="Live Traffic"
          />

          {/* Threats */}
          <SidebarItem
            onClick={() => handleNavClick("threats")}
            active={currentTab === "threats"}
            icon={
              <svg width="20" height="18" viewBox="0 0 19.9999 17.9999" fill="none">
                <path d={svgPaths.p369822b2} fill="#81C5FF" />
              </svg>
            }
            label="Threats"
          />

          {/* Policy & Settings */}
          <SidebarItem
            onClick={() => handleNavClick("settings")}
            active={currentTab === "settings"}
            icon={
              <svg width="21.87" height="21.87" viewBox="0 0 21.8711 21.8711" fill="none">
                <path d={svgPaths.p245a1f80} fill="#81C5FF" />
              </svg>
            }
            label="Policy & Settings"
          />
        </nav>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 min-w-0 flex flex-col px-8 py-8 gap-6 overflow-y-auto">
        {/* Top Breadcrumb & Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-[#81c5ff]/80">
            <button
              onClick={() => onNavigate("home")}
              className="text-[#81c5ff] hover:underline bg-transparent border-none cursor-pointer p-0 font-['Helvetica',sans-serif] text-sm"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-white/60">Server Registry</span>
          </div>

          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#81c5ff]/30 text-[#81c5ff] hover:bg-[#81c5ff]/10 transition-colors text-sm font-['Helvetica',sans-serif] bg-transparent cursor-pointer"
          >
            ← Back to Landing
          </button>
        </div>

        {/* Header row */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-['Conthrax',sans-serif] font-semibold text-[#81c5ff] text-[42px] leading-tight tracking-wide">
              Server Registry
            </h1>
            <p className="font-['Helvetica',sans-serif] text-white text-[16px] mt-1">
              Tracks every MCP server ever connected, its trust state, and its full history.
            </p>
          </div>
          <button className="shrink-0 mt-2 flex items-center gap-1.5 px-4 h-[32px] rounded-[9px] border border-[#81c5ff] bg-[rgba(129,197,255,0.1)] text-[#81c5ff] font-['Helvetica',sans-serif] text-[12px] whitespace-nowrap hover:bg-[rgba(129,197,255,0.18)] transition-colors cursor-pointer">
            + ADD SERVER
          </button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-4">
          {/* Total servers */}
          <div className="bg-[rgba(91,141,184,0.05)] border border-[rgba(91,141,184,0.6)] rounded-[20px] px-5 py-4 flex items-center gap-4">
            <div className="shrink-0">
              <svg width="44" height="44" viewBox="0 0 53 53" fill="none">
                <g>
                  <path d={svgPaths.p3ff85200} fill="#81C5FF" transform="scale(0.83) translate(3,8)" />
                  <path d={svgPaths.p16bab670} fill="#81C5FF" transform="scale(0.83) translate(3,15)" />
                  <path d={svgPaths.p16bab670} fill="#81C5FF" transform="scale(0.83) translate(3,22)" />
                  <path d={svgPaths.p16bab670} fill="#81C5FF" transform="scale(0.83) translate(3,29)" />
                </g>
              </svg>
            </div>
            <div>
              <div className="font-['Conthrax',sans-serif] font-semibold text-white text-[38px] leading-none">4</div>
              <div className="font-['Helvetica',sans-serif] text-[#9c9c9c] text-[15px] mt-1">Total servers</div>
            </div>
          </div>

          {/* Trusted */}
          <div className="bg-[rgba(91,141,184,0.05)] border border-[rgba(91,141,184,0.6)] rounded-[20px] px-5 py-4 flex items-center gap-4">
            <div className="shrink-0 w-[40px] h-[40px] relative">
              <svg width="38" height="43" viewBox="0 0 37.7628 42.8445" fill="none">
                <path d={svgPaths.p23d38600} fill="#81C5FF" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="20" height="15" viewBox="0 0 19.9582 14.9686" fill="none">
                  <path
                    d={svgPaths.p3e3ddf00}
                    stroke="#81C5FF"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.49477"
                  />
                </svg>
              </div>
            </div>
            <div>
              <div className="font-['Conthrax',sans-serif] font-semibold text-white text-[38px] leading-none">2</div>
              <div className="font-['Helvetica',sans-serif] text-[#9c9c9c] text-[15px] mt-1">Trusted</div>
            </div>
          </div>

          {/* Quarantined */}
          <div className="bg-[rgba(95,227,179,0.05)] border border-[rgba(255,56,60,0.4)] rounded-[20px] px-5 py-4 flex items-center gap-4">
            <div className="shrink-0">
              <svg width="44" height="44" viewBox="0 0 36.6666 32.9997" fill="none">
                <path d={svgPaths.p2827ef00} fill="#FF383C" />
              </svg>
            </div>
            <div>
              <div className="font-['Conthrax',sans-serif] font-semibold text-white text-[38px] leading-none">1</div>
              <div className="font-['Helvetica',sans-serif] text-[#9c9c9c] text-[15px] mt-1">Quarantined</div>
            </div>
          </div>

          {/* Removed */}
          <div className="bg-[rgba(95,227,179,0.05)] border border-[rgba(255,56,60,0.4)] rounded-[20px] px-5 py-4 flex items-center gap-4">
            <div className="shrink-0">
              <svg width="41" height="41" viewBox="0 0 34.1667 34.1667" fill="none">
                <path d={svgPaths.p1804c180} fill="#FF383C" />
                <path clipRule="evenodd" d={svgPaths.p20aff500} fill="#FF383C" fillRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="font-['Conthrax',sans-serif] font-semibold text-white text-[38px] leading-none">1</div>
              <div className="font-['Helvetica',sans-serif] text-[#9c9c9c] text-[15px] mt-1">Removed</div>
            </div>
          </div>
        </div>

        {/* Known servers table */}
        <div className="bg-[rgba(91,141,184,0.05)] border border-[rgba(91,141,184,0.6)] rounded-[20px] px-6 py-5">
          <h2 className="font-['Helvetica',sans-serif] font-bold text-white text-[20px] mb-4">Known servers</h2>
          <div className="overflow-x-auto">
            <table className="w-full font-['Helvetica',sans-serif] text-[15px]">
              <thead>
                <tr className="text-white text-[17px] border-b border-[rgba(91,141,184,0.3)]">
                  <th className="text-left font-normal pb-3 pr-8">Server</th>
                  <th className="text-left font-normal pb-3 pr-8">First seen</th>
                  <th className="text-left font-normal pb-3 pr-8">Last scan</th>
                  <th className="text-left font-normal pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="text-[#9c9c9c]">
                {[
                  { name: "github-mcp", first: "July 02", last: "14:00:01", status: "trusted" as PillVariant },
                  { name: "notion-mcp", first: "Aug 14", last: "14:02:58", status: "quarantined" as PillVariant },
                  { name: "fake-weather-app", first: "Jun 30", last: "14:22:18", status: "removed" as PillVariant },
                  { name: "slack-mcp", first: "Aug 01", last: "14:27:32", status: "trusted" as PillVariant },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-[rgba(91,141,184,0.15)] last:border-0">
                    <td className="py-3 pr-8 font-['Helvetica',sans-serif] text-[15px]">{row.name}</td>
                    <td className="py-3 pr-8">{row.first}</td>
                    <td className="py-3 pr-8 tabular-nums">{row.last}</td>
                    <td className="py-3">
                      <StatusPill variant={row.status} label={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom 2-column */}
        <div className="grid grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px] gap-4">
          {/* Recent activity */}
          <div className="bg-[rgba(91,141,184,0.05)] border border-[rgba(91,141,184,0.6)] rounded-[20px] px-6 py-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-['Helvetica',sans-serif] font-bold text-white text-[20px]">Recent activity</h2>
              <button className="flex items-center gap-1.5 text-[#5b8db8] text-[13px] font-['Helvetica',sans-serif] hover:text-[#81c5ff] transition-colors bg-transparent border-none cursor-pointer">
                View all
                <svg width="14" height="12.67" viewBox="0 0 14.25 12.6667" fill="none">
                  <path
                    d={svgPaths.p4815080}
                    stroke="#5B8DB8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.58333"
                  />
                </svg>
              </button>
            </div>

            {/* Activity table */}
            <div className="overflow-x-auto">
              <table className="w-full font-['Helvetica',sans-serif] text-[13px]">
                <thead>
                  <tr className="text-white text-[14px] border-b border-[rgba(91,141,184,0.3)]">
                    <th className="text-left font-normal pb-2 pr-6 tabular-nums">Time</th>
                    <th className="text-left font-normal pb-2 pr-6">Server</th>
                    <th className="text-left font-normal pb-2">Event</th>
                  </tr>
                </thead>
                <tbody className="text-white font-[300]">
                  {[
                    {
                      time: "14:02:11",
                      server: "notion-mcp",
                      event: "Malicious tool detected (delete_all_files)",
                    },
                    {
                      time: "14:01:58",
                      server: "github-mcp",
                      event: "Handshake completed",
                    },
                    {
                      time: "13:58:42",
                      server: "fake-weather-mcp",
                      event: 'Shadowed the core "read_file" permission',
                    },
                    {
                      time: "13:45:19",
                      server: "slack-mcp",
                      event: "Server registered successfully",
                    },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-[rgba(91,141,184,0.12)] last:border-0">
                      <td className="py-2.5 pr-6 tabular-nums text-[11.5px] text-white/80">{row.time}</td>
                      <td className="py-2.5 pr-6 text-[11.5px] text-white/80 whitespace-nowrap">{row.server}</td>
                      <td className="py-2.5 text-[11.5px] text-white/80">{row.event}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Server details */}
          <div className="bg-[rgba(91,141,184,0.05)] border border-[rgba(91,141,184,0.6)] rounded-[20px] px-6 py-5 flex flex-col gap-3">
            <h2 className="font-['Helvetica',sans-serif] font-bold text-white text-[20px]">Server details</h2>

            {/* Server name + host */}
            <div>
              <p className="font-['Helvetica',sans-serif] font-bold text-white text-[15px] leading-snug">notion-mcp</p>
              <p className="font-['Helvetica',sans-serif] text-white/60 text-[11px] mt-0.5">notion.so</p>
            </div>

            <div className="flex flex-col gap-2.5 text-[11.5px] font-['Helvetica',sans-serif]">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-white/60">Status</span>
                <StatusPill variant="quarantined" label="quarantined" />
              </div>

              {/* First seen */}
              <div className="flex items-center justify-between border-t border-[rgba(91,141,184,0.15)] pt-2">
                <span className="text-white/60">First seen</span>
                <span className="text-white/90">Aug 14</span>
              </div>

              {/* Last scan */}
              <div className="flex items-center justify-between border-t border-[rgba(91,141,184,0.15)] pt-2">
                <span className="text-white/60">Last scan</span>
                <span className="text-white/90 tabular-nums">14:02:11</span>
              </div>

              {/* Tools exposed */}
              <div className="flex items-center justify-between border-t border-[rgba(91,141,184,0.15)] pt-2">
                <span className="text-white/60">Tools exposed</span>
                <span className="text-white/90">4</span>
              </div>

              {/* Risk level */}
              <div className="flex items-center justify-between border-t border-[rgba(91,141,184,0.15)] pt-2">
                <span className="text-white/60">Risk level</span>
                <span className="inline-flex items-center border border-[#ff383c] bg-[rgba(255,56,60,0.1)] text-[#ff383c] rounded-[9px] px-2.5 h-[24px] text-[11px]">
                  high
                </span>
              </div>

              {/* Reason */}
              <div className="flex items-start justify-between border-t border-[rgba(91,141,184,0.15)] pt-2 gap-4">
                <span className="text-white/60 shrink-0">Reason</span>
                <span className="text-white/90 text-right">Malicious instruction in tool description</span>
              </div>
            </div>

            <button className="mt-auto flex items-center justify-center gap-2 w-full h-[32px] rounded-[9px] border border-[#5b8db8] font-['Helvetica',sans-serif] text-white/90 text-[12px] hover:bg-[rgba(91,141,184,0.1)] transition-colors bg-transparent cursor-pointer">
              View full history
              <svg width="14" height="12.67" viewBox="0 0 14.25 12.6667" fill="none">
                <path
                  d={svgPaths.p4815080}
                  stroke="#5B8DB8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.58333"
                />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
