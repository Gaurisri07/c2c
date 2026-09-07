import imgLogo from "@/imports/Homepage/47202af915ec7162b9a01888274487160ee55234.png";

export default function Navbar() {
  return (
    <nav className="relative flex items-center justify-between px-4 py-4 w-full max-w-[1440px] mx-auto">
      <div className="flex-shrink-0 w-[180px]">
        <img src={imgLogo} alt="MCP Sentinel" className="w-[180px] object-contain" />
      </div>
      <div className="flex items-center gap-12 lg:gap-20">
        <a href="#" className="font-conthrax text-[#81c5ff] text-[20px] lg:text-[24px] no-underline hover:opacity-80 transition-opacity">
          Home
        </a>
        <a href="#features" className="font-conthrax text-[#fefefe] text-[20px] lg:text-[24px] no-underline hover:opacity-80 transition-opacity">
          Features
        </a>
        <a href="#" className="font-conthrax text-[#fefefe] text-[20px] lg:text-[24px] no-underline hover:opacity-80 transition-opacity">
          Dashboard
        </a>
      </div>
      <div className="w-[180px]" />
    </nav>
  );
}
