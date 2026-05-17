<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { usePortfolioProject } from "~/entities/portfolio";
import { PortfolioProjectDetail } from "~/widgets/portfolio-detail";

const route = useRoute();
const projectId = computed(() => String(route.params.id));

const { data: project, error } = await usePortfolioProject(projectId);

if (error.value || !project.value) {
  throw createError({
    statusCode: error.value?.statusCode ?? 404,
    statusMessage: "Проект не найден"
  });
}

useSeoMeta({
  title: () => `${project.value?.title ?? "Проект"} — Портфолио`,
  description: () => project.value?.shortDescription ?? ""
});
</script>

<template>
  <section class="space-y-8">
    <NuxtLink
      to="/#portfolio"
      class="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-md text-zinc-300 transition hover:bg-zinc-800"
    >
      <Icon icon="material-symbols:arrow-back-rounded" />
      Назад к портфолио
    </NuxtLink>

    <PortfolioProjectDetail v-if="project" :project="project" />
  </section>
</template>
