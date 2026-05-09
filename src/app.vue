<script setup lang="ts">
import { nextTick, onBeforeUnmount, watch } from "vue";
import { ScrollToTopButton } from "~/features/scroll-to-top";
import { SiteFooter, SiteHeader } from "~/widgets/layout";

const route = useRoute();

let removeSyncHandlers: null | (() => void) = null;

const syncHashWithActiveSection = () => {
  if (route.path !== "/") {
    return;
  }

  const sections = Array.from(document.querySelectorAll("main section[id]")) as HTMLElement[];
  if (sections.length === 0) {
    return;
  }

  let rafId: number | null = null;
  const updateHash = () => {
    const viewportAnchor = window.innerHeight * 0.3;
    let activeSectionId = sections[0]?.id;

    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= viewportAnchor && rect.bottom > viewportAnchor) {
        activeSectionId = section.id;
        break;
      }
      if (rect.top > viewportAnchor) {
        break;
      }
      activeSectionId = section.id;
    }

    if (!activeSectionId) {
      return;
    }

    const nextHash = `#${activeSectionId}`;
    if (window.location.hash !== nextHash) {
      const url = `${window.location.pathname}${window.location.search}${nextHash}`;
      window.history.replaceState(null, "", url);
    }
  };

  const onScroll = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
    }
    rafId = requestAnimationFrame(updateHash);
  };

  updateHash();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  removeSyncHandlers = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
  };
};

watch(
  () => route.path,
  async () => {
    removeSyncHandlers?.();
    removeSyncHandlers = null;
    await nextTick();
    syncHashWithActiveSection();
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  removeSyncHandlers?.();
});
</script>

<template>
  <div class="animated-bg min-h-screen text-zinc-100">
    <SiteHeader />
    <main class="mx-auto w-full max-w-7xl px-4 py-14 sm:px-8">
      <NuxtPage />
    </main>
    <ScrollToTopButton />
    <SiteFooter />
  </div>
</template>
