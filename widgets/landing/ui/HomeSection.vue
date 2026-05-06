<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useSiteStore } from "~/entities/site/model/site.store";
import RevealOnScroll from "~/shared-ui/reveal-on-scroll/RevealOnScroll.vue";

const site = useSiteStore();
</script>

<template>
  <section id="home" class="scroll-mt-28 min-h-[78vh] py-8">
    <RevealOnScroll>
      <div class="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div class="space-y-6">
          <p class="inline-flex rounded-full border border-cyan-500/40 px-4 py-1.5 text-sm text-green-300">
            <Icon icon="material-symbols:verified-outline-rounded" class="mr-1 text-base" />
            Доступен для новых проектов
          </p>
          <h1 class="text-5xl font-bold tracking-tight sm:text-6xl">
            {{ site.owner.name }}
            <span class="text-cyan-400">{{ site.owner.role }}</span>
          </h1>
          <p class="max-w-3xl text-lg text-zinc-300">
            {{ site.owner.bio }}
          </p>
          <div class="flex gap-4">
            <NuxtLink to="/#contact" class="inline-flex items-center gap-2 rounded-md bg-cyan-500 px-6 py-3 text-lg font-medium text-zinc-950 hover:bg-cyan-400">
              <Icon icon="material-symbols:call-made-rounded" />
              Связаться
            </NuxtLink>
            <NuxtLink to="/#portfolio" class="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-6 py-3 text-lg font-medium hover:bg-zinc-800">
              <Icon icon="material-symbols:work-history-outline-rounded" />
              Портфолио
            </NuxtLink>
          </div>
          <div class="rounded-xl border border-zinc-800 bg-zinc-900/80 p-5">
            <h3 class="text-xl font-semibold text-cyan-300">Обо мне</h3>
            <p class="mt-2 text-lg text-zinc-300">{{ site.aboutText }}</p>
          </div>
        </div>

        <div class="grid gap-4">
          <article
            v-for="stat in site.heroStats"
            :key="stat.label"
            class="flex min-h-[140px] flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center"
          >
            <p class="text-4xl font-semibold text-cyan-300">{{ stat.value }}</p>
            <p class="mt-1 text-base text-zinc-400">{{ stat.label }}</p>
          </article>
        </div>
      </div>
    </RevealOnScroll>
  </section>
</template>
