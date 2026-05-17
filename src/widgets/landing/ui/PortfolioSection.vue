<script setup lang="ts">
import { formatPortfolioMeta, usePortfolio } from "~/entities/portfolio";
import { HoverLift } from "~/shared/ui/hover-lift";
import { ImageCarousel } from "~/shared/ui/image-carousel";
import { RevealOnScroll } from "~/shared/ui/reveal-on-scroll";

const { data: projects, pending, error } = await usePortfolio();


</script>

<template>
  <section id="portfolio" class="scroll-mt-28 min-h-[78vh] space-y-8 py-8">
    <RevealOnScroll>
      <h2 class="text-4xl font-bold">Портфолио</h2>
      <p class="mt-4 max-w-4xl text-lg text-zinc-300">
        Реальные задачи и измеримые результаты проектов.
      </p>

      <p v-if="error" class="mt-6 text-lg text-zinc-400">
        Портфолио временно недоступно. Попробуйте обновить страницу позже.
      </p>

      <div
        v-else-if="pending"
        class="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="index in 3"
          :key="index"
          class="h-72 animate-pulse rounded-2xl border border-zinc-800 bg-zinc-900/60"
        />
      </div>

      <p
        v-else-if="!projects?.length"
        class="mt-6 text-lg text-zinc-400"
      >
        Пока нет проектов в портфолио.
      </p>

      <div
        v-else
        class="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <NuxtLink
          v-for="project in projects"
          :key="project.id"
          :to="`/portfolio/${project.id}`"
          class="group block h-full no-underline"
        >
          <HoverLift
            class="flex h-full cursor-pointer flex-col rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8"
          >
          <div class="rounded-xl border border-cyan-400/25 bg-zinc-950/80 p-5 shadow-[0_10px_24px_rgba(6,182,212,0.16)]">
            <h3 class="text-2xl font-semibold">{{ project.title }}</h3>
            <p class="mt-1 text-sm text-zinc-400">
              {{ formatPortfolioMeta(project) }}
            </p>
          </div>

          <ImageCarousel
            v-if="project.images.length"
            class="mt-5"
            :images="project.images"
            :alt="project.title"
          />

          <p class="mt-5 flex-1 text-lg leading-relaxed text-zinc-300">
            {{ project.shortDescription }}
          </p>

          <div class="mt-5 pt-2">
            <span
              class="inline-flex w-full items-center justify-center rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-4 py-3 text-sm font-medium text-cyan-300 transition group-hover:bg-cyan-500/20"
            >
              Подробнее
            </span>
          </div>
          </HoverLift>
        </NuxtLink>
      </div>
    </RevealOnScroll>
  </section>
</template>
