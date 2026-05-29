<script setup lang="ts">
import { computed } from "vue";
import {
  formatPortfolioMeta,
  parseTechStack,
  type PortfolioProject
} from "~/entities/portfolio";
import {
  PAPER_CARD,
  PAPER_LABEL,
  PAPER_LINK
} from "~/shared/config/layout";
import { FormattedDescription } from "~/shared/ui/formatted-description";
import { ImageCarousel } from "~/shared/ui/image-carousel";

const props = defineProps<{
  project: PortfolioProject;
}>();

const techItems = computed(() => parseTechStack(props.project.techStack));

const referenceBlocks = computed(() =>
  [...props.project.referenceBlocks].sort((a, b) => a.order - b.order)
);
</script>

<template>
  <article class="w-full space-y-6 sm:space-y-8">
    <header :class="[PAPER_CARD, 'w-full p-5 sm:p-7']">
      <p :class="PAPER_LABEL">Проект</p>
      <h1 class="mt-2 font-serif text-4xl font-semibold text-paper-ink sm:text-5xl lg:text-6xl">
        {{ project.title }}
      </h1>
      <p class="mt-2 text-base text-paper-mutedInk">
        {{ formatPortfolioMeta(project) }}
      </p>
    </header>

    <ImageCarousel
      v-if="project.images.length"
      lightbox
      :images="project.images"
      :alt="project.title"
      image-class="h-52 w-full object-cover sm:h-64 md:h-80 lg:h-[26rem]"
    />

    <section v-if="project.fullDescription" :class="[PAPER_CARD, 'w-full p-5 sm:p-7']">
      <h2 class="text-xl font-semibold text-accent">О проекте</h2>
      <div class="mt-4">
        <FormattedDescription :text="project.fullDescription" />
      </div>
    </section>

    <section v-if="techItems.length" :class="[PAPER_CARD, 'w-full p-5 sm:p-7']">
      <h2 class="text-xl font-semibold text-accent">Стек технологий</h2>
      <div class="mt-4 flex flex-wrap gap-2">
        <span
          v-for="tech in techItems"
          :key="tech"
          class="inline-flex rounded-md border border-paper-border bg-paper-muted px-2.5 py-1 text-sm text-paper-ink"
        >
          {{ tech }}
        </span>
      </div>
    </section>

    <section v-if="referenceBlocks.length" class="w-full space-y-4">
      <h2 class="text-xl font-semibold text-accent">Результаты</h2>
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        <div
          v-for="block in referenceBlocks"
          :key="block.id"
          :class="[PAPER_CARD, 'p-4 sm:p-5']"
        >
          <p :class="PAPER_LABEL">{{ block.title }}</p>
          <p class="mt-2 font-serif text-lg font-semibold leading-snug text-paper-ink sm:text-xl">
            {{ block.content }}
          </p>
        </div>
      </div>
    </section>

    <section v-if="project.links.length" class="w-full space-y-4">
      <h2 class="text-xl font-semibold text-accent">Ссылки</h2>
      <ul class="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
        <li v-for="link in project.links" :key="link.id">
          <a
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            :class="[PAPER_CARD, 'flex items-center gap-3 p-4']"
          >
            <img
              v-if="link.iconUrl"
              :src="link.iconUrl"
              :alt="link.title"
              class="h-8 w-8 rounded-md object-cover"
              loading="lazy"
            />
            <span :class="[PAPER_LINK, 'sm:text-lg']">{{ link.title }} →</span>
          </a>
        </li>
      </ul>
    </section>
  </article>
</template>
