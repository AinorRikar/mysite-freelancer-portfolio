<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed } from "vue";
import type { Service } from "~/entities/service";
import { servicePriceLabel } from "~/shared/lib/servicePrice";
import {
  BTN_PRIMARY_SM,
  CARD_HOVER,
  CARD_PAD,
  PAPER_CARD,
  PAPER_LABEL,
  PAPER_TAG_SM
} from "~/shared/config/layout";
import { ICON } from "~/shared/config/icons";
import { CheckList } from "~/shared/ui/check-list";
import { PaperIcon } from "~/shared/ui/paper-icon";

const props = defineProps<{
  service: Service;
  /** Широкая карточка: цена и кнопка справа от списка */
  wide?: boolean;
}>();

const TECH_PREVIEW = 4;

const priceLabel = computed(() => servicePriceLabel(props.service.price));

const previewTech = computed(() => props.service.techStack.slice(0, TECH_PREVIEW));

const extraTechCount = computed(() =>
  Math.max(0, props.service.techStack.length - TECH_PREVIEW)
);
</script>

<template>
  <NuxtLink
    :to="`/services/${service.slug}`"
    :class="[
      PAPER_CARD,
      CARD_HOVER,
      'group flex h-full no-underline',
      wide
        ? 'flex-col p-5 sm:flex-row sm:items-stretch sm:gap-8 sm:p-6 lg:gap-10 lg:p-7'
        : `flex-col ${CARD_PAD}`,
      service.highlight && 'ring-1 ring-accent/30'
    ]"
  >
    <div class="flex min-w-0 flex-1 flex-col">
      <div class="flex items-start gap-3">
        <PaperIcon :icon="service.icon" />
        <div class="min-w-0 flex-1">
          <h3
            class="font-semibold leading-snug text-paper-ink"
            :class="service.highlight ? 'text-xl sm:text-2xl' : 'text-xl'"
          >
            {{ service.title }}
          </h3>
          <p v-if="service.duration" class="mt-1 text-sm text-paper-mutedInk">
            {{ service.duration }}
          </p>
        </div>
      </div>

      <CheckList
        :items="service.features"
        compact
        class="mt-4 flex-1"
      />

      <div class="mt-4 flex flex-wrap gap-1.5">
        <span
          v-for="tech in previewTech"
          :key="tech"
          :class="[PAPER_TAG_SM, 'text-paper-ink']"
        >
          {{ tech }}
        </span>
        <span
          v-if="extraTechCount > 0"
          :class="[PAPER_TAG_SM, 'text-paper-mutedInk']"
        >
          +{{ extraTechCount }}
        </span>
      </div>
    </div>

    <div
      :class="[
        wide
          ? 'mt-5 flex w-full shrink-0 flex-col justify-end border-t border-paper-border pt-4 sm:mt-0 sm:w-auto sm:min-w-[11rem] sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0 lg:min-w-[13rem]'
          : 'mt-5 border-t border-paper-border pt-4'
      ]"
    >
      <p :class="PAPER_LABEL">{{ priceLabel }}</p>
      <p
        class="mt-1 font-semibold text-paper-ink"
        :class="service.highlight ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'"
      >
        {{ service.price }}
      </p>

      <span :class="[BTN_PRIMARY_SM, 'mt-4 w-fit', wide && 'sm:mt-5']">
        Подробнее
        <Icon :icon="ICON.ui.arrowForward" class="text-lg" />
      </span>
    </div>
  </NuxtLink>
</template>
