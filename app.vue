<script setup lang="ts">
import SiteFooter from "~/widgets/layout/ui/SiteFooter.vue";
import SiteHeader from "~/widgets/layout/ui/SiteHeader.vue";
</script>

<template>
  <div class="animated-bg min-h-screen text-zinc-100">
    <SiteHeader />
    <main class="mx-auto w-full max-w-7xl px-4 py-14 sm:px-8">
      <NuxtPage />
    </main>
    <SiteFooter />
  </div>
</template>
