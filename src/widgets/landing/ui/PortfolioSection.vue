<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { formatPortfolioMeta, usePortfolio } from "~/entities/portfolio";
import {
  BTN_PRIMARY_SM,
  CARD_HOVER,
  GRID_3,
  PAPER_CARD,
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

// Parallax превью без rotate — 3D-наклон на предке с <img> ломает рендер в Chrome/Firefox
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
        <article
          v-for="project in projects"
          :key="project.id"
          :class="[PAPER_CARD, CARD_HOVER, 'group flex h-full flex-col overflow-hidden']"
        >
          <!-- Галерея: клик ведёт на проект, стрелки карусели — только листают -->
          <div
            v-if="project.images.length"
            class="relative shrink-0"
          >
            <NuxtLink
              :to="`/portfolio/${project.id}`"
              class="absolute inset-0 z-[1] rounded-t-paper"
              :aria-label="`Открыть проект: ${project.title}`"
            />
            <TiltCard
              v-slot="tilt"
              tag="div"
              :max-tilt="0"
              class="relative z-[2]"
            >
              <div
                class="transition-[transform,box-shadow] duration-200 ease-out"
                :class="tilt.canTilt && tilt.isHovering ? 'shadow-paper' : ''"
                :style="galleryLiftStyle(tilt)"
              >
                <ImageCarousel
                  :images="project.images"
                  :alt="project.title"
                  :image-class="PORTFOLIO_CARD_IMAGE"
                  click-through
                />
              </div>
            </TiltCard>
          </div>

          <!-- Текст: 3D-наклон только здесь, без картинок внутри rotate -->
          <TiltCard v-slot="tilt" tag="div" class="flex flex-1 flex-col">
            <NuxtLink
              :to="`/portfolio/${project.id}`"
              class="flex flex-1 flex-col rounded-b-paper p-4 no-underline sm:p-5"
            >
              <h3 class="text-xl font-semibold text-paper-ink">{{ project.title }}</h3>
              <p class="mt-1 text-sm text-paper-mutedInk">
                {{ formatPortfolioMeta(project) }}
              </p>
              <p class="mt-2 line-clamp-2 flex-1 text-base text-paper-mutedInk">
                {{ project.shortDescription }}
              </p>
              <span :class="[BTN_PRIMARY_SM, 'mt-4 w-fit']">
                Открыть
                <Icon :icon="ICON.ui.arrowForward" class="text-lg" />
              </span>
            </NuxtLink>
          </TiltCard>
        </article>
      </div>
    </RevealOnScroll>
  </section>
</template>
