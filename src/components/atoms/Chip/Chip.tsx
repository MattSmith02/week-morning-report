import type {
  ButtonHTMLAttributes,
  ComponentType,
  HTMLAttributes,
  ReactNode,
} from "react";
import { Loader2 } from "lucide-react";

interface ChipSharedProps {
  label?: string;
  /**
   * `outline` — for chips on dark / hero blue: default is white stroke + white label;
   * hover and selected use white fill and Tom's Guide blue (`radar-blue`) text.
   */
  tone?: "default" | "accent" | "outline";
  selected?: boolean;
  /** When true, replaces the icon with an animated spinner and sets aria-busy. */
  loading?: boolean;
  icon?: ComponentType<{ className?: string; size?: number }>;
  children?: ReactNode;
}

type ChipSpanProps = ChipSharedProps &
  HTMLAttributes<HTMLSpanElement> & {
    as?: "span";
  };

type ChipButtonProps = ChipSharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as: "button";
  };

export type ChipProps = ChipSpanProps | ChipButtonProps;

const toneClasses: Record<NonNullable<ChipSharedProps["tone"]>, string> = {
  default: "chip-brand",
  accent: "border-[#010F29] bg-accent-green text-foreground hover:bg-[#19294A] hover:text-white",
  outline:
    "border-[var(--ui-chip-outline-border-color)] bg-[var(--ui-chip-outline-background-color)] text-[var(--ui-chip-outline-color)] hover:border-[var(--ui-chip-outline-hover-border-color)] hover:bg-[var(--ui-chip-outline-hover-background-color)] hover:text-[var(--ui-chip-outline-hover-color)]",
};

const selectedToneClasses: Record<NonNullable<ChipSharedProps["tone"]>, string> = {
  default: "chip-brand chip-brand-selected",
  accent: "border-[#010F29] bg-accent-green text-foreground",
  outline:
    "border-[var(--ui-chip-outline-hover-border-color)] bg-[var(--ui-chip-outline-hover-background-color)] text-[var(--ui-chip-outline-hover-color)] hover:border-[var(--ui-chip-outline-hover-border-color)] hover:bg-[var(--ui-chip-outline-hover-background-color)] hover:text-[var(--ui-chip-outline-hover-color)]",
};

export default function Chip({
  as = "span",
  label,
  tone = "default",
  selected = false,
  loading = false,
  icon: Icon,
  className = "",
  children,
  ...props
}: ChipProps) {
  const content = children ?? label;
  const buttonProps = as === "button" ? (props as ButtonHTMLAttributes<HTMLButtonElement>) : null;
  const isButtonDisabled = Boolean(buttonProps?.disabled);
  const resolvedToneClasses = selected ? selectedToneClasses[tone] : toneClasses[tone];
  const classes = [
    "inline-flex min-h-8 min-w-[110px] items-center justify-center gap-1.5 rounded-[200px] border-2 px-4 py-1 text-center text-[11px] font-semibold leading-5 whitespace-nowrap transition-colors",
    as === "button"
      ? `${isButtonDisabled ? "cursor-not-allowed" : selected ? "cursor-default" : "cursor-pointer"} disabled:pointer-events-none focus-visible:outline-none ${tone === "default" ? "focus-visible:ring-0 focus-visible:ring-offset-0" : "focus-visible:ring-2 focus-visible:ring-[var(--brand-focus-ring)] focus-visible:ring-offset-2"}`
      : "",
    resolvedToneClasses,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const icon = loading
    ? <Loader2 size={14} className="shrink-0 text-current animate-spin" />
    : Icon
      ? <Icon size={14} className="shrink-0 text-current" />
      : null;

  if (as === "button") {
    const resolvedButtonProps = buttonProps ?? {};

    return (
      <button
        type={resolvedButtonProps.type ?? "button"}
        aria-busy={loading || undefined}
        className={classes}
        {...resolvedButtonProps}
      >
        {icon}
        {content}
      </button>
    );
  }

  return (
    <span
      className={classes}
      {...(props as HTMLAttributes<HTMLSpanElement>)}
    >
      {icon}
      {content}
    </span>
  );
}
