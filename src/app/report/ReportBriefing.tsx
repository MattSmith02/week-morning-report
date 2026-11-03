"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Lock, Play, X } from "lucide-react";
import Chip from "@/components/atoms/Chip/Chip";
import { BrandIcon } from "@/components/atoms/icons/BrandIcon";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { WeekStory } from "../the-week/stories";

const ROMAN = "Palatino, 'Palatino Linotype', 'Book Antiqua', Georgia, serif";
const UI = "Arial, Helvetica, sans-serif";
const roman: CSSProperties = { fontFamily: ROMAN, fontWeight: 400 };
const romanBold: CSSProperties = { fontFamily: ROMAN, fontWeight: 700 };
const ui: CSSProperties = { fontFamily: UI, fontWeight: 400 };
const uiBold: CSSProperties = { fontFamily: UI, fontWeight: 700 };

const pagePad = "px-4 sm:px-8 lg:px-8 xl:px-12 min-[1440px]:px-20 2xl:px-[177px]";
const iconButton = "brand-icon-button inline-flex h-12 w-12 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2";
/** The Week primary CTA — red fill, Arial bold uppercase (not shop PrimaryButton). */
const weekCta =
  "inline-flex w-fit items-center justify-center gap-2 rounded-lg bg-[#DF0A14] px-4 py-3 text-xs font-bold tracking-[0.05em] text-[#FAFAFA] uppercase transition-colors duration-200 hover:bg-[#B20810] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DF0A14]";
const weekHeaderCta =
  "inline-flex h-[41px] items-center rounded bg-[#DF0A14] px-4 py-3 text-[14px] leading-4 font-bold text-white uppercase transition-colors duration-200 hover:bg-[#B20810]";
const kicker = "text-xs font-bold tracking-[0.05em] text-[#DF0A14] uppercase";
const heading = "text-[2rem] leading-10 text-black";
const subInfo = "text-[11px] font-bold tracking-[0.12em] text-[#6B7280] uppercase";
const readColumn = "w-full max-w-[65ch]";
const bodyCopy = "mt-6 text-base leading-6";
const softPanel = "bg-[#F0EAE1]";
const hairline = "border-black/12";
/** Shared photo cover/thumbnail scrim — same on mobile and desktop. */
const coverScrim = "bg-gradient-to-t from-black/75 via-black/15 to-black/25";
const OUTLET_DOMAIN: Record<string, string> = {
  "The New York Times": "nytimes.com",
  "The Associated Press": "apnews.com",
  "The Wall Street Journal": "wsj.com",
  "The Washington Post": "washingtonpost.com",
  "The Guardian": "theguardian.com",
  "Al Jazeera": "aljazeera.com",
  "USA Today": "usatoday.com",
  "The Philadelphia Inquirer": "inquirer.com",
  "Houston Chronicle": "houstonchronicle.com",
  "The Minnesota Star Tribune": "startribune.com",
  "The Dallas Morning News": "dallasnews.com",
  Politico: "politico.com",
  "The New Yorker": "newyorker.com",
  "New York Magazine": "nymag.com",
};

function outletLogo(name: string) {
  const domain = OUTLET_DOMAIN[name];
  return domain ? `https://logo.clearbit.com/${domain}` : null;
}

const PAPER_COVERS = [
  {
    src: "/the-week/sources/guardian-front.jpg",
    name: "The Guardian",
    headline: "Alarm as MI5 names China spy suspects targeting MPs",
  },
  {
    src: "/the-week/sources/ft-2021.jpg",
    name: "Financial Times",
    headline: "HSBC steps up pivot to Asia with Hong Kong job moves and US exit",
  },
  {
    src: "/the-week/sources/week-2024.jpg",
    name: "The Week",
    headline: "England’s dirty water",
  },
];

function number(index: number) {
  return String(index + 1).padStart(2, "0");
}

function MenuMark() {
  return (
    <span className="flex h-3.5 w-5 flex-col justify-between" aria-hidden>
      <span className="h-0.5 w-full bg-current" />
      <span className="h-0.5 w-full bg-current" />
      <span className="h-0.5 w-full bg-current" />
    </span>
  );
}

const WEEK_SUBSCRIBE =
  "https://subscribe.theweek.com/pubs/W0/TWE/self1023_3formats_Dlink.jsp?cds_mag_code=TWE&cds_page_id=275740";
const WEEK_NAV = ["Home", "The Explainer", "Talking Points", "The Week Recommends", "Podcasts", "Newsletters", "From the Magazine", "More", "The Week Junior"];

function WeekSiteHeader() {
  return (
    <header className="relative z-30 hidden shrink-0 bg-white lg:block">
      <div className="relative mx-auto flex h-[110px] max-w-[1920px] items-center px-8 xl:px-12 min-[1440px]:px-20 2xl:px-[177px]">
        <a href={WEEK_SUBSCRIBE} target="_blank" rel="noreferrer" className="flex items-center transition-opacity duration-200 hover:opacity-80">
          <Image src="/the-week/sources/week-2024.jpg" alt="" width={52} height={51} className="h-[51px] w-[52px] object-cover object-top" />
          <span className="flex flex-col gap-[5px] bg-white pl-[5px]">
            <span className="text-[12px] leading-[14px] font-bold text-[#DF0A14]" style={uiBold}>
              SUBSCRIBE &amp; SAVE
            </span>
            <span className="text-[11.4px] leading-[13px] font-bold text-[#333333]" style={uiBold}>
              Less than $2.50 per week
            </span>
          </span>
        </a>
        <Link href="/report" aria-label="The Week" className="absolute top-0 left-1/2 -translate-x-1/2">
          <Image src="/the-week/logo.svg" alt="" width={453} height={109} unoptimized className="h-[72px] w-auto xl:h-[88px] 2xl:h-[109px]" />
        </Link>
        <div className="ml-auto flex items-center gap-5">
          <span className="hidden items-center gap-[5px] text-[12px] leading-7 text-[#333333] xl:inline-flex" style={ui}>
            US Edition
            <svg width="23" height="17" viewBox="0 0 23 17" aria-hidden>
              <rect width="23" height="17" fill="#BD3D44" />
              <rect y="1.3" width="23" height="1.3" fill="#fff" />
              <rect y="3.9" width="23" height="1.3" fill="#fff" />
              <rect y="6.5" width="23" height="1.3" fill="#fff" />
              <rect y="9.1" width="23" height="1.3" fill="#fff" />
              <rect y="11.7" width="23" height="1.3" fill="#fff" />
              <rect y="14.3" width="23" height="1.3" fill="#fff" />
              <rect width="10" height="9" fill="#192F5D" />
            </svg>
          </span>
          <a href="https://theweek.com/" aria-label="Search" className="text-[#333333]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
              <path d="M16 16.5 20 20.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </a>
          <a href="https://theweek.com/" className="inline-flex h-10 items-center gap-[5px] rounded border border-[#0A0A0A] px-[14px] py-3 text-[14px] leading-5 font-bold text-black uppercase transition-colors duration-200 hover:bg-[#0A0A0A] hover:text-white" style={uiBold}>
            Sign in
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
              <circle cx="6" cy="4" r="2.1" fill="currentColor" />
              <path d="M1.8 10.4c.7-2 2.1-3 4.2-3s3.5 1 4.2 3" fill="currentColor" />
            </svg>
          </a>
          <a href={WEEK_SUBSCRIBE} target="_blank" rel="noreferrer" className={weekHeaderCta} style={uiBold}>
            Subscribe
          </a>
        </div>
      </div>
      <nav className="flex h-[53px] items-center justify-center overflow-x-auto border-y border-[#E5E7EB] bg-white" aria-label="The Week sections">
        <div className="flex items-center">
          {WEEK_NAV.map((item) => (
            <a key={item} href="https://theweek.com/" className="px-5 text-[14px] leading-5 font-bold whitespace-nowrap text-[#1F2937] transition-colors duration-200 hover:text-[#DF0A14]" style={romanBold}>
              {item}
              {item === "More" ? (
                <span className="ml-[3px] inline-block text-[10px] text-[#333333]" aria-hidden>
                  ▾
                </span>
              ) : null}
            </a>
          ))}
          <a href="https://theweek.com/" className="ml-2 inline-flex h-[38px] items-center gap-[5px] rounded border border-[#D1D5DB] bg-[#FFE5E6] px-2 text-[14px] leading-5 font-bold whitespace-nowrap text-[#1F2937]" style={romanBold}>
            <span className="flex h-6 w-6 items-center justify-center rounded-[3px] bg-[#455E61] text-[11px] text-white" aria-hidden>
              W
            </span>
            Daily Editions
          </a>
        </div>
      </nav>
    </header>
  );
}

function WeekMark() {
  return (
    <svg width="27.88" height="27.88" viewBox="0 0 27.88 27.88" aria-hidden className="shrink-0">
      <rect width="27.88" height="27.88" rx="3.48451" fill="#DF0A14" />
      <path
        fill="#FFFFFF"
        transform="translate(3.284 6.563) scale(0.993 0.844) translate(-66.643 -9.143)"
        d="M85.577 11.0728C85.577 11.6986 85.4203 12.2987 85.3158 12.6896L82.4991 22.9907H82.4476L79.135 11.3077C79.1093 11.2032 79.0567 11.0728 79.0567 10.9425C79.0567 10.0556 80.0482 9.87328 80.7781 9.847V9.14293H74.754V9.847C76.1621 9.97785 76.7102 10.5774 77.2314 12.1421L74.1282 22.965H74.0762L70.8422 11.3592C70.8158 11.2809 70.7381 11.0723 70.7381 10.8637C70.7381 9.87274 71.9114 9.84647 72.7984 9.82073V9.14293H66.6434V9.87382C67.3217 9.95211 68.3647 10.3173 68.7819 11.8295L73.1109 27.2946H73.815L77.6486 13.7331H77.7011L81.5605 27.2946H82.2644L86.072 13.3165C86.8025 10.6299 87.4021 10.0041 88.6798 9.87382V9.1692H84.0645V9.87328C84.742 9.87328 85.577 10.0556 85.577 11.0728Z"
      />
    </svg>
  );
}

function QuoteMark() {
  return (
    <svg className="mt-2 h-10 w-14 shrink-0" viewBox="0 130 52 40" fill="none" aria-hidden>
      <path
        d="M51.3797 134.046C46.9979 136.135 43.5661 138.566 41.0844 141.339C38.6027 144.112 37.1679 147.474 36.7802 151.425L40.0374 151.425C42.4416 151.425 44.3998 151.69 45.9121 152.222C47.4245 152.754 48.6459 153.495 49.5766 154.444C50.4685 155.356 51.1083 156.363 51.496 157.464C51.845 158.566 52.0195 159.706 52.0195 160.883C52.0195 163.314 51.0307 165.442 49.0531 167.265C47.0367 169.088 44.6713 170 41.9569 170C37.6914 170 34.4148 168.613 32.1269 165.84C29.8391 163.067 28.6951 159.231 28.6951 154.33C28.6951 149.772 30.6728 145.176 34.628 140.541C38.5445 135.907 43.2753 132.393 48.8204 130L51.3797 134.046ZM22.7041 134.046C18.3223 136.135 14.8905 138.566 12.4088 141.339C9.92706 144.112 8.49231 147.474 8.10454 151.424L11.3618 151.424C13.766 151.424 15.7242 151.69 17.2365 152.222C18.7488 152.754 19.9703 153.495 20.901 154.444C21.7928 155.356 22.4327 156.363 22.8204 157.464C23.1694 158.566 23.3439 159.706 23.3439 160.883C23.3439 163.314 22.3551 165.442 20.3775 167.265C18.3611 169.088 15.9957 170 13.2813 170C9.0158 170 5.73914 168.613 3.45129 165.84C1.16345 163.067 0.019527 159.231 0.0195274 154.33C0.0195278 149.772 1.99716 145.176 5.95242 140.541C9.8689 135.907 14.5997 132.393 20.1448 130L22.7041 134.046Z"
        fill="#DF0A14"
      />
    </svg>
  );
}

function SectionHeading({ children, rule = true }: { children: string; rule?: boolean }) {
  return (
    <div>
      <h3 className={heading} style={roman}>
        {children}
      </h3>
      {rule ? <div className="mt-2 h-[3px] w-16 bg-[#DF0A14]" /> : null}
    </div>
  );
}

function Body({ children }: { children: string }) {
  return (
    <p className={bodyCopy} style={roman}>
      {children}
    </p>
  );
}

function SideAd({ align }: { align: "left" | "right" }) {
  const edge = align === "right" ? "left-[calc(50%+32.5ch+2.5rem)]" : "right-[calc(50%+32.5ch+2.5rem)]";
  return (
    <aside aria-label="Advertisement" className={`absolute inset-y-0 hidden w-[300px] min-[1400px]:block ${edge}`}>
      <div className="sticky top-16">
        <div
          className={`flex h-[600px] items-center justify-center ${softPanel} px-4 text-center text-[12px] tracking-[0.14em] text-[#6B7280] uppercase`}
          style={ui}
        >
          Advertisement
        </div>
      </div>
    </aside>
  );
}

function InArticleAd({ wideHide = false }: { wideHide?: boolean }) {
  return (
    <aside aria-label="Advertisement" className={wideHide ? "min-[1400px]:hidden" : ""}>
      <div className={`flex h-[280px] w-full items-center justify-center ${softPanel} text-[12px] tracking-[0.14em] text-[#6B7280] uppercase`} style={ui}>
        Advertisement
      </div>
    </aside>
  );
}

function FullBleedAd({ tall }: { tall: "screen" | "column" }) {
  return (
    <aside
      aria-label="Advertisement"
      className={`flex w-full items-center justify-center ${softPanel} ${tall === "column" ? "h-full" : "h-[calc(100svh-48px)] min-h-[520px]"}`}
    >
      <p className="text-[12px] tracking-[0.14em] text-[#6B7280] uppercase" style={ui}>
        Advertisement
      </p>
    </aside>
  );
}

function CaptureGate({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center bg-[#F4F0EA] px-4 pt-8 pb-12">
      <div className={`border-l-2 border-dashed border-[#DF0A14] pl-4 ${readColumn}`}>
        <a href={WEEK_SUBSCRIBE} target="_blank" rel="noreferrer" className={weekCta}>
          <Lock size={12} strokeWidth={2.4} aria-hidden />
          Sign up to unlock
        </a>
        <div className="relative mt-5 max-h-64 overflow-hidden">
          <div inert aria-hidden className="pointer-events-none flex flex-col gap-3 blur-[6px] select-none">
            {children}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-[#F4F0EA]" />
        </div>
        <p className="mt-4 text-base leading-6" style={roman}>
          The rest of this article is locked. Sign up for the coverage: news and opinion from over 200 sources, gathered in one place.
        </p>
      </div>
    </div>
  );
}

function FullBleedBrand({ children }: { children: ReactNode }) {
  return (
    <div className={`relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 ${softPanel}`}>
      <div className={`mx-auto px-4 py-10 sm:px-8 xl:py-12 ${readColumn}`}>{children}</div>
    </div>
  );
}

function StoryReading({ story, part = "all", place = "none" }: { story: WeekStory; part?: "all" | "hook" | "rest"; place?: "none" | "sides" | "inline" }) {
  const happenedLabel = story.format === "tale" ? "The tale" : story.format === "quote" ? "" : "What happened";
  const hook = part !== "rest";
  const rest = part !== "hook";
  const framed = part !== "rest";

  return (
    <div className={framed ? "relative bg-[#F4F0EA] py-16 xl:py-20" : ""}>
      <div className={framed ? `relative mx-auto flex flex-col gap-16 px-4 xl:gap-24 ${readColumn}` : "flex flex-col gap-6"}>
        {hook && story.format !== "quote" && story.whatHappened ? (
          <section>
            <SectionHeading>{happenedLabel}</SectionHeading>
            {story.format === "tale" ? (
              <p className="mt-6 border-l-2 border-[#DF0A14] pl-4 text-2xl italic leading-8" style={roman}>
                {story.whatHappened}
              </p>
            ) : (
              <Body>{story.whatHappened}</Body>
            )}
          </section>
        ) : null}
        {rest && story.items && story.items.length > 0 ? (
          <ul className={`max-w-[635px] border-t ${hairline}`}>
            {story.items.map((item) => (
              <li key={item.label} className={`border-b ${hairline} py-5`}>
                <p className={subInfo} style={uiBold}>
                  {item.label}
                </p>
                <p className="mt-2 text-xl leading-7 text-black" style={roman}>
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        ) : null}
        {rest && story.quote ? (
          <FullBleedBrand>
            <figure>
              <div className="flex items-start gap-4">
                <QuoteMark />
                <div>
                  <blockquote className="text-[1.75rem] italic leading-9" style={roman}>
                    {story.quote}
                  </blockquote>
                  <p className={`mt-3 ${subInfo}`} style={ui}>
                    Quote{story.quoteAttribution ? ` · ${story.quoteAttribution}` : ""}
                  </p>
                </div>
              </div>
            </figure>
          </FullBleedBrand>
        ) : null}
        {rest ? <div className="contents">
          {story.format === "quote" && story.whatHappened ? (
            <section>
              <SectionHeading>Who said it</SectionHeading>
              <Body>{story.whatHappened}</Body>
            </section>
          ) : null}
          {story.whoSaidWhat ? (
            <section className={`border-t ${hairline} pt-10`}>
              <SectionHeading>Who said what</SectionHeading>
              <Body>{story.whoSaidWhat}</Body>
            </section>
          ) : null}
          {story.stats.length > 0 ? (
            <FullBleedBrand>
              <section>
                {story.statsHeading ? <SectionHeading rule={false}>{story.statsHeading}</SectionHeading> : null}
                <div className={`grid gap-x-8 gap-y-6 sm:grid-cols-2 ${story.statsHeading ? "mt-8" : ""}`}>
                  {story.stats.map((stat) => (
                    <div key={stat.label} className="border-t border-black/15 pt-4">
                      <p className="text-[2.75rem] leading-none tracking-tight text-black sm:text-[3.25rem]" style={roman}>
                        {stat.value}
                      </p>
                      <p className={`mt-3 ${subInfo}`} style={ui}>
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
                {story.statsNote ? (
                  <p className={`mt-8 max-w-[58ch] border-t ${hairline} pt-4 text-sm leading-5 text-[#6B7280]`} style={ui}>
                    {story.statsNote}
                  </p>
                ) : null}
              </section>
            </FullBleedBrand>
          ) : null}
          {story.whatsNext ? (
            <section className={`border-t ${hairline} pt-10`}>
              <SectionHeading>What’s next?</SectionHeading>
              <Body>{story.whatsNext}</Body>
            </section>
          ) : null}
        </div> : null}
        {framed && place !== "none" ? <InArticleAd wideHide={place === "sides"} /> : null}
      </div>
      {framed && place === "sides" ? (
        <>
          <SideAd align="left" />
          <SideAd align="right" />
        </>
      ) : null}
    </div>
  );
}

const WEEK_SUDOKU = "https://theweek.com/puzzles/medium-sudoku-october-2026";

function VideoStory({ story, place = "none" }: { story: WeekStory; place?: "none" | "sides" | "inline" }) {
  return (
    <div className="relative flex justify-center bg-[#F4F0EA] px-4 py-16 xl:py-20">
      <div className={readColumn}>
        <SectionHeading>Watch</SectionHeading>
        <Body>{story.whatHappened}</Body>
        <figure className="mt-8">
          <video
            id={`${story.id}-player`}
            src={story.videoSrc}
            poster={story.imageSrc}
            controls
            playsInline
            className="aspect-video w-full bg-black"
          />
          <figcaption className="brand-muted-copy mt-2 text-sm leading-5" style={ui}>
            {story.imageCaption}
          </figcaption>
        </figure>
        {place !== "none" ? <div className="mt-16"><InArticleAd wideHide={place === "sides"} /></div> : null}
      </div>
      {place === "sides" ? (
        <>
          <SideAd align="left" />
          <SideAd align="right" />
        </>
      ) : null}
    </div>
  );
}

function PuzzleStory({ story, place = "none" }: { story: WeekStory; place?: "none" | "sides" | "inline" }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://kwizly.com/embed/OLYE9X.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  return (
    <div className="relative flex justify-center bg-[#F4F0EA] px-4 py-16 xl:py-20">
      <div className={readColumn}>
        <p className={kicker} style={uiBold}>
          Today’s puzzle
        </p>
        <h3 className={`mt-4 ${heading}`} style={roman}>
          {story.dek}
        </h3>
        <Body>{story.whatHappened}</Body>
        <div className="kwizly-quiz kwizly-OLYE9X mt-8 min-h-[520px] w-full bg-white" />
        <a href={WEEK_SUDOKU} target="_blank" rel="noopener noreferrer" className={`mt-6 ${weekCta}`}>
          Play on The Week
        </a>
        {place !== "none" ? <div className="mt-16"><InArticleAd wideHide={place === "sides"} /></div> : null}
      </div>
      {place === "sides" ? (
        <>
          <SideAd align="left" />
          <SideAd align="right" />
        </>
      ) : null}
    </div>
  );
}

function coverIndexFor(itemIndex: number, itemCount: number) {
  if (itemCount <= 0) return 0;
  return Math.min(PAPER_COVERS.length - 1, Math.floor((itemIndex * PAPER_COVERS.length) / itemCount));
}

function itemIndexFor(coverIndex: number, itemCount: number) {
  if (itemCount <= 0) return 0;
  return Math.min(itemCount - 1, Math.ceil((coverIndex * itemCount) / PAPER_COVERS.length));
}

function PapersSpread({ story, place = "none" }: { story: WeekStory; place?: "none" | "sides" | "inline" }) {
  const items = story.items ?? [];
  const [active, setActive] = useState(0);
  const [cover, setCover] = useState(0);
  const rows = useRef<Array<HTMLLIElement | null>>([]);
  const lock = useRef(false);
  const shown = PAPER_COVERS[cover] ?? PAPER_COVERS[0];

  useEffect(() => {
    const nodes = rows.current.filter((node): node is HTMLLIElement => Boolean(node));
    if (nodes.length === 0) return;
    const mobile = window.matchMedia("(max-width: 1023px)").matches;
    const observer = new IntersectionObserver(
      (entries) => {
        if (lock.current) return;
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.paper);
        if (Number.isNaN(index)) return;
        setActive(index);
        setCover(coverIndexFor(index, items.length));
      },
      {
        root: mobile ? nodes[0]?.closest<HTMLElement>("[data-column]") ?? null : null,
        rootMargin: mobile ? "-52% 0px -18% 0px" : "-32% 0px -42% 0px",
        threshold: [0.2, 0.45, 0.7],
      },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [items.length]);

  const select = (index: number) => {
    lock.current = true;
    setActive(index);
    setCover(coverIndexFor(index, items.length));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rows.current[index]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    window.setTimeout(() => {
      lock.current = false;
    }, 800);
  };

  const closePaper = (node: HTMLElement) => {
    node.closest<HTMLElement>("[data-column]")?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
    <div className="lg:hidden">
      {PAPER_COVERS.map((item) => (
        <section key={item.src} className="report-paper relative flex snap-start snap-always flex-col bg-black">
          <button type="button" aria-label="Close" onClick={(event) => closePaper(event.currentTarget)} className={`${iconButton} absolute top-3 right-3 z-10 text-white`}>
            <BrandIcon name="close" defaultIcon={X} className="h-5 w-5" />
          </button>
          <div className="relative min-h-0 flex-1">
            <Image src={item.src} alt="" fill sizes="100vw" className="object-contain" />
          </div>
          <div className="shrink-0 px-5 pt-4 pb-8">
            <p className="text-xs font-bold tracking-[0.05em] text-white/70 uppercase" style={uiBold}>
              {item.name}
            </p>
            <h3 className="mt-2 text-2xl leading-8 text-white" style={roman}>
              {item.headline}
            </h3>
          </div>
        </section>
      ))}
    </div>
    <div className={`bg-[#F4F0EA] py-12 xl:py-16 ${pagePad}`}>
      <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          {story.whatHappened ? (
            <p className="max-w-[36ch] text-2xl leading-8" style={roman}>
              {story.whatHappened}
            </p>
          ) : null}
          <ol className={`${story.whatHappened ? "mt-8" : ""} border-t border-black/15`}>
            {items.map((item, index) => {
              const selected = index === active;
              return (
                <li
                  key={item.label}
                  ref={(node) => {
                    rows.current[index] = node;
                  }}
                  data-paper={index}
                  className="border-b border-black/15"
                >
                  <button
                    type="button"
                    onClick={() => select(index)}
                    aria-current={selected ? "true" : undefined}
                    className="flex w-full flex-col items-start py-8 text-left transition-colors duration-200 hover:bg-white/70 lg:min-h-[42vh] lg:py-12"
                  >
                    <span className={kicker} style={uiBold}>
                      {number(index)} · {item.label}
                    </span>
                    <span className="mt-2 max-w-[24ch] text-[2rem] leading-10" style={roman}>
                      {item.text}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          {place !== "none" ? <div className="mt-16"><InArticleAd /></div> : null}
        </div>

        <div className="order-1 hidden lg:order-2 lg:block">
          <div className="sticky top-16 z-10 bg-[#F4F0EA] pb-4">
            <figure>
              <div className="relative aspect-[3/4] overflow-clip bg-[#111]">
                {PAPER_COVERS.map((item, index) => (
                  <Image
                    key={item.src}
                    src={item.src}
                    alt=""
                    fill
                    sizes="40vw"
                    className={`object-cover object-top transition-opacity duration-500 motion-reduce:transition-none ${index === cover ? "opacity-100" : "opacity-0"}`}
                  />
                ))}
                <div className="absolute inset-0 bg-black/30" />
              </div>
              <figcaption className="mt-4">
                <p className={kicker} style={uiBold}>
                  {shown.name}
                </p>
                <p className="mt-2 text-2xl leading-8" style={roman}>
                  {shown.headline}
                </p>
              </figcaption>
            </figure>
            <div className="mt-4 hidden gap-2 overflow-x-auto pb-1 lg:flex" role="tablist" aria-label="Front pages">
              {PAPER_COVERS.map((item, index) => (
                <button
                  key={item.src}
                  type="button"
                  role="tab"
                  aria-selected={index === cover}
                  aria-label={item.name}
                  onClick={() => select(itemIndexFor(index, items.length))}
                  className={`relative h-20 w-16 shrink-0 overflow-clip ${index === cover ? "ring-2 ring-[#DF0A14] ring-offset-2 ring-offset-[#F4F0EA]" : "opacity-45"}`}
                >
                  <Image src={item.src} alt="" fill sizes="64px" className="object-cover object-top" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

function editionTheme(label: string) {
  if (label.startsWith("Evening")) return { ground: "#1254A8", ink: "#FFFFFF", kicker: "Weekdays" };
  if (label.startsWith("Saturday")) return { ground: "#75C298", ink: "#0A0A0A", kicker: "Every Saturday" };
  if (label.startsWith("Sunday")) return { ground: "#F67B76", ink: "#0A0A0A", kicker: "Every Sunday" };
  return { ground: "#83C8C5", ink: "#0A0A0A", kicker: "Weekdays" };
}

function EditionBanner({ label, size = "feature", className = "" }: { label: string; size?: "feature" | "card"; className?: string }) {
  const theme = editionTheme(label);
  return (
    <div className={`${size === "card" ? "px-3 py-2" : "px-4 py-4 sm:px-8"} ${className}`} style={{ background: theme.ground, color: theme.ink }}>
      <p className={`font-bold uppercase tracking-[0.18em] ${size === "card" ? "text-[10px]" : "text-[11px]"}`} style={uiBold}>
        {theme.kicker}
      </p>
      <p className={size === "card" ? "text-[16px] leading-5" : "mt-1 text-[32px] leading-none sm:text-[40px]"} style={roman}>
        {label}
      </p>
    </div>
  );
}

function CoverLock() {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#DF0A14] text-white shadow-[0_8px_24px_rgba(0,0,0,0.28)]">
        <Lock size={22} strokeWidth={2.4} aria-hidden />
        <span className="sr-only">Locked</span>
      </span>
    </div>
  );
}

function TextOnlyDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#F0EAE1]" />
      {/* Quiet geometry — enough depth without competing with type */}
      <div className="absolute -top-24 -right-20 h-[68vmin] w-[68vmin] rounded-full bg-[#E4DCD0]" />
      {/* Brand mark, low opacity — signals The Week without a fake photo plate */}
      <div className="absolute top-[18%] left-1/2 -translate-x-1/2 scale-[2.4] opacity-[0.09] sm:scale-[3]">
        <WeekMark />
      </div>
    </div>
  );
}

function StoryCover({ story, index, edition, locked = false }: { story: WeekStory; index: number; edition?: boolean; locked?: boolean }) {
  const hasMedia = Boolean(story.imageSrc) || (story.format === "video" && Boolean(story.videoSrc));
  const textOnly = !hasMedia && story.format !== "puzzle";

  return (
    <section
      id={story.id}
      data-story
      className={`relative flex h-[calc(100svh-48px)] min-h-[520px] scroll-mt-12 items-end overflow-clip ${
        story.format === "puzzle" || textOnly ? "bg-[#F0EAE1]" : "bg-[#111]"
      }`}
    >
      {story.imageSrc ? (
        <Image
          src={story.imageSrc}
          alt=""
          fill
          priority={index === 0}
          unoptimized={story.imageSrc.startsWith("/") || story.imageSrc.startsWith("http")}
          className={`report-parallax object-cover ${story.id === "tact" ? "object-right" : "object-center"}`}
          sizes="100vw"
        />
      ) : story.format === "video" && story.videoSrc ? (
        <video src={story.videoSrc} muted playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" />
      ) : textOnly ? (
        <TextOnlyDecor />
      ) : null}
      {hasMedia || story.format === "puzzle" ? (
        <div className={`absolute inset-0 ${story.format === "puzzle" ? "bg-gradient-to-t from-black/75 via-black/10 to-transparent" : coverScrim}`} />
      ) : null}
      {locked ? <CoverLock /> : null}
      {story.format === "video" ? (
        <button
          type="button"
          aria-label="Play video"
          onClick={() => {
            const player = document.getElementById(`${story.id}-player`);
            if (!(player instanceof HTMLVideoElement)) return;
            player.scrollIntoView({ behavior: "smooth", block: "center" });
            void player.play();
          }}
          className="absolute top-[42%] left-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black"
        >
          <Play size={28} fill="currentColor" aria-hidden className="ml-1" />
        </button>
      ) : null}
      <div className={`relative z-10 flex w-full flex-col items-center pb-12 text-center sm:pb-16 ${pagePad}`}>
        {edition ? (
          <div className={`mb-8 flex items-center justify-center gap-3 ${textOnly ? "text-black" : "text-white"}`}>
            <WeekMark />
            <span className="text-[14px] font-bold tracking-[0.28em]" style={romanBold}>
              THE WEEK
            </span>
          </div>
        ) : textOnly ? (
          <div className="mb-6">
            <WeekMark />
          </div>
        ) : null}
        <p className={`text-[12px] font-bold tracking-[0.16em] uppercase ${textOnly ? "text-[#011535]" : "text-white"}`} style={uiBold}>
          {edition ? story.chip : (
            <>
              {number(index)}
              <span className={textOnly ? "text-black/45" : "text-white/70"}> · {story.chip}</span>
            </>
          )}
        </p>
        {textOnly ? <div className="mt-4 h-[3px] w-16 bg-[#DF0A14]" aria-hidden /> : null}
        <h2
          className={`mt-4 max-w-[14ch] text-[56px] leading-[0.95] sm:text-[72px] lg:max-w-none lg:whitespace-nowrap ${textOnly ? "text-black" : "text-white"}`}
          style={roman}
        >
          {story.displayTitle}
        </h2>
        <p className={`mt-4 max-w-[36ch] text-[20px] leading-7 ${textOnly ? "text-black/70" : "text-white/90"}`} style={roman}>
          {story.dek}
        </p>
        {story.imageCaption ? (
          <p className={`mt-4 text-sm leading-5 ${textOnly ? "text-black/50" : "text-white/70"}`}>
            {story.imageCaption}
          </p>
        ) : null}
      </div>
    </section>
  );
}

type ArchiveCard = {
  id: string;
  label: string;
  day: number;
  when: string;
  headline: string;
  more: number;
  topics: string;
  image: string;
};

const ARCHIVE_CARDS: ArchiveCard[] = [
  { id: "oct5-am", label: "Morning Report", day: 5, when: "Mon · October", headline: "Will the justices rein in presidential power?", more: 8, topics: "Tech · Culture · The Big Question · Statistic of the Day · What to Watch", image: "/the-week/pike.jpg" },
  { id: "oct5-pm", label: "Evening Review", day: 5, when: "Mon · October", headline: "Is the AI boom a bubble — or just getting started?", more: 8, topics: "Business · Tech · Poll Watch · Picture of the Day · Commentary", image: "/the-week/hero-evening-field.jpg" },
  { id: "oct6-am", label: "Morning Report", day: 6, when: "Tues · October", headline: "A tariff memo rattles Europe", more: 12, topics: "Middle East · International · Speed Reads · Quote of the Day · Under the Radar", image: "/the-week/diplomat.jpg" },
  { id: "oct6-pm", label: "Evening Review", day: 6, when: "Tues · October", headline: "Shutdown brinkmanship goes to the wire", more: 8, topics: "Business · Tech · Under the Radar · Speed Reads · What to Watch", image: "/the-week/meeting-place.jpg" },
  { id: "oct7-am", label: "Morning Report", day: 7, when: "Wed · October", headline: "The governor everyone is suddenly watching", more: 8, topics: "Climate · Business · Puzzles · In the Spotlight · Statistic of the Day", image: "/the-week/texas.jpg" },
  { id: "oct7-pm", label: "Evening Review", day: 7, when: "Wed · October", headline: "A ceasefire holds, barely, through the night", more: 8, topics: "Business · Tech · Poll Watch · Picture of the Day · Commentary", image: "/the-week/camp-david.jpg" },
  { id: "oct8-am", label: "Morning Report", day: 8, when: "Thu · October", headline: "Congress finds a shutdown off-ramp", more: 8, topics: "Politics · Business · Speed Reads · Quote of the Day · Under the Radar", image: "/the-week/cornell.jpg" },
  { id: "oct8-pm", label: "Evening Review", day: 8, when: "Thu · October", headline: "A chip export rule splits the allies", more: 8, topics: "Business · Tech · Under the Radar · Speed Reads · What to Watch", image: "/the-week/spies.png" },
  { id: "oct9-am", label: "Morning Report", day: 9, when: "Fri · October", headline: "The jobs number nobody wanted", more: 8, topics: "Economy · Politics · The Big Question · Statistic of the Day · What to Watch", image: "/the-week/lithuania.jpg" },
  { id: "oct9-pm", label: "Evening Review", day: 9, when: "Fri · October", headline: "Markets close the week still arguing", more: 8, topics: "Business · Culture · Picture of the Day · Commentary · What to Watch", image: "/the-week/six-flags.jpg" },
  { id: "oct10-sat", label: "Saturday Wrap", day: 10, when: "Sat · October", headline: "The week the shutdown clock ran out", more: 8, topics: "Climate · Business · The Week in Cartoons · Good Week / Bad Week · The Big Picture", image: "/the-week/hero-saturday-field.jpg" },
  { id: "oct11-sun", label: "Sunday Shortlist", day: 11, when: "Sun · October", headline: "What we lose when local news disappears", more: 8, topics: "International · Legal · Perspectives · The Long Read · The Week Recommends", image: "/the-week/hero-sunday-field.jpg" },
];

function Recirculation() {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const syncEdges = () => {
    const root = scrollerRef.current;
    if (!root) return;
    setAtStart(root.scrollLeft < 8);
    setAtEnd(root.scrollLeft + root.clientWidth >= root.scrollWidth - 8);
  };

  useEffect(() => {
    syncEdges();
  }, []);

  const go = (direction: -1 | 1) => {
    const root = scrollerRef.current;
    const card = root?.querySelector("li");
    if (!root || !card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.scrollBy({ left: direction * (card.getBoundingClientRect().width + 29), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section className={`bg-[#F4F0EA] py-16 xl:py-20 ${pagePad}`} aria-label="Previous editions">
      <div className="flex flex-col gap-[30px]">
        <h2 className="text-[40px] leading-[48px] text-black lg:text-[60px] lg:leading-[72px]" style={roman}>
          Previous editions
        </h2>
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Previous editions"
            disabled={atStart}
            onClick={() => go(-1)}
            className="inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[5px] border border-black text-black disabled:opacity-30"
          >
            <ChevronLeft size={16} aria-hidden />
          </button>
          <p className="flex flex-wrap items-end gap-x-[15px]">
            <span className="text-[20px] leading-[26px] text-black" style={roman}>
              This Week
            </span>
            <span className="brand-muted-copy text-base leading-6" style={ui}>
              5–11 October · 12 editions
            </span>
          </p>
          <button
            type="button"
            aria-label="Next editions"
            disabled={atEnd}
            onClick={() => go(1)}
            className="inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[5px] border border-black text-black disabled:opacity-30"
          >
            <ChevronRight size={16} aria-hidden />
          </button>
        </div>
        <ul
          ref={scrollerRef}
          onScroll={syncEdges}
          className="flex snap-x snap-mandatory gap-[29px] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {ARCHIVE_CARDS.map((card) => (
            <li key={card.id} className="w-[78%] shrink-0 snap-start sm:w-[calc((100%-29px)/2.15)] lg:w-[calc((100%-87px)/4.15)] xl:w-[calc((100%-116px)/5.15)]">
              <Link href="/the-week" className="block">
                <div className="relative aspect-square overflow-clip bg-[#111]">
                  <Image src={card.image} alt="" fill sizes="280px" className="object-cover" />
                  <span className={`absolute inset-0 ${coverScrim}`} />
                  <EditionBanner label={card.label} size="card" className="absolute inset-x-0 top-0" />
                  <span className="absolute top-[43%] left-3 text-[#F9FAFB]">
                    <span className="block text-[72px] leading-none sm:text-[128px] sm:leading-[140px]" style={roman}>
                      {card.day}
                    </span>
                    <span className="block text-[16px] leading-6" style={roman}>
                      {card.when}
                    </span>
                  </span>
                </div>
                <span className="mt-3 flex flex-col gap-3">
                  <span>
                    <span className="block text-[16px] leading-6 text-[#4B5563] uppercase" style={ui}>
                      top story
                    </span>
                    <span className="mt-2 block min-h-12 text-base leading-6 text-black" style={roman}>
                      {card.headline}
                    </span>
                  </span>
                  <span className="block h-px bg-black/12" />
                  <span>
                    <span className="block text-[16px] leading-6 text-black" style={roman}>
                      + {card.more} more inside
                    </span>
                    <span className="mt-1.5 block text-[16px] leading-6 text-[#4B5563]" style={ui}>
                      {card.topics}
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}


export type SourcePeriod = {
  id: string;
  label: string;
  detail: string;
  citations: number;
  uses: { name: string; count: number }[];
  topics: { label: string; count: number }[];
};

function outletMark(name: string) {
  const words = name.replace(/^The\s+/i, "").split(/\s+/).filter(Boolean);
  const a = words[0]?.[0] ?? "?";
  const b = words[1]?.[0] ?? words[0]?.[1] ?? "";
  return `${a}${b}`.toUpperCase();
}

function SourceMark({ name, size = 44 }: { name: string; size?: number }) {
  const [failed, setFailed] = useState(false);
  const src = outletLogo(name);

  if (!src || failed) {
    return (
      <span
        className="inline-flex shrink-0 items-center justify-center bg-[#DF0A14] text-[13px] font-bold tracking-wide text-white"
        style={{ ...uiBold, width: size, height: size }}
        aria-hidden
      >
        {outletMark(name)}
      </span>
    );
  }

  return (
    <span className="relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-white" style={{ width: size, height: size }}>
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        unoptimized
        className="object-contain p-1.5"
        onError={() => setFailed(true)}
      />
    </span>
  );
}

function BriefingSources({ periods }: { periods: SourcePeriod[] }) {
  const period = periods.find((item) => item.id === "week") ?? periods[0];
  if (!period) return null;

  return (
    <section aria-label="Sources behind this briefing" className={`w-full ${softPanel} py-16`}>
      <div className={`mx-auto px-4 ${readColumn}`}>
        <h2 className={heading} style={roman}>
          Sources behind this briefing
        </h2>
        <p className="mt-4 max-w-[68ch] text-base leading-6 text-black/70" style={ui}>
          Built to be trustworthy and transparent: every story shows the outlets we drew from, so you can judge the reporting for yourself.
        </p>
        <a href="/report?sources=1" target="_blank" rel="noopener noreferrer" className={`mt-6 ${weekCta}`}>
          View sources
          <ChevronRight size={14} aria-hidden />
        </a>
        <div className="mt-8 flex items-center gap-4">
          <p className={`shrink-0 ${subInfo}`} style={ui}>
            Cited this week
          </p>
          <div className="h-px min-w-8 flex-1 bg-black/12" />
        </div>
      </div>
      <ul className="report-cards mt-4 flex gap-3 overflow-x-auto px-4 pb-1 sm:px-8">
        {period.uses.map((source) => (
          <li
            key={source.name}
            className="flex w-[210px] shrink-0 flex-col items-start gap-4 border border-black/10 bg-white px-4 py-4"
          >
            <SourceMark name={source.name} size={52} />
            <span>
              <span className="block text-base leading-6 text-black" style={romanBold}>
                {source.name}
              </span>
              <span className={`mt-1 block ${subInfo}`} style={ui}>
                {source.count} {source.count === 1 ? "citation" : "citations"}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SourcesChart({ periods }: { periods: SourcePeriod[] }) {
  const [periodId, setPeriodId] = useState(periods.find((item) => item.id === "week")?.id ?? periods[0]?.id ?? "week");
  const period = periods.find((item) => item.id === periodId) ?? periods[0];
  if (!period) return null;
  const topUse = period.uses[0]?.count ?? 1;

  return (
    <>
    <style>{`
        .report-page .brand-muted-copy { font-family: Arial, Helvetica, sans-serif; font-weight: 400; }
        .report-page .chip-brand { border-color: var(--brand-icon-muted); background-color: var(--brand-surface-primary); color: var(--brand-text-secondary); }
        .report-page .chip-brand:hover { border-color: var(--brand-text-primary); background-color: var(--brand-border-default); color: var(--brand-text-primary); }
        .report-page .chip-brand-selected,
        .report-page .chip-brand-selected:hover { border-color: #DF0A14; background-color: #DF0A14; color: #FAFAFA; }
    `}</style>
    <section aria-label="Sources behind this briefing" className="report-page min-h-dvh bg-[#F4F0EA]">
      <WeekSiteHeader />
      <div className="sticky top-0 z-10 flex justify-end bg-[#F4F0EA] px-4 py-3">
        <Link href="/report" aria-label="Back to the briefing" className={iconButton}>
          <BrandIcon name="close" defaultIcon={X} className="h-5 w-5" />
        </Link>
      </div>
      <div className={`mx-auto flex justify-center px-4 pb-16 ${readColumn}`}>
        <div className="w-full">
        <p className={kicker} style={uiBold}>
          Sources
        </p>
        <h2 className={`mt-4 ${heading}`} style={roman}>
          Behind this briefing
        </h2>
        <p className="mt-4 text-base leading-6 text-black/70" style={ui}>
          Trustworthy because the citations are open. Transparent because you can see every outlet we used — {period.citations} citations from {period.uses.length} outlets. {period.detail}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {periods.map((item) => (
            <Chip
              key={item.id}
              as="button"
              label={item.label}
              selected={item.id === period.id}
              aria-pressed={item.id === period.id}
              onClick={() => setPeriodId(item.id)}
            />
          ))}
        </div>
        <ul className={`mt-10 divide-y divide-black/10 border-y ${hairline}`}>
          {period.uses.map((source) => (
            <li key={source.name} className="flex items-center gap-4 py-5">
              <SourceMark name={source.name} size={48} />
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-3 text-base leading-6" style={roman}>
                  <span className="min-w-0">{source.name}</span>
                  <span className="shrink-0 text-[#011535]" style={uiBold}>{source.count}</span>
                </span>
                <span className="mt-2 block h-1.5 overflow-hidden bg-[#F0EAE1]">
                  <span className="block h-full bg-[#011535]" style={{ width: `${Math.max(8, (source.count / topUse) * 100)}%` }} />
                </span>
              </span>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </section>
    </>
  );
}

function StoryBody({ story, locked = false, lead = false, place = "none" }: { story: WeekStory; locked?: boolean; lead?: boolean; place?: "none" | "sides" | "inline" }) {
  if (locked && lead && story.format !== "papers" && story.format !== "video" && story.format !== "puzzle") {
    return (
      <>
        <StoryReading story={story} part="hook" place={place} />
        <CaptureGate>
          <StoryReading story={story} part="rest" />
        </CaptureGate>
      </>
    );
  }
  if (locked && !lead) {
    return (
      <CaptureGate>
        <p className="text-2xl leading-8" style={roman}>{story.dek}</p>
        {story.whatHappened ? <p className="text-base leading-6" style={roman}>{story.whatHappened}</p> : null}
      </CaptureGate>
    );
  }
  if (story.format === "papers") return <PapersSpread story={story} place={place} />;
  if (story.format === "video") return <VideoStory story={story} place={place} />;
  if (story.format === "puzzle") return <PuzzleStory story={story} place={place} />;
  return <StoryReading story={story} place={place} />;
}


export function ReportBriefing({
  stories,
  briefing,
  caughtUp,
  periods,
  sourcesView = false,
  locked = false,
  ads = false,
}: {
  stories: WeekStory[];
  briefing: string;
  caughtUp: string;
  periods: SourcePeriod[];
  sourcesView?: boolean;
  locked?: boolean;
  ads?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [down, setDown] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const total = number(Math.max(stories.length - 1, 0));

  useEffect(() => {
    const onScroll = () => {
      if (window.matchMedia("(max-width: 767px)").matches) return;
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      setProgress(max > 0 ? Math.min(1, root.scrollTop / max) : 0);
      const line = window.innerHeight * 0.4;
      let current = 0;
      document.querySelectorAll<HTMLElement>("[data-story]").forEach((section, storyIndex) => {
        if (section.getClientRects().length === 0) return;
        if (section.getBoundingClientRect().top < line) current = storyIndex;
      });
      indexRef.current = current;
      setIndex(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const slides = [...rail.querySelectorAll<HTMLElement>("[data-slide]")];
    const onRail = () => {
      const width = Math.max(rail.clientWidth, 1);
      const slide = Math.min(slides.length - 1, Math.max(0, Math.round(rail.scrollLeft / width)));
      const current = slides[slide];
      const storyAttr = current?.dataset.column;
      if (storyAttr != null) {
        const next = Number(storyAttr);
        indexRef.current = next;
        setIndex(next);
        setDown((current.scrollTop ?? 0) > 48);
      } else {
        setDown(false);
      }
    };
    const onColumn = () => {
      const current = slides.find((slide) => slide.dataset.column === String(indexRef.current));
      setDown((current?.scrollTop ?? 0) > 48);
    };
    let startX = 0;
    let startY = 0;
    let decided = false;
    let horizontal = false;
    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      startX = touch.clientX;
      startY = touch.clientY;
      decided = false;
      horizontal = false;
    };
    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      if (!decided) {
        if (Math.abs(dx) < 12 && Math.abs(dy) < 12) return;
        decided = true;
        horizontal = Math.abs(dx) > Math.abs(dy);
      }
      if (horizontal) event.preventDefault();
    };
    const onTouchEnd = (event: TouchEvent) => {
      const touch = event.changedTouches[0];
      if (!touch || !horizontal) return;
      const dx = touch.clientX - startX;
      if (Math.abs(dx) < 48) return;
      const width = Math.max(rail.clientWidth, 1);
      const current = Math.round(rail.scrollLeft / width);
      const target = Math.min(slides.length - 1, Math.max(0, current + (dx < 0 ? 1 : -1)));
      rail.scrollTo({ left: target * width, behavior: "smooth" });
    };
    const storiesInRail = slides.filter((slide) => slide.dataset.column != null);
    onRail();
    rail.addEventListener("scroll", onRail, { passive: true });
    rail.addEventListener("touchstart", onTouchStart, { passive: true });
    rail.addEventListener("touchmove", onTouchMove, { passive: false });
    rail.addEventListener("touchend", onTouchEnd);
    storiesInRail.forEach((column) => column.addEventListener("scroll", onColumn, { passive: true }));
    return () => {
      rail.removeEventListener("scroll", onRail);
      rail.removeEventListener("touchstart", onTouchStart);
      rail.removeEventListener("touchmove", onTouchMove);
      rail.removeEventListener("touchend", onTouchEnd);
      storiesInRail.forEach((column) => column.removeEventListener("scroll", onColumn));
    };
  }, [ads, stories.length]);

  const goTo = (next: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const clamped = Math.min(stories.length - 1, Math.max(0, next));
    const column = rail.querySelector<HTMLElement>(`[data-column="${clamped}"]`);
    if (!column) return;
    rail.scrollTo({ left: column.offsetLeft, behavior: "smooth" });
    column.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goSlide = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const width = Math.max(rail.clientWidth, 1);
    const slides = rail.querySelectorAll("[data-slide]");
    const current = Math.round(rail.scrollLeft / width);
    const target = Math.min(slides.length - 1, Math.max(0, current + direction));
    rail.scrollTo({ left: target * width, behavior: "smooth" });
  };

  const jump = (id: string) => {
    setOpen(false);
    const slide = document.getElementById(`feed-${id}`);
    const desktop = document.getElementById(id);
    if (slide && railRef.current && slide.getClientRects().length > 0) {
      slide.scrollTo({ top: 0, behavior: "smooth" });
      railRef.current.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
      return;
    }
    desktop?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const storyIndex = (id: string) => (
    <nav id={id} aria-label="Stories in this briefing" className="flex max-h-[70vh] flex-col bg-[#F4F0EA]">
      <div className="brand-soft-border flex items-center justify-between gap-4 border-b px-5 py-4">
        <p className="brand-label-copy text-xs">In this report</p>
        <div className="flex items-center gap-2">
          <p className="brand-muted-copy text-sm" style={ui}>
            {number(index)} of {total}
          </p>
          <button type="button" aria-label="Close" onClick={() => setOpen(false)} className={iconButton}>
            <BrandIcon name="close" defaultIcon={X} className="h-5 w-5" />
          </button>
        </div>
      </div>
      <ol className="min-h-0 flex-1 overflow-y-auto">
        {stories.map((story, storyIndex) => {
          const current = storyIndex === index;
          return (
            <li key={story.id} data-index-item={storyIndex} className="brand-soft-border border-b last:border-b-0">
              <button
                type="button"
                onClick={() => jump(story.id)}
                aria-current={current ? "true" : undefined}
                className={`group flex w-full items-start gap-4 border-l-2 px-4 py-4 text-left transition-colors hover:bg-[#F0EAE1] focus-visible:bg-[#F0EAE1] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#DF0A14] ${current ? "border-[#DF0A14] bg-white" : "border-transparent"}`}
              >
                <span className={`w-8 shrink-0 text-base leading-6 ${current ? "text-[#DF0A14]" : "text-[#9CA3AF] group-hover:text-[#DF0A14]"}`} style={roman}>
                  {number(storyIndex)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block text-[16px] leading-6 ${current ? "text-[var(--brand-text-primary)]" : "text-[var(--brand-text-primary)]"}`} style={roman}>
                    {story.menuTitle}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );

  if (sourcesView) return <SourcesChart periods={periods} />;

  return (
    <>
      <style>{`
        @keyframes report-parallax {
          from { transform: translate3d(0, -8%, 0) scale(1.18); }
          to { transform: translate3d(0, 8%, 0) scale(1.18); }
        }
        .report-parallax {
          animation: report-parallax linear both;
          animation-timeline: view();
          animation-range: cover 0% cover 100%;
        }
        @media (prefers-reduced-motion: reduce) {
          .report-parallax { animation: none; }
        }
        .report-crumbs {
          --ui-breadcrumbs-color: color-mix(in srgb, var(--brand-text-primary) 80%, transparent);
          --ui-breadcrumbs-font-weight: 500;
          --ui-breadcrumbs-letter-spacing: 0.01em;
          --ui-breadcrumb-link-color: color-mix(in srgb, var(--brand-text-primary) 80%, transparent);
          --ui-breadcrumb-link-hover-color: #DF0A14;
          --ui-breadcrumb-link-focus-visible-outline-color: #DF0A14;
          --ui-breadcrumb-separator-color: color-mix(in srgb, var(--brand-text-primary) 50%, transparent);
          --ui-breadcrumb-current-color: #DF0A14;
        }
        .report-page .brand-icon-button:hover,
        .report-page .brand-icon-button:focus {
          background-color: #F0EAE1;
          color: #DF0A14;
        }
        .report-page .brand-scroll-arrow {
          border-radius: 9999px;
          background-color: rgb(255 255 255 / 0.4);
          color: #1F2937;
          backdrop-filter: blur(2px);
        }
        .report-page .brand-scroll-arrow:hover {
          background-color: rgb(255 255 255 / 0.62);
          color: #0A0A0A;
        }
        .report-page .brand-scroll-arrow--hero {
          border-radius: 9999px;
          background-color: rgb(255 255 255 / 0.18);
          color: #fff;
          backdrop-filter: blur(4px);
        }
        .report-page .brand-scroll-arrow--hero:hover {
          background-color: rgb(255 255 255 / 0.28);
          color: #fff;
          opacity: 1;
        }
        .report-page .brand-muted-copy { font-family: Arial, Helvetica, sans-serif; font-weight: 400; }
        .report-page .chip-brand {
          border-color: var(--brand-icon-muted);
          background-color: var(--brand-surface-primary);
          color: var(--brand-text-secondary);
        }
        .report-page .chip-brand:hover {
          border-color: var(--brand-text-primary);
          background-color: var(--brand-border-default);
          color: var(--brand-text-primary);
        }
        .report-page .chip-brand-selected,
        .report-page .chip-brand-selected:hover {
          border-color: #DF0A14;
          background-color: #DF0A14;
          color: #FAFAFA;
        }
        .report-feed { container-type: size; }
        .report-paper { height: 100cqh; }
        .report-feed, .report-article, .report-end, .report-cards { scrollbar-width: none; }
        .report-feed::-webkit-scrollbar, .report-article::-webkit-scrollbar, .report-end::-webkit-scrollbar, .report-cards::-webkit-scrollbar { display: none; }
      `}</style>
      <div className="report-page relative flex h-dvh flex-col md:hidden">
        <WeekSiteHeader />
        <header className="relative z-20 shrink-0 bg-white text-[#0A0A0A]" style={roman}>
          <div className="flex gap-1 px-3 pt-2" aria-hidden>
            {stories.map((story, storyIndex) => (
              <span
                key={story.id}
                className={`h-[3px] flex-1 rounded-full ${storyIndex === index ? "bg-[#DF0A14]" : storyIndex < index ? "bg-[#0A0A0A]" : "bg-black/15"}`}
              />
            ))}
          </div>
          <div className="brand-soft-border flex h-11 items-center gap-3 border-b px-4">
            <nav aria-label="Place in the briefing" className="report-crumbs brand-breadcrumbs min-w-0 flex-1 text-xs">
              <ol className="flex min-w-0 items-center gap-1">
                <li className="shrink-0">
                  <a href={`#feed-${stories[0]?.id ?? ""}`} className="brand-breadcrumb-link">
                    The Week
                  </a>
                </li>
                <li className="inline-flex shrink-0 items-center gap-1">
                  <span className="brand-breadcrumb-separator" aria-hidden>
                    /
                  </span>
                  <span>{briefing}</span>
                </li>
                <li className="inline-flex min-w-0 items-center gap-1">
                  <span className="brand-breadcrumb-separator" aria-hidden>
                    /
                  </span>
                  <span className="brand-breadcrumb-current truncate">
                    {number(index)}/{total}
                  </span>
                </li>
              </ol>
            </nav>
            <button
              type="button"
              aria-label="In this report"
              aria-expanded={open}
              aria-controls="story-index-feed"
              onClick={() => setOpen((value) => !value)}
              className={`${iconButton} shrink-0`}
            >
              <MenuMark />
            </button>
          </div>
        </header>
        <div ref={railRef} className="report-article flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto overscroll-x-contain bg-[#F4F0EA]">
          {stories.map((story, storyIndex) => {
            const next = stories[storyIndex + 1];
            return (
              <Fragment key={story.id}>
              <section id={`feed-${story.id}`} data-slide data-column={storyIndex} className="report-feed h-full w-full shrink-0 snap-start snap-always overflow-x-clip overflow-y-auto overscroll-y-contain snap-y snap-proximity">
                {(() => {
                  const hasMedia = Boolean(story.imageSrc) || (story.format === "video" && Boolean(story.videoSrc));
                  const textOnly = !hasMedia && story.format !== "puzzle";
                  return (
                <div className={`relative h-full snap-start overflow-clip ${textOnly ? "bg-[#F0EAE1]" : "bg-[#111]"}`}>
                  {story.format === "video" && story.videoSrc ? (
                    <video src={story.videoSrc} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
                  ) : story.imageSrc ? (
                    <Image
                      src={story.imageSrc}
                      alt=""
                      fill
                      priority={storyIndex === 0}
                      unoptimized={story.imageSrc.startsWith("/") || story.imageSrc.startsWith("http")}
                      className={`object-cover ${story.id === "tact" ? "object-right" : ""}`}
                      sizes="100vw"
                    />
                  ) : textOnly ? (
                    <TextOnlyDecor />
                  ) : null}
                  {hasMedia ? <div className={`absolute inset-0 ${coverScrim}`} /> : null}
                  {locked && storyIndex > 0 ? <CoverLock /> : null}
                  <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-12 pb-24 text-center">
                    {textOnly ? (
                      <div className="mb-5">
                        <WeekMark />
                      </div>
                    ) : null}
                    <p className={`text-[12px] font-bold tracking-[0.16em] uppercase ${textOnly ? "text-[#011535]" : "text-white"}`} style={uiBold}>
                      {number(storyIndex)}
                      <span className={textOnly ? "text-black/45" : "text-white/70"}> · {story.chip}</span>
                    </p>
                    {textOnly ? <div className="mt-4 h-[3px] w-16 bg-[#DF0A14]" aria-hidden /> : null}
                    <h2 className={`mt-4 max-w-[12ch] text-[2.625rem] leading-none ${textOnly ? "text-black" : "text-white"}`} style={roman}>
                      {story.displayTitle}
                    </h2>
                    <p className={`mt-3 line-clamp-2 max-w-[32ch] text-[16px] leading-6 ${textOnly ? "text-black/70" : "text-white/90"}`} style={roman}>
                      {story.dek}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(event) => {
                      const column = event.currentTarget.closest<HTMLElement>("[data-column]");
                      column?.scrollTo({ top: column.clientHeight, behavior: "smooth" });
                    }}
                    className={`absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 transition-opacity duration-200 hover:opacity-70 ${textOnly ? "text-[#011535]" : "text-white"}`}
                  >
                    <BrandIcon name="chevronDown" defaultIcon={ChevronDown} className="h-6 w-6" />
                    <span className="text-[11px] font-bold tracking-[0.16em] uppercase" style={uiBold}>
                      Story
                    </span>
                  </button>
                </div>
                  );
                })()}
                <StoryBody story={story} locked={locked} lead={storyIndex === 0} place={ads ? "inline" : "none"} />
                {next ? (
                  <button type="button" onClick={() => goTo(storyIndex + 1)} className="flex w-full items-center gap-4 bg-[#011535] px-5 py-4 text-left text-white transition-colors duration-200 hover:bg-[#0A2744]">
                    <span className="relative h-16 w-16 shrink-0 overflow-hidden bg-[#F0EAE1]">
                      {next.imageSrc ? (
                        <>
                          <Image src={next.imageSrc} alt="" fill unoptimized={next.imageSrc.startsWith("/") || next.imageSrc.startsWith("http")} className="object-cover" sizes="64px" />
                          <span className={`absolute inset-0 ${coverScrim}`} aria-hidden />
                        </>
                      ) : (
                        <span className="absolute inset-0 flex items-end justify-start p-2" aria-hidden>
                          <span className="text-[10px] font-bold tracking-[0.12em] text-[#011535] uppercase" style={uiBold}>
                            {next.chip}
                          </span>
                        </span>
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] font-bold tracking-[0.16em] text-white/70 uppercase" style={uiBold}>
                        Next story
                      </span>
                      <span className="mt-2 block text-2xl leading-8" style={roman}>
                        {next.displayTitle}
                      </span>
                    </span>
                    <BrandIcon name="chevronRight" defaultIcon={ChevronRight} className="h-5 w-5 shrink-0 text-white" />
                  </button>
                ) : (
                  <>
                  <BriefingSources periods={periods} />
                  <div className="flex min-h-[40vh] flex-col justify-center bg-white px-5 py-16">
                    <p className="text-[12px] font-bold tracking-[0.16em] text-[#DF0A14] uppercase" style={uiBold}>
                      {briefing}
                    </p>
                    <h2 className="mt-4 text-[2.625rem] leading-none text-[#011535]" style={roman}>
                      You’re all caught up.
                    </h2>
                    <p className="mt-4 text-base leading-6 text-[#011535]" style={roman}>
                      {caughtUp}
                    </p>
                  </div>
                  <Recirculation />
                  </>
                )}
              </section>
              {ads && storyIndex === 5 ? (
                <section data-slide aria-label="Advertisement" className={`report-feed flex h-full w-full shrink-0 snap-start snap-always items-center justify-center ${softPanel}`}>
                  <p className="text-[12px] tracking-[0.14em] text-[#6B7280] uppercase" style={ui}>
                    Advertisement
                  </p>
                </section>
              ) : null}
              </Fragment>
            );
          })}
        </div>
        <button
          type="button"
          aria-label="Previous story"
          onClick={() => goSlide(-1)}
          className={`absolute! top-1/2 left-1 z-30 -translate-y-1/2 ${down ? "brand-scroll-arrow" : "brand-scroll-arrow brand-scroll-arrow--hero"} ${index === 0 ? "hidden" : ""}`}
        >
          <BrandIcon name="chevronLeft" defaultIcon={ChevronLeft} className="h-6 w-6" />
        </button>
        <button
          type="button"
          aria-label="Next story"
          onClick={() => goSlide(1)}
          className={`absolute! top-1/2 right-1 z-30 -translate-y-1/2 ${down ? "brand-scroll-arrow" : "brand-scroll-arrow brand-scroll-arrow--hero"} ${index === stories.length - 1 ? "hidden" : ""}`}
        >
          <BrandIcon name="chevronRight" defaultIcon={ChevronRight} className="h-6 w-6" />
        </button>
        {open ? (
          <>
            <button type="button" aria-label="Close story list" className="fixed inset-0 z-40 bg-black/50" onClick={() => setOpen(false)} />
            <div className="fixed inset-x-0 bottom-0 z-50 max-h-[75dvh] overflow-hidden rounded-t-2xl">{storyIndex("story-index-feed")}</div>
          </>
        ) : null}
      </div>
      <div className="report-page hidden md:block">
      <WeekSiteHeader />
      <div className="flex items-center justify-between gap-6 border-b border-black/10 bg-[#F4F0EA] px-5 py-2">
        <p className="text-[12px] leading-none text-[#6B7280]" style={ui}>
          Version
        </p>
        <nav aria-label="Version" className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[12px] leading-none text-[#9CA3AF]" style={ui}>
          <Link href="/the-week" className="hover:text-[#374151] hover:underline">
            Prototype
          </Link>
          <span aria-hidden>·</span>
          <Link href="/article" className="hover:text-[#374151] hover:underline">
            Article
          </Link>
          <span aria-hidden>·</span>
          <Link href="/premium" className="hover:text-[#374151] hover:underline">
            Premium
          </Link>
          <span aria-hidden>·</span>
          {locked ? <Link href="/report" className="hover:text-[#374151] hover:underline">Report</Link> : <span className="text-[#6B7280]">Report</span>}
          <span aria-hidden>·</span>
          {locked ? <span className="text-[#6B7280]">Locked</span> : <Link href="/report?locked=1" className="hover:text-[#374151] hover:underline">Locked</Link>}
          <span aria-hidden>·</span>
          {ads ? <span className="text-[#6B7280]">Ads</span> : <Link href="/report?ads=1" className="hover:text-[#374151] hover:underline">Ads</Link>}
          <span aria-hidden className="max-sm:hidden">
            ·
          </span>
          <Link href="/browser" className="hover:text-[#374151] hover:underline max-sm:hidden">
            Browser
          </Link>
          <span aria-hidden className="max-sm:hidden">
            ·
          </span>
          <Link href="/email" className="hover:text-[#374151] hover:underline max-sm:hidden">
            Email
          </Link>
        </nav>
      </div>
      <div className="sticky top-0 z-40 bg-white">
        <div className="h-[3px] bg-black/10" aria-hidden>
          <div className="h-full bg-[#DF0A14]" style={{ width: `${progress * 100}%` }} />
        </div>
        <div className={`brand-soft-border flex h-11 items-center gap-3 border-b bg-white ${pagePad}`} style={roman}>
          <nav aria-label="Place in the briefing" className="report-crumbs brand-breadcrumbs min-w-0 flex-1 text-xs">
            <ol className="flex min-w-0 items-center gap-1">
              <li className="shrink-0">
                <a href={`#${stories[0]?.id ?? ""}`} className="brand-breadcrumb-link">
                  The Week
                </a>
              </li>
              <li className="inline-flex shrink-0 items-center gap-1">
                <span className="brand-breadcrumb-separator" aria-hidden>
                  /
                </span>
                <span>{briefing}</span>
              </li>
              <li className="inline-flex min-w-0 items-center gap-1">
                <span className="brand-breadcrumb-separator" aria-hidden>
                  /
                </span>
                <span className="brand-breadcrumb-current truncate">
                  {number(index)}/{total}
                </span>
              </li>
            </ol>
          </nav>
          <div className="relative">
          <button
            type="button"
            aria-expanded={open}
            aria-controls="story-index"
            onClick={() => setOpen((value) => !value)}
            className="brand-label-copy relative z-50 inline-flex min-h-11 items-center gap-2 px-2 text-xs transition-colors duration-200 hover:text-[#DF0A14]"
          >
            In this report
            <span aria-hidden className={`text-[10px] transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
          </button>
          {open ? (
            <>
              <button type="button" aria-label="Close story list" className="fixed inset-0 z-40 cursor-default bg-black/20" onClick={() => setOpen(false)} />
              <div className="absolute top-full right-0 z-50 mt-1 w-[min(420px,calc(100vw-24px))] overflow-hidden border border-black/10 bg-[#F4F0EA] shadow-[0_18px_40px_rgba(10,10,10,0.16)]">
                {storyIndex("story-index")}
              </div>
            </>
          ) : null}
          </div>
        </div>
      </div>

      {stories.map((story, storyIndex) => (
        <div key={story.id}>
          <StoryCover story={story} index={storyIndex} edition={storyIndex === 0} locked={locked && storyIndex > 0} />
          <StoryBody story={story} locked={locked} lead={storyIndex === 0} place={ads ? "sides" : "none"} />
          {ads && storyIndex === 0 ? <FullBleedAd tall="screen" /> : null}
        </div>
      ))}

      <BriefingSources periods={periods} />
      <section className="flex min-h-[40vh] items-center justify-center bg-white px-4 py-20">
        <div className={readColumn}>
          <p className="text-[12px] font-bold tracking-[0.16em] text-[#DF0A14] uppercase" style={uiBold}>
            {briefing}
          </p>
          <h2 className="mt-4 text-[2.625rem] leading-10 text-[#011535]" style={roman}>
            You’re all caught up.
          </h2>
          <p className="mt-4 text-base leading-6 text-[#011535]" style={roman}>
            {caughtUp}
          </p>
        </div>
      </section>
      <Recirculation />
      </div>
    </>
  );
}
