import { createError, defineEventHandler, getRouterParam } from "h3";
import { fetchGogolIntegration } from "../../utils/gogolIntegration";

export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, "id"));

  if (!Number.isFinite(id) || id <= 0) {
    throw createError({ statusCode: 404, statusMessage: "Project not found" });
  }

  return fetchGogolIntegration(`/api/integration/projects/${id}`);
});
