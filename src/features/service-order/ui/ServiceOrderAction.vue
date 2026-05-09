<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ContactForm } from "~/features/contact-form";

const props = defineProps<{
  serviceTitle: string;
}>();

// Modal state lives inside the feature so pages stay declarative.
const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<template>
  <div>
    <button
      type="button"
      class="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 text-base font-semibold text-zinc-950 transition hover:bg-cyan-400"
      @click="openModal"
    >
      <Icon icon="material-symbols:shopping-cart-checkout-rounded" />
      Заказать
    </button>

    <Teleport to="body">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4"
        @click.self="closeModal"
      >
        <div class="w-full max-w-xl rounded-2xl border border-zinc-700 bg-zinc-950 p-5 shadow-2xl">
          <div class="mb-4 flex items-center justify-between">
            <h3 class="text-xl font-semibold text-cyan-500">Заявка на услугу:<br>{{ serviceTitle }}</h3>
            <button
              type="button"
              class="inline-flex items-center gap-1 rounded-md border border-zinc-700 px-3 py-1 text-sm text-zinc-300 hover:bg-zinc-800"
              @click="closeModal"
            >
              <Icon icon="material-symbols:close-rounded" />
            </button>
          </div>
          <ContactForm :initial-topic="`Заказать ${serviceTitle}`" />
        </div>
      </div>
    </Teleport>
  </div>
</template>
