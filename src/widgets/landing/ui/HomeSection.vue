<script setup lang="ts">
import { ref } from "vue";
import { useSiteStore } from "~/entities/site";
import { HomeGalleryAboutPanel } from "~/features/home-gallery-about";
import { HomeGalleryMainPanel } from "~/features/home-gallery-main";
import { HeroPaperBento } from "~/features/home-hero-bento";
import { LAYOUT_X } from "~/shared/config/layout";

const site = useSiteStore();

const tabs = [
  { id: "main", label: "Основной" },
  { id: "about", label: "Обо мне" }
] as const;

const activeTab = ref<(typeof tabs)[number]["id"]>("main");

const tabClass = (isActive: boolean) =>
  [
    "rounded-md px-2 py-1 text-base font-medium transition",
    isActive ? "text-accent" : "text-zinc-500 hover:text-zinc-300"
  ].join(" ");
</script>

<template>
  <section id="home" class="relative w-full scroll-mt-24 overflow-hidden">
    <div
      class="absolute inset-0 bg-[#121216] bg-hero-cinematic"
      aria-hidden="true"
    />

    <div
      :class="[
        LAYOUT_X,
        'relative z-10 w-full pt-[4.5rem] pb-7 sm:pb-8 lg:pt-20 lg:pb-9'
      ]"
    >
      <div
        class="grid w-full grid-cols-1 items-start gap-10 lg:grid-cols-hero lg:gap-10 xl:gap-14"
      >
        <div class="min-w-0">
          <div
            class="mb-5 flex gap-1 sm:mb-6"
            role="tablist"
            aria-label="Разделы главной"
          >
            <button
              v-for="tab in tabs"
              :key="tab.id"
              type="button"
              role="tab"
              :aria-selected="activeTab === tab.id"
              :class="tabClass(activeTab === tab.id)"
              @click="activeTab = tab.id"
            >
              {{ tab.label }}
            </button>
          </div>

          <HomeGalleryMainPanel
            v-show="activeTab === 'main'"
            :is-active="activeTab === 'main'"
            :owner="site.owner"
          />
          <HomeGalleryAboutPanel
            v-show="activeTab === 'about'"
            :about-text="site.aboutText"
          />
        </div>

        <div class="min-w-0 lg:border-l lg:border-zinc-800 lg:pl-8 xl:pl-10">
          <HeroPaperBento :hero-stats="site.heroStats" />
        </div>
      </div>
    </div>
  </section>
</template>
