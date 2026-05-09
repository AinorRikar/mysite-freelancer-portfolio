<script setup lang="ts">
/**
 * Обёртка для карточек: лёгкий подъём и усиление тени при hover (pointer).
 * Без эффекта на touch — только там, где есть fine pointer.
 */
withDefaults(
  defineProps<{
    tag?: string;
  }>(),
  {
    tag: "div"
  }
);
</script>

<template>
  <component
    :is="tag"
    class="transition duration-300 ease-out will-change-transform
    motion-reduce:transition-none motion-reduce:hover:translate-y-0
    hover:-translate-y-2 hover:shadow-[0_14px_36px_rgba(6,182,212,0.14)]"
  >
    <slot />
  </component>
</template>
