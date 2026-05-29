import { defineEventHandler } from "h3";
import { fetchGogolIntegration } from "../utils/gogolIntegration";
import { mapProjectMediaUrls } from "../utils/portfolioMedia";
import type { PortfolioProject } from "../../../src/entities/portfolio/model/types";

export default defineEventHandler(async () => {
  const projects = await fetchGogolIntegration<PortfolioProject[]>(
    "/api/integration/portfolio"
  );

  return projects.map(mapProjectMediaUrls);
});
