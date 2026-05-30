<script setup lang="ts">
import { formatPortfolioMeta, usePortfolio } from "~/entities/portfolio";
import {
  CARD_HOVER,
  GRID_3,
  PAPER_CARD,
  PAPER_LINK,
  PORTFOLIO_CARD_IMAGE,
  SECTION,
  SECTION_BODY,
  SECTION_DIVIDER
} from "~/shared/config/layout";
import { ICON } from "~/shared/config/icons";
import { ImageCarousel } from "~/shared/ui/image-carousel";
import { RevealOnScroll } from "~/shared/ui/reveal-on-scroll";
import { SectionHeading } from "~/shared/ui/section-heading";
import { TiltCard } from "~/shared/ui/tilt-card";

const { data: projects, pending, error } = await usePortfolio();

// Лёгкий подъём превью при 3D-наклоне карточки (картинка вне rotate-контейнера TiltCard)
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
  <section id="portfolio" :class="[SECTION, SECTION_DIVIDER]">
    <RevealOnScroll class="w-full">
      <SectionHeading
        :icon="ICON.section.portfolio"
        label="Портфолио"
        title="Избранные проекты"
        lead="Реальные задачи и измеримые результаты."
      />

      <p v-if="error" :class="[SECTION_BODY, 'text-zinc-400']">
        Портфолио временно недоступно. Проверьте INTEGRATION_SECRET и GOGOL_DASHBOARD_BASE_URL в
        .env.
      </p>

      <div v-else-if="pending" :class="[SECTION_BODY, GRID_3]">
        <div
          v-for="i in 3"
          :key="i"
          class="h-64 animate-pulse rounded-paper bg-zinc-800/50"
        />
      </div>

      <p v-else-if="!projects?.length" :class="[SECTION_BODY, 'text-zinc-400']">
        Пока нет проектов.
      </p>

      <div v-else :class="[SECTION_BODY, GRID_3]">
        <TiltCard
          v-for="project in projects"
          :key="project.id"
          v-slot="tilt"
          tag="NuxtLink"
          :to="`/portfolio/${project.id}`"
          :class="[PAPER_CARD, CARD_HOVER, 'group flex h-full flex-col overflow-visible no-underline']"
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
              :image-class="PORTFOLIO_CARD_IMAGE"
            />
          </div>

          <div class="relative z-0 flex flex-1 flex-col rounded-b-paper p-4 sm:p-5">
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
