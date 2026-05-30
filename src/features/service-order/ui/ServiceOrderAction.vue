<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ContactForm } from "~/features/contact-form";
import { BTN_PRIMARY, BTN_PRIMARY_SM, PAPER_CARD, PAPER_LABEL } from "~/shared/config/layout";

withDefaults(
  defineProps<{
    serviceTitle: string;
    compact?: boolean;
    block?: boolean;
  }>(),
  {
    compact: false,
    block: false
  }
);

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
      :class="[compact ? BTN_PRIMARY_SM : BTN_PRIMARY, block && 'w-full']"
      @click="openModal"
    >
      <Icon
        icon="material-symbols:shopping-cart-checkout-rounded"
        :class="compact ? 'text-lg' : 'text-xl'"
      />
      Заказать
    </button>

    <Teleport to="body">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-[80] flex items-end justify-center bg-black/75 p-4 sm:items-center"
        @click.self="closeModal"
      >
        <div
          :class="[PAPER_CARD, 'max-h-[90dvh] w-full max-w-xl overflow-y-auto p-5 sm:p-6']"
          role="dialog"
          aria-modal="true"
        >
          <div class="mb-4 flex items-start justify-between gap-4">
            <div>
              <p :class="PAPER_LABEL">Заявка</p>
              <h3 class="mt-1 font-serif text-xl text-paper-ink sm:text-2xl">
                {{ serviceTitle }}
              </h3>
            </div>
            <button
              type="button"
              class="rounded-lg border border-paper-border p-2 text-paper-mutedInk hover:text-paper-ink"
              aria-label="Закрыть"
              @click="closeModal"
            >
              <Icon icon="material-symbols:close-rounded" class="text-2xl" />
            </button>
          </div>
          <ContactForm :initial-topic="`Заказать ${serviceTitle}`" />
        </div>
      </div>
    </Teleport>
  </div>
</template>
