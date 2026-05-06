<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useSiteStore } from "~/entities/site/model/site.store";

const site = useSiteStore();

const links = [
  { to: "/#home", label: "Главная", icon: "material-symbols:home-outline-rounded" },
  { to: "/#services", label: "Услуги", icon: "material-symbols:handyman-outline-rounded" },
  { to: "/#portfolio", label: "Портфолио", icon: "material-symbols:work-outline-rounded" },
  { to: "/#contact", label: "Контакты", icon: "material-symbols:mail-outline-rounded" }
];
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-900/70 backdrop-blur">
    <div class="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
      <NuxtLink to="/" class="flex flex-col leading-tight">
        <span class="text-lg font-semibold tracking-tight">{{ site.owner.name }}</span>
        <span class="text-xs text-zinc-400">{{ site.owner.role }}</span>
      </NuxtLink>
      <nav class="flex gap-4 text-base text-zinc-200">
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
  </header>
</template>
