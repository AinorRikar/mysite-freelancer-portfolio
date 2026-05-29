<script setup lang="ts">
import { HomeSection, PortfolioSection, ServicesSection } from "~/widgets/landing";

useSeoMeta({ title: "Главная" });
</script>

<template>
  <div class="w-full">
    <HomeSection />
    <ServicesSection />
    <PortfolioSection />
  </div>
</template>
