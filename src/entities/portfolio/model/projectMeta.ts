import type { PortfolioProject, PortfolioProjectStatus } from "./types";

export const portfolioStatusLabels: Record<PortfolioProjectStatus, string> = {
  ACTIVE: "Активный",
  COMPLETED: "Завершённый",
  ABANDONED: "Заброшенный",
  SUPPORTED: "Поддержка",
  PLANNING: "Планируется"
};

export const formatPortfolioMeta = (project: Pick<PortfolioProject, "status" | "version">) => {
  const parts = [portfolioStatusLabels[project.status]];
  if (project.version) {
    parts.push(`v${project.version}`);
  }
  return parts.join(" · ");
};

export const parseTechStack = (techStack: string) =>
  techStack
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
