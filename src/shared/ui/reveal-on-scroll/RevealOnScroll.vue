<script setup lang="ts">
const root = ref<HTMLElement | null>(null);
const isVisible = ref(false);

onMounted(() => {
  if (!root.value) {
    return;
  }

  // Keep animation reversible: element appears on enter and hides on leave.
  const observer = new IntersectionObserver(
    (entries) => {
      isVisible.value = Boolean(entries[0]?.isIntersecting);
    },
    { threshold: 0.2 }
  );

  observer.observe(root.value);

  onBeforeUnmount(() => {
    observer.disconnect();
  });
});
</script>

<template>
  <div
    ref="root"
    class="transition-all duration-700 ease-out will-change-transform"
    :class="isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'"
  >
    <slot />
  </div>
</template>
