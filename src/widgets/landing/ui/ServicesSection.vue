<script setup lang="ts">
import { useSiteStore } from "~/entities/site";
import { PAPER_CARD, PAPER_LINK, SECTION } from "~/shared/config/layout";
import { RevealOnScroll } from "~/shared/ui/reveal-on-scroll";
import { TiltCard } from "~/shared/ui/tilt-card";

const site = useSiteStore();
</script>

<template>
  <section id="services" :class="[SECTION, 'border-t border-zinc-800/50']">
    <RevealOnScroll class="w-full">
      <p class="text-sm font-medium uppercase tracking-[0.16em] text-accent sm:text-base">
        Услуги
      </p>
      <h2 class="mt-2 font-serif text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
        Форматы работы
      </h2>
      <p class="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
        Сотрудничество для бизнеса, агентств и стартапов.
      </p>

      <div
        class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3"
      >
        <TiltCard
          v-for="service in site.services"
          :key="service.slug"
          tag="article"
          :class="[PAPER_CARD, 'flex h-full flex-col p-5 sm:p-6']"
        >
          <h3 class="text-xl font-semibold leading-snug text-paper-ink">
            {{ service.title }}
          </h3>
          <p class="mt-3 flex-1 text-base leading-relaxed text-paper-mutedInk">
            {{ service.description }}
          </p>
          <div class="mt-5 border-t border-paper-border pt-4">
            <p class="text-base font-semibold text-paper-ink">{{ service.price }}</p>
            <NuxtLink
              :to="`/services/${service.slug}`"
              :class="[PAPER_LINK, 'mt-2 inline-flex']"
            >
              Подробнее →
            </NuxtLink>
          </div>
        </TiltCard>
      </div>
    </RevealOnScroll>
  </section>
</template>
