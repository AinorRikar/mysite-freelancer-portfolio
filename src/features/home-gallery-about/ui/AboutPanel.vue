<script setup lang="ts">
defineProps<{
  aboutText: string;
}>();
</script>

<template>
  <div class="w-full flex-shrink-0 p-6 text-center lg:p-8">
    <h3 class="text-4xl font-semibold text-cyan-300">Обо мне</h3>
    <p class="mt-3 text-2xl leading-relaxed text-zinc-300">{{ aboutText }}</p>
  </div>
</template>
