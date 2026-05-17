export type DescriptionParagraphBlock = {
  type: "paragraph";
  text: string;
};

export type DescriptionNumberedBlock = {
  type: "numbered";
  items: string[];
};

export type DescriptionDashBlock = {
  type: "dash";
  items: string[];
};

export type DescriptionBlock =
  | DescriptionParagraphBlock
  | DescriptionNumberedBlock
  | DescriptionDashBlock;

const NUMBERED_LINE = /^\s*(\d+)[.)]\s+(.+)$/;
const DASH_LINE = /^\s*[-–—•]\s*(.+)$/;

const stripLeadingDash = (value: string) => value.replace(/^[-–—•]+\s*/, "").trim();

const matchNumbered = (line: string) => {
  const match = line.match(NUMBERED_LINE);
  return match ? match[2].trim() : null;
};

const matchDash = (line: string) => {
  const match = line.match(DASH_LINE);
  if (!match) {
    return null;
  }
  const item = stripLeadingDash(match[1].trim());
  return item || null;
};

export const parseDescription = (text: string): DescriptionBlock[] => {
  const lines = text.split(/\r?\n/);
  const blocks: DescriptionBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const trimmed = lines[index]?.trim() ?? "";

    if (!trimmed) {
      index += 1;
      continue;
    }

    const numberedItem = matchNumbered(lines[index] ?? "");
    if (numberedItem) {
      const items: string[] = [];
      while (index < lines.length) {
        const item = matchNumbered(lines[index] ?? "");
        if (!item) {
          break;
        }
        items.push(item);
        index += 1;
      }
      blocks.push({ type: "numbered", items });
      continue;
    }

    const dashItem = matchDash(lines[index] ?? "");
    if (dashItem) {
      const items: string[] = [];
      while (index < lines.length) {
        const item = matchDash(lines[index] ?? "");
        if (!item) {
          break;
        }
        items.push(item);
        index += 1;
      }
      blocks.push({ type: "dash", items });
      continue;
    }

    const paragraphLines: string[] = [];
    while (index < lines.length) {
      const line = lines[index] ?? "";
      const lineTrimmed = line.trim();
      if (!lineTrimmed) {
        break;
      }
      if (matchNumbered(line) || matchDash(line)) {
        break;
      }
      paragraphLines.push(lineTrimmed);
      index += 1;
    }

    if (paragraphLines.length) {
      blocks.push({ type: "paragraph", text: paragraphLines.join("\n") });
    }
  }

  return blocks;
};
