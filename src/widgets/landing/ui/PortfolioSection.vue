<script setup lang="ts">
import { RevealOnScroll } from "~/shared/ui/reveal-on-scroll";

type PortfolioProject = {
  name: string;
  niche: string;
  result: string;
};

const projects: PortfolioProject[] = [
  { name: "Travelio", niche: "Туризм", result: "+42% заявок за 3 месяца" },
  { name: "LawPoint", niche: "Юридические услуги", result: "Скорость загрузки 95+ Lighthouse" },
  { name: "FitFlow", niche: "Онлайн-курсы", result: "Конверсия лендинга 7.8%" }
];
</script>

<template>
  <section id="portfolio" class="scroll-mt-28 min-h-[78vh] space-y-8 py-8">
    <RevealOnScroll>
      <h2 class="text-4xl font-bold">Портфолио</h2>
      <p class="max-w-4xl text-lg text-zinc-300">
        Реальные задачи и измеримые результаты проектов.
      </p>

      <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="project in projects"
          :key="project.name"
          class="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
        >
          <p class="text-sm uppercase tracking-wide text-zinc-400">{{ project.niche }}</p>
          <h3 class="mt-2 text-xl font-semibold">{{ project.name }}</h3>
          <p class="mt-3 text-base text-cyan-300">{{ project.result }}</p>
        </article>
      </div>
    </RevealOnScroll>
  </section>
</template>
