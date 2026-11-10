"use client";

import { useRef, useState, useCallback, useEffect, useLayoutEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BrandIcon } from "@/components/atoms/icons/BrandIcon";

const SCROLL_STEP = 220;

function mergeScrollClassName(scrollClassName: string, extras: string) {
  return [
    "flex flex-nowrap overflow-x-auto scrollbar-hide min-w-0",
    /\bitems-/.test(scrollClassName) ? "" : "items-center",
    /\bgap-/.test(scrollClassName) ? "" : "gap-2",
    /\bmin-h-/.test(scrollClassName) ? "" : "min-h-[2.25rem]",
    extras,
    scrollClassName,
  ]
    .filter(Boolean)
    .join(" ");
}

/** Matches CategoryCarouselButton circle (92px); centers hero arrows (h-9) on the image disc. */
const CATEGORY_CIRCLE_ARROW_OFFSET = "mt-[calc(46px-1.125rem)]";

interface SuggestionsScrollWithArrowsProps {
  children: React.ReactNode;
  className?: string;
  /** Extra classes applied to the inner scroll container (e.g. to override gap). */
  scrollClassName?: string;
  arrowTheme?: "default" | "hero" | "dark";
  /**
   * `track` — vertically center arrows on the full scroll row (default).
   * `categoryCircle` — align arrows to the center of category carousel image circles.
   */
  arrowVerticalAlign?: "track" | "categoryCircle";
  /** When true, horizontal scroll chevrons are disabled */
  disableArrows?: boolean;
  /** When true, show chevrons on mobile as well as desktop */
  showArrowsOnMobile?: boolean;
  /** Keep the circular chevron buttons on desktop (default resets them after `sm`) */
  roundedArrows?: boolean;
}

export default function SuggestionsScrollWithArrows({
  children,
  className = "",
  scrollClassName = "",
  arrowTheme = "default",
  arrowVerticalAlign = "track",
  disableArrows = false,
  showArrowsOnMobile = false,
  roundedArrows = false,
}: SuggestionsScrollWithArrowsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const enableMobileArrows = showArrowsOnMobile || arrowTheme === "hero";
  const useOverlayHeroArrowsOnMobile = arrowTheme === "hero" && enableMobileArrows;

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const left = el.scrollLeft > 2;
    const right = el.scrollLeft < el.scrollWidth - el.clientWidth - 2;
    setCanScrollLeft(left);
    setCanScrollRight(right);
  }, []);

  useLayoutEffect(() => {
    updateScrollState();
  }, [updateScrollState, children]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    el.addEventListener("scroll", updateScrollState);
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", updateScrollState);
    };
  }, [updateScrollState]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === "left" ? -SCROLL_STEP : SCROLL_STEP, behavior: "smooth" });
  };

  const useRoundedArrows = enableMobileArrows || roundedArrows;
  const roundedArrowClass =
    "[--ui-scroll-arrow-background-color:rgb(255_255_255_/_0.7)] [--ui-scroll-arrow-color:rgb(71_85_105)] [--ui-scroll-arrow-hover-background-color:rgb(255_255_255_/_0.85)] [--ui-scroll-arrow-hover-color:rgb(51_65_85)] [--ui-scroll-arrow-border-radius:9999px] [--ui-scroll-arrow-height:2rem] [--ui-scroll-arrow-width:2rem] [-webkit-tap-highlight-color:transparent] h-8 w-8 shrink-0 rounded-full border border-white/40 bg-white/70 p-0 text-slate-600 shadow-sm backdrop-blur-sm hover:bg-white/85 hover:text-slate-700 focus:outline-none focus-visible:outline-none focus:bg-white/85 focus:text-slate-700 active:bg-white/85 active:text-slate-700";
  const desktopArrowResetClass =
    "sm:[--ui-scroll-arrow-border-radius:initial] sm:rounded-none sm:border-transparent sm:bg-transparent sm:p-0 sm:text-inherit sm:shadow-none sm:backdrop-blur-none sm:hover:bg-transparent sm:hover:text-inherit sm:focus:bg-transparent sm:focus:text-inherit sm:active:bg-transparent sm:active:text-inherit";
  const arrowButtonClass = [
    "brand-scroll-arrow",
    useRoundedArrows ? roundedArrowClass : "",
    useRoundedArrows && !roundedArrows ? desktopArrowResetClass : "",
    arrowTheme === "hero" ? "brand-scroll-arrow--hero" : "",
    arrowTheme === "hero" ? "opacity-85 hover:opacity-100" : "",
    arrowTheme === "dark" ? "brand-scroll-arrow--dark" : "",
  ].filter(Boolean).join(" ");

  const arrowWrapperClass =
    arrowVerticalAlign === "categoryCircle"
      ? `${showArrowsOnMobile ? "flex" : "hidden sm:flex"} flex-shrink-0 self-start relative z-10 ${CATEGORY_CIRCLE_ARROW_OFFSET}`
      : `${showArrowsOnMobile ? "flex" : "hidden sm:flex"} flex-shrink-0 items-center relative z-10`;
  const mobileOverlayArrowPositionClass =
    arrowVerticalAlign === "categoryCircle"
      ? "top-[46px] -translate-y-1/2"
      : "top-1/2 -translate-y-1/2";
  // sm:pl-0/sm:pr-0 on the plain (non-overlay) branch: this inset is mobile-only — without the
  // reset it leaks onto desktop for showArrowsOnMobile + default theme call sites (the
  // ProductDetails/ProductCard tab strips), which don't want the extra padding once arrows
  // aren't overlaid on top of the content.
  const leftScrollInsetClass = useOverlayHeroArrowsOnMobile
    ? "pl-1.5"
    : enableMobileArrows && canScrollLeft
      ? "pl-3 sm:pl-0"
      : "";
  const rightScrollInsetClass = useOverlayHeroArrowsOnMobile
    ? "pr-1.5"
    : enableMobileArrows && canScrollRight
      ? "pr-3 sm:pr-0"
      : "";

  return (
    <div
      className={`relative flex ${arrowVerticalAlign === "categoryCircle" ? "items-start" : "items-center"} ${className}`}
    >
      {useOverlayHeroArrowsOnMobile && canScrollLeft ? (
        <div className={`absolute left-1.5 z-10 flex sm:hidden ${mobileOverlayArrowPositionClass}`}>
          <button
            type="button"
            onClick={(event) => {
              scroll("left");
              event.currentTarget.blur();
            }}
            disabled={disableArrows}
            className={`${arrowButtonClass} ${disableArrows ? "opacity-40 pointer-events-none" : ""}`}
            aria-label="Scroll suggestions left"
          >
            <BrandIcon
              name="chevronLeft"
              defaultIcon={({ className }) => <ChevronLeft size={22} strokeWidth={2.5} className={className} />}
              className="relative z-[1] h-[22px] w-[22px]"
            />
          </button>
        </div>
      ) : null}
      {useOverlayHeroArrowsOnMobile && canScrollRight ? (
        <div className={`absolute right-1.5 z-10 flex sm:hidden ${mobileOverlayArrowPositionClass}`}>
          <button
            type="button"
            onClick={(event) => {
              scroll("right");
              event.currentTarget.blur();
            }}
            disabled={disableArrows}
            className={`${arrowButtonClass} ${disableArrows ? "opacity-40 pointer-events-none" : ""}`}
            aria-label="Scroll suggestions right"
          >
            <BrandIcon
              name="chevronRight"
              defaultIcon={({ className }) => <ChevronRight size={22} strokeWidth={2.5} className={className} />}
              className="relative z-[1] h-[22px] w-[22px]"
            />
          </button>
        </div>
      ) : null}
      {/* Desktop: left chevron – reserved space + overlap so content scrolls behind */}
      {canScrollLeft && (
        <div className={arrowWrapperClass}>
          <button
            type="button"
            onClick={(event) => {
              scroll("left");
              event.currentTarget.blur();
            }}
            disabled={disableArrows}
            className={`${arrowButtonClass} ${disableArrows ? "opacity-40 pointer-events-none" : ""}`}
            aria-label="Scroll suggestions left"
          >
            <BrandIcon
              name="chevronLeft"
              defaultIcon={({ className }) => <ChevronLeft size={22} strokeWidth={2.5} className={className} />}
              className="relative z-[1] h-[22px] w-[22px]"
            />
          </button>
        </div>
      )}
      <div className="relative flex-1 min-w-0">
        <div
          ref={scrollRef}
          className={mergeScrollClassName(
            scrollClassName,
            `${leftScrollInsetClass} ${rightScrollInsetClass} ${canScrollLeft ? "sm:-ml-4" : ""} ${canScrollRight ? "sm:-mr-4" : ""}`
          )}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {children}
        </div>
      </div>
      {/* Desktop: right chevron – reserved space + overlap so content scrolls behind */}
      {canScrollRight && (
        <div className={arrowWrapperClass}>
          <button
            type="button"
            onClick={(event) => {
              scroll("right");
              event.currentTarget.blur();
            }}
            disabled={disableArrows}
            className={`${arrowButtonClass} ${disableArrows ? "opacity-40 pointer-events-none" : ""}`}
            aria-label="Scroll suggestions right"
          >
            <BrandIcon
              name="chevronRight"
              defaultIcon={({ className }) => <ChevronRight size={22} strokeWidth={2.5} className={className} />}
              className="relative z-[1] h-[22px] w-[22px]"
            />
          </button>
        </div>
      )}
    </div>
  );
}
