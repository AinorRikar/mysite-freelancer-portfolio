<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ServiceOrderAction } from "~/features/service-order";
import { useSiteStore } from "~/entities/site";
import {
  BTN_GHOST_SM,
  PAGE_TOP,
  PAPER_CARD,
  PAPER_LABEL,
  SECTION
} from "~/shared/config/layout";

const route = useRoute();
const site = useSiteStore();

const service = computed(() => site.getServiceBySlug(String(route.params.slug)));

if (!service.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Услуга не найдена"
  });
}

useSeoMeta({
  title: () => service.value?.title ?? "Услуга"
});
</script>

<template>
  <section :class="[SECTION, PAGE_TOP]">
    <NuxtLink to="/#services" :class="[BTN_GHOST_SM, 'w-fit']">
      <Icon icon="material-symbols:arrow-back-rounded" />
      Назад к услугам
    </NuxtLink>

    <article v-if="service" :class="[PAPER_CARD, 'mt-8 w-full p-5 sm:p-7 lg:p-8']">
      <p :class="PAPER_LABEL">Услуга</p>
      <h1 class="mt-2 font-serif text-4xl font-semibold text-paper-ink sm:text-5xl">
        {{ service.title }}
      </h1>
      <p class="mt-2 text-xl font-medium text-paper-ink">{{ service.price }}</p>

      <p class="mt-6 text-lg leading-relaxed text-paper-mutedInk sm:text-xl">
        {{ service.details }}
      </p>

      <div class="mt-8 border-t border-paper-border pt-6">
        <h2 class="text-xl font-semibold text-accent">Стек технологий</h2>
        <div class="mt-4 flex flex-wrap gap-2">
          <span
            v-for="tech in service.techStack"
            :key="tech"
            class="inline-flex rounded-md border border-paper-border bg-paper-muted px-2.5 py-1 text-sm text-paper-ink"
          >
            {{ tech }}
          </span>
        </div>
      </div>

      <div class="mt-8">
        <ServiceOrderAction :service-title="service.title" />
      </div>
    </article>
  </section>
</template>
