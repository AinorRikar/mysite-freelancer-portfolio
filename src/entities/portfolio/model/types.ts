export type PortfolioProjectStatus =
  | "ACTIVE"
  | "COMPLETED"
  | "ABANDONED"
  | "SUPPORTED"
  | "PLANNING";

export type PortfolioReferenceBlock = {
  id: number;
  title: string;
  content: string;
  order: number;
};

export type PortfolioImage = {
  id: number;
  fileName: string;
  fileUrl: string;
  mimeType: string;
};

export type PortfolioLink = {
  id: number;
  url: string;
  title: string;
  iconUrl: string;
};

export type PortfolioMember = {
  id: number;
  name: string;
};

export type PortfolioProject = {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  version: string;
  status: PortfolioProjectStatus;
  visibility: boolean;
  hidden: boolean;
  useForPortfolio: boolean;
  techStack: string;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
  referenceBlocks: PortfolioReferenceBlock[];
  images: PortfolioImage[];
  links: PortfolioLink[];
  members: PortfolioMember[];
};
