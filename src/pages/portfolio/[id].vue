<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { usePortfolioProject } from "~/entities/portfolio";
import { BTN_GHOST_SM, PAGE_TOP, SECTION, SECTION_BODY } from "~/shared/config/layout";
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
  title: () => project.value?.title ?? "Проект",
  description: () => project.value?.shortDescription ?? ""
});
</script>

<template>
  <section :class="[SECTION, PAGE_TOP]">
    <NuxtLink to="/#portfolio" :class="[BTN_GHOST_SM, 'w-fit']">
      <Icon icon="material-symbols:arrow-back-rounded" />
      Назад к портфолио
    </NuxtLink>

    <div v-if="project" :class="[SECTION_BODY, 'w-full']">
      <PortfolioProjectDetail :project="project" />
    </div>
  </section>
</template>
