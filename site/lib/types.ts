// Client-safe types and constants. No Node.js imports — safe for client components.

export type Axes = {
  color?: string;
  type?: string;
  layout?: string;
  space?: string;
  motion?: string;
};

export type CatalogPack = {
  slug: string;
  track: "ppt" | "web";
  family: string;
  display_name: string;
  summary: string;
  axes: Axes;
  preview: string;
  status: string;
};

export type Catalog = {
  version: number;
  updated: string;
  schema: string;
  packs: CatalogPack[];
};

export const AXIS_LABELS: Record<keyof Axes, string> = {
  color: "색채",
  type: "타이포",
  layout: "레이아웃",
  space: "여백",
  motion: "모션",
};

export const TRACK_LABELS: Record<string, string> = {
  ppt: "PPT",
  web: "웹",
};
