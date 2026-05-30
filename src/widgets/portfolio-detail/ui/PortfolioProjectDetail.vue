<script setup lang="ts">
import { computed } from "vue";
import {
  formatPortfolioMeta,
  parseTechStack,
  type PortfolioProject
} from "~/entities/portfolio";
import {
  CARD_PAD,
  DETAIL_BLOCK,
  DETAIL_STACK,
  GRID_GAP,
  PAPER_CARD,
  PAPER_LABEL,
  PAPER_LINK,
  PAPER_TAG
} from "~/shared/config/layout";
import { ICON } from "~/shared/config/icons";
import { DetailHeading } from "~/shared/ui/detail-heading";
import { FormattedDescription } from "~/shared/ui/formatted-description";
import { ImageCarousel } from "~/shared/ui/image-carousel";
import { PaperIcon } from "~/shared/ui/paper-icon";

const props = defineProps<{
  project: PortfolioProject;
}>();

const techItems = computed(() => parseTechStack(props.project.techStack));

const referenceBlocks = computed(() =>
  [...props.project.referenceBlocks].sort((a, b) => a.order - b.order)
);
</script>

<template>
  <article :class="['w-full', DETAIL_STACK]">
    <header :class="[PAPER_CARD, CARD_PAD, 'w-full sm:p-7']">
      <div class="flex items-start gap-4">
        <PaperIcon :icon="ICON.project.header" size="md" />
        <div class="min-w-0">
          <p :class="PAPER_LABEL">Проект</p>
          <h1 class="mt-1 font-serif text-4xl font-semibold text-paper-ink sm:text-5xl lg:text-6xl">
            {{ project.title }}
          </h1>
          <p class="mt-2 text-base text-paper-mutedInk">
            {{ formatPortfolioMeta(project) }}
          </p>
        </div>
      </div>
    </header>

    <ImageCarousel
      v-if="project.images.length"
      lightbox
      :images="project.images"
      :alt="project.title"
      image-class="h-52 w-full object-cover sm:h-64 md:h-80 lg:h-[26rem]"
    />

    <section v-if="project.fullDescription" :class="[PAPER_CARD, CARD_PAD, 'w-full sm:p-7']">
      <DetailHeading title="О проекте" :icon="ICON.project.about" />
      <div class="mt-4">
        <FormattedDescription :text="project.fullDescription" />
      </div>
    </section>

    <section v-if="techItems.length" :class="[PAPER_CARD, CARD_PAD, 'w-full sm:p-7']">
      <DetailHeading title="Стек технологий" :icon="ICON.project.stack" />
      <div class="mt-4 flex flex-wrap gap-2">
        <span v-for="tech in techItems" :key="tech" :class="PAPER_TAG">
          {{ tech }}
        </span>
      </div>
    </section>

    <section v-if="referenceBlocks.length" class="w-full space-y-4">
      <DetailHeading title="Результаты" :icon="ICON.project.results" />
      <div :class="`grid grid-cols-1 ${GRID_GAP} sm:grid-cols-2 lg:grid-cols-3`">
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
      <DetailHeading title="Ссылки" :icon="ICON.project.links" />
      <ul :class="`grid grid-cols-1 ${GRID_GAP} sm:grid-cols-2`">
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
