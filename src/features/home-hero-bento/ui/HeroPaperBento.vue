<script setup lang="ts">
import { BENTO_CELL, PAPER_LABEL, PAPER_LINK, STAT_VALUE } from "~/shared/config/layout";

type HeroStat = { label: string; value: string };

defineProps<{
  heroStats: HeroStat[];
}>();
</script>

<template>
  <div
    class="grid w-full grid-cols-2 gap-4 rounded-[14px] border border-zinc-700/50 bg-[rgba(8,8,10,0.5)] p-4 sm:gap-[1.125rem] sm:p-[1.125rem] lg:gap-5 lg:p-5"
    aria-label="Краткая сводка"
  >
    <div
      v-for="stat in heroStats"
      :key="stat.label"
      :class="[BENTO_CELL, 'justify-between']"
    >
      <p :class="STAT_VALUE">{{ stat.value }}</p>
      <p class="mt-auto pt-3 text-sm leading-snug text-paper-mutedInk sm:text-base">
        {{ stat.label }}
      </p>
    </div>

    <div :class="BENTO_CELL">
      <p :class="PAPER_LABEL">Портфолио</p>
      <p class="mt-3 flex-1 text-base leading-relaxed text-paper-mutedInk sm:text-lg">
        Реальные проекты с измеримыми результатами.
      </p>
      <NuxtLink to="/#portfolio" :class="[PAPER_LINK, 'mt-4 inline-flex sm:text-lg']">
        Смотреть работы →
      </NuxtLink>
    </div>
  </div>
</template>
