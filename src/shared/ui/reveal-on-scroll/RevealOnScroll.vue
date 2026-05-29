<script setup lang="ts">
const root = ref<HTMLElement | null>(null);
const isVisible = ref(false);
const hasRevealed = ref(false);

onMounted(() => {
  if (!root.value) {
    return;
  }

  const reveal = () => {
    hasRevealed.value = true;
    isVisible.value = true;
  };

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        reveal();
      }
    },
    { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
  );

  observer.observe(root.value);

  // Уже в viewport при загрузке (например, после якоря #portfolio)
  const rect = root.value.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    reveal();
  }

  onBeforeUnmount(() => {
    observer.disconnect();
  });
});
</script>

<template>
  <div
    ref="root"
    class="transition-all duration-700 ease-out will-change-transform"
    :class="
      isVisible || hasRevealed
        ? 'translate-x-0 opacity-100'
        : 'translate-x-0 opacity-0 sm:-translate-x-4'
    "
  >
    <slot />
  </div>
</template>
