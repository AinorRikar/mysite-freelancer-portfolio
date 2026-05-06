import { computed, ref } from "vue";
import { defineStore } from "pinia";

export type Service = {
  slug: string;
  title: string;
  description: string;
  details: string;
  price: string;
  techStack: string[];
};

export const useSiteStore = defineStore("site", () => {
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

  const services = ref<Service[]>([
    {
      slug: "landing-sites",
      title: "Лендинги и сайты-визитки",
      description: [
        "Одностраничные и многостраничные сайты для презентации услуги/продукта",
        "с акцентом на конверсию, скорость и аккуратный визуал."
      ].join(" "),
      details: [
        "Разрабатываю промо-страницы и сайты-визитки с упором на результат:",
        "продуманная структура блоков, сильный первый экран, понятные CTA,",
        "быстрая загрузка на мобильных и десктопе, формы заявок и базовая SEO-подготовка.",
        "При необходимости подключаю интеграции: Telegram-уведомления, email-отправка,",
        "простая CRM-логика через API, карта, аналитика и пиксели рекламы.",
        "Итог: готовый к запуску сайт, который можно сразу использовать для трафика и продаж."
      ].join(" "),
      price: "от 25000 руб",
      techStack: [
        "Vue 3",
        "Nuxt 3",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS",
        "HTML",
        "CSS",
        "Nitro API",
        "Node.js",
        "Bootstrap",
        "Quasar",
        "Figma (handoff)"
      ]
    },
    {
      slug: "nuxt-spa-ssr",
      title: "Nuxt SPA/SSR приложения",
      description: [
        "Разработка клиент-серверных приложений на Vue/Nuxt:",
        "личные кабинеты, MVP-сервисы, внутренние панели и B2B-интерфейсы."
      ].join(" "),
      details: [
        "Проектирую архитектуру Nuxt-приложения под задачу: SSR/SPA-режим,",
        "структура модулей, состояние, маршруты, уровни доступа и API-контракты.",
        "Реализую UI, бизнес-логику, интеграции со сторонними сервисами,",
        "валидацию форм, обработку ошибок, базовую телеметрию и оптимизацию рендера.",
        "При необходимости подключаю backend на Node.js или PHP,",
        "а также работу с SQL/REST для полнофункционального продукта."
      ].join(" "),
      price: "от 60000 руб",
      techStack: [
        "Vue 3",
        "Nuxt 3",
        "Nitro",
        "Node.js",
        "PHP",
        "Pinia",
        "Vue Router",
        "REST API",
        "Vite",
        "TypeScript",
        "JavaScript",
        "HTML",
        "CSS",
        "Tailwind CSS",
        "Quasar",
        "Bootstrap",
        "SQL",
        "Docker"
      ]
    },
    {
      slug: "support-and-growth",
      title: "Поддержка и развитие",
      description: [
        "Техническая поддержка и развитие существующих проектов:",
        "быстрые правки, доработка функционала и стабилизация релизов."
      ].join(" "),
      details: [
        "Подключаюсь к коду любого масштаба: web, backend и desktop-модули.",
        "Закрываю баги, снижаю техдолг, делаю рефакторинг без остановки разработки,",
        "добавляю новые фичи и улучшаю производительность на узких местах.",
        "Работаю итерациями с прозрачной оценкой, отчетом по изменениям",
        "и рекомендациями, как упростить дальнейшую поддержку проекта."
      ].join(" "),
      price: "1500 руб/час",
      techStack: [
        "C++",
        "Qt",
        "OpenCV",
        "SFML",
        "PHP",
        "Node.js",
        "Vue 3",
        "Nuxt 3",
        "TypeScript",
        "JavaScript",
        "HTML",
        "CSS",
        "Tailwind CSS",
        "Quasar",
        "Bootstrap",
        "SQL",
        "Git",
        "Docker",
        "Тестирование (unit/e2e)",
        "CI/CD",
        "Performance Audit"
      ]
    }
  ]);

  const projectsDone = ref(10);
  const projectsInWork = ref(3);
  const yearsExperience = ref(4);

  const heroStats = computed(() => [
    { label: "Проектов завершено", value: `${projectsDone.value}+` },
    { label: "Лет опыта работы в IT", value: `${yearsExperience.value}` },
    { label: "Текущих поддерживаемых проектов", value: `${projectsInWork.value}` }
  ]);

  const getServiceBySlug = (slug: string) => {
    return services.value.find((service) => service.slug === slug);
  };

  return { owner, aboutText, services, heroStats, getServiceBySlug };
});
