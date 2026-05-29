<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref, watch } from "vue";
import { BTN_GHOST, BTN_PRIMARY } from "~/shared/config/layout";

const props = withDefaults(
  defineProps<{
    isActive?: boolean;
    owner: {
      name: string;
      role: string;
      bio: string;
    };
  }>(),
  { isActive: true }
);

const isEnterActive = ref(props.isActive);

watch(
  () => props.isActive,
  (active) => {
    isEnterActive.value = active;
  },
  { immediate: true }
);
</script>

<template>
  <div :class="{ 'hero-enter-active': isEnterActive }">
    <p
      class="hero-enter-item inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/50 px-3 py-1 text-sm font-medium text-zinc-300"
    >
      <span class="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
      Доступен для новых проектов
    </p>

    <h1
      class="hero-enter-item mt-4 font-serif text-4xl font-semibold leading-tight text-white sm:mt-5 sm:text-6xl lg:text-7xl"
    >
      {{ owner.name }}
    </h1>
    <p class="hero-enter-item mt-2 text-lg font-medium text-accent sm:text-xl">
      {{ owner.role }}
    </p>

    <p class="hero-enter-item mt-4 max-w-md text-base leading-relaxed text-zinc-400 sm:text-lg">
      {{ owner.bio }}
    </p>

    <div class="hero-enter-item mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <NuxtLink to="/#services" :class="[BTN_PRIMARY, 'w-full sm:w-auto']">
        <Icon icon="material-symbols:design-services-rounded" class="text-xl" />
        Услуги
      </NuxtLink>
      <NuxtLink to="/#portfolio" :class="[BTN_GHOST, 'w-full sm:w-auto']">
        Портфолио
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.hero-enter-item {
  opacity: 0;
  transform: translateY(0.5rem);
}

.hero-enter-active .hero-enter-item {
  animation: hero-in 0.5s ease-out forwards;
}

.hero-enter-active .hero-enter-item:nth-child(1) {
  animation-delay: 0ms;
}
.hero-enter-active .hero-enter-item:nth-child(2) {
  animation-delay: 60ms;
}
.hero-enter-active .hero-enter-item:nth-child(3) {
  animation-delay: 100ms;
}
.hero-enter-active .hero-enter-item:nth-child(4) {
  animation-delay: 140ms;
}
.hero-enter-active .hero-enter-item:nth-child(5) {
  animation-delay: 180ms;
}

@keyframes hero-in {
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
