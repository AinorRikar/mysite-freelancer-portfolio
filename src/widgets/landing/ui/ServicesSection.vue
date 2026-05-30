<script setup lang="ts">
import { computed } from "vue";
import { useSiteStore } from "~/entities/site";
import { isWideLastGridItem } from "~/shared/lib/serviceGrid";
import { GRID_2, SECTION, SECTION_BODY, SECTION_DIVIDER } from "~/shared/config/layout";
import { ICON } from "~/shared/config/icons";
import { RevealOnScroll } from "~/shared/ui/reveal-on-scroll";
import { SectionHeading } from "~/shared/ui/section-heading";
import ServiceCard from "./ServiceCard.vue";

const site = useSiteStore();

const services = computed(() => site.sortedServices);

// Диапазон цен проектных услуг (без почасовой поддержки)
const priceLadder = computed(() => {
  const prices = site.services
    .map((s) => s.price)
    .filter((p) => !p.includes("/час"));

  if (prices.length < 2) {
    return null;
  }

  const strip = (p: string) => p.replace(/^от\s+/i, "");
  return `${strip(prices[0]!)} → ${strip(prices[prices.length - 1]!)}`;
});
</script>

<template>
  <section id="services" :class="[SECTION, SECTION_DIVIDER]">
    <RevealOnScroll class="w-full">
      <SectionHeading
        :icon="ICON.section.services"
        label="Услуги"
        title="Форматы работы"
        lead="От лендинга и корпоративного сайта до SaaS, магазина и почасовой поддержки."
      >
        <p
          v-if="priceLadder"
          class="mt-2 text-sm tabular-nums text-zinc-500 sm:text-base"
        >
          Проекты: {{ priceLadder }}
        </p>
      </SectionHeading>

      <div :class="[SECTION_BODY, GRID_2]" aria-label="Список услуг">
        <ServiceCard
          v-for="(service, index) in services"
          :key="service.slug"
          :service="service"
          :wide="isWideLastGridItem(index, services.length)"
          :class="isWideLastGridItem(index, services.length) ? 'sm:col-span-2' : undefined"
        />
      </div>
    </RevealOnScroll>
  </section>
</template>
