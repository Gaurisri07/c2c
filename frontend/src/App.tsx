import { useState, useEffect } from "react";
import LandingPage from "@/pages/LandingPage";
import HandshakeMonitor from "@/pages/HandshakeMonitor";
import ServerRegistryPage from "@/pages/ServerRegistryPage";
import LiveTrafficPage from "@/pages/LiveTrafficPage";

function getPageFromHash(): string {
  const hash = window.location.hash.toLowerCase();
  if (hash.includes("traffic") || hash.includes("live")) {
    return "traffic";
  }
  if (hash.includes("registry") || hash.includes("server")) {
    return "registry";
  }
  if (
    hash.includes("handshake") ||
    hash.includes("dashboard") ||
    hash.includes("monitor")
  ) {
    return "handshake";
  }
  return "home";
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>(getPageFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getPageFromHash());
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    if (page === "traffic" || page === "live-traffic") {
      window.location.hash = "/traffic";
    } else if (page === "handshake" || page === "dashboard") {
      window.location.hash = "/handshake";
    } else if (page === "registry") {
      window.location.hash = "/registry";
    } else {
      window.location.hash = "/";
    }
  };

  if (currentPage === "traffic") {
    return <LiveTrafficPage onNavigate={navigateTo} />;
  }

  if (currentPage === "registry") {
    return <ServerRegistryPage onNavigate={navigateTo} />;
  }

  if (currentPage === "handshake") {
    return <HandshakeMonitor onNavigate={navigateTo} onNavigateHome={() => navigateTo("home")} />;
  }

  return <LandingPage onNavigate={navigateTo} />;
}
