<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed, unref } from "vue";
import type { ComputedRef, Ref } from "vue";
import { HoverLift } from "~/shared/ui/hover-lift";

type HeroStat = { label: string; value: string };

const props = defineProps<{
  owner: {
    name: string;
    role: string;
    bio: string;
  };
  heroStats: HeroStat[] | Ref<HeroStat[]> | ComputedRef<HeroStat[]>;
}>();

const normalizedHeroStats = computed(() => unref(props.heroStats));
</script>

<template>
  <div class="w-full flex-shrink-0 space-y-8 p-6 lg:p-8">
    <div class="space-y-6">
      <p class="inline-flex rounded-full border border-cyan-500/40 px-4 py-1.5 text-sm text-green-300">
        <Icon icon="material-symbols:verified-outline-rounded" class="mr-1 text-base" />
        Доступен для новых проектов
      </p>
      <h1 class="text-5xl font-bold tracking-tight sm:text-6xl">
        {{ owner.name }}
        <span class="text-cyan-400">{{ owner.role }}</span>
      </h1>
      <p class="max-w-3xl text-xl text-zinc-300">
        {{ owner.bio }}
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <NuxtLink to="/#contact" class="inline-flex items-center gap-2 rounded-md bg-cyan-500 px-6 py-3 text-lg font-medium text-zinc-950 hover:bg-cyan-400">
          <Icon icon="material-symbols:call-made-rounded" />
          Связаться
        </NuxtLink>
        <NuxtLink to="/#portfolio" class="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-6 py-3 text-lg font-medium hover:bg-zinc-800">
          <Icon icon="material-symbols:work-history-outline-rounded" />
          Портфолио
        </NuxtLink>
      </div>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      <HoverLift
        v-for="stat in normalizedHeroStats"
        :key="stat.label"
        class="flex min-h-[140px] flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center"
      >
        <p class="text-4xl font-semibold text-cyan-300">{{ stat.value }}</p>
        <p class="mt-1 text-base text-zinc-400">{{ stat.label }}</p>
      </HoverLift>
    </div>
  </div>
</template>
