<script setup lang="ts">
import { ServiceOrderAction } from "~/features/service-order";
import { useSiteStore } from "~/entities/site";
import { servicePriceLabel } from "~/shared/lib/servicePrice";
import {
  BODY_LG,
  BTN_GHOST_SM,
  CARD_PAD_LG,
  DETAIL_BLOCK,
  PAGE_TOP,
  PAPER_CARD,
  PAPER_INSET,
  PAPER_LABEL,
  PAPER_LINK,
  PAPER_TAG,
  SECTION
} from "~/shared/config/layout";
import { ICON } from "~/shared/config/icons";
import { CheckList } from "~/shared/ui/check-list";
import { DetailHeading } from "~/shared/ui/detail-heading";
import { PaperIcon } from "~/shared/ui/paper-icon";

const route = useRoute();
const site = useSiteStore();

const service = computed(() => site.getServiceBySlug(String(route.params.slug)));

if (!service.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Услуга не найдена"
  });
}

const priceLabel = computed(() =>
  service.value ? servicePriceLabel(service.value.price) : ""
);

useSeoMeta({
  title: () => service.value?.title ?? "Услуга",
  description: () => service.value?.description ?? ""
});
</script>

<template>
  <section :class="[SECTION, PAGE_TOP]">
    <nav
      class="flex flex-wrap items-center gap-2 text-sm text-zinc-500"
      aria-label="Хлебные крошки"
    >
      <NuxtLink to="/" :class="[PAPER_LINK, '!text-zinc-400 hover:!text-zinc-200']">
        Главная
      </NuxtLink>
      <span aria-hidden="true">/</span>
      <NuxtLink to="/#services" :class="[PAPER_LINK, '!text-zinc-400 hover:!text-zinc-200']">
        Услуги
      </NuxtLink>
      <span aria-hidden="true">/</span>
      <span class="text-zinc-300">{{ service?.title }}</span>
    </nav>

    <article v-if="service" :class="[PAPER_CARD, CARD_PAD_LG, 'mt-6 w-full sm:mt-8']">
      <div class="flex items-start gap-4">
        <PaperIcon :icon="service.icon" size="md" />
        <div class="min-w-0">
          <p :class="PAPER_LABEL">Услуга</p>
          <h1 class="mt-1 font-serif text-4xl font-semibold text-paper-ink sm:text-5xl">
            {{ service.title }}
          </h1>
          <p v-if="service.duration" class="mt-2 text-base text-paper-mutedInk sm:text-lg">
            Срок: {{ service.duration }}
          </p>
        </div>
      </div>

      <p :class="['mt-6', BODY_LG]">{{ service.description }}</p>

      <section :class="DETAIL_BLOCK">
        <DetailHeading title="Что входит" :icon="ICON.ui.check" variant="ink" />
        <CheckList :items="service.features" class="mt-4" />
      </section>

      <section :class="DETAIL_BLOCK">
        <DetailHeading title="Подробнее" :icon="ICON.project.about" variant="ink" />
        <p :class="['mt-4', BODY_LG]">{{ service.details }}</p>
      </section>

      <div :class="['mt-8 rounded-lg border border-paper-border p-4 sm:p-5', PAPER_INSET]">
        <p :class="PAPER_LABEL">{{ priceLabel }}</p>
        <p class="mt-1 text-2xl font-semibold text-paper-ink sm:text-3xl">
          {{ service.price }}
        </p>
      </div>

      <section :class="DETAIL_BLOCK">
        <DetailHeading title="Стек технологий" :icon="ICON.project.stack" />
        <div class="mt-4 flex flex-wrap gap-2">
          <span v-for="tech in service.techStack" :key="tech" :class="PAPER_TAG">
            {{ tech }}
          </span>
        </div>
      </section>

      <div class="mt-8 hidden sm:block">
        <ServiceOrderAction :service-title="service.title" />
      </div>
    </article>

    <!-- Заказ с телефона — липкая панель внизу -->
    <div
      v-if="service"
      class="fixed inset-x-0 bottom-0 z-50 border-t border-paper-border bg-paper-card/95 p-4 backdrop-blur-sm sm:hidden"
    >
      <ServiceOrderAction :service-title="service.title" block />
    </div>

    <div class="h-20 sm:hidden" aria-hidden="true" />
  </section>
</template>
