<script setup lang="ts">
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
    class="transition duration-200 ease-out [@media(hover:hover)]:hover:border-zinc-600"
  >
    <slot />
  </component>
</template>
