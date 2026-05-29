export const UPLOADS_PREFIX = "/uploads/";

export function toMediaProxyUrl(fileUrl: string): string {
  if (!fileUrl) {
    return fileUrl;
  }

  try {
    const pathname = fileUrl.startsWith("http")
      ? new URL(fileUrl).pathname
      : fileUrl;

    const uploadsIndex = pathname.indexOf(UPLOADS_PREFIX);
    if (uploadsIndex === -1) {
      return fileUrl;
    }

    const relativePath = pathname
      .slice(uploadsIndex + UPLOADS_PREFIX.length)
      .replace(/^\/+/, "");

    if (!relativePath) {
      return fileUrl;
    }

    return `/api/portfolio-media/${relativePath}`;
  } catch {
    return fileUrl;
  }
}

type ProjectWithMedia = {
  images?: Array<{ fileUrl: string }>;
  links?: Array<{ iconUrl?: string }>;
};

export function mapProjectMediaUrls<T extends ProjectWithMedia>(project: T): T {
  return {
    ...project,
    images: project.images?.map((image) => ({
      ...image,
      fileUrl: toMediaProxyUrl(image.fileUrl)
    })),
    links: project.links?.map((link) => ({
      ...link,
      iconUrl: link.iconUrl ? toMediaProxyUrl(link.iconUrl) : link.iconUrl
    }))
  };
}
