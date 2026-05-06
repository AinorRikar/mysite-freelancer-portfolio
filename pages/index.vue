<script setup lang="ts">
import ContactSection from "~/widgets/landing/ui/ContactSection.vue";
import HomeSection from "~/widgets/landing/ui/HomeSection.vue";
import PortfolioSection from "~/widgets/landing/ui/PortfolioSection.vue";
import ServicesSection from "~/widgets/landing/ui/ServicesSection.vue";
</script>

<template>
  <div class="space-y-28">
    <HomeSection />
    <ServicesSection />
    <PortfolioSection />
    <ContactSection />
  </div>
</template>
