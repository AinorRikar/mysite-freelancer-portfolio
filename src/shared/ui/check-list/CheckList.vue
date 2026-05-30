<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ICON } from "~/shared/config/icons";

withDefaults(
  defineProps<{
    items: string[];
    /** Компактный вид в карточке услуги */
    compact?: boolean;
  }>(),
  { compact: false }
);
</script>

<template>
  <ul :class="compact ? 'space-y-2' : 'space-y-3'">
    <li
      v-for="item in items"
      :key="item"
      :class="[
        'flex gap-2 text-paper-mutedInk',
        compact ? 'text-sm leading-snug sm:text-base' : 'text-base leading-relaxed sm:text-lg'
      ]"
    >
      <Icon
        :icon="ICON.ui.check"
        class="mt-0.5 shrink-0 text-accent"
        aria-hidden="true"
      />
      <span>{{ item }}</span>
    </li>
  </ul>
</template>
