<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { onBeforeUnmount, onMounted, ref } from "vue";

const isVisible = ref(false);

const updateVisibility = () => {
  isVisible.value = window.scrollY > 180;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  updateVisibility();
  window.addEventListener("scroll", updateVisibility, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", updateVisibility);
});
</script>

<template>
  <button
    type="button"
    aria-label="Наверх"
    class="fixed bottom-4 right-4 z-[100] inline-flex h-10 w-10 items-center justify-center border border-zinc-700 bg-graphite-deep/95 font-mono text-accent transition-all duration-300 hover:border-zinc-600 sm:bottom-6 sm:right-6 sm:h-11 sm:w-11"
    :class="isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'"
    @click="scrollToTop"
  >
    <Icon icon="material-symbols:keyboard-arrow-up-rounded" class="text-2xl" />
  </button>
</template>
