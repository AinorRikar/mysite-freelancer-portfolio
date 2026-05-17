<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed, ref, unref, watch } from "vue";
import type { ComputedRef, Ref } from "vue";
import { HoverLift } from "~/shared/ui/hover-lift";

type HeroStat = { label: string; value: string };

const props = withDefaults(
  defineProps<{
    isActive?: boolean;
    owner: {
      name: string;
      role: string;
      bio: string;
    };
    heroStats: HeroStat[] | Ref<HeroStat[]> | ComputedRef<HeroStat[]>;
  }>(),
  { isActive: true }
);

const normalizedHeroStats = computed(() => unref(props.heroStats));

const isEnterActive = ref(props.isActive);

const playEnterAnimation = () => {
  isEnterActive.value = false;
  if (import.meta.client) {
    requestAnimationFrame(() => {
      isEnterActive.value = true;
    });
    return;
  }
  isEnterActive.value = true;
};

watch(
  () => props.isActive,
  (active) => {
    if (active) {
      playEnterAnimation();
      return;
    }
    isEnterActive.value = false;
  },
  { immediate: true }
);

const statDelayClass = (index: number) => {
  const delays = ["delay-4", "delay-5", "delay-6"] as const;
  return delays[index] ?? "delay-6";
};
</script>

<template>
  <div
    class="w-full flex-shrink-0 space-y-8 p-6 lg:p-8"
    :class="{ 'hero-enter-active': isEnterActive }"
  >
    <div class="space-y-6">
      <p
        class="hero-enter-item delay-0 inline-flex rounded-full border border-cyan-500/40 px-4 py-1.5 text-sm text-green-300"
      >
        <Icon icon="material-symbols:verified-outline-rounded" class="mr-1 text-base" />
        Доступен для новых проектов
      </p>
      <h1 class="text-5xl font-bold tracking-tight sm:text-6xl">
        <span class="hero-enter-item delay-1 block">{{ owner.name }}</span>
        <span class="hero-enter-item delay-1b mt-1 block text-cyan-400 sm:mt-0 sm:inline">
          {{ owner.role }}
        </span>
      </h1>
      <p class="hero-enter-item delay-2 max-w-3xl text-xl text-zinc-300">
        {{ owner.bio }}
      </p>
      <div class="hero-enter-item delay-3 flex flex-wrap justify-center gap-4">
        <NuxtLink
          to="/#services"
          class="inline-flex items-center gap-2 rounded-md bg-cyan-500 px-6 py-3 text-lg font-medium text-zinc-950 hover:bg-cyan-400"
        >
          <Icon icon="material-symbols:design-services-rounded" />
          Услуги
        </NuxtLink>
        <NuxtLink
          to="/#portfolio"
          class="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-6 py-3 text-lg font-medium hover:bg-zinc-800"
        >
          <Icon icon="material-symbols:work-history-outline-rounded" />
          Портфолио
        </NuxtLink>
      </div>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      <HoverLift
        v-for="(stat, index) in normalizedHeroStats"
        :key="stat.label"
        class="hero-enter-item flex min-h-[140px] flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center"
        :class="statDelayClass(index)"
      >
        <p class="text-4xl font-semibold text-cyan-300">{{ stat.value }}</p>
        <p class="mt-1 text-base text-zinc-400">{{ stat.label }}</p>
      </HoverLift>
    </div>
  </div>
</template>

<style scoped>
.hero-enter-item {
  opacity: 0;
  transform: translateY(1.25rem);
}

.hero-enter-active .hero-enter-item {
  animation: hero-fade-up 0.7s ease-out both;
}

.hero-enter-active .delay-0 {
  animation-delay: 0ms;
}

.hero-enter-active .delay-1 {
  animation-delay: 100ms;
}

.hero-enter-active .delay-1b {
  animation-delay: 150ms;
}

.hero-enter-active .delay-2 {
  animation-delay: 200ms;
}

.hero-enter-active .delay-3 {
  animation-delay: 300ms;
}

.hero-enter-active .delay-4 {
  animation-delay: 450ms;
}

.hero-enter-active .delay-5 {
  animation-delay: 550ms;
}

.hero-enter-active .delay-6 {
  animation-delay: 650ms;
}

@keyframes hero-fade-up {
  from {
    opacity: 0;
    transform: translateY(1.25rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-enter-item {
    opacity: 1;
    transform: none;
    animation: none !important;
  }
}
</style>
