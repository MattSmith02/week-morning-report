"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { BrandIcon } from "@/components/atoms/icons/BrandIcon";

type BrandScrollArrowProps = {
  direction: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
  label: string;
  theme?: "default" | "hero" | "dark";
  className?: string;
};

/** Brand scroll chevron — same control as SuggestionsScrollWithArrows. */
export function BrandScrollArrow({
  direction,
  onClick,
  disabled = false,
  label,
  theme = "default",
  className = "",
}: BrandScrollArrowProps) {
  const rounded =
    "[--ui-scroll-arrow-background-color:rgb(255_255_255_/_0.7)] [--ui-scroll-arrow-color:rgb(71_85_105)] [--ui-scroll-arrow-hover-background-color:rgb(255_255_255_/_0.85)] [--ui-scroll-arrow-hover-color:rgb(51_65_85)] [--ui-scroll-arrow-border-radius:9999px] [--ui-scroll-arrow-height:2.25rem] [--ui-scroll-arrow-width:2.25rem] h-9 w-9 shrink-0 rounded-full border border-white/40 bg-white/70 p-0 text-slate-600 shadow-sm backdrop-blur-sm hover:bg-white/85 hover:text-slate-700 focus:outline-none focus-visible:outline-none";

  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={(event) => {
        onClick();
        event.currentTarget.blur();
      }}
      className={[
        "brand-scroll-arrow",
        rounded,
        theme === "hero" ? "brand-scroll-arrow--hero opacity-85 hover:opacity-100" : "",
        theme === "dark" ? "brand-scroll-arrow--dark" : "",
        disabled ? "pointer-events-none opacity-40" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <BrandIcon
        name={direction === "left" ? "chevronLeft" : "chevronRight"}
        defaultIcon={({ className: iconClass }) =>
          direction === "left" ? (
            <ChevronLeft size={22} strokeWidth={2.5} className={iconClass} />
          ) : (
            <ChevronRight size={22} strokeWidth={2.5} className={iconClass} />
          )
        }
        className="relative z-[1] h-[22px] w-[22px]"
      />
    </button>
  );
}
