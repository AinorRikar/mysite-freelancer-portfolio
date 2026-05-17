<script setup lang="ts">
import { Icon } from "@iconify/vue";

export type CarouselImage = {
  id: number;
  fileUrl: string;
  fileName?: string;
};

const props = withDefaults(
  defineProps<{
    images: CarouselImage[];
    alt?: string;
    intervalMs?: number;
    imageClass?: string;
    lightbox?: boolean;
  }>(),
  {
    alt: "",
    intervalMs: 5000,
    imageClass: "h-44 w-full object-cover",
    lightbox: false
  }
);

const currentIndex = ref(0);
const progressKey = ref(0);
const isLightboxOpen = ref(false);
let timer: ReturnType<typeof setInterval> | null = null;

const imageCount = computed(() => props.images.length);
const currentImage = computed(() => props.images[currentIndex.value]);
const hasMultiple = computed(() => imageCount.value > 1);

const goTo = (index: number) => {
  if (!imageCount.value) {
    return;
  }
  currentIndex.value =
    ((index % imageCount.value) + imageCount.value) % imageCount.value;
};

const next = () => goTo(currentIndex.value + 1);
const prev = () => goTo(currentIndex.value - 1);

const restartProgress = () => {
  progressKey.value += 1;
};

const advance = () => {
  next();
  restartProgress();
};

const pauseTimer = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};

const resetTimer = () => {
  pauseTimer();
  restartProgress();
  if (!hasMultiple.value || isLightboxOpen.value) {
    return;
  }
  timer = setInterval(advance, props.intervalMs);
};

const onPrevClick = (event: MouseEvent) => {
  event.preventDefault();
  event.stopPropagation();
  prev();
  resetTimer();
};

const onNextClick = (event: MouseEvent) => {
  event.preventDefault();
  event.stopPropagation();
  next();
  resetTimer();
};

const openLightbox = (event: MouseEvent) => {
  if (!props.lightbox || !currentImage.value) {
    return;
  }
  event.preventDefault();
  event.stopPropagation();
  pauseTimer();
  isLightboxOpen.value = true;
};

const closeLightbox = () => {
  isLightboxOpen.value = false;
  resetTimer();
};

const onLightboxPrev = (event: MouseEvent) => {
  event.stopPropagation();
  prev();
};

const onLightboxNext = (event: MouseEvent) => {
  event.stopPropagation();
  next();
};

const onKeydown = (event: KeyboardEvent) => {
  if (!isLightboxOpen.value) {
    return;
  }
  if (event.key === "Escape") {
    closeLightbox();
  }
  if (event.key === "ArrowLeft" && hasMultiple.value) {
    prev();
  }
  if (event.key === "ArrowRight" && hasMultiple.value) {
    next();
  }
};

onMounted(() => {
  resetTimer();
  window.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
  pauseTimer();
  window.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
});

watch(
  () => props.images,
  () => {
    currentIndex.value = 0;
    isLightboxOpen.value = false;
    resetTimer();
  }
);

watch(isLightboxOpen, (open) => {
  document.body.style.overflow = open ? "hidden" : "";
});
</script>

<template>
  <div class="relative overflow-hidden rounded-xl border border-zinc-700 bg-zinc-950">
    <button
      v-if="currentImage && lightbox"
      type="button"
      class="block w-full cursor-zoom-in border-0 bg-transparent p-0"
      :aria-label="`Открыть изображение: ${currentImage.fileName || alt}`"
      @click="openLightbox"
    >
      <img
        :key="currentImage.id"
        :src="currentImage.fileUrl"
        :alt="currentImage.fileName || alt"
        loading="lazy"
        :class="imageClass"
      />
    </button>
    <img
      v-else-if="currentImage"
      :key="currentImage.id"
      :src="currentImage.fileUrl"
      :alt="currentImage.fileName || alt"
      loading="lazy"
      :class="imageClass"
    />

    <button
      v-if="hasMultiple"
      type="button"
      aria-label="Предыдущее изображение"
      class="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-900/50 text-white backdrop-blur-sm transition hover:bg-zinc-900/70"
      @click="onPrevClick"
    >
      <Icon icon="material-symbols:chevron-left-rounded" class="text-xl" />
    </button>

    <button
      v-if="hasMultiple"
      type="button"
      aria-label="Следующее изображение"
      class="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-900/50 text-white backdrop-blur-sm transition hover:bg-zinc-900/70"
      @click="onNextClick"
    >
      <Icon icon="material-symbols:chevron-right-rounded" class="text-xl" />
    </button>

    <div
      v-if="hasMultiple"
      class="absolute bottom-0 left-0 right-0 z-10 h-0.5 bg-zinc-950/50"
      aria-hidden="true"
    >
      <div
        :key="progressKey"
        class="carousel-progress-bar h-full w-full origin-left bg-cyan-400/90"
        :style="{ animationDuration: `${intervalMs}ms` }"
      />
    </div>
  </div>

  <Teleport to="body">
    <div
      v-if="isLightboxOpen && currentImage"
      class="fixed inset-0 z-[200] flex items-center justify-center bg-zinc-950/95 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      :aria-label="currentImage.fileName || alt"
      @click.self="closeLightbox"
    >
      <button
        type="button"
        aria-label="Закрыть"
        class="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900/80 text-white transition hover:bg-zinc-800"
        @click="closeLightbox"
      >
        <Icon icon="material-symbols:close-rounded" class="text-2xl" />
      </button>

      <button
        v-if="hasMultiple"
        type="button"
        aria-label="Предыдущее изображение"
        class="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-900/70 text-white transition hover:bg-zinc-800"
        @click="onLightboxPrev"
      >
        <Icon icon="material-symbols:chevron-left-rounded" class="text-3xl" />
      </button>

      <img
        :key="currentImage.id"
        :src="currentImage.fileUrl"
        :alt="currentImage.fileName || alt"
        class="max-h-[90vh] max-w-[min(100%,72rem)] object-contain"
        @click.stop
      />

      <button
        v-if="hasMultiple"
        type="button"
        aria-label="Следующее изображение"
        class="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-900/70 text-white transition hover:bg-zinc-800"
        @click="onLightboxNext"
      >
        <Icon icon="material-symbols:chevron-right-rounded" class="text-3xl" />
      </button>
    </div>
  </Teleport>
</template>

<style scoped>
@keyframes carousel-progress {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.carousel-progress-bar {
  animation-name: carousel-progress;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
</style>
