<script setup lang="ts">
import { Icon } from "@iconify/vue";

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
</script>

<template>
  <form
    class="space-y-5 rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-zinc-900 to-zinc-950 p-6 text-zinc-100 shadow-[0_14px_40px_rgba(6,182,212,0.14)]"
    @submit.prevent="submitForm"
  >
    <div class="space-y-1">
      <h3 class="inline-flex items-center gap-2 text-xl font-semibold text-zinc-100">
        <Icon icon="material-symbols:forum-rounded" class="text-cyan-300" />
        Обсудить проект
      </h3>
      <p class="text-sm text-zinc-400">
        Заполните форму, и я свяжусь с вами в ближайшее время.
      </p>
    </div>

    <label class="block text-sm">
      <span class="mb-1 inline-flex items-center gap-1 text-zinc-300">
        <Icon icon="material-symbols:person-outline-rounded" />
        Имя
      </span>
      <input
        v-model="form.name"
        type="text"
        required
        class="w-full rounded-lg border border-zinc-700 bg-zinc-950/90 px-3 py-2.5 text-zinc-100 outline-none ring-cyan-400 transition focus:border-cyan-400/50 focus:ring-2"
      >
    </label>

    <label class="block text-sm">
      <span class="mb-1 inline-flex items-center gap-1 text-zinc-300">
        <Icon icon="material-symbols:mail-outline-rounded" />
        Email
      </span>
      <input
        v-model="form.email"
        type="email"
        required
        class="w-full rounded-lg border border-zinc-700 bg-zinc-950/90 px-3 py-2.5 text-zinc-100 outline-none ring-cyan-400 transition focus:border-cyan-400/50 focus:ring-2"
      >
    </label>

    <label class="block text-sm">
      <span class="mb-1 inline-flex items-center gap-1 text-zinc-300">
        <Icon icon="material-symbols:topic-outline-rounded" />
        Тема
      </span>
      <input
        v-model="form.topic"
        type="text"
        required
        class="w-full rounded-lg border border-zinc-700 bg-zinc-950/90 px-3 py-2.5 text-zinc-100 outline-none ring-cyan-400 transition focus:border-cyan-400/50 focus:ring-2"
      >
    </label>

    <label class="block text-sm">
      <span class="mb-1 inline-flex items-center gap-1 text-zinc-300">
        <Icon icon="material-symbols:chat-outline-rounded" />
        Сообщение
      </span>
      <textarea
        v-model="form.message"
        required
        rows="5"
        class="w-full rounded-lg border border-zinc-700 bg-zinc-950/90 px-3 py-2.5 text-zinc-100 outline-none ring-cyan-400 transition focus:border-cyan-400/50 focus:ring-2"
      />
    </label>

    <button
      type="submit"
      class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-500 px-4 py-2.5 font-semibold text-zinc-950 transition hover:bg-cyan-400"
    >
      <Icon icon="material-symbols:send-rounded" />
      Отправить
    </button>

    <p v-if="submitted" class="text-sm text-emerald-400">
      Спасибо! Форма работает реактивно, осталось подключить API-обработчик Nitro.
    </p>
  </form>
</template>
