<script setup lang="ts">
import { useSiteStore } from "~/entities/site";
import { RevealOnScroll } from "~/shared/ui/reveal-on-scroll";

const site = useSiteStore();
</script>

<template>
  <section id="services" class="scroll-mt-28 min-h-[78vh] space-y-8 py-8">
    <RevealOnScroll>
      <h2 class="text-4xl font-bold">Услуги</h2>
      <p class="max-w-4xl text-lg text-zinc-300">
        Форматы сотрудничества для бизнеса, агентств и стартапов.
      </p>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="service in site.services"
          :key="service.title"
          class="flex h-full flex-col rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8"
        >
          <div class="space-y-3">
            <div class="rounded-xl border border-cyan-400/25 bg-zinc-950/80 p-5 shadow-[0_10px_24px_rgba(6,182,212,0.16)]">
              <h3 class="text-2xl font-semibold">{{ service.title }}</h3>
            </div>
          </div>
          <p class="mt-5 text-lg leading-relaxed text-zinc-300">{{ service.description }}</p>
          <div class="mt-auto space-y-3 pt-5">
            <div class="rounded-xl border border-cyan-400/30 bg-zinc-950/90 p-4 shadow-[0_10px_24px_rgba(6,182,212,0.2)]">
              <p class="text-right text-xl font-semibold text-cyan-300">{{ service.price }}</p>
            </div>
            <NuxtLink
              :to="`/services/${service.slug}`"
              class="inline-flex w-full items-center justify-center rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-4 py-3 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20"
            >
              Подробнее об услуге
            </NuxtLink>
          </div>
        </article>
      </div>
    </RevealOnScroll>
  </section>
</template>
