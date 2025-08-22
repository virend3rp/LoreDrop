import React from "react";

/**
 * ExhibitCardRetro – retro styled card (grid friendly, no drag).
 *
 * Expected artifact shape:
 * {
 *   id, title, image, year, platform, tags, votes, snippet, slug
 * }
 */
export function ExhibitCardRetro({
  artifact,
  onUpvote,
  onDownvote,
  hrefBuilder = (a) => (a.slug ? `/lore/${a.slug}` : `#`),
  className = "",
}) {
  const {
    id,
    title,
    image,
    year,
    platform,
    tags = [],
    votes = 0,
    snippet,
  } = artifact;

  const href = hrefBuilder(artifact);

  return (
    <article
      className={
        "group flex flex-col overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-b from-white to-blue-50 shadow-sm hover:shadow-lg dark:border-blue-900/50 dark:from-zinc-900 dark:to-blue-950 " +
        className
      }
    >
      {/* Retro title bar */}
      <div className="flex items-center justify-between gap-2 border-b border-blue-200 bg-gradient-to-r from-blue-100 to-blue-200 px-3 py-2 text-blue-900 dark:border-blue-900 dark:from-blue-900 dark:to-blue-800 dark:text-blue-100">
        <div className="flex items-center gap-2">
          <WindowDot className="text-rose-500" />
          <WindowDot className="text-amber-500" />
          <WindowDot className="text-emerald-500" />
          <span className="ml-1 line-clamp-1 text-sm font-semibold">
            {title}
          </span>
        </div>
        <VoteWidgetCompact
          votes={votes}
          onUpvote={() => onUpvote?.(id)}
          onDownvote={() => onDownvote?.(id)}
        />
      </div>

      {/* Image */}
      <a href={href} aria-label={`Open ${title}`} className="block">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-blue-100 dark:bg-blue-950">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
          {snippet && (
            <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-blue-950/80 via-blue-900/20 to-transparent p-4 text-white md:group-hover:flex md:items-end">
              <p className="line-clamp-3 text-sm/5 opacity-95">{snippet}</p>
            </div>
          )}
        </div>
      </a>

      {/* Meta + CTA */}
      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {year && <Chip>{year}</Chip>}
          {platform && <Chip>{platform}</Chip>}
          {tags.slice(0, 3).map((t) => (
            <Chip key={t} muted>
              #{t}
            </Chip>
          ))}
        </div>
        <div>
          <a
            href={href}
            className="inline-flex items-center gap-1 rounded-xl border border-blue-200 bg-white px-3 py-2 text-xs font-semibold text-blue-900 shadow-sm hover:bg-blue-50 dark:border-blue-900 dark:bg-zinc-950 dark:text-blue-100 dark:hover:bg-blue-900/40"
          >
            Read more
            <ArrowIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

/** Grid wrapper (simple, responsive) */
export function ExhibitGrid({ children, className = "" }) {
  return (
    <div
      className={
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 " + className
      }
    >
      {children}
    </div>
  );
}

/** Vote widget – compact */
function VoteWidgetCompact({ votes = 0, onUpvote, onDownvote }) {
  const positive = votes >= 0;
  return (
    <div className="flex select-none items-center gap-1 rounded-lg border border-blue-300 bg-white/70 px-1.5 py-0.5 text-blue-900 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-100">
      <button
        type="button"
        aria-label="Upvote"
        className="rounded-lg p-1 hover:bg-blue-100 dark:hover:bg-blue-900/60"
        onClick={(e) => {
          e.preventDefault();
          onUpvote?.();
        }}
      >
        <TriangleUp className="h-4 w-4" />
      </button>
      <span
        className={`min-w-6 text-center text-sm font-bold ${
          positive
            ? "text-emerald-700 dark:text-emerald-400"
            : "text-rose-600 dark:text-rose-400"
        }`}
      >
        {votes}
      </span>
      <button
        type="button"
        aria-label="Downvote"
        className="rounded-lg p-1 hover:bg-blue-100 dark:hover:bg-blue-900/60"
        onClick={(e) => {
          e.preventDefault();
          onDownvote?.();
        }}
      >
        <TriangleDown className="h-4 w-4" />
      </button>
    </div>
  );
}

/** Small chip component */
function Chip({ children, muted = false }) {
  return (
    <span
      className={
        "rounded-full border px-2 py-0.5 " +
        (muted
          ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-200"
          : "border-blue-300 bg-white text-blue-900 shadow-sm dark:border-blue-900 dark:bg-zinc-950 dark:text-blue-100")
      }
    >
      {children}
    </span>
  );
}

/* Icons */
function WindowDot({ className = "" }) {
  return (
    <span className={"inline-block h-2.5 w-2.5 rounded-full " + className} />
  );
}
function TriangleUp({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 6l7 12H5l7-12z" />
    </svg>
  );
}
function TriangleDown({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 18L5 6h14l-7 12z" />
    </svg>
  );
}
function ArrowIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  );
}
