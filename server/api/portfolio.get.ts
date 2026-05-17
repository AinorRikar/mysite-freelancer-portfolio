import { defineEventHandler } from "h3";
import { fetchGogolIntegration } from "../utils/gogolIntegration";

export default defineEventHandler(() =>
  fetchGogolIntegration("/api/integration/portfolio")
);
