import { createError, defineEventHandler, getRouterParam } from "h3";
import { fetchGogolIntegration } from "../../utils/gogolIntegration";
import { mapProjectMediaUrls } from "../../utils/portfolioMedia";
import type { PortfolioProject } from "../../../src/entities/portfolio/model/types";

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));

  if (!Number.isFinite(id) || id <= 0) {
    throw createError({ statusCode: 404, statusMessage: "Project not found" });
  }

  const project = await fetchGogolIntegration<PortfolioProject>(
    `/api/integration/projects/${id}`
  );

  return mapProjectMediaUrls(project);
});
