import type { ReactNode } from "react";

export type IconComponent = (props: { className?: string }) => ReactNode;

export type BrandIconName =
  | "arrowRight"
  | "check"
  | "chevronDown"
  | "chevronLeft"
  | "chevronRight"
  | "chevronUp"
  | "close"
  | "home"
  | "info"
  | "share"
  | "sliders"
  | "sort"
  | "trophy";

export type BrandIconSet = Record<BrandIconName, IconComponent>;
