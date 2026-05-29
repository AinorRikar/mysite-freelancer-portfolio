<script setup lang="ts">
import { formatPortfolioMeta, usePortfolio } from "~/entities/portfolio";
import { PAPER_CARD, PAPER_LINK, SECTION } from "~/shared/config/layout";
import { ImageCarousel } from "~/shared/ui/image-carousel";
import { RevealOnScroll } from "~/shared/ui/reveal-on-scroll";
import { TiltCard } from "~/shared/ui/tilt-card";

const { data: projects, pending, error } = await usePortfolio();

const galleryLiftStyle = (tilt: {
  canTilt: boolean;
  isHovering: boolean;
  floatX: number;
  floatY: number;
}) => {
  if (!tilt.canTilt || !tilt.isHovering) {
    return undefined;
  }

  return {
    transform: `translate(${tilt.floatX}px, ${tilt.floatY - 8}px) scale(1.015)`
  };
};
</script>

<template>
  <section id="portfolio" :class="[SECTION, 'border-t border-zinc-800/50']">
    <RevealOnScroll class="w-full">
      <p class="text-sm font-medium uppercase tracking-[0.16em] text-accent sm:text-base">
        Портфолио
      </p>
      <h2 class="mt-2 font-serif text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
        Избранные проекты
      </h2>
      <p class="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
        Реальные задачи и измеримые результаты.
      </p>

      <p v-if="error" class="mt-8 text-zinc-400">
        Портфолио временно недоступно. Проверьте INTEGRATION_SECRET и GOGOL_DASHBOARD_BASE_URL в
        .env.
      </p>

      <div
        v-else-if="pending"
        class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
      >
        <div
          v-for="i in 3"
          :key="i"
          class="h-64 animate-pulse rounded-paper bg-zinc-800/50"
        />
      </div>

      <p v-else-if="!projects?.length" class="mt-8 text-zinc-400">Пока нет проектов.</p>

      <div
        v-else
        class="mt-8 grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
      >
        <TiltCard
          v-for="project in projects"
          :key="project.id"
          v-slot="tilt"
          tag="NuxtLink"
          :to="`/portfolio/${project.id}`"
          :class="[PAPER_CARD, 'group flex h-full flex-col overflow-visible no-underline']"
        >
          <div
            v-if="project.images.length"
            class="relative z-10 shrink-0 transition-[transform,box-shadow] duration-200 ease-out"
            :class="tilt.canTilt && tilt.isHovering ? 'shadow-paper' : ''"
            :style="galleryLiftStyle(tilt)"
          >
            <ImageCarousel
              :images="project.images"
              :alt="project.title"
              image-class="h-44 w-full object-cover sm:h-48"
            />
          </div>
          <div class="relative z-0 flex flex-1 flex-col rounded-b-paper bg-paper p-4 sm:p-5">
            <h3 class="text-xl font-semibold text-paper-ink">{{ project.title }}</h3>
            <p class="mt-1 text-sm text-paper-mutedInk">
              {{ formatPortfolioMeta(project) }}
            </p>
            <p class="mt-2 line-clamp-2 flex-1 text-base text-paper-mutedInk">
              {{ project.shortDescription }}
            </p>
            <span :class="[PAPER_LINK, 'mt-3 inline-flex']">Открыть →</span>
          </div>
        </TiltCard>
      </div>
    </RevealOnScroll>
  </section>
</template>
