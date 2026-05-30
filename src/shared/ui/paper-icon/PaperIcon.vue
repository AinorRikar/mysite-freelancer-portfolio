<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed } from "vue";
import { PAPER_ICON_BOX_MD, PAPER_ICON_BOX_SM, PAPER_INSET } from "~/shared/config/layout";

const props = withDefaults(
  defineProps<{
    icon: string;
    size?: "sm" | "md";
  }>(),
  { size: "sm" }
);

const boxClass = computed(() =>
  [props.size === "md" ? PAPER_ICON_BOX_MD : PAPER_ICON_BOX_SM, PAPER_INSET].join(" ")
);

const iconClass = computed(() => (props.size === "md" ? "text-3xl" : "text-2xl"));
</script>

<template>
  <span :class="boxClass" aria-hidden="true">
    <Icon :icon="icon" :class="iconClass" />
  </span>
</template>
