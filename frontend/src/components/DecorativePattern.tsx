export default function DecorativePattern() {
  const yellowCount = 60;
  const blueCount = 60;

  return (
    <div className="w-full overflow-hidden select-none pointer-events-none" aria-hidden="true">
      {/* Row 1: Yellow blocks */}
      <div className="flex w-max">
        {Array.from({ length: yellowCount }).map((_, i) => (
          <div
            key={i}
            style={{
              width: "45px",
              height: "51px",
              backgroundColor: "#ffd656",
              marginRight: "48px",
              flexShrink: 0,
            }}
          />
        ))}
      </div>
      {/* Row 2: Blue blocks, offset */}
      <div className="flex w-max" style={{ marginLeft: "45px" }}>
        {Array.from({ length: blueCount }).map((_, i) => (
          <div
            key={i}
            style={{
              width: "47px",
              height: "29px",
              backgroundColor: "#5b8db8",
              marginRight: "45px",
              flexShrink: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
