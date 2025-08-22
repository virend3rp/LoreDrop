
export default function SiteBackground({ children, className = "" }) {
  return (
    <div className={"relative min-h-dvh " + className}>
      {/* soft radial gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_0%,rgba(30,64,175,0.12),transparent),radial-gradient(1000px_500px_at_90%_30%,rgba(59,130,246,0.10),transparent),linear-gradient(to_bottom,#f8fbff,white)] dark:bg-[radial-gradient(1200px_600px_at_20%_0%,rgba(30,64,175,0.25),transparent),radial-gradient(900px_500px_at_80%_20%,rgba(59,130,246,0.18),transparent),linear-gradient(to_bottom,#0b1220,#0b1220)]"></div>

      {/* dot grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.25] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
        <svg className="h-full w-full" aria-hidden>
          <defs>
            <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#3b82f6" className="dark:fill-blue-400" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)"></rect>
        </svg>
      </div>

      {/* subtle noise */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-multiply dark:opacity-[0.08] bg-[url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'64\\' height=\\'64\\'><filter id=\\'n\\'><feTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.9\\' numOctaves=\\'2\\' stitchTiles=\\'stitch\\'/></filter><rect width=\\'100%\\' height=\\'100%\\' filter=\\'url(%23n)\\' opacity=\\'0.45\\'/></svg>')]"></div>

      {/* content */}
      <div className="relative">{children}</div>
    </div>
  );
}
