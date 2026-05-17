<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ServiceOrderAction } from "~/features/service-order";
import { useSiteStore } from "~/entities/site";

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
  <section class="space-y-8">
    <NuxtLink to="/#services" class="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-md text-zinc-300 transition hover:bg-zinc-800">
      <Icon icon="material-symbols:arrow-back-rounded" />
      Назад к услугам
    </NuxtLink>

    <article class="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8">
      <div class="space-y-3">
        <h1 class="text-4xl font-bold">{{ service?.title }}</h1>
        <p class="text-xl text-cyan-300">{{ service?.price }}</p>
      </div>

      <p class="max-w-4xl text-lg leading-relaxed text-zinc-300">
        {{ service?.details }}
      </p>

      <div class="rounded-2xl border border-cyan-500/30 bg-zinc-950/70 p-6 shadow-[0_16px_40px_rgba(6,182,212,0.18)]">
        <h2 class="inline-flex items-center gap-2 text-2xl font-semibold text-cyan-300">
          <Icon icon="material-symbols:deployed-code-outline" />
          Примерный стек технологий
        </h2>
        <div class="mt-4 flex flex-wrap gap-3">
          <div
            v-for="tech in service?.techStack"
            :key="tech"
            class="inline-flex w-auto items-center rounded-xl border border-lime-300/50 bg-lime-300/20 px-4 py-2 text-sm font-medium text-lime-100 shadow-[0_8px_22px_rgba(132,204,22,0.22)]"
          >
            {{ tech }}
          </div>
        </div>
      </div>

      <ServiceOrderAction :service-title="service?.title || 'Услуга'" />
    </article>
  </section>
</template>
