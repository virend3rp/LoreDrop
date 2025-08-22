// src/components/SiteBackground.jsx
export default function SiteBackground({
  children,
  className = "",
  showCenterRule = false, // default OFF
}) {
  return (
    <div className={"min-h-dvh bg-[var(--bg-paper)] " + className}>
      {/* Top & bottom hairline rules */}
      <div className="border-b" style={{ borderColor: "var(--rule)" }} />
      <div className="relative">
        {showCenterRule && (
          <div
            className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-px"
            style={{ background: "var(--rule)", opacity: 0.25 }}
          />
        )}
        <div className="mx-auto max-w-7xl px-6 sm:px-8">{children}</div>
      </div>
      <div className="border-t mt-16" style={{ borderColor: "var(--rule)" }} />
    </div>
  );
}
