import { defineStore } from "pinia";
import { useProfileStore } from "~/entities/profile";
import { useServiceStore } from "~/entities/service";
export type { Service } from "~/entities/service";

export const useSiteStore = defineStore("site", () => {
  // Compatibility facade: preserves previous `useSiteStore` API
  // while data is now owned by dedicated entity slices.
  const profile = useProfileStore();
  const service = useServiceStore();

  return {
    owner: profile.owner,
    aboutText: profile.aboutText,
    heroStats: profile.heroStats,
    services: service.services,
    getServiceBySlug: service.getServiceBySlug
  };
});
