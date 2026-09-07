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
    <nav className="relative flex items-center justify-between px-6 lg:px-12 py-5 w-full max-w-[1440px] mx-auto">
      {/* Left section: Logo + Nav links placed next to each other */}
      <div className="flex items-center gap-10 lg:gap-14">
        <button
          onClick={(e) => handleNav("home", e)}
          className="bg-transparent border-none p-0 cursor-pointer text-left flex items-center hover:opacity-85 transition-opacity"
        >
          <img
            src="/logo.svg"
            alt="MCP Sentinel"
            className="w-[220px] lg:w-[260px] h-auto object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = imgLogo;
            }}
          />
        </button>

        <div className="flex items-center gap-8 lg:gap-12">
          <a
            href="#/"
            onClick={(e) => handleNav("home", e)}
            className={`font-conthrax text-[18px] lg:text-[22px] tracking-wide no-underline hover:opacity-80 transition-opacity ${
              currentPage === "home" ? "text-[#81c5ff]" : "text-[#fefefe]"
            }`}
          >
            Home
          </a>
          <a
            href="#/dashboard"
            onClick={(e) => handleNav("dashboard", e)}
            className={`font-conthrax text-[18px] lg:text-[22px] tracking-wide no-underline hover:opacity-80 transition-opacity ${
              currentPage === "dashboard" ? "text-[#81c5ff]" : "text-[#fefefe]"
            }`}
          >
            Dashboard
          </a>
          <a
            href="#features"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage !== "home" && onNavigate) {
                onNavigate("home");
                setTimeout(() => {
                  document.getElementById("features")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 120);
              } else {
                document.getElementById("features")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="font-conthrax text-[#fefefe] text-[18px] lg:text-[22px] tracking-wide no-underline hover:opacity-80 transition-opacity cursor-pointer"
          >
            Features
          </a>
        </div>
      </div>
    </nav>
  );
}
