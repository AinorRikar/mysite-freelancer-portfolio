/** Горизонтальные отступы страницы */
export const LAYOUT_X =
  "w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-16";

export const SECTION = `${LAYOUT_X} scroll-mt-24 py-12 sm:py-16 lg:py-20`;

export const PAGE_TOP = "pt-16 sm:pt-[4.5rem]";

/** Секция на тёмном фоне (лендинг) */
export const SECTION_DIVIDER = "border-t border-zinc-800/50";
export const SECTION_LABEL =
  "inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.16em] text-accent sm:text-base";
export const SECTION_TITLE =
  "mt-2 font-serif text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl";
export const SECTION_LEAD =
  "mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl";
/** Отступ от заголовка секции до контента */
export const SECTION_BODY = "mt-8";

/** Сетки карточек */
export const GRID_GAP = "gap-4 sm:gap-5";
export const GRID_2 = `grid grid-cols-1 ${GRID_GAP} sm:grid-cols-2`;
export const GRID_3 = `grid grid-cols-1 ${GRID_GAP} sm:grid-cols-2 lg:grid-cols-3`;

/** Paper-карточка */
export const PAPER_CARD =
  "rounded-paper border border-paper-border bg-paper-card text-paper-ink shadow-paper";

export const PAPER_INSET = "bg-paper-inset";

export const CARD_PAD = "p-5 sm:p-6";
export const CARD_PAD_LG = "p-5 sm:p-7 lg:p-8";

export const CARD_HOVER =
  "transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-lg motion-reduce:transform-none motion-reduce:hover:shadow-paper";

export const PAPER_LABEL =
  "text-xs font-semibold uppercase tracking-[0.12em] text-paper-mutedInk";

export const PAPER_LINK =
  "text-base font-semibold text-product transition hover:text-product-muted";

/** Иконка в квадрате (услуги, детальные страницы) */
export const PAPER_ICON_BOX =
  "inline-flex shrink-0 items-center justify-center rounded-lg border border-paper-border text-accent";
export const PAPER_ICON_BOX_SM = `${PAPER_ICON_BOX} h-10 w-10`;
export const PAPER_ICON_BOX_MD = `${PAPER_ICON_BOX} h-12 w-12`;

/** Теги стека */
export const PAPER_TAG =
  "inline-flex rounded-md border border-paper-border bg-paper-inset px-2.5 py-1 text-sm text-paper-ink";
export const PAPER_TAG_SM =
  "inline-flex rounded-md border border-paper-border bg-paper-inset px-2 py-0.5 text-xs text-paper-ink";

/** Детальные страницы (услуга, проект) */
export const DETAIL_STACK = "space-y-6 sm:space-y-8";
export const DETAIL_BLOCK = "mt-8 border-t border-paper-border pt-6";
export const DETAIL_H2 = "inline-flex items-center gap-2 text-xl font-semibold";
export const DETAIL_H2_ACCENT = `${DETAIL_H2} text-accent`;
export const DETAIL_H2_INK = `${DETAIL_H2} text-paper-ink`;

export const BODY_LG = "text-lg leading-relaxed text-paper-mutedInk sm:text-xl";

/** Высота превью галереи в карточке портфолио (+20% к исходным 11/12rem) */
export const PORTFOLIO_CARD_IMAGE = "h-[13.2rem] w-full object-cover sm:h-[14.4rem]";

export const BTN_PRIMARY =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-base font-semibold text-graphite-deep transition hover:brightness-95 sm:px-6 sm:py-3 sm:text-lg";

export const BTN_PRIMARY_SM =
  "inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-graphite-deep transition hover:brightness-95 sm:px-5 sm:py-2.5 sm:text-base";

export const BTN_GHOST =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-600 px-5 py-2.5 text-base font-medium text-zinc-200 transition hover:border-zinc-500 hover:bg-white/5 sm:px-6 sm:py-3 sm:text-lg";

export const BTN_GHOST_SM =
  "inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-base text-zinc-300 transition hover:bg-zinc-800";

export const BENTO_CELL =
  `${PAPER_CARD} flex min-h-[9.5rem] flex-col p-5 sm:min-h-[10.5rem] sm:p-6 lg:min-h-[11.5rem] lg:p-7`;

export const STAT_VALUE =
  "font-serif text-5xl font-semibold tabular-nums leading-none text-paper-ink sm:text-6xl lg:text-7xl";
