<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    tag?: string;
    maxTilt?: number;
    perspective?: number;
    floatShift?: number;
  }>(),
  {
    tag: "div",
    maxTilt: 6,
    perspective: 900,
    floatShift: 4
  }
);

const root = ref<HTMLElement | null>(null);
const rotateX = ref(0);
const rotateY = ref(0);
const floatX = ref(0);
const floatY = ref(0);
const isHovering = ref(false);
const canTilt = ref(false);

let rafId: number | null = null;

onMounted(() => {
  canTilt.value =
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
});

const transformStyle = computed(() => {
  if (!canTilt.value || !isHovering.value) {
    return { transform: "rotateX(0deg) rotateY(0deg)" };
  }

  return {
    transform: `rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg)`
  };
});

const updateTilt = (clientX: number, clientY: number) => {
  const el = root.value;
  if (!el) {
    return;
  }

  const rect = el.getBoundingClientRect();
  const px = ((clientX - rect.left) / rect.width) * 2 - 1;
  const py = ((clientY - rect.top) / rect.height) * 2 - 1;

  rotateY.value = px * props.maxTilt;
  rotateX.value = -py * props.maxTilt;
  floatX.value = px * props.floatShift;
  floatY.value = py * props.floatShift;
};

const onMouseEnter = () => {
  isHovering.value = true;
};

const onMouseMove = (event: MouseEvent) => {
  if (!canTilt.value) {
    return;
  }

  if (rafId !== null) {
    cancelAnimationFrame(rafId);
  }

  rafId = requestAnimationFrame(() => {
    updateTilt(event.clientX, event.clientY);
    rafId = null;
  });
};

const onMouseLeave = () => {
  isHovering.value = false;
  rotateX.value = 0;
  rotateY.value = 0;
  floatX.value = 0;
  floatY.value = 0;

  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
};
</script>

<template>
  <div
    ref="root"
    class="h-full w-full"
    :style="{ perspective: `${perspective}px` }"
    @mouseenter="onMouseEnter"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <component
      :is="tag"
      v-bind="$attrs"
      class="h-full transition-transform duration-200 ease-out will-change-transform"
      :style="transformStyle"
    >
      <slot
        :can-tilt="canTilt"
        :is-hovering="isHovering"
        :float-x="floatX"
        :float-y="floatY"
      />
    </component>
  </div>
</template>
