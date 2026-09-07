import svgPaths from "@/imports/Homepage/svg-xq6m31p9wm";

function SearchIcon() {
  return (
    <svg fill="none" height="29" viewBox="0 0 29 29" width="29">
      <path d={svgPaths.p1d1fae80} fill="white" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg fill="none" height="33" viewBox="0 0 30 33" width="29">
      <path d={svgPaths.p63dc00} fill="white" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg fill="none" height="24" viewBox="0 0 31 23" width="31">
      <path d={svgPaths.p438a4f2} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.92" />
      <path d={svgPaths.pc39f680} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.92" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg fill="none" height="27" viewBox="0 0 22 27" width="22">
      <path d={svgPaths.p227f0c80} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.58" />
      <path d={svgPaths.p1153a300} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.58" />
    </svg>
  );
}

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    icon: <SearchIcon />,
    title: "Detect Hidden Threats",
    description: "Find prompt injections, malicious tools and shadowing",
  },
  {
    icon: <ShieldIcon />,
    title: "Validate Permissions",
    description: "Catch unnecessary or overreaching access requests",
  },
  {
    icon: <EyeIcon />,
    title: "Monitor in real time",
    description: "Block sensitive data leaks across live communication",
  },
  {
    icon: <FileIcon />,
    title: "Stay in control",
    description: "Get clear reports and take action, without disrupting your workflow",
  },
];

export default function Features() {
  return (
    <section id="features" className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 pb-24">
      <h2
        className="font-conthrax text-[48px] lg:text-[64px] text-center mb-16 lg:mb-24"
        style={{ color: "rgba(129,197,255,0.9)" }}
      >
        Features
      </h2>

      <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-0">
        {features.map((feature, i) => (
          <div key={feature.title} className="flex md:flex-1 flex-col items-center text-center relative w-full md:w-auto">
            {/* Vertical divider on left (except first) */}
            {i > 0 && (
              <div
                className="hidden md:block absolute left-0 top-0 h-[223px] w-px"
                style={{ background: "rgba(255,255,255,0.5)" }}
              />
            )}

            <div className="feature-icon-circle mb-6">
              {feature.icon}
            </div>

            <p className="font-helvetica text-white text-[18px] lg:text-[21.7px] mb-3 leading-normal">
              {feature.title}
            </p>

            <p
              className="font-helvetica-light text-white text-[16px] lg:text-[19px] text-center leading-normal max-w-[259px]"
              style={{ opacity: 0.8 }}
            >
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
