"use client";

import type { BrandIconName, IconComponent } from "./brandIconTypes";

interface BrandIconProps {
  name: BrandIconName;
  defaultIcon: IconComponent;
  className?: string;
  defaultClassName?: string;
  brandClassName?: string;
}

/** Slim BrandIcon: always renders the default Lucide icon (no brand icon sets). */
export function BrandIcon({
  defaultIcon: DefaultIcon,
  className,
  defaultClassName,
}: BrandIconProps) {
  return <DefaultIcon className={[className, defaultClassName].filter(Boolean).join(" ")} />;
}
