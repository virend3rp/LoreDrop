import React from "react";
import { motion } from "framer-motion";

export function ExhibitCardRetro({
  artifact,
  onUpvote,
  onDownvote,
  hrefBuilder = (a) => (a.slug ? `/lore/${a.slug}` : `#`),
  draggable = true,
  className = ""
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
  } = normalizeArtifact(artifact);

  const href = hrefBuilder(artifact);

  return (
    <motion.article
      drag={draggable}
      dragMomentum={false}
      dragElastic={0.05}
      whileHover={{ y: -2 }}
      className={
        "group relative overflow-hidden rounded-2xl border border-blue-200/70 bg-gradient-to-b from-white to-blue-50 shadow-sm transition-shadow hover:shadow-xl dark:border-blue-900/40 dark:from-zinc-900 dark:to-blue-950/20 " +
        className
      }
    >
      {/* Retro title bar */}
      <div className="flex items-center justify-between gap-2 border-b border-blue-200/70 bg-gradient-to-r from-blue-100 to-blue-200 px-3 py-2 text-blue-900 shadow-sm dark:border-blue-900/40 dark:from-blue-900 dark:to-blue-800 dark:text-blue-100">
        <div className="flex items-center gap-2">
          <WindowDot className="text-rose-500" />
          <WindowDot className="text-amber-500" />
          <WindowDot className="text-emerald-500" />
          <span className="ml-1 line-clamp-1 text-sm font-semibold tracking-tight">{title}</span>
        </div>
        <VoteWidgetCompact
          votes={votes}
          onUpvote={() => onUpvote?.(id)}
          onDownvote={() => onDownvote?.(id)}
        />
      </div>

      {/* Image */}
      <a href={href} aria-label={`Open ${title}`} className="block">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-blue-100/40 dark:bg-blue-950/30">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
          {snippet && (
            <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-blue-950/80 via-blue-900/20 to-transparent p-4 text-white md:group-hover:flex md:items-end">
              <p className="line-clamp-3 text-sm/5 opacity-95">{snippet}</p>
            </div>
          )}
        </div>
      </a>

      {/* Meta row */}
      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {year && <Chip>{year}</Chip>}
          {platform && <Chip>{platform}</Chip>}
          {tags.slice(0, 4).map((t) => (
            <Chip key={t} muted>#{t}</Chip>
          ))}
        </div>

        <div className="mt-1">
          <a
            href={href}
            className="inline-flex items-center gap-1 rounded-xl border border-blue-200 bg-white px-3 py-2 text-xs font-semibold text-blue-900 shadow-sm transition hover:bg-blue-50 dark:border-blue-900/50 dark:bg-zinc-950 dark:text-blue-100 dark:hover:bg-blue-950/40"
          >
            Read more
            <ArrowIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

/** Masonry grid tuned for exhibits */
export function ExhibitGrid({ children, className = "" }) {
  return (
    <div className={"[column-fill:_balance]_sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6 " + className}>
      <div className="grid gap-4 sm:gap-6 [grid-auto-rows:_1px]">
        {React.Children.map(children, (child, idx) => (
          <div key={idx} className="break-inside-avoid">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Vote widget – compact, blue-forward */
function VoteWidgetCompact({ votes = 0, onUpvote, onDownvote }) {
  const positive = votes >= 0;
  return (
    <div className="flex select-none items-center gap-1 rounded-xl border border-blue-300/70 bg-white/70 px-1.5 py-0.5 text-blue-900 backdrop-blur-sm dark:border-blue-900/40 dark:bg-blue-950/40 dark:text-blue-100">
      <button
        type="button"
        aria-label="Upvote"
        className="rounded-lg p-1 hover:bg-blue-100 active:scale-95 dark:hover:bg-blue-900/60"
        onClick={(e) => { e.preventDefault(); onUpvote?.(); }}
      >
        <TriangleUp className="h-4 w-4" />
      </button>
      <span className={`min-w-6 text-center text-sm font-bold ${positive ? "text-emerald-700 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
        {votes}
      </span>
      <button
        type="button"
        aria-label="Downvote"
        className="rounded-lg p-1 hover:bg-blue-100 active:scale-95 dark:hover:bg-blue-900/60"
        onClick={(e) => { e.preventDefault(); onDownvote?.(); }}
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
          ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-200"
          : "border-blue-300 bg-white text-blue-900 shadow-sm dark:border-blue-900/50 dark:bg-zinc-950 dark:text-blue-100")
      }
    >
      {children}
    </span>
  );
}

/* Utilities */
function normalizeArtifact(a) {
  // Handles alternate key names from older data.
  return {
    id: a.id ?? a._id ?? a.slug ?? a.title,
    title: a.title ?? a.name ?? "Untitled",
    image: a.image ?? a.imageUrl ?? a.cover ?? a.thumbnail,
    year: a.year ?? a.date?.slice?.(0, 4),
    platform: a.platform ?? a.sourcePlatform ?? a.source,
    tags: a.tags ?? a.keywords ?? [],
    votes: a.votes ?? a.score ?? 0,
    snippet: a.snippet ?? a.description ?? a.excerpt ?? "",
    slug: a.slug,
  };
}

/* Simple inline icons */
function WindowDot({ className = "" }) {
  return (
    <span className={"inline-block h-2.5 w-2.5 rounded-full shadow-inner " + className} />
  );
}
function TriangleUp({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 6l7 12H5l7-12z" />
    </svg>
  );
}
function TriangleDown({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 18L5 6h14l-7 12z" />
    </svg>
  );
}
function ArrowIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  );
}

/** Demo (remove in prod) */
export default function Demo() {
  const artifacts = [
    {
      id: 1,
      title: "This is Fine",
      image:
        "https://images.unsplash.com/photo-1520975682031-c0f9f0a75217?q=80&w=1200&auto=format&fit=crop",
      year: 2013,
      platform: "Twitter",
      tags: ["comics", "reaction"],
      votes: 12,
      snippet:
        "Iconic webcomic meme used to express denial or acceptance during chaos.",
      slug: "this-is-fine",
    },
    {
      id: 2,
      title: "The gray bearded Man",
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1200&auto=format&fit=crop",
      year: 2024,
      platform: "Instagram",
      tags: ["virality", "faces"],
      votes: 1,
      snippet: "A mysterious figure spotted across timelines; the internet made him a legend.",
      slug: "gray-bearded-man",
    },
    {
      id: 3,
      title: "Govinda Avtaar",
      image:
        "https://images.unsplash.com/photo-1648737962794-df48d6fa1b5d?q=80&w=1200&auto=format&fit=crop",
      year: 2009,
      platform: "YouTube",
      tags: ["bollywood", "mashup"],
      votes: 3,
      snippet: "Blue era parody meets masala cinema; remix culture at its peak.",
      slug: "govinda-avtaar",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-8">
      <h2 className="mb-4 text-3xl font-black tracking-tight text-blue-900 dark:text-blue-100">The Collection</h2>
      <ExhibitGrid>
        {artifacts.map((a) => (
          <ExhibitCardRetro key={a.id} artifact={a} />
        ))}
      </ExhibitGrid>
    </div>
  );
}
