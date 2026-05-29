<script setup lang="ts">
import { LAYOUT_X } from "~/shared/config/layout";
</script>

<template>
  <footer class="mt-auto w-full border-t border-zinc-800/60">
    <div
      :class="[
        LAYOUT_X,
        'flex w-full flex-col gap-2 py-5 text-base text-zinc-500 sm:flex-row sm:items-center sm:justify-between'
      ]"
    >
      <p>© {{ new Date().getFullYear() }} Максим Гоголь</p>
      <p class="text-zinc-600">Nuxt · Nitro · TypeScript</p>
    </div>
  </footer>
</template>
