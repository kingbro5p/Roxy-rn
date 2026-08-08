export default function RoxyOrb({ size = 28, thinking = false }) {
  return (
    <div
      className="relative shrink-0 rounded-full"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-br from-roxy-400 via-roxy-500 to-indigo-500 ${
          thinking ? "animate-pulseSoft" : ""
        }`}
      />
      <div className="absolute inset-0 rounded-full bg-roxy-aurora animate-drift opacity-90 mix-blend-screen" />
      <div className="absolute inset-[15%] rounded-full bg-ink/40 blur-[2px]" />
    </div>
  );
}
