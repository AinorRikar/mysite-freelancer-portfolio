<script setup lang="ts">
import { parseDescription } from "~/shared/lib/parseDescription";
import { BODY_LG, PAPER_INSET } from "~/shared/config/layout";

const props = defineProps<{
  text: string;
}>();

const blocks = computed(() => parseDescription(props.text));
</script>

<template>
  <div class="w-full space-y-4">
    <template v-for="(block, blockIndex) in blocks" :key="blockIndex">
      <p
        v-if="block.type === 'paragraph'"
        class="whitespace-pre-line"
        :class="BODY_LG"
      >
        {{ block.text }}
      </p>

      <ol v-else-if="block.type === 'numbered'" class="space-y-2">
        <li
          v-for="(item, itemIndex) in block.items"
          :key="itemIndex"
          :class="['flex gap-3 rounded-lg border border-paper-border px-4 py-3', PAPER_INSET]"
        >
          <span class="font-medium text-product" aria-hidden="true">
            {{ itemIndex + 1 }}.
          </span>
          <span class="text-lg leading-relaxed text-paper-ink">{{ item }}</span>
        </li>
      </ol>

      <ul v-else-if="block.type === 'dash'" class="space-y-2">
        <li
          v-for="(item, itemIndex) in block.items"
          :key="itemIndex"
          :class="['flex gap-3 rounded-lg border border-paper-border px-4 py-3', PAPER_INSET]"
        >
          <span class="text-paper-mutedInk" aria-hidden="true">—</span>
          <span class="text-lg leading-relaxed text-paper-ink">{{ item }}</span>
        </li>
      </ul>
    </template>
  </div>
</template>
