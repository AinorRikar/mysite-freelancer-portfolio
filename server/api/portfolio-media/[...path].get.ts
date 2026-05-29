import {
  createError,
  defineEventHandler,
  getRouterParam,
  sendStream,
  setResponseHeader
} from "h3";
import {
  getIntegrationConfig,
  mintIntegrationToken
} from "../../utils/gogolIntegration";
import { UPLOADS_PREFIX } from "../../utils/portfolioMedia";

export default defineEventHandler(async (event) => {
  const assetPath = getRouterParam(event, "path");

  if (!assetPath) {
    throw createError({ statusCode: 404, statusMessage: "Media not found" });
  }

  const { integrationSecret, gogolDashboardBaseUrl } = getIntegrationConfig();

  if (!integrationSecret) {
    throw createError({
      statusCode: 503,
      statusMessage: "INTEGRATION_SECRET is not configured"
    });
  }

  const token = mintIntegrationToken(integrationSecret);
  const upstreamUrl = `${gogolDashboardBaseUrl}${UPLOADS_PREFIX}${assetPath}`;

  const upstream = await fetch(upstreamUrl, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!upstream.ok) {
    throw createError({
      statusCode: upstream.status,
      statusMessage: "Failed to fetch media"
    });
  }

  const contentType = upstream.headers.get("content-type");
  if (contentType) {
    setResponseHeader(event, "content-type", contentType);
  }

  setResponseHeader(event, "cache-control", "public, max-age=300");

  if (!upstream.body) {
    throw createError({ statusCode: 502, statusMessage: "Empty media response" });
  }

  return sendStream(event, upstream.body);
});
