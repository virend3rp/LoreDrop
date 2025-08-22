
export default function SiteBackground({ children, className = "",showCenterRule = false,}) {
  return (
    <div className={"min-h-dvh bg-[var(--bg-paper)] " + className}>
      {/* Top & bottom hairline rules (gives print/masthead feel) */}
      <div className="border-b" style={{ borderColor: "var(--rule)" }} />
      {/* Content frame with subtle vertical rules */}
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-y-0 mx-auto w-px"
          style={{ left: "50%", background: "var(--rule)" }}
        />
        <div className="mx-auto max-w-7xl px-6 sm:px-8">{children}</div>
      </div>
      <div className="border-t mt-16" style={{ borderColor: "var(--rule)" }} />
    </div>
  );
}
