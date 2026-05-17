<script setup lang="ts">
import { HomeSection, PortfolioSection, ServicesSection } from "~/widgets/landing";

useSeoMeta({ title: "Главная" });
</script>

<template>
  <div class="space-y-28">
    <HomeSection />
    <ServicesSection />
    <PortfolioSection />
  </div>
</template>
