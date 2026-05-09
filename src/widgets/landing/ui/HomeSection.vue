<script setup lang="ts">
import { computed, ref } from "vue";
import { useSiteStore } from "~/entities/site";
import { HomeGalleryAboutPanel } from "~/features/home-gallery-about";
import { HomeGalleryMainPanel } from "~/features/home-gallery-main";
import { RevealOnScroll } from "~/shared/ui/reveal-on-scroll";

const site = useSiteStore();

const tabs = [
  { id: "main", label: "Основной" },
  { id: "about", label: "Обо мне" }
] as const;

const activeSlide = ref(0);
const sliderRoot = ref<HTMLElement | null>(null);
const isDragging = ref(false);
const startX = ref(0);
const dragOffset = ref(0);

const activateSlide = (index: number) => {
  activeSlide.value = index;
  dragOffset.value = 0;
};

const handlePointerDown = (event: PointerEvent) => {
  if (!sliderRoot.value) {
    return;
  }
  isDragging.value = true;
  startX.value = event.clientX;
  dragOffset.value = 0;
  sliderRoot.value.setPointerCapture(event.pointerId);
};

const handlePointerMove = (event: PointerEvent) => {
  if (!isDragging.value) {
    return;
  }
  dragOffset.value = event.clientX - startX.value;
};

const finishDrag = () => {
  if (!isDragging.value || !sliderRoot.value) {
    return;
  }

  const threshold = Math.max(60, sliderRoot.value.clientWidth * 0.15);
  if (dragOffset.value <= -threshold && activeSlide.value < tabs.length - 1) {
    activeSlide.value += 1;
  } else if (dragOffset.value >= threshold && activeSlide.value > 0) {
    activeSlide.value -= 1;
  }

  isDragging.value = false;
  dragOffset.value = 0;
};

const trackStyle = computed(() => {
  const baseOffset = -activeSlide.value * 100;
  return {
    transform: `translateX(calc(${baseOffset}% + ${dragOffset.value}px))`,
    transition: isDragging.value ? "none" : "transform 320ms ease"
  };
});
</script>

<template>
  <section id="home" class="scroll-mt-28 min-h-[78vh] py-8">
    <RevealOnScroll>
      <div
        class="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60"
      >
        <div class="flex justify-center border-b border-zinc-800/90 px-4 py-4">
          <div class="inline-flex items-center gap-3 rounded-lg bg-zinc-900/35 px-4 py-2">
            <template v-for="(tab, index) in tabs" :key="tab.id">
              <button
                type="button"
                class="rounded-md px-1 py-0.5 text-lg font-medium transition sm:text-xl"
                :class="
                  activeSlide === index
                    ? 'text-cyan-300'
                    : 'text-zinc-400 hover:text-zinc-300'
                "
                @click="activateSlide(index)"
              >
                {{ tab.label }}
              </button>
              <span v-if="index < tabs.length - 1" class="select-none text-zinc-600">|</span>
            </template>
          </div>
        </div>

        <div
          ref="sliderRoot"
          class="touch-pan-y select-none"
          @pointerdown="handlePointerDown"
          @pointermove="handlePointerMove"
          @pointerup="finishDrag"
          @pointercancel="finishDrag"
          @pointerleave="finishDrag"
        >
          <div class="flex" :style="trackStyle">
            <HomeGalleryMainPanel :owner="site.owner" :hero-stats="site.heroStats" />
            <HomeGalleryAboutPanel :about-text="site.aboutText" />
          </div>
        </div>
      </div>
    </RevealOnScroll>
  </section>
</template>
