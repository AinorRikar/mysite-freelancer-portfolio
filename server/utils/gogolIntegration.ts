import jwt from "jsonwebtoken";
import { createError } from "h3";

export const mintIntegrationToken = (secret: string) =>
  jwt.sign({ iss: "portfolio" }, secret, {
    expiresIn: "2m",
    algorithm: "HS256"
  });

const resolveIntegrationConfig = () => {
  const config = useRuntimeConfig();

  const integrationSecret =
    config.integrationSecret ||
    process.env.NUXT_INTEGRATION_SECRET ||
    process.env.INTEGRATION_SECRET ||
    "";

  const gogolDashboardBaseUrl =
    config.gogolDashboardBaseUrl ||
    process.env.NUXT_GOGOL_DASHBOARD_BASE_URL ||
    process.env.GOGOL_DASHBOARD_BASE_URL ||
    "http://gogol-dashboard:3000/dashboard";

  return { integrationSecret, gogolDashboardBaseUrl };
};

export const fetchGogolIntegration = async <T>(path: string): Promise<T> => {
  const { integrationSecret, gogolDashboardBaseUrl } = resolveIntegrationConfig();

  if (!integrationSecret) {
    throw createError({
      statusCode: 503,
      statusMessage: "INTEGRATION_SECRET is not configured"
    });
  }

  const token = mintIntegrationToken(integrationSecret);
  const url = `${gogolDashboardBaseUrl}${path}`;

  try {
    return await $fetch<T>(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error: unknown) {
    const statusCode =
      error && typeof error === "object" && "statusCode" in error
        ? Number((error as { statusCode: number }).statusCode)
        : 502;

    const statusMessage =
      error && typeof error === "object" && "statusMessage" in error
        ? String((error as { statusMessage: string }).statusMessage)
        : "Failed to fetch from dashboard";

    throw createError({ statusCode, statusMessage });
  }
};
