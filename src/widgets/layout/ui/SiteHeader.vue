<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { useSiteStore } from "~/entities/site";

const site = useSiteStore();
const isMobileMenuOpen = ref(false);

const links = [
  { to: "/#home", label: "Главная", icon: "material-symbols:home-outline-rounded" },
  { to: "/#services", label: "Услуги", icon: "material-symbols:design-services-rounded" },
  { to: "/#portfolio", label: "Портфолио", icon: "material-symbols:cases-rounded" }
];
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-900/70 backdrop-blur">
    <div class="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
      <NuxtLink to="/" class="flex flex-col leading-tight">
        <span class="text-lg font-semibold tracking-tight">{{ site.owner.name }}</span>
        <span class="text-xs text-zinc-400">{{ site.owner.role }}</span>
      </NuxtLink>
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-md border border-zinc-700 bg-zinc-900/45 p-2 text-zinc-200 transition hover:bg-zinc-700/45 hover:text-white sm:hidden"
        :aria-expanded="isMobileMenuOpen"
        aria-label="Открыть меню"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <Icon
          :icon="
            isMobileMenuOpen
              ? 'material-symbols:close-rounded'
              : 'material-symbols:menu-rounded'
          "
          class="text-2xl"
        />
      </button>
      <nav class="hidden gap-4 text-base text-zinc-200 sm:flex">
        <NuxtLink
          v-for="item in links"
          :key="item.to"
          :to="item.to"
          class="inline-flex items-center gap-2 rounded-md bg-zinc-900/35 px-4 py-2 font-medium transition hover:bg-zinc-700/45 hover:text-white"
          active-class="bg-zinc-700/55 text-white"
        >
          <Icon :icon="item.icon" class="text-lg" />
          {{ item.label }}
        </NuxtLink>
      </nav>
    </div>
    <nav
      v-if="isMobileMenuOpen"
      class="border-t border-zinc-800 bg-zinc-900/95 px-4 py-3 text-zinc-200 sm:hidden"
    >
      <div class="mx-auto flex w-full max-w-6xl flex-col gap-2">
        <NuxtLink
          v-for="item in links"
          :key="`mobile-${item.to}`"
          :to="item.to"
          class="inline-flex items-center gap-2 rounded-md bg-zinc-900/35 px-4 py-2 font-medium transition hover:bg-zinc-700/45 hover:text-white"
          active-class="bg-zinc-700/55 text-white"
          @click="isMobileMenuOpen = false"
        >
          <Icon :icon="item.icon" class="text-lg" />
          {{ item.label }}
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>
