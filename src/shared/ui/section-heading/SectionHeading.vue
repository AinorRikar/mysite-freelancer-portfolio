<script setup lang="ts">
import { Icon } from "@iconify/vue";
import {
  SECTION_LABEL,
  SECTION_LEAD,
  SECTION_TITLE
} from "~/shared/config/layout";

defineProps<{
  label: string;
  title: string;
  lead?: string;
  icon?: string;
}>();
</script>

<template>
  <header>
    <p :class="SECTION_LABEL">
      <Icon v-if="icon" :icon="icon" class="text-lg" aria-hidden="true" />
      {{ label }}
    </p>
    <h2 :class="SECTION_TITLE">{{ title }}</h2>
    <p v-if="lead" :class="SECTION_LEAD">{{ lead }}</p>
    <slot />
  </header>
</template>
