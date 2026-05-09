import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", () => {
  const owner = ref({
    name: "Максим Гоголь",
    role: "FullStack Developer",
    location: "Москва, Россия",
    bio: [
      "Создаю быстрые и удобные веб-продукты",
      "для малого бизнеса и стартапов."
    ].join(" ")
  });

  const aboutText = ref(
    [
      "Работаю с современным веб-стеком, строю быстрые интерфейсы",
      "и поддерживаемую серверную часть.",
      "Фокус на результате для бизнеса: скорость, удобство и конверсия.",
      "Кроме того занимаюсь разработкой на С++ и QT как Desktop приложений,",
      "так и высоконагруженного серверного ПО обработки данных в реальном времени."
    ].join(" ")
  );

  const projectsDone = ref(10);
  const projectsInWork = ref(3);
  const yearsExperience = ref(4);

  const heroStats = computed(() => [
    { label: "Проектов завершено", value: `${projectsDone.value}+` },
    { label: "Лет опыта работы в IT", value: `${yearsExperience.value}` },
    { label: "Текущих поддерживаемых проектов", value: `${projectsInWork.value}` }
  ]);

  return { owner, aboutText, heroStats };
});
