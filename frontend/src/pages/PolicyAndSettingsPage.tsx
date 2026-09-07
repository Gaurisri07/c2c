import React, { useState } from "react";
import logoImg from "@/imports/Homepage/47202af915ec7162b9a01888274487160ee55234.png";
import resetImg from "@/imports/Policy/4f7f211309b1d43ce2f527752f5e24453cab9c5a.png";

// ── Icons ───────────────────────────────────────────────────────────────────

function IconHome() {
  return (
    <svg width="18" height="16" viewBox="0 0 22 19" fill="none">
      <path d="M1 9.5L11 1L21 9.5V18H14V12H8V18H1V9.5Z" stroke="#81C5FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconDashboard({ color = "#81C5FF" }: { color?: string }) {
  return (
    <svg width="18" height="16" viewBox="0 0 22 18.9444" fill="none">
      <path d="M1 1h8v8H1zm12 0h8v8h-8zM1 13h8v5H1zm12 0h8v5h-8z" fill={color} />
    </svg>
  );
}
function IconServer({ color = "#81C5FF" }: { color?: string }) {
  return (
    <svg width="16" height="14" viewBox="0 0 20 18" fill="none">
      <rect x="1" y="1" width="18" height="6" rx="1.5" fill={color} />
      <rect x="1" y="11" width="18" height="6" rx="1.5" fill={color} />
      <circle cx="16.5" cy="4" r="1" fill="#010106" />
      <circle cx="16.5" cy="14" r="1" fill="#010106" />
    </svg>
  );
}
function IconFolder({ color = "#81C5FF" }: { color?: string }) {
  return (
    <svg width="16" height="13" viewBox="0 0 17.1875 14.0938" fill="none">
      <path d="M16.5 2.458H8.787L6.267.047A.688.688 0 0 0 5.8 0H.688C.307 0 0 .307 0 .688v12.718c0 .38.307.688.688.688H16.5c.38 0 .688-.307.688-.688V3.146a.688.688 0 0 0-.688-.688z" fill={color} />
    </svg>
  );
}
function IconBeat({ color = "#81C5FF" }: { color?: string }) {
  return (
    <svg width="20" height="16" viewBox="0 0 22 18" fill="none">
      <path d="M12.3 0a.75.75 0 0 1 .72.58l2.44 13.554 1.892-4.377A.75.75 0 0 1 18.02 9.34H20.9a.75.75 0 0 1 0 1.5h-2.386l-2.683 6.208a.75.75 0 0 1-1.415-.158L12.166 4.443l-2.05 8.73a.75.75 0 0 1-1.393.166L5.705 7.641 4.297 10.43A.75.75 0 0 1 3.627 10.84H.75a.75.75 0 0 1 0-1.5h2.416L5.02 5.67a.75.75 0 0 1 1.333-.09l2.76 5.21 2.42-10.3A.75.75 0 0 1 12.3 0z" fill={color} />
    </svg>
  );
}
function IconDanger({ color = "#81C5FF" }: { color?: string }) {
  return (
    <svg width="18" height="16" viewBox="0 0 20 18" fill="none">
      <path d="M13.867 1.747L21.126 13.838C22.169 15.575 21.657 17.86 19.981 18.941A3.573 3.573 0 0 1 18.093 19.5H3.573C1.6 19.5 0 17.842 0 15.796a3.55 3.55 0 0 1 .54-1.958L7.8 1.747C8.842.011 11.046-.521 12.722.56c.463.299.855.705 1.145 1.187zm-2.405.909a1.04 1.04 0 0 0-1.44.399L2.562 15.145a1.04 1.04 0 0 0 1.012 1.55H18.09a1.04 1.04 0 0 0 .905-1.55L11.835 3.052a1.04 1.04 0 0 0-.373-.396zM10.833 15.167a1.083 1.083 0 1 1 0-2.167 1.083 1.083 0 0 1 0 2.167zm0-9.75a1.083 1.083 0 0 1 1.083 1.083v4.333a1.083 1.083 0 0 1-2.167 0V6.5a1.083 1.083 0 0 1 1.084-1.083z" fill={color} />
    </svg>
  );
}
function IconSettings({ color = "#81C5FF" }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 21.871 21.871" fill="none">
      <path d="M19.089 10.549v.193c.007.065.01.13.01.193v.193c-.007.065-.01.129-.01.193L21.871 13.052l-1.708 4.114-3.19-.731a8.3 8.3 0 0 1-1.535 1.535l.73 3.19-4.114 1.708-1.73-2.782h-.193a8.44 8.44 0 0 1-.386.01h-.193a8.44 8.44 0 0 1-.386-.01h-.193L8.82 21.871l-4.115-1.708.731-3.19a8.3 8.3 0 0 1-1.535-1.535l-3.19.73L0 12.054l2.782-1.73V10.13c0-.064-.004-.129-.011-.193V9.742c0-.064.003-.129.01-.193L0 7.82l1.708-4.115 3.19.731A8.3 8.3 0 0 1 6.434 2.9L5.703.708l4.115-1.708 1.73 2.782h.193c.064-.007.13-.011.193-.011h.193c.064.007.129.011.193.011L13.052 0l4.114 1.708-.73 3.19a8.3 8.3 0 0 1 1.534 1.535l3.19-.73 1.71 4.114-2.782 1.73zM10.935 6.897a4.038 4.038 0 1 0 0 8.077 4.038 4.038 0 0 0 0-8.077z" fill={color} />
    </svg>
  );
}
function IconWrench({ color = "white" }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M17.7 2.3a6 6 0 0 0-8.4 8.1L2 17.7a1 1 0 0 0 1.4 1.4l7.3-7.3A6 6 0 0 0 17.7 2.3zM12 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" fill={color} />
    </svg>
  );
}
function IconShield({ color = "white" }: { color?: string }) {
  return (
    <svg width="16" height="20" viewBox="0 0 20 24" fill="none">
      <path d="M10 1L2 4.5v6c0 5.25 3.4 10.15 8 11.5 4.6-1.35 8-6.25 8-11.5v-6L10 1zm0 10.5h6c-.45 3.85-2.85 7.3-6 8.8V11.5H4v-5.3l6-2.45V11.5z" fill={color} />
    </svg>
  );
}
function IconCloud({ color = "white" }: { color?: string }) {
  return (
    <svg width="20" height="14" viewBox="0 0 22 16" fill="none">
      <path d="M18.5 6.08A6.5 6.5 0 0 0 6.22 4.5 4 4 0 0 0 4 12h14a4 4 0 0 0 .5-7.92z" fill={color} />
    </svg>
  );
}
function IconDoc({ color = "white" }: { color?: string }) {
  return (
    <svg width="16" height="20" viewBox="0 0 18 22" fill="none">
      <path d="M11 0H2C.9 0 0 .9 0 2v18c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6l-7-6zm-1 7V1.5L16.5 8H10zM2 2h7v7h7v11H2V2zm2 12h10v2H4v-2zm0-4h10v2H4v-2z" fill={color} />
    </svg>
  );
}
function IconCheck({ color = "#5FE3B3" }: { color?: string }) {
  return (
    <svg width="12" height="10" viewBox="0 0 12.076 9.057" fill="none">
      <path d="M0.755 4.78L4.277 8.302L11.321 0.755" stroke={color} strokeWidth="1.51" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconTriangleAlert({ color = "#FF383C" }: { color?: string }) {
  return (
    <svg width="20" height="18" viewBox="0 0 22 20" fill="none">
      <path d="M13.867 1.747L21.126 13.838C22.169 15.575 21.657 17.86 19.981 18.941A3.573 3.573 0 0 1 18.093 19.5H3.573C1.6 19.5 0 17.842 0 15.796a3.55 3.55 0 0 1 .54-1.958L7.8 1.747C8.842.011 11.046-.521 12.722.56c.463.299.855.705 1.145 1.187zm-2.405.909a1.04 1.04 0 0 0-1.44.399L2.562 15.145a1.04 1.04 0 0 0 1.012 1.55H18.09a1.04 1.04 0 0 0 .905-1.55L11.835 3.052a1.04 1.04 0 0 0-.373-.396zM10.833 15.167a1.083 1.083 0 1 1 0-2.167 1.083 1.083 0 0 1 0 2.167zm0-9.75a1.083 1.083 0 0 1 1.083 1.083v4.333a1.083 1.083 0 0 1-2.167 0V6.5a1.083 1.083 0 0 1 1.084-1.083z" fill={color} />
    </svg>
  );
}
function IconExclamationCircle() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="#FFD561" fillOpacity="0.9" />
      <rect x="9" y="4.5" width="2" height="7" rx="1" fill="#010106" />
      <circle cx="10" cy="14.5" r="1.25" fill="#010106" />
    </svg>
  );
}
function IconCheckCircle({ color = "#34C759" }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 18.333 18.333" fill="none">
      <path d="M9.167 0C4.1 0 0 4.1 0 9.167s4.1 9.166 9.167 9.166 9.166-4.1 9.166-9.166S14.233 0 9.167 0zm4.583 7.083l-5.25 5.25a.917.917 0 0 1-1.292 0L4.583 9.708A.917.917 0 1 1 5.875 8.417l2.208 2.208 4.584-4.584a.917.917 0 0 1 1.291 1.042z" fill={color} />
    </svg>
  );
}

// ── Interactive Toggle ──────────────────────────────────────────────────────

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="bg-transparent border-none p-0 cursor-pointer focus:outline-none"
    >
      <svg width="46" height="24" viewBox="0 0 54 29" fill="none" className="transition-all">
        <rect width="54" height="29" rx="14" fill={on ? "#5B8DB8" : "#383B40"} />
        <circle cx={on ? 40.5 : 13.5} cy="14.5" r="10.5" fill={on ? "#FFFFFF" : "#8E9297"} className="transition-all" />
      </svg>
    </button>
  );
}

// ── Interactive Radio ───────────────────────────────────────────────────────

function Radio({ selected, onSelect }: { selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="bg-transparent border-none p-0 cursor-pointer focus:outline-none"
    >
      <svg width="18" height="18" viewBox="0 0 21 21" fill="none">
        <circle cx="10.5" cy="10.5" r="9.7" stroke="#5B8DB8" strokeWidth="1.6" />
        {selected && <circle cx="10.5" cy="10.5" r="4" fill="#5B8DB8" stroke="#5B8DB8" />}
      </svg>
    </button>
  );
}

// ── Navigation Configuration ────────────────────────────────────────────────

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { id: "home",      label: "Home",              icon: <IconHome /> },
  { id: "dashboard", label: "Dashboard",         icon: <IconDashboard /> },
  { id: "handshake", label: "Handshake Monitor", icon: <IconServer /> },
  { id: "registry",  label: "Server Registry",   icon: <IconFolder /> },
  { id: "traffic",   label: "Live Traffic",      icon: <IconBeat /> },
  { id: "threats",   label: "Threats",           icon: <IconDanger /> },
  { id: "settings",  label: "Policy & Settings", icon: <IconSettings color="#81c5ff" /> },
];

interface PolicyAndSettingsPageProps {
  onNavigate?: (page: string) => void;
}

export default function PolicyAndSettingsPage({ onNavigate = () => {} }: PolicyAndSettingsPageProps) {
  // State for DLP Rules
  const [dlpRegex, setDlpRegex] = useState(true);
  const [dlpScope, setDlpScope] = useState(true);
  const [dlpEntropy, setDlpEntropy] = useState(true);
  const [dlpSlm, setDlpSlm] = useState(true);

  // State for Sensitivity: 'permissive' | 'balanced' | 'strict'
  const [sensitivity, setSensitivity] = useState<"permissive" | "balanced" | "strict">("balanced");

  // State for Notifications
  const [notifBlocked, setNotifBlocked] = useState(true);
  const [notifQuarantined, setNotifQuarantined] = useState(true);
  const [notifScanPassed, setNotifScanPassed] = useState(false);

  // State for Preset: 'default' | 'strict' | 'permissive'
  const [preset, setPreset] = useState<"default" | "strict" | "permissive">("default");

  // Toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleApplyPreset = (type: "default" | "strict" | "permissive") => {
    setPreset(type);
    if (type === "default") {
      setSensitivity("balanced");
      setDlpRegex(true);
      setDlpScope(true);
      setDlpEntropy(true);
      setDlpSlm(true);
      setNotifBlocked(true);
      setNotifQuarantined(true);
      setNotifScanPassed(false);
      showToast("Applied Recommended Default security policy.");
    } else if (type === "strict") {
      setSensitivity("strict");
      setDlpRegex(true);
      setDlpScope(true);
      setDlpEntropy(true);
      setDlpSlm(true);
      setNotifBlocked(true);
      setNotifQuarantined(true);
      setNotifScanPassed(true);
      showToast("Applied Strict maximum-protection policy.");
    } else if (type === "permissive") {
      setSensitivity("permissive");
      setDlpRegex(true);
      setDlpScope(false);
      setDlpEntropy(false);
      setDlpSlm(true);
      setNotifBlocked(true);
      setNotifQuarantined(false);
      setNotifScanPassed(false);
      showToast("Applied Permissive security policy.");
    }
  };

  const handleReset = () => {
    handleApplyPreset("default");
  };

  const handleSave = () => {
    showToast("Sentinel policies updated and deployed to proxy daemon!");
  };

  return (
    <div className="flex min-h-screen bg-[#010106]">
      {/* ── Sidebar ── */}
      <aside
        style={{ width: 260, minWidth: 260, background: "#010106", borderRight: "1px solid rgba(129,197,255,0.12)" }}
        className="flex flex-col min-h-screen shrink-0"
      >
        {/* Logo block */}
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center justify-center p-4 bg-transparent border-none cursor-pointer w-full hover:opacity-85 transition-opacity"
          title="Return to Home"
        >
          <img src={logoImg} alt="MCP Sentinel" className="w-[180px] h-auto object-contain pointer-events-none" />
        </button>

        {/* Navigation items */}
        <nav className="flex flex-col gap-1.5 px-3 pt-2">
          {NAV_ITEMS.map((item) => {
            const active = item.id === "settings";
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-3.5 w-full text-left px-3.5 py-2.5 rounded-[12px] transition-all cursor-pointer ${
                  active ? "border border-[#81c5ff] bg-[rgba(129,197,255,0.06)]" : "border border-transparent hover:bg-[rgba(129,197,255,0.03)]"
                }`}
                style={{
                  color: active ? "#81c5ff" : "#9c9c9c",
                  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
                  fontSize: 14,
                }}
              >
                <span className="shrink-0 w-5 flex items-center justify-center">
                  {item.icon}
                </span>
                <span className="whitespace-nowrap font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 px-8 py-7 overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="font-['Conthrax:Semi_Bold',sans-serif] text-[36px] text-[#81c5ff] leading-none mb-2">
              Policy &amp; Settings
            </h1>
            <p className="font-['Helvetica:Regular',sans-serif] text-[14px] text-white">
              Configuration surface for the rules Sentinel enforces.
            </p>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 h-[34px] rounded-[10px] font-['Helvetica:Regular',sans-serif] text-[13px] text-[rgba(255,255,255,0.9)] whitespace-nowrap cursor-pointer hover:bg-[rgba(129,197,255,0.18)] transition-all"
              style={{ background: "rgba(129,197,255,0.1)", border: "0.667px solid #81c5ff" }}
            >
              <img src={resetImg} alt="" className="w-[15px] h-[15px] object-contain pointer-events-none" />
              Reset to default
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 h-[34px] rounded-[10px] font-['Helvetica:Regular',sans-serif] text-[13px] text-[rgba(255,255,255,0.9)] whitespace-nowrap cursor-pointer hover:bg-[rgba(95,227,179,0.2)] transition-all"
              style={{ background: "rgba(95,227,179,0.12)", border: "0.667px solid #5fe3b3" }}
            >
              <IconCheck />
              Save changes
            </button>
          </div>
        </div>

        {/* Toast Feedback */}
        {toastMessage && (
          <div className="mb-4 p-3 rounded-lg bg-[rgba(95,227,179,0.15)] border border-[#5FE3B3] text-[#5FE3B3] text-sm flex items-center gap-2 animate-fadeIn">
            <IconCheck />
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="flex flex-col gap-5">
          {/* Card 1 — DLP rules */}
          <div
            className="rounded-[14px] px-6 py-5"
            style={{ background: "rgba(91,141,184,0.05)", border: "0.2px solid rgba(91,141,184,0.6)" }}
          >
            <h2 className="font-['Helvetica:Bold',sans-serif] text-[17px] text-white mb-4">
              DLP rules by secret type
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
              {/* Rule 1 */}
              <div className="flex items-center justify-between gap-3 min-w-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="shrink-0 w-8 h-8 flex items-center justify-center">
                    <IconWrench />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-['Helvetica:Regular',sans-serif] text-[14px] text-white leading-[1.45] whitespace-nowrap">
                      Deterministic Regex
                    </p>
                    <p className="font-['Helvetica:Light',sans-serif] text-[12px] text-[#9c9c9c] leading-[1.45] whitespace-nowrap">
                      Pattern-matches known secret formats (AWS, OpenAI, GitHub tokens)
                    </p>
                  </div>
                </div>
                <Toggle on={dlpRegex} onToggle={() => setDlpRegex(!dlpRegex)} />
              </div>

              {/* Rule 2 */}
              <div className="flex items-center justify-between gap-3 min-w-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="shrink-0 w-8 h-8 flex items-center justify-center">
                    <IconDoc />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-['Helvetica:Regular',sans-serif] text-[14px] text-white leading-[1.45] whitespace-nowrap">
                      Scope and Path traversal
                    </p>
                    <p className="font-['Helvetica:Light',sans-serif] text-[12px] text-[#9c9c9c] leading-[1.45] whitespace-nowrap">
                      Checks access boundaries and prohibits dot-dot path traversal
                    </p>
                  </div>
                </div>
                <Toggle on={dlpScope} onToggle={() => setDlpScope(!dlpScope)} />
              </div>

              {/* Rule 3 */}
              <div className="flex items-center justify-between gap-3 min-w-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="shrink-0 w-8 h-8 flex items-center justify-center">
                    <IconShield />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-['Helvetica:Regular',sans-serif] text-[14px] text-white leading-[1.45] whitespace-nowrap">
                      Shannon Entropy
                    </p>
                    <p className="font-['Helvetica:Light',sans-serif] text-[12px] text-[#9c9c9c] leading-[1.45] whitespace-nowrap">
                      Flags high randomness character sequences likely to be API keys
                    </p>
                  </div>
                </div>
                <Toggle on={dlpEntropy} onToggle={() => setDlpEntropy(!dlpEntropy)} />
              </div>

              {/* Rule 4 */}
              <div className="flex items-center justify-between gap-3 min-w-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="shrink-0 w-8 h-8 flex items-center justify-center">
                    <IconCloud />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-['Helvetica:Regular',sans-serif] text-[14px] text-white leading-[1.45] whitespace-nowrap">
                      SLM and Neural Guardrail
                    </p>
                    <p className="font-['Helvetica:Light',sans-serif] text-[12px] text-[#9c9c9c] leading-[1.45] whitespace-nowrap">
                      Local neural model catches contextual, indirect, or multi-step leaks
                    </p>
                  </div>
                </div>
                <Toggle on={dlpSlm} onToggle={() => setDlpSlm(!dlpSlm)} />
              </div>
            </div>
          </div>

          {/* Card 2 — SLM sensitivity */}
          <div
            className="rounded-[14px] px-6 py-5"
            style={{ background: "rgba(91,141,184,0.05)", border: "0.2px solid rgba(91,141,184,0.6)" }}
          >
            <h2 className="font-['Helvetica:Bold',sans-serif] text-[18px] font-bold text-white mb-6">
              SLM sensitivity
            </h2>

            {/* Centered Slider Container */}
            <div className="w-full max-w-[620px] mx-auto my-4 flex flex-col items-center">
              {/* Interactive Slider Track */}
              <div
                className="relative w-full h-[14px] flex items-center cursor-pointer select-none"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = (e.clientX - rect.left) / rect.width;
                  if (x < 0.33) setSensitivity("permissive");
                  else if (x > 0.66) setSensitivity("strict");
                  else setSensitivity("balanced");
                }}
              >
                {/* Background Grey Bar */}
                <div className="w-full h-[5px] bg-[#9C9C9C] rounded-[2px]" />

                {/* Active Blue Bar */}
                <div
                  className="absolute left-0 h-[5px] bg-[#5B8DB8] rounded-[2px] transition-all duration-200"
                  style={{
                    width:
                      sensitivity === "permissive"
                        ? "0%"
                        : sensitivity === "balanced"
                        ? "50%"
                        : "100%",
                  }}
                />

                {/* Circular Thumb */}
                <div
                  className="absolute w-[14px] h-[14px] bg-[#5B8DB8] rounded-full shadow-[0_0_8px_rgba(91,141,184,0.8)] -translate-x-1/2 transition-all duration-200 pointer-events-none"
                  style={{
                    left:
                      sensitivity === "permissive"
                        ? "0%"
                        : sensitivity === "balanced"
                        ? "50%"
                        : "100%",
                  }}
                />
              </div>

              {/* Slider Labels */}
              <div className="flex justify-between w-full font-['Helvetica:Regular',sans-serif] text-[12px] text-white mt-2 select-none">
                <button
                  type="button"
                  onClick={() => setSensitivity("permissive")}
                  className={`bg-transparent border-none p-0 cursor-pointer font-['Helvetica:Regular',sans-serif] text-[12px] transition-colors ${
                    sensitivity === "permissive" ? "text-[#5B8DB8] font-bold" : "text-white hover:text-[#5B8DB8]"
                  }`}
                >
                  Permissive
                </button>
                <button
                  type="button"
                  onClick={() => setSensitivity("balanced")}
                  className={`bg-transparent border-none p-0 cursor-pointer font-['Helvetica:Regular',sans-serif] text-[12px] transition-colors ${
                    sensitivity === "balanced" ? "text-[#5B8DB8] font-bold" : "text-white hover:text-[#5B8DB8]"
                  }`}
                >
                  Balanced
                </button>
                <button
                  type="button"
                  onClick={() => setSensitivity("strict")}
                  className={`bg-transparent border-none p-0 cursor-pointer font-['Helvetica:Regular',sans-serif] text-[12px] transition-colors ${
                    sensitivity === "strict" ? "text-[#5B8DB8] font-bold" : "text-white hover:text-[#5B8DB8]"
                  }`}
                >
                  Strict
                </button>
              </div>
            </div>

            {/* Description Text */}
            <p className="font-['Helvetica:Regular',sans-serif] text-[13px] text-white mt-6 mb-4">
              Balanced flags high-confidence injection attempts only. Strict also flags ambiguous phrasing, at the cost of more false positives.
            </p>

            {/* Callout Box */}
            <div
              className="rounded-[12px] px-5 py-3 w-full"
              style={{ background: "rgba(91,141,184,0.05)", border: "1px solid rgba(91,141,184,0.6)" }}
            >
              <p className="font-['Helvetica:Regular',sans-serif] text-[13px] text-[#5b8db8] mb-[2px]">
                Recommended
              </p>
              <p className="font-['Helvetica:Regular',sans-serif] text-[13px] text-white">
                Balanced mode works best for most use cases.
              </p>
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Card 3 — Notifications */}
            <div
              className="rounded-[14px] px-6 py-5"
              style={{ background: "rgba(91,141,184,0.05)", border: "0.2px solid rgba(91,141,184,0.6)" }}
            >
              <h2 className="font-['Helvetica:Bold',sans-serif] text-[17px] text-white mb-4">
                Notifications
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3 min-w-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="shrink-0 w-5 h-5 flex items-center justify-center">
                      <IconTriangleAlert />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-['Helvetica:Regular',sans-serif] text-[14px] text-white leading-[1.45] whitespace-nowrap">
                        Threat blocked
                      </p>
                      <p className="font-['Helvetica:Light',sans-serif] text-[12px] text-[#9c9c9c] leading-[1.45] whitespace-nowrap">
                        Get notified when a malicious tool call is blocked
                      </p>
                    </div>
                  </div>
                  <Toggle on={notifBlocked} onToggle={() => setNotifBlocked(!notifBlocked)} />
                </div>

                <div className="flex items-center justify-between gap-3 min-w-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="shrink-0 w-5 h-5 flex items-center justify-center">
                      <IconExclamationCircle />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-['Helvetica:Regular',sans-serif] text-[14px] text-white leading-[1.45] whitespace-nowrap">
                        Server quarantined
                      </p>
                      <p className="font-['Helvetica:Light',sans-serif] text-[12px] text-[#9c9c9c] leading-[1.45] whitespace-nowrap">
                        Get notified when a server is moved to quarantine
                      </p>
                    </div>
                  </div>
                  <Toggle on={notifQuarantined} onToggle={() => setNotifQuarantined(!notifQuarantined)} />
                </div>

                <div className="flex items-center justify-between gap-3 min-w-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="shrink-0 w-5 h-5 flex items-center justify-center">
                      <IconCheckCircle />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-['Helvetica:Regular',sans-serif] text-[14px] text-white leading-[1.45] whitespace-nowrap">
                        Routine scan passed
                      </p>
                      <p className="font-['Helvetica:Light',sans-serif] text-[12px] text-[#9c9c9c] leading-[1.45] whitespace-nowrap">
                        Optional notifications for clean scans
                      </p>
                    </div>
                  </div>
                  <Toggle on={notifScanPassed} onToggle={() => setNotifScanPassed(!notifScanPassed)} />
                </div>
              </div>
            </div>

            {/* Card 4 — Policy presets */}
            <div
              className="rounded-[14px] px-6 py-5"
              style={{ background: "rgba(91,141,184,0.05)", border: "0.2px solid rgba(91,141,184,0.6)" }}
            >
              <h2 className="font-['Helvetica:Bold',sans-serif] text-[17px] text-white mb-4">
                Policy presets
              </h2>
              <div className="flex flex-col gap-3">
                <div
                  onClick={() => handleApplyPreset("default")}
                  className={`flex items-center gap-3 px-4 py-[10px] rounded-[12px] cursor-pointer transition-all ${
                    preset === "default" ? "bg-[rgba(129,197,255,0.1)] border border-[#81c5ff]" : "bg-[rgba(91,141,184,0.05)] border border-[rgba(91,141,184,0.4)] hover:bg-[rgba(91,141,184,0.1)]"
                  }`}
                >
                  <div className="shrink-0">
                    <Radio selected={preset === "default"} onSelect={() => handleApplyPreset("default")} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-['Helvetica:Regular',sans-serif] text-[13px] leading-[1.45] whitespace-nowrap text-[#81c5ff] font-medium">
                      Default (Recommended)
                    </p>
                    <p className="font-['Helvetica:Light',sans-serif] text-[11px] text-[#9c9c9c] leading-[1.45] whitespace-nowrap">
                      Balanced security with low false positives
                    </p>
                  </div>
                </div>

                <div
                  onClick={() => handleApplyPreset("strict")}
                  className={`flex items-center gap-3 px-4 py-[10px] rounded-[12px] cursor-pointer transition-all ${
                    preset === "strict" ? "bg-[rgba(129,197,255,0.1)] border border-[#81c5ff]" : "bg-[rgba(91,141,184,0.05)] border border-[rgba(91,141,184,0.4)] hover:bg-[rgba(91,141,184,0.1)]"
                  }`}
                >
                  <div className="shrink-0">
                    <Radio selected={preset === "strict"} onSelect={() => handleApplyPreset("strict")} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-['Helvetica:Regular',sans-serif] text-[13px] leading-[1.45] whitespace-nowrap text-white font-medium">
                      Strict
                    </p>
                    <p className="font-['Helvetica:Light',sans-serif] text-[11px] text-[#9c9c9c] leading-[1.45] whitespace-nowrap">
                      Maximum protection, higher false positives
                    </p>
                  </div>
                </div>

                <div
                  onClick={() => handleApplyPreset("permissive")}
                  className={`flex items-center gap-3 px-4 py-[10px] rounded-[12px] cursor-pointer transition-all ${
                    preset === "permissive" ? "bg-[rgba(129,197,255,0.1)] border border-[#81c5ff]" : "bg-[rgba(91,141,184,0.05)] border border-[rgba(91,141,184,0.4)] hover:bg-[rgba(91,141,184,0.1)]"
                  }`}
                >
                  <div className="shrink-0">
                    <Radio selected={preset === "permissive"} onSelect={() => handleApplyPreset("permissive")} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-['Helvetica:Regular',sans-serif] text-[13px] leading-[1.45] whitespace-nowrap text-white font-medium">
                      Permissive
                    </p>
                    <p className="font-['Helvetica:Light',sans-serif] text-[11px] text-[#9c9c9c] leading-[1.45] whitespace-nowrap">
                      Minimal restrictions (not recommended for production)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
