<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { BTN_PRIMARY, PAPER_LABEL } from "~/shared/config/layout";

const props = withDefaults(
  defineProps<{
    initialTopic?: string;
  }>(),
  {
    initialTopic: "Обсуждение проекта"
  }
);

const form = reactive({
  name: "",
  email: "",
  topic: props.initialTopic,
  message: ""
});

const submitted = ref(false);

const submitForm = () => {
  submitted.value = true;
};

const inputClass =
  "w-full rounded-lg border border-zinc-600 bg-white px-3 py-2.5 text-base text-paper-ink outline-none focus:border-zinc-500";
</script>

<template>
  <form class="w-full space-y-4" @submit.prevent="submitForm">
    <div class="space-y-1">
      <p :class="PAPER_LABEL">Обсудить проект</p>
      <p class="text-base text-paper-mutedInk">
        Заполните форму — свяжусь в ближайшее время.
      </p>
    </div>

    <label class="block text-base">
      <span class="mb-1 block text-paper-mutedInk">Имя</span>
      <input v-model="form.name" type="text" required :class="inputClass">
    </label>

    <label class="block text-base">
      <span class="mb-1 block text-paper-mutedInk">Email</span>
      <input v-model="form.email" type="email" required :class="inputClass">
    </label>

    <label class="block text-base">
      <span class="mb-1 block text-paper-mutedInk">Тема</span>
      <input v-model="form.topic" type="text" required :class="inputClass">
    </label>

    <label class="block text-base">
      <span class="mb-1 block text-paper-mutedInk">Сообщение</span>
      <textarea v-model="form.message" required rows="5" :class="[inputClass, 'resize-y']" />
    </label>

    <button type="submit" :class="[BTN_PRIMARY, 'w-full sm:w-auto']">
      <Icon icon="material-symbols:send-rounded" />
      Отправить
    </button>

    <p v-if="submitted" class="text-base text-accent">
      Спасибо! Форма работает реактивно, осталось подключить API Nitro.
    </p>
  </form>
</template>
