<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed, ref } from "vue";
import { useSiteStore } from "~/entities/site";
import { LAYOUT_X } from "~/shared/config/layout";

const site = useSiteStore();
const route = useRoute();
const isMobileMenuOpen = ref(false);

const isHome = computed(() => route.path === "/");

const links = [
  { to: "/#home", label: "Главная" },
  { to: "/#services", label: "Услуги" },
  { to: "/#portfolio", label: "Портфолио" }
];

const headerClass = computed(() =>
  [
    "fixed top-0 z-50 w-full border-b transition-colors duration-200",
    isHome.value
      ? "border-zinc-800/30 bg-graphite-deep/50 backdrop-blur-md"
      : "border-zinc-800/80 bg-graphite-deep/90 backdrop-blur-md"
  ].join(" ")
);

const navLinkClass =
  "text-base font-medium text-zinc-400 transition hover:text-white";
</script>

<template>
  <header :class="headerClass">
    <div :class="[LAYOUT_X, 'flex w-full items-center justify-between gap-4 py-3.5 sm:py-4']">
      <NuxtLink to="/" class="min-w-0 flex-shrink leading-tight">
        <span class="block truncate font-serif text-lg font-semibold text-zinc-50 sm:text-xl">
          {{ site.owner.name }}
        </span>
        <span class="block truncate text-sm text-zinc-500">{{ site.owner.role }}</span>
      </NuxtLink>

      <button
        type="button"
        class="inline-flex flex-shrink-0 items-center justify-center rounded-lg border border-zinc-700 p-2 text-zinc-300 transition hover:border-zinc-600 hover:text-zinc-100 lg:hidden"
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

      <nav class="hidden items-center gap-6 lg:flex" aria-label="Основная навигация">
        <NuxtLink
          v-for="item in links"
          :key="item.to"
          :to="item.to"
          :class="navLinkClass"
          active-class="!text-accent"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
    </div>

    <nav
      v-if="isMobileMenuOpen"
      class="border-t border-zinc-800/80 lg:hidden"
      aria-label="Мобильная навигация"
    >
      <div :class="[LAYOUT_X, 'flex flex-col gap-3 py-4']">
        <NuxtLink
          v-for="item in links"
          :key="`mobile-${item.to}`"
          :to="item.to"
          :class="navLinkClass"
          active-class="!text-accent"
          @click="isMobileMenuOpen = false"
        >
          {{ item.label }}
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>
