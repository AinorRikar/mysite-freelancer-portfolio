import type { PortfolioProject } from "./types";

export function usePortfolioProject(id: MaybeRefOrGetter<string | number>) {
  const idRef = computed(() => String(toValue(id)));

  return useFetch<PortfolioProject>(() => `/api/portfolio/${idRef.value}`, {
    key: () => `portfolio-project-${idRef.value}`
  });
}
