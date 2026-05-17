<script setup lang="ts">
import { Icon } from "@iconify/vue";
import {
  formatPortfolioMeta,
  parseTechStack,
  type PortfolioProject
} from "~/entities/portfolio";
import { FormattedDescription } from "~/shared/ui/formatted-description";
import { HoverLift } from "~/shared/ui/hover-lift";
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
  <article class="space-y-8 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 sm:p-8">
    <div class="rounded-xl border border-cyan-400/25 bg-zinc-950/80 p-5 shadow-[0_10px_24px_rgba(6,182,212,0.16)]">
      <h1 class="text-3xl font-bold sm:text-4xl">{{ project.title }}</h1>
      <p class="mt-2 text-sm text-zinc-400 sm:text-base">
        {{ formatPortfolioMeta(project) }}
      </p>
    </div>

    <ImageCarousel
      v-if="project.images.length"
      lightbox
      :images="project.images"
      :alt="project.title"
      image-class="h-56 w-full object-cover sm:h-72"
    />

    <section v-if="project.fullDescription" class="space-y-3">
      <h2 class="inline-flex items-center gap-2 text-2xl font-semibold text-cyan-300">
        <Icon icon="material-symbols:description-outline-rounded" />
        О проекте
      </h2>
      <FormattedDescription :text="project.fullDescription" />
    </section>

    <section v-if="techItems.length" class="rounded-2xl border border-cyan-500/30 bg-zinc-950/70 p-6 shadow-[0_16px_40px_rgba(6,182,212,0.18)]">
      <h2 class="inline-flex items-center gap-2 text-2xl font-semibold text-cyan-300">
        <Icon icon="material-symbols:deployed-code-outline" />
        Стек технологий
      </h2>
      <div class="mt-4 flex flex-wrap gap-3">
        <span
          v-for="tech in techItems"
          :key="tech"
          class="inline-flex items-center rounded-xl border border-lime-300/50 bg-lime-300/20 px-4 py-2 text-sm font-medium text-lime-100 shadow-[0_8px_22px_rgba(132,204,22,0.22)]"
        >
          {{ tech }}
        </span>
      </div>
    </section>

    <section v-if="referenceBlocks.length" class="space-y-4">
      <h2 class="inline-flex items-center gap-2 text-2xl font-semibold text-cyan-300">
        <Icon icon="material-symbols:query-stats-rounded" />
        Результаты проекта
      </h2>
      <div class="flex flex-wrap gap-4">
        <HoverLift
          v-for="block in referenceBlocks"
          :key="block.id"
          class="w-fit max-w-full rounded-xl border border-zinc-700 bg-zinc-950/80 px-5 py-4"
        >
          <p class="text-sm font-medium uppercase tracking-wide text-zinc-400">
            {{ block.title }}
          </p>
          <p class="mt-2 text-2xl font-bold uppercase tracking-wide text-lime-300">
            {{ block.content }}
          </p>
        </HoverLift>
      </div>
    </section>

    <section v-if="project.links.length" class="space-y-4">
      <h2 class="inline-flex items-center gap-2 text-2xl font-semibold text-cyan-300">
        <Icon icon="material-symbols:link-rounded" />
        Ссылки
      </h2>
      <ul class="space-y-3">
        <li v-for="link in project.links" :key="link.id">
          <a
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-950/80 px-4 py-3 transition hover:border-cyan-500/40 hover:bg-zinc-900"
          >
            <img
              v-if="link.iconUrl"
              :src="link.iconUrl"
              :alt="link.title"
              class="h-8 w-8 rounded-lg object-cover"
              loading="lazy"
            />
            <Icon
              v-else
              icon="material-symbols:open-in-new-rounded"
              class="text-xl text-cyan-400"
            />
            <span class="text-base font-medium text-zinc-200">{{ link.title }}</span>
          </a>
        </li>
      </ul>
    </section>
  </article>
</template>
