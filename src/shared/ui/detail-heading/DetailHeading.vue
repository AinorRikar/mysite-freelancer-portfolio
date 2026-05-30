<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { DETAIL_H2, DETAIL_H2_ACCENT, DETAIL_H2_INK } from "~/shared/config/layout";

withDefaults(
  defineProps<{
    title: string;
    icon: string;
    variant?: "accent" | "ink";
  }>(),
  { variant: "accent" }
);
</script>

<template>
  <h2 :class="variant === 'ink' ? DETAIL_H2_INK : DETAIL_H2_ACCENT">
    <Icon :icon="icon" class="text-2xl" aria-hidden="true" />
    {{ title }}
  </h2>
</template>
