import type { PortfolioProject } from "./types";

export function usePortfolio() {
  return useFetch<PortfolioProject[]>("/api/portfolio", { key: "portfolio" });
}
