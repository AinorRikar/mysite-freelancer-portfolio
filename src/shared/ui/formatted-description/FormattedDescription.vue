<script setup lang="ts">
import { parseDescription } from "~/shared/lib/parseDescription";

const props = defineProps<{
  text: string;
}>();

const blocks = computed(() => parseDescription(props.text));
</script>

<template>
  <div class="max-w-4xl space-y-5">
    <template v-for="(block, blockIndex) in blocks" :key="blockIndex">
      <p
        v-if="block.type === 'paragraph'"
        class="whitespace-pre-line text-xl leading-relaxed text-zinc-300"
      >
        {{ block.text }}
      </p>

      <ol
        v-else-if="block.type === 'numbered'"
        class="space-y-2"
      >
        <li
          v-for="(item, itemIndex) in block.items"
          :key="itemIndex"
          class="flex gap-3 rounded-xl border border-cyan-500/25 bg-cyan-500/5 px-4 py-3 shadow-[0_8px_20px_rgba(6,182,212,0.08)]"
        >
          <span
            class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-500/15 text-sm font-semibold text-cyan-300"
            aria-hidden="true"
          >
            {{ itemIndex + 1 }}
          </span>
          <span class="pt-0.5 text-lg leading-relaxed text-zinc-200">{{ item }}</span>
        </li>
      </ol>

      <ul
        v-else-if="block.type === 'dash'"
        class="space-y-2"
      >
        <li
          v-for="(item, itemIndex) in block.items"
          :key="itemIndex"
          class="flex gap-3 rounded-xl border border-zinc-600/35 bg-zinc-950/50 px-4 py-3 shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
        >
          <span
            class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-zinc-500/35 bg-zinc-800/80 text-sm font-medium text-zinc-400"
            aria-hidden="true"
          >
            –
          </span>
          <span class="pt-0.5 text-lg leading-relaxed text-zinc-200">{{ item }}</span>
        </li>
      </ul>
    </template>
  </div>
</template>
