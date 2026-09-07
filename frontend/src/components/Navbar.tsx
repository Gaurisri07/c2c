import imgLogo from "@/imports/Homepage/47202af915ec7162b9a01888274487160ee55234.png";

interface NavbarProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export default function Navbar({ currentPage = "home", onNavigate }: NavbarProps) {
  const handleNav = (page: string, e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(page);
    }
  };

  return (
    <nav className="relative flex items-center justify-between px-4 py-4 w-full max-w-[1440px] mx-auto">
      <div className="flex-shrink-0 w-[180px]">
        <button
          onClick={(e) => handleNav("home", e)}
          className="bg-transparent border-none p-0 cursor-pointer text-left flex items-center hover:opacity-85 transition-opacity"
        >
          <img src={imgLogo} alt="MCP Sentinel" className="w-[180px] object-contain" />
        </button>
      </div>
      <div className="flex items-center gap-6 lg:gap-10">
        <a
          href="#/"
          onClick={(e) => handleNav("home", e)}
          className={`font-conthrax text-[16px] lg:text-[20px] no-underline hover:opacity-80 transition-opacity ${
            currentPage === "home" ? "text-[#81c5ff]" : "text-[#fefefe]"
          }`}
        >
          Home
        </a>
        <a
          href="#features"
          onClick={(e) => {
            if (currentPage !== "home" && onNavigate) {
              e.preventDefault();
              onNavigate("home");
              setTimeout(() => {
                document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }
          }}
          className="font-conthrax text-[#fefefe] text-[16px] lg:text-[20px] no-underline hover:opacity-80 transition-opacity"
        >
          Features
        </a>
        <a
          href="#/handshake"
          onClick={(e) => handleNav("handshake", e)}
          className={`font-conthrax text-[16px] lg:text-[20px] no-underline hover:opacity-80 transition-opacity ${
            currentPage === "handshake" ? "text-[#81c5ff]" : "text-[#fefefe]"
          }`}
        >
          Handshake
        </a>
        <a
          href="#/registry"
          onClick={(e) => handleNav("registry", e)}
          className={`font-conthrax text-[16px] lg:text-[20px] no-underline hover:opacity-80 transition-opacity ${
            currentPage === "registry" ? "text-[#81c5ff]" : "text-[#fefefe]"
          }`}
        >
          Registry
        </a>
        <a
          href="#/traffic"
          onClick={(e) => handleNav("traffic", e)}
          className={`font-conthrax text-[16px] lg:text-[20px] no-underline hover:opacity-80 transition-opacity ${
            currentPage === "traffic" ? "text-[#81c5ff]" : "text-[#fefefe]"
          }`}
        >
          Live Traffic
        </a>
      </div>
      <div className="w-[180px]" />
    </nav>
  );
}
