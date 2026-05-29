<script setup lang="ts">
defineProps<{
  aboutText: string;
}>();
</script>

<template>
  <div>
    <h2 class="font-serif text-4xl font-semibold text-white sm:text-5xl">
      Обо мне
    </h2>
    <p class="mt-4 max-w-md text-base leading-relaxed text-zinc-400 sm:text-lg">
      {{ aboutText }}
    </p>
  </div>
</template>
