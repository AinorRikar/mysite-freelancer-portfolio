/** Shared Tailwind class strings for layout rhythm */
export const LAYOUT_X =
  "w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-16";

export const SECTION =
  `${LAYOUT_X} scroll-mt-24 py-12 sm:py-16 lg:py-20`;

export const PAGE_TOP = "pt-16 sm:pt-[4.5rem]";

export const PAPER_CARD =
  "rounded-paper border border-paper-border bg-paper text-paper-ink shadow-paper";

export const PAPER_LABEL =
  "text-xs font-semibold uppercase tracking-[0.12em] text-paper-mutedInk";

export const PAPER_LINK =
  "text-base font-semibold text-product transition hover:text-product-muted";

export const BTN_PRIMARY =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-base font-semibold text-graphite-deep transition hover:brightness-95 sm:px-6 sm:py-3 sm:text-lg";

export const BTN_GHOST =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-600 px-5 py-2.5 text-base font-medium text-zinc-200 transition hover:border-zinc-500 hover:bg-white/5 sm:px-6 sm:py-3 sm:text-lg";

export const BTN_GHOST_SM =
  "inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-base text-zinc-300 transition hover:bg-zinc-800";

export const BENTO_CELL =
  `${PAPER_CARD} flex min-h-[9.5rem] flex-col p-5 sm:min-h-[10.5rem] sm:p-6 lg:min-h-[11.5rem] lg:p-7`;

export const STAT_VALUE =
  "font-serif text-5xl font-semibold tabular-nums leading-none text-paper-ink sm:text-6xl lg:text-7xl";
