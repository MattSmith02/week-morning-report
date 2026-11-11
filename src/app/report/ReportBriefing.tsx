"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Lock, Play, X } from "lucide-react";
import Chip from "@/components/atoms/Chip/Chip";
import { BrandScrollArrow } from "@/components/atoms/BrandScrollArrow/BrandScrollArrow";
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
/** Shared digest type scale — hero mirrors body */
const typeEyebrow = "text-[11px] font-bold tracking-[0.14em] uppercase";
const typeEdition = "text-[clamp(2.35rem,3.2vw,2.75rem)] leading-[1.1]";
const typeLabel = "text-[11px] font-bold tracking-[0.12em] uppercase";
const typeQuestion = "text-[clamp(1.85rem,2.8vw,2.35rem)] leading-[1.12]";
const typeBodyLg = "text-[17px] leading-7";
const typeQuote = "text-[1.75rem] italic leading-9";
const typeAttr = "text-[15px] leading-6";
const digestArticleTitle = typeQuestion;
const digestArticleTitleLead = typeEdition;
const digestSectionTitle = "text-[1.35rem] leading-8 text-[var(--brand-text-primary,#0f172b)] sm:text-[1.5rem] sm:leading-9";
const digestBodyCopy = `${typeBodyLg} text-[var(--brand-text-secondary,#45556c)]`;
const digestRule = "mt-2 h-px w-12 bg-[#DF0A14]";
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
    src: "/the-week/sources/nyt-morning.jpg",
    name: "The New York Times",
    headline: "Trump’s push to war turns into retreat",
  },
  {
    src: "/the-week/sources/guardian-front.jpg",
    name: "The Guardian",
    headline: "Alarm as MI5 names China spy suspects targeting MPs",
  },
  {
    src: "/the-week/sources/ft-2021.jpg",
    name: "Financial Times",
    headline: "Tension, turnover, unmet goals bedevil Treasury under Bessent",
  },
  {
    src: "/the-week/sources/bloomberg-2026.jpg",
    name: "USA Today",
    headline: "Consumer sentiment down despite positive reports",
  },
  {
    src: "/the-week/sources/atlantic-2026.jpg",
    name: "The Washington Post",
    headline: "B-1 pullout shows wily tactics of a weaker foe",
  },
  {
    src: "/the-week/sources/week-2024.jpg",
    name: "The Week",
    headline: "England’s dirty water",
  },
  {
    src: "/the-week/sources/economist-cover.jpg",
    name: "The Philadelphia Inquirer",
    headline: "Ukraine claws back land in the Donbas",
  },
  {
    src: "/the-week/sources/time-2026.jpg",
    name: "Houston Chronicle",
    headline: "Israelis mourn those lost on the anniversary of the Oct. 7 attacks",
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

function QuoteBlock({ story, layout = "classic" }: { story: WeekStory; layout?: ReportLayout }) {
  if (!story.quote) return null;
  const digest = layout === "digest";
  return (
    <figure>
      <div className="flex items-start gap-4">
        <QuoteMark />
        <div>
          <blockquote className={digest ? `${typeQuote} text-black` : "text-[1.75rem] italic leading-9 text-black"} style={roman}>
            {story.quote}
          </blockquote>
          <p className={digest ? `mt-3 ${typeAttr} text-[#374151]` : `mt-3 ${subInfo}`} style={digest ? roman : ui}>
            Quote{story.quoteAttribution ? ` · ${story.quoteAttribution}` : ""}
          </p>
        </div>
      </div>
    </figure>
  );
}

function StoryReading({
  story,
  part = "all",
  place = "none",
  layout = "classic",
}: {
  story: WeekStory;
  part?: "all" | "hook" | "rest";
  place?: "none" | "sides" | "inline";
  layout?: ReportLayout;
}) {
  const happenedLabel = story.format === "tale" ? "The tale" : story.format === "quote" ? "" : "What happened";
  const hook = part !== "rest";
  const rest = part !== "hook";
  const framed = part !== "rest";
  const digest = layout === "digest";
  const readWidth = digest
    ? "relative flex w-full flex-col gap-8"
    : "relative mx-auto flex w-full max-w-[65ch] flex-col gap-10 sm:gap-12";

  return (
    <div className={framed ? `relative ${digest ? "py-8" : "px-4 py-8 sm:px-8 sm:py-10"}` : ""}>
      <div className={framed ? readWidth : "mx-auto flex w-full max-w-[65ch] flex-col gap-6 px-4 sm:px-8"}>
        {hook && story.format !== "quote" && story.whatHappened ? (
          <section>
            <div>
              <h3 className={digest ? digestSectionTitle : "text-[1.65rem] leading-9 text-black sm:text-[1.85rem] sm:leading-10"} style={roman}>
                {happenedLabel}
              </h3>
              <div className={digestRule} />
            </div>
            {story.format === "tale" ? (
              <p className={`mt-6 border-l-2 border-[#DF0A14] pl-4 text-black ${digest ? typeQuote : "text-2xl italic leading-8"}`} style={roman}>
                {story.whatHappened}
              </p>
            ) : (
              <p className={`mt-6 ${digest ? digestBodyCopy : "text-base leading-6 text-[var(--brand-text-secondary,#45556c)]"}`} style={roman}>
                {story.whatHappened}
              </p>
            )}
          </section>
        ) : null}
        {rest && story.items && story.items.length > 0 ? (
          <ul className={`${digest ? "w-full" : "max-w-[635px]"} border-t ${hairline}`}>
            {story.items.map((item) => (
              <li key={item.label} className={`border-b py-5 ${hairline}`}>
                <p className={digest ? `${typeLabel} text-[#DF0A14]` : subInfo} style={uiBold}>
                  {item.label}
                </p>
                <p className={`mt-2 text-black ${digest ? typeBodyLg : "text-xl leading-7"}`} style={roman}>
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        ) : null}
        {rest && story.quote ? (
          digest ? (
            <QuoteBlock story={story} layout="digest" />
          ) : (
            <FullBleedBrand>
              <QuoteBlock story={story} />
            </FullBleedBrand>
          )
        ) : null}
        {rest ? <div className="contents">
          {story.format === "quote" && story.whatHappened ? (
            <section>
              <SectionHeading>Who said it</SectionHeading>
              <Body>{story.whatHappened}</Body>
            </section>
          ) : null}
          {story.whoSaidWhat ? (
            <section className={`border-t ${digest ? "pt-8" : "pt-10"} ${hairline}`}>
              <div>
                <h3 className={digest ? digestSectionTitle : "text-[2rem] leading-10 text-black"} style={roman}>
                  Who said what
                </h3>
                <div className={digestRule} />
              </div>
              <p className={`mt-6 ${digest ? digestBodyCopy : "text-base leading-6 text-[var(--brand-text-secondary,#45556c)]"}`} style={roman}>
                {story.whoSaidWhat}
              </p>
            </section>
          ) : null}
          {story.whatsNext ? (
            <section className={`border-t ${digest ? "pt-8" : "pt-10"} ${hairline}`}>
              <div>
                <h3 className={digest ? digestSectionTitle : "text-[2rem] leading-10 text-black"} style={roman}>
                  What’s next?
                </h3>
                <div className={digestRule} />
              </div>
              <p className={`mt-6 ${digest ? digestBodyCopy : "text-base leading-6 text-[var(--brand-text-secondary,#45556c)]"}`} style={roman}>
                {story.whatsNext}
              </p>
            </section>
          ) : null}
        </div> : null}
      </div>
    </div>
  );
}

const WEEK_SUDOKU = "https://theweek.com/puzzles/medium-sudoku-october-2026";

function VideoStory({ story }: { story: WeekStory; place?: "none" | "sides" | "inline" }) {
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
      </div>
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
      </div>
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

function DigestPapers({ story }: { story: WeekStory }) {
  const items = story.items ?? [];
  const covers = items.map((item, index) => ({
    label: item.label,
    text: item.text,
    src: PAPER_COVERS[index % PAPER_COVERS.length]?.src ?? PAPER_COVERS[0].src,
  }));
  const [active, setActive] = useState(0);
  const scrollerRef = useRef<HTMLUListElement>(null);

  const scrollToIndex = (index: number, behavior: ScrollBehavior = "smooth") => {
    const root = scrollerRef.current;
    const item = root?.children[index] as HTMLElement | undefined;
    if (!root || !item) return;
    const left = item.offsetLeft - (root.clientWidth - item.offsetWidth) / 2;
    root.scrollTo({ left: Math.max(0, left), behavior });
  };

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root || covers.length === 0) return;
    scrollToIndex(0, "auto");
    const onScroll = () => {
      const mid = root.scrollLeft + root.clientWidth / 2;
      let nearest = 0;
      let best = Number.POSITIVE_INFINITY;
      [...root.querySelectorAll<HTMLElement>(":scope > li")].forEach((card, cardIndex) => {
        const center = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(center - mid);
        if (distance < best) {
          best = distance;
          nearest = cardIndex;
        }
      });
      setActive(nearest);
    };
    root.addEventListener("scroll", onScroll, { passive: true });
    return () => root.removeEventListener("scroll", onScroll);
  }, [covers.length]);

  const go = (next: number) => {
    const clamped = Math.min(covers.length - 1, Math.max(0, next));
    setActive(clamped);
    scrollToIndex(clamped);
  };

  if (covers.length === 0) return null;

  const activeCover = covers[active] ?? covers[0];

  return (
    <div className="pb-10">
      <div className="flex items-end justify-between gap-3 px-1">
        <div>
          <p className="brand-label-copy text-[11px] tracking-[0.14em] text-[#DF0A14]" style={uiBold}>
            Today&apos;s newspapers
          </p>
          <h3 className="mt-2 text-[1.65rem] leading-8 text-[var(--brand-text-primary,#0f172b)] sm:text-[1.85rem]" style={roman}>
            Front pages
          </h3>
        </div>
        <p className="brand-muted-copy text-[12px] tabular-nums" style={ui}>
          {number(active)} / {number(Math.max(covers.length - 1, 0))}
        </p>
      </div>

      {/* Desktop: one cover, arrows flanking the image */}
      <div className="mt-6 hidden lg:block">
        <div className="flex items-center justify-center gap-4">
          <BrandScrollArrow
            direction="left"
            label="Previous front page"
            disabled={active <= 0}
            onClick={() => go(active - 1)}
          />
          <div className="w-full max-w-[280px]">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#111] shadow-[0_0_0_2px_#DF0A14]">
              <Image
                src={activeCover.src}
                alt=""
                fill
                unoptimized
                className="object-cover object-top"
                sizes="280px"
                priority
              />
            </div>
            <p className="mt-4 text-[11px] font-bold tracking-[0.14em] text-[#DF0A14] uppercase" style={uiBold}>
              {number(active)} · {activeCover.label}
            </p>
            <p className="mt-2 max-w-[22ch] text-[1.45rem] leading-7 text-[var(--brand-text-primary,#0f172b)]" style={roman}>
              {activeCover.text}
            </p>
          </div>
          <BrandScrollArrow
            direction="right"
            label="Next front page"
            disabled={active >= covers.length - 1}
            onClick={() => go(active + 1)}
          />
        </div>
      </div>

      {/* Mobile: snap carousel with blur peeks */}
      <div className="relative mt-6 lg:hidden">
        <ul
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {covers.map((cover, coverIndex) => {
            const focused = coverIndex === active;
            return (
              <li key={`${cover.label}-${coverIndex}`} className="w-[88%] shrink-0 snap-center sm:w-[78%]">
                <div className="w-full">
                  <div
                    className={`relative aspect-[3/4] w-full overflow-hidden bg-[#111] transition-[filter,opacity,transform,box-shadow] duration-300 ${
                      focused
                        ? "scale-100 shadow-[0_0_0_2px_#DF0A14] opacity-100 blur-0"
                        : "scale-[0.98] opacity-70 blur-[2px] saturate-75"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => go(coverIndex)}
                      className="absolute inset-0 block"
                      aria-label={`Open ${cover.label}`}
                      aria-current={focused ? "true" : undefined}
                    >
                      <Image
                        src={cover.src}
                        alt=""
                        fill
                        unoptimized
                        className="object-cover object-top"
                        sizes="88vw"
                        priority={coverIndex < 2}
                      />
                      <span
                        aria-hidden
                        className={`pointer-events-none absolute inset-0 bg-black transition-opacity duration-300 ${
                          focused ? "opacity-0" : "opacity-35"
                        }`}
                      />
                    </button>
                    {focused ? (
                      <>
                        <div className="absolute inset-y-0 left-2 z-20 flex items-center">
                          <BrandScrollArrow
                            direction="left"
                            label="Previous front page"
                            disabled={active <= 0}
                            onClick={() => go(active - 1)}
                          />
                        </div>
                        <div className="absolute inset-y-0 right-2 z-20 flex items-center">
                          <BrandScrollArrow
                            direction="right"
                            label="Next front page"
                            disabled={active >= covers.length - 1}
                            onClick={() => go(active + 1)}
                          />
                        </div>
                      </>
                    ) : null}
                  </div>
                  <button type="button" onClick={() => go(coverIndex)} className="mt-4 w-full text-left">
                    <span
                      className={`block text-[11px] font-bold tracking-[0.14em] uppercase transition-opacity duration-300 ${
                        focused ? "text-[#DF0A14] opacity-100" : "text-[#DF0A14] opacity-55"
                      }`}
                      style={uiBold}
                    >
                      {number(coverIndex)} · {cover.label}
                    </span>
                    <span
                      className={`mt-2 block max-w-[22ch] text-[1.45rem] leading-7 transition-opacity duration-300 sm:text-[1.7rem] sm:leading-8 ${
                        focused ? "text-[var(--brand-text-primary,#0f172b)] opacity-100" : "text-[var(--brand-text-primary,#0f172b)] opacity-50"
                      }`}
                      style={roman}
                    >
                      {cover.text}
                    </span>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-4 flex items-center justify-center gap-1.5">
        {covers.map((cover, coverIndex) => (
          <button
            key={`dot-${cover.label}`}
            type="button"
            aria-label={`Go to ${cover.label}`}
            aria-current={coverIndex === active ? "true" : undefined}
            onClick={() => go(coverIndex)}
            className={`h-1.5 rounded-full transition-all ${coverIndex === active ? "w-5 bg-[#DF0A14]" : "w-1.5 bg-black/25"}`}
          />
        ))}
      </div>
    </div>
  );
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

type ImagelessTone = "pink" | "sky" | "dark";

/** Figma imageless plates — by section chip, reusable for any story. */
function imagelessFor(story: WeekStory): { tone: ImagelessTone } | null {
  const key = `${story.chip} ${story.kicker}`.toLowerCase();
  if (key.includes("tall tale") || key.includes("not all bad")) return { tone: "pink" };
  if (key.includes("on this day")) return { tone: "sky" };
  if (key.includes("under the radar")) return { tone: "dark" };
  return null;
}

function imagelessPlateClass(tone: ImagelessTone) {
  if (tone === "pink") return "bg-[#FDE4E4]";
  if (tone === "dark") return "bg-[#1C2A38]";
  return "bg-[#E3F2FD]";
}

function CoverWatermark({
  index,
  className,
}: {
  index: number;
  className: string;
}) {
  return (
    <span
      className={`pointer-events-none absolute left-1/2 z-0 -translate-x-1/2 leading-none select-none ${className}`}
      style={roman}
      aria-hidden
    >
      {number(index)}
    </span>
  );
}

type ReportLayout = "classic" | "digest";

/** Classic keeps full-bleed heroes; digest only keeps cinema for video. */
function isHeroStory(story: WeekStory, index: number, layout: ReportLayout = "digest") {
  if (layout === "classic") return true;
  return story.format === "video";
}

function ImagelessCover({
  story,
  index,
  tone,
  locked = false,
  compact = false,
}: {
  story: WeekStory;
  index: number;
  tone: ImagelessTone;
  locked?: boolean;
  compact?: boolean;
}) {
  const dark = tone === "dark";
  if (compact) {
    return <CompactStoryHeader story={story} index={index} locked={locked} plateClass="bg-transparent" />;
  }

  return (
    <section
      id={story.id}
      data-story
      className={`relative flex h-[calc(100svh-48px)] min-h-[520px] scroll-mt-12 flex-col items-center justify-center overflow-clip px-4 py-24 text-center sm:px-8 ${imagelessPlateClass(tone)}`}
    >
      {locked ? <CoverLock /> : null}
      <div className="relative z-10 flex w-full max-w-[40rem] flex-col items-center pt-16 sm:pt-20">
        <CoverWatermark
          index={index}
          className={`top-0 -translate-y-[18%] text-[min(36vw,220px)] ${dark ? "text-white/12" : "text-black/10"}`}
        />
        <p
          className={`relative z-10 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] uppercase ${
            dark ? "text-white" : "text-black"
          }`}
          style={uiBold}
        >
          {dark ? <span className="h-1.5 w-1.5 rounded-full bg-[#DF0A14]" aria-hidden /> : null}
          <span className="text-[#DF0A14]">{number(index)}</span>
          <span className={dark ? "text-white/70" : "text-black/55"}>· {story.chip}</span>
        </p>
        <div className="relative z-10 mt-3 h-px w-14 bg-[#DF0A14]" aria-hidden />
        <h2 className={`relative z-10 mt-5 text-[2.75rem] leading-[1.05] sm:text-[3.5rem] ${dark ? "text-white" : "text-black"}`} style={roman}>
          {story.displayTitle}
        </h2>
        {story.dek && story.dek !== story.displayTitle ? (
          <p className={`relative z-10 mt-3 max-w-[34ch] text-lg leading-7 sm:text-xl ${dark ? "text-white/80" : "text-black/70"}`} style={roman}>
            {story.dek}
          </p>
        ) : null}
      </div>
    </section>
  );
}

const DIGEST_GROUND = "bg-[var(--report-beige,#F4F0EA)]";
const DIGEST_WIDE_BAR = "digest-wide-bar bg-[var(--report-beige,#F4F0EA)]";
const digestTextPad = "px-4 sm:px-6 lg:px-7";
const brandScrollbar = "brand-scrollbar";

function CompactStoryHeader({
  story,
  index,
  locked = false,
  lead = false,
  plateClass = "bg-transparent",
}: {
  story: WeekStory;
  index: number;
  locked?: boolean;
  lead?: boolean;
  plateClass?: string;
}) {
  const hasImage = Boolean(story.imageSrc);
  return (
    <section id={story.id} data-story className={`relative scroll-mt-12 ${plateClass}`}>
      {locked ? <CoverLock /> : null}
      {hasImage ? (
        <figure className="w-full overflow-hidden bg-[#111]">
          <div className={`relative w-full overflow-hidden ${lead ? "aspect-[16/10]" : "aspect-[16/10] sm:aspect-[16/9]"}`}>
            <Image
              src={story.imageSrc!}
              alt=""
              fill
              priority={lead}
              unoptimized={story.imageSrc!.startsWith("/") || story.imageSrc!.startsWith("http")}
              className="object-cover object-center"
              sizes="(max-width: 1023px) 100vw, 50vw"
            />
          </div>
        </figure>
      ) : null}
      <div className={`${digestTextPad} ${hasImage ? "pt-5 pb-8 sm:pb-10" : "py-8 sm:py-10"}`}>
        {hasImage && story.imageCaption ? (
          <p className="mb-4 text-[13px] leading-5 text-black/50" style={ui}>
            {story.imageCaption}
          </p>
        ) : null}
        <p className={`${typeLabel} text-[#DF0A14]`} style={uiBold}>
          {story.chip}
        </p>
        <h2
          className={`mt-2 max-w-[28ch] text-[var(--brand-text-primary,#0f172b)] ${lead ? digestArticleTitleLead : digestArticleTitle}`}
          style={roman}
        >
          {story.displayTitle}
        </h2>
        {story.dek && story.dek !== story.displayTitle ? (
          <p className={`mt-3 max-w-[46ch] ${digestBodyCopy}`} style={roman}>
            {story.dek}
          </p>
        ) : null}
      </div>
    </section>
  );
}

function StoryCover({
  story,
  index,
  edition,
  locked = false,
  layout = "digest",
}: {
  story: WeekStory;
  index: number;
  edition?: boolean;
  locked?: boolean;
  layout?: ReportLayout;
}) {
  const classic = layout === "classic";
  const imageless = imagelessFor(story);
  if (!classic && story.format === "papers") {
    return <section id={story.id} data-story className="scroll-mt-12" />;
  }
  if (imageless) {
    return (
      <ImagelessCover
        story={story}
        index={index}
        tone={imageless.tone}
        locked={locked}
        compact={!classic && !isHeroStory(story, index, layout)}
      />
    );
  }

  if (!classic && !isHeroStory(story, index, layout)) {
    return <CompactStoryHeader story={story} index={index} locked={locked} lead={index === 0} plateClass="bg-transparent" />;
  }

  const hasMedia = Boolean(story.imageSrc) || (story.format === "video" && Boolean(story.videoSrc));
  const textOnly = !hasMedia && story.format !== "puzzle";
  const lightPlate = textOnly;
  const plateBg = textOnly || story.format === "puzzle" ? "bg-[var(--report-beige)]" : "bg-[#111]";

  return (
    <section
      id={story.id}
      data-story
      className={`relative flex h-[calc(100svh-48px)] min-h-[520px] scroll-mt-12 items-end overflow-clip ${plateBg}`}
    >
      {story.imageSrc ? (
        <Image
          src={story.imageSrc}
          alt=""
          fill
          priority={index === 0}
          unoptimized={story.imageSrc.startsWith("/") || story.imageSrc.startsWith("http")}
          className="report-parallax object-cover object-center"
          sizes="100vw"
        />
      ) : story.format === "video" && story.videoSrc ? (
        <video src={story.videoSrc} muted playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" />
      ) : textOnly ? (
        <div className="absolute inset-0 bg-[var(--report-beige)]" aria-hidden />
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
          <div className={`mb-8 flex items-center justify-center gap-3 ${lightPlate ? "text-black" : "text-white"}`}>
            <WeekMark />
            <span className="text-[14px] font-bold tracking-[0.28em]" style={romanBold}>
              THE WEEK
            </span>
          </div>
        ) : null}
        <div className="relative flex w-full max-w-[40rem] flex-col items-center pt-16 sm:pt-20">
          {hasMedia ? (
            <CoverWatermark
              index={index}
              className="top-0 z-[5] -translate-y-[18%] text-[min(36vw,220px)] font-normal text-white/25"
            />
          ) : null}
          <p className="relative z-10 text-[12px] font-bold tracking-[0.16em] text-[#DF0A14] uppercase" style={uiBold}>
            {number(index)}
            <span className={lightPlate ? "text-black/55" : "text-white/80"}> · {story.chip}</span>
          </p>
          {lightPlate ? <div className="relative z-10 mt-4 h-[3px] w-16 bg-[#DF0A14]" aria-hidden /> : null}
          <h2
            className={`relative z-10 mt-4 max-w-[14ch] text-[56px] leading-[0.95] sm:text-[72px] lg:max-w-none lg:whitespace-nowrap ${
              lightPlate ? "text-black" : "text-white"
            }`}
            style={roman}
          >
            {story.displayTitle}
          </h2>
          <p className={`relative z-10 mt-4 max-w-[36ch] text-[20px] leading-7 ${lightPlate ? "text-black/75" : "text-white/90"}`} style={roman}>
            {story.dek}
          </p>
          {story.imageCaption ? (
            <p className={`relative z-10 mt-4 text-sm leading-5 ${lightPlate ? "text-black/50" : "text-white/70"}`}>
              {story.imageCaption}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function InsideEdition({ stories, onJump }: { stories: WeekStory[]; onJump: (id: string) => void }) {
  const explainer = stories.find((story) => /explainer/i.test(story.chip));
  const goodBad = stories.find((story) => story.format === "day" || /good\s*\/\s*bad/i.test(story.chip));
  const underRadar = stories.find((story) => /under the radar/i.test(story.chip));
  const puzzle = stories.find((story) => /puzzle|sudoku/i.test(story.chip) || story.format === "puzzle");
  const also = stories
    .filter((story) => ![explainer?.id, goodBad?.id, underRadar?.id, puzzle?.id, stories[0]?.id].includes(story.id))
    .slice(0, 4);

  return (
    <nav aria-label="Also in this report">
      <p className={`border-b border-black pb-2 ${typeLabel} text-[#DF0A14]`} style={uiBold}>
        Also in this report
      </p>
      <ul>
        {explainer ? (
          <li className="border-b border-black/12 py-3.5">
            <button type="button" onClick={() => onJump(explainer.id)} className="w-full text-left">
              <span className={`block ${typeLabel} text-[#DF0A14]`} style={uiBold}>
                The explainer
              </span>
              <span className="mt-2 block text-[15px] leading-6 text-black" style={roman}>
                {explainer.dek || explainer.displayTitle}
              </span>
            </button>
          </li>
        ) : null}
        {goodBad ? (
          <li className="border-b border-black/12 py-3.5">
            <button type="button" onClick={() => onJump(goodBad.id)} className="w-full text-left">
              <span className={`block ${typeLabel} text-[#DF0A14]`} style={uiBold}>
                Good day / Bad day
              </span>
              <span className="mt-2 block text-[15px] leading-6 text-black" style={roman}>
                {goodBad.dek || goodBad.displayTitle}
              </span>
            </button>
          </li>
        ) : null}
        {underRadar ? (
          <li className="border-b border-black/12 py-3.5">
            <button type="button" onClick={() => onJump(underRadar.id)} className="w-full text-left">
              <span className={`block ${typeLabel} text-[#DF0A14]`} style={uiBold}>
                Under the radar
              </span>
              <span className="mt-2 block text-[15px] leading-6 text-black" style={roman}>
                {underRadar.dek || underRadar.displayTitle}
              </span>
            </button>
          </li>
        ) : null}
        {puzzle ? (
          <li className="border-b border-black/12 py-3.5">
            <button type="button" onClick={() => onJump(puzzle.id)} className="w-full text-left">
              <span className={`block ${typeLabel} text-[#DF0A14]`} style={uiBold}>
                Today&apos;s puzzle
              </span>
              <span className="mt-2 block text-[15px] leading-6 text-black" style={roman}>
                {puzzle.dek || puzzle.displayTitle}
              </span>
            </button>
          </li>
        ) : null}
        {also.length ? (
          <li className="py-3.5">
            <p className={`block ${typeLabel} text-[#DF0A14]`} style={uiBold}>
              Keep reading
            </p>
            <ul className="mt-2 space-y-2">
              {also.map((story) => (
                <li key={story.id}>
                  <button type="button" onClick={() => onJump(story.id)} className="w-full text-left text-[13px] leading-5 text-black/80 hover:text-black" style={roman}>
                    <span className="text-[#DF0A14]">{story.chip}</span>
                    <span className="mx-1.5 text-black/30">·</span>
                    {story.menuTitle || story.displayTitle}
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}

function DigestRail({
  stories,
  onJump,
  currentId,
}: {
  stories: WeekStory[];
  onJump: (id: string) => void;
  currentId?: string;
}) {
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [currentId]);

  return (
    <nav aria-label="The latest">
      <p className="border-b border-black pb-2 text-[11px] font-bold tracking-[0.16em] text-[#DF0A14] uppercase" style={uiBold}>
        The latest
      </p>
      <ul>
        {stories.map((story, storyIndex) => {
          const current = story.id === currentId;
          return (
            <li key={story.id} className="border-b border-black/12">
              <button
                ref={current ? activeRef : undefined}
                type="button"
                onClick={() => onJump(story.id)}
                aria-current={current ? "true" : undefined}
                className={`group w-full border-l-2 py-3 text-left transition-colors ${
                  current
                    ? "border-[#DF0A14] bg-[#F0EAE1] pl-3 pr-1"
                    : "border-transparent pl-3 pr-1 hover:bg-[#F0EAE1]/hover:border-black/20"
                }`}
              >
                <span
                  className={`block text-[11px] font-bold tracking-[0.12em] uppercase ${current ? "text-[#DF0A14]" : "text-[#DF0A14]/group-hover:text-[#DF0A14]"}`}
                  style={uiBold}
                >
                  {number(storyIndex)} · {story.chip}
                </span>
                <span
                  className={`mt-1.5 block text-[15px] leading-6 ${current ? "text-black" : "text-black/65 group-hover:text-black"}`}
                  style={current ? romanBold : roman}
                >
                  {story.displayTitle}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

const HERO_EDITIONS = [
  { id: "morning", label: "Morning Report", status: "Published this morning", live: true, image: "/the-week/hero-morning-field.jpg" },
  { id: "evening", label: "Evening Review", status: "Out now", live: true, image: "/the-week/hero-evening-field.jpg" },
  { id: "saturday", label: "Saturday Wrap", status: "Last week · Saturday, 10 October", live: false, image: "/the-week/hero-saturday-field.jpg" },
  { id: "sunday", label: "Sunday Shortlist", status: "Last week · Sunday, 11 October", live: false, image: "/the-week/hero-sunday-field.jpg" },
] as const;

function heroEditionId(briefing: string) {
  const hit = HERO_EDITIONS.find((item) => item.label.toLowerCase() === briefing.toLowerCase());
  return hit?.id ?? "morning";
}

function heroEditionTitle(label: string) {
  return /^the\s/i.test(label) ? label : `The ${label}`;
}

function HeroSplitComposition({
  briefing,
  stories,
  onJump,
  onExplore,
}: {
  briefing: string;
  stories: WeekStory[];
  onJump: (id: string) => void;
  onExplore: () => void;
}) {
  const [insideOpen, setInsideOpen] = useState(false);
  const activeId = heroEditionId(briefing);
  const active = HERO_EDITIONS.find((item) => item.id === activeId) ?? HERO_EDITIONS[0];
  const lead = stories[0];
  const heroImage = lead?.imageSrc || active.image;
  const big = stories.find((story) => /big question/i.test(story.chip) || /big question/i.test(story.kicker ?? ""));
  const quote = stories.find((story) => story.format === "quote" || /quote/i.test(story.chip));
  const stat = stories.find((story) => story.format === "stat" || /statistic/i.test(story.chip));
  const evening = activeId === "evening";
  const storyLabel = evening ? "Tonight’s big question" : "Today’s story";
  const ctaLabel = evening ? "Explore tonight’s report" : "Explore today’s report";
  const storyTitle =
    (evening ? big?.dek || big?.displayTitle : lead?.displayTitle || lead?.dek) ||
    "Why is the trade deficit getting bigger?";
  const storySupport =
    (evening
      ? "Exploring rising tensions, regional implications and what could determine the next developments."
      : lead?.dek && lead.dek !== lead.displayTitle
        ? lead.dek
        : lead?.whatHappened?.slice(0, 140)) ||
    "Exploring rising tensions, regional implications and what could determine the next developments.";
  const storySupportTrimmed =
    storySupport.length > 160 ? `${storySupport.slice(0, 157).trimEnd()}…` : storySupport;
  const questionTitle = big?.dek || big?.displayTitle || "Why is the trade deficit getting bigger?";
  const questionSupport =
    "Trump’s tariffs are intended to narrow the gap. It is widening — and economists disagree on why.";
  const quoteText =
    quote?.quote ||
    "If John Lewis were marching today from Selma to Montgomery, Mike Collins would be grabbing a billy club.";
  const statValue = stat?.dek || stat?.stats?.[0]?.value || "1,034";
  const statLabel =
    stat?.displayTitle || "Palestinians killed in Gaza since the ceasefire was signed";

  const leadCopy = (
    <div className="max-w-[40rem]">
      <p className={`${typeEyebrow} text-white`} style={uiBold}>
        The Week’s daily editions
      </p>
      <h1 className={`mt-2 max-w-[16ch] ${typeEdition} text-white`} style={roman}>
        {heroEditionTitle(active.label)}
      </h1>
      <div className={`${digestRule} mt-3`} aria-hidden />
      <p className={`mt-8 ${typeLabel} text-white`} style={uiBold}>
        {storyLabel}
      </p>
      <p className={`mt-2 max-w-[28ch] ${typeQuestion} text-white`} style={roman}>
        {storyTitle}
      </p>
      <p className={`mt-3 max-w-[46ch] ${typeBodyLg} text-white/90`} style={roman}>
        {storySupportTrimmed}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-5">
        <button type="button" onClick={onExplore} className={weekCta} style={uiBold}>
          {ctaLabel}
        </button>
        <a
          href="#previous-editions"
          className="text-[15px] leading-6 text-white underline decoration-white/70 underline-offset-4 transition-opacity hover:opacity-80"
          style={roman}
        >
          View all editions
        </a>
      </div>
    </div>
  );

  const statsPanel = (
    <div className="grid gap-6 sm:grid-cols-3 sm:gap-0">
      <button
        type="button"
        onClick={() => onJump(big?.id ?? stories[0]?.id ?? "")}
        className="w-full text-left sm:border-r sm:border-white/15 sm:pr-6"
      >
        <span className={`block ${typeLabel} text-[#9CA3AF]`} style={uiBold}>
          {evening ? "Tonight’s big question" : "Today’s big question"}
        </span>
        <span className="mt-2 block text-[15px] leading-6 text-white" style={roman}>
          {questionTitle}
        </span>
        <span className="mt-2 block text-[12px] leading-[18px] text-[#9CA3AF]" style={roman}>
          {questionSupport}
        </span>
      </button>
      <button
        type="button"
        onClick={() => onJump(quote?.id ?? stories[0]?.id ?? "")}
        className="w-full text-left sm:border-r sm:border-white/15 sm:px-6"
      >
        <span className={`block ${typeLabel} text-[#9CA3AF]`} style={uiBold}>
          Quote of the day
        </span>
        <span className="mt-2 flex gap-3">
          <span className="shrink-0 text-[22px] leading-none text-white" style={roman} aria-hidden>
            ”
          </span>
          <span className="min-w-0 text-[13px] leading-[19px] text-white" style={roman}>
            {quoteText}
          </span>
        </span>
      </button>
      <button
        type="button"
        onClick={() => onJump(stat?.id ?? stories[0]?.id ?? "")}
        className="w-full text-left sm:pl-6"
      >
        <span className={`block ${typeLabel} text-[#9CA3AF]`} style={uiBold}>
          Statistics
        </span>
        <span className="mt-2 flex flex-wrap items-end gap-3">
          <span className="text-[1.8rem] leading-[1.3] text-white" style={roman}>
            {statValue}
          </span>
          <span className="min-w-0 flex-1 pb-0.5 text-[12px] leading-[19px] text-white" style={roman}>
            {statLabel}
          </span>
        </span>
      </button>
    </div>
  );

  return (
    <header className="hero-split-composition relative isolate min-h-[100svh] w-full overflow-hidden bg-black text-white" aria-label={briefing}>
      <div className="absolute inset-0 z-0">
        <Image src={heroImage} alt="" fill priority sizes="100vw" className="object-cover object-center" />
        <div
          className="absolute inset-0 lg:hidden"
          style={{ background: "linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, #000000 80%)" }}
          aria-hidden
        />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{ background: "linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, #000000 78%)" }}
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1400px] flex-col px-5 py-4 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        <div className="flex justify-end">
          <span className="inline-flex items-center gap-2.5 rounded-[5px] bg-black/50 px-2.5 py-2.5 backdrop-blur-[5px]">
            <span className="inline-flex h-[29px] w-[29px] items-center justify-center rounded-full bg-[#DF0A14]">
              <Lock size={14} strokeWidth={2.4} className="text-white" aria-hidden />
            </span>
            <span className="pr-1 text-[14px] leading-5 font-bold tracking-[0.02em] text-white uppercase" style={uiBold}>
              Exclusive
            </span>
          </span>
        </div>

        {/* Mobile */}
        <div className="mt-auto flex w-full max-w-[350px] flex-col gap-[15px] self-center pb-2 lg:hidden">
          <div className="flex flex-col gap-2.5">
            <p className="text-[14px] leading-[25px] font-bold text-white uppercase" style={uiBold}>
              The Week’s daily editions
            </p>
            <h1 className="text-[36px] leading-[48px] text-[#FAFAFA]" style={roman}>
              {heroEditionTitle(active.label)}
            </h1>
            <div className="h-[3px] w-16 bg-[#DF0A14]" aria-hidden />
          </div>
          <div className="flex flex-col gap-2.5">
            <p className="text-[14px] leading-5 font-bold text-white uppercase" style={uiBold}>
              {storyLabel}
            </p>
            <p className="text-[28px] leading-8 text-[#FAFAFA]" style={roman}>
              {storyTitle}
            </p>
            <p className="text-base leading-6 text-white" style={roman}>
              {storySupportTrimmed}
            </p>
          </div>
          <div>
            <button
              type="button"
              aria-expanded={insideOpen}
              onClick={() => setInsideOpen((value) => !value)}
              className="flex w-full items-center justify-between gap-3 rounded-[5px] border-l-[5px] border-[#DF0A14] bg-[rgba(251,249,245,0.75)] px-[15px] py-[15px] backdrop-blur-[7.5px]"
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <WeekMark />
                <span className="text-base leading-6 font-bold text-[#171717]" style={romanBold}>
                  Inside this edition
                </span>
              </span>
              <BrandIcon name="chevronDown" defaultIcon={ChevronDown} className={`h-5 w-5 shrink-0 text-black transition-transform ${insideOpen ? "rotate-180" : ""}`} />
            </button>
            {insideOpen ? <div className="mt-3 rounded-[5px] bg-black px-4 py-5">{statsPanel}</div> : null}
          </div>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={onExplore}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[3px] bg-[#DF0A14] px-3 text-[14px] leading-5 font-bold text-[#FAFAFA] uppercase transition-colors hover:bg-[#B20810]"
              style={uiBold}
            >
              {ctaLabel}
              <BrandIcon name="chevronRight" defaultIcon={ChevronRight} className="h-3.5 w-3.5" />
            </button>
            <a href="#previous-editions" className="text-center text-[15px] leading-6 text-white underline decoration-white/70 underline-offset-4" style={roman}>
              View all editions
            </a>
          </div>
        </div>

        {/* Desktop */}
        <div className="mt-auto hidden flex-col gap-8 pb-2 lg:flex lg:gap-10">
          {leadCopy}

          <div className="rounded-[10px] bg-black px-6 py-6 ring-1 ring-white/10">
            <div className="mb-4 flex items-center gap-3 border-b border-white/15 pb-4">
              <WeekMark />
              <p className={`${typeLabel} text-white`} style={uiBold}>
                Inside this edition
              </p>
            </div>
            {statsPanel}
          </div>
        </div>
      </div>
    </header>
  );
}

function layoutHref(layout: ReportLayout, locked: boolean, ads: boolean) {
  const params = new URLSearchParams();
  if (layout === "classic") params.set("layout", "classic");
  if (locked) params.set("locked", "1");
  if (ads) params.set("ads", "1");
  const query = params.toString();
  return query ? `/report?${query}` : "/report";
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
    <section id="previous-editions" className={`bg-[#F4F0EA] py-16 xl:py-20 ${pagePad}`} aria-label="Previous editions">
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
          className={`flex snap-x snap-mandatory gap-[29px] overflow-x-auto pb-3 ${brandScrollbar}`}
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

function SourceMark({ name, size = 44, well = false }: { name: string; size?: number; well?: boolean }) {
  const [failed, setFailed] = useState(false);
  const src = outletLogo(name);
  const showMark = !src || failed;

  const mark = showMark ? (
    <span
      className="inline-flex items-center justify-center text-[15px] font-bold tracking-wide text-[#011535]"
      style={{ ...uiBold, width: size, height: size }}
      aria-hidden
    >
      {outletMark(name)}
    </span>
  ) : (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      unoptimized
      className="object-contain p-2"
      onError={() => setFailed(true)}
    />
  );

  if (well) {
    return (
      <span className="flex h-[112px] w-full items-center justify-center bg-[var(--tg-pale-blue)]" aria-hidden>
        {mark}
      </span>
    );
  }

  return (
    <span
      className="relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-[var(--tg-pale-blue)]"
      style={{ width: size, height: size }}
    >
      {mark}
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
      <ul className={`report-cards mt-4 flex gap-3 overflow-x-auto px-4 pb-3 sm:px-8 ${brandScrollbar}`}>
        {period.uses.map((source) => (
          <li
            key={source.name}
            className="flex w-[210px] shrink-0 flex-col overflow-hidden border border-black/10 bg-white"
          >
            <SourceMark name={source.name} size={64} well />
            <span className="flex flex-col gap-1 px-4 py-4">
              <span className="block text-base leading-6 text-black" style={romanBold}>
                {source.name}
              </span>
              <span className={subInfo} style={ui}>
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

function StoryBody({
  story,
  locked = false,
  lead = false,
  place = "none",
  layout = "classic",
}: {
  story: WeekStory;
  locked?: boolean;
  lead?: boolean;
  place?: "none" | "sides" | "inline";
  layout?: ReportLayout;
}) {
  if (locked && lead && story.format !== "papers" && story.format !== "video" && story.format !== "puzzle") {
    return (
      <>
        <StoryReading story={story} part="hook" place={place} layout={layout} />
        <CaptureGate>
          <StoryReading story={story} part="rest" layout={layout} />
        </CaptureGate>
      </>
    );
  }
  if (locked && !lead) {
    return (
      <CaptureGate>
        <div className="mx-auto w-full max-w-[65ch] px-4 sm:px-8">
          <p className="text-2xl leading-8" style={roman}>{story.dek}</p>
          {story.whatHappened ? <p className="text-base leading-6" style={roman}>{story.whatHappened}</p> : null}
        </div>
      </CaptureGate>
    );
  }
  if (story.format === "papers") {
    return layout === "digest" ? <DigestPapers story={story} /> : <PapersSpread story={story} place={place} />;
  }
  if (story.format === "video") return <VideoStory story={story} place={place} />;
  if (story.format === "puzzle") return <PuzzleStory story={story} place={place} />;
  return <StoryReading story={story} place={place} layout={layout} />;
}


export function ReportBriefing({
  stories,
  briefing,
  caughtUp,
  periods,
  sourcesView = false,
  locked = false,
  ads = false,
  layout = "digest",
}: {
  stories: WeekStory[];
  briefing: string;
  caughtUp: string;
  periods: SourcePeriod[];
  sourcesView?: boolean;
  locked?: boolean;
  ads?: boolean;
  layout?: ReportLayout;
}) {
  const digest = layout === "digest";
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [down, setDown] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const total = number(Math.max(stories.length - 1, 0));

  useEffect(() => {
    const onScroll = () => {
      if (!digest && window.matchMedia("(max-width: 767px)").matches) return;
      const line = window.innerHeight * 0.28;
      let current = 0;
      const nodes = digest
        ? [...document.querySelectorAll<HTMLElement>("[data-story-article]")].filter((el) => el.getClientRects().length > 0)
        : [...document.querySelectorAll<HTMLElement>("[data-story]")].filter((el) => el.getClientRects().length > 0 && el.id);
      nodes.forEach((section, storyIndex) => {
        if (section.getBoundingClientRect().top <= line) current = storyIndex;
      });
      if (current === indexRef.current) return;
      indexRef.current = current;
      setIndex(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [digest, stories]);

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
      <ol className={`min-h-0 flex-1 overflow-y-auto ${brandScrollbar}`}>
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
        .report-feed, .report-article, .report-end { scrollbar-width: none; }
        .report-feed::-webkit-scrollbar, .report-article::-webkit-scrollbar, .report-end::-webkit-scrollbar { display: none; }

        /* Cream track, light brand-gray thumb */
        html:has(.report-digest),
        html:has(.report-digest) body {
          scrollbar-width: thin;
          scrollbar-color: #9CA3AF #F4F0EA;
        }
        html:has(.report-digest)::-webkit-scrollbar,
        html:has(.report-digest) body::-webkit-scrollbar,
        .report-digest::-webkit-scrollbar,
        .brand-scrollbar::-webkit-scrollbar {
          -webkit-appearance: none;
          width: 11px;
          height: 11px;
          background: #F4F0EA;
        }
        html:has(.report-digest)::-webkit-scrollbar-track,
        html:has(.report-digest) body::-webkit-scrollbar-track,
        .report-digest::-webkit-scrollbar-track,
        .brand-scrollbar::-webkit-scrollbar-track {
          background: #F4F0EA;
        }
        html:has(.report-digest)::-webkit-scrollbar-thumb,
        html:has(.report-digest) body::-webkit-scrollbar-thumb,
        .report-digest::-webkit-scrollbar-thumb,
        .brand-scrollbar::-webkit-scrollbar-thumb {
          background: #9CA3AF;
          border: 2px solid #F4F0EA;
          border-radius: 0;
          min-height: 40px;
        }
        html:has(.report-digest)::-webkit-scrollbar-thumb:hover,
        html:has(.report-digest) body::-webkit-scrollbar-thumb:hover,
        .report-digest::-webkit-scrollbar-thumb:hover,
        .brand-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6B7280;
        }
        html:has(.report-digest)::-webkit-scrollbar-corner,
        html:has(.report-digest) body::-webkit-scrollbar-corner,
        .report-digest::-webkit-scrollbar-corner,
        .brand-scrollbar::-webkit-scrollbar-corner {
          background: #F4F0EA;
        }
        .brand-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #9CA3AF #F4F0EA;
        }
        .digest-wide-bar {
          box-shadow: none;
        }
      `}</style>
      <div className={`report-page relative flex h-dvh flex-col ${digest ? "hidden" : "md:hidden"}`}>
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
                <div className="relative snap-start">
                  <StoryCover
                    story={story}
                    index={storyIndex}
                    edition={storyIndex === 0}
                    locked={locked && storyIndex > 0}
                    layout="classic"
                  />
                  <button
                    type="button"
                    onClick={(event) => {
                      const column = event.currentTarget.closest<HTMLElement>("[data-column]");
                      column?.scrollTo({ top: column.clientHeight, behavior: "smooth" });
                    }}
                    className={`absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 transition-opacity duration-200 hover:opacity-70 ${
                      imagelessFor(story)?.tone === "dark" ? "text-white" : imagelessFor(story) ? "text-[#011535]" : "text-white"
                    }`}
                  >
                    <BrandIcon name="chevronDown" defaultIcon={ChevronDown} className="h-6 w-6" />
                    <span className="text-[11px] font-bold tracking-[0.16em] uppercase" style={uiBold}>
                      Story
                    </span>
                  </button>
                </div>
                <StoryBody story={story} locked={locked} lead={storyIndex === 0} place="none" />
                {next ? (
                  <button type="button" onClick={() => goTo(storyIndex + 1)} className="flex w-full items-center gap-4 bg-[#374151] px-5 py-4 text-left text-white transition-colors duration-200 hover:bg-[#4B5563]">
                    {(() => {
                      const nextPlate = imagelessFor(next);
                      return (
                    <span
                      className={`relative h-16 w-16 shrink-0 overflow-hidden ${
                        nextPlate ? imagelessPlateClass(nextPlate.tone) : "bg-[#F0EAE1]"
                      }`}
                    >
                      {next.imageSrc ? (
                        <>
                          <Image src={next.imageSrc} alt="" fill unoptimized={next.imageSrc.startsWith("/") || next.imageSrc.startsWith("http")} className="object-cover" sizes="64px" />
                          <span className={`absolute inset-0 ${coverScrim}`} aria-hidden />
                        </>
                      ) : (
                        <span className="absolute inset-0 flex items-end justify-start p-2" aria-hidden>
                          <span
                            className={`text-[10px] font-bold tracking-[0.12em] uppercase ${
                              nextPlate?.tone === "dark" ? "text-white" : "text-[#011535]"
                            }`}
                            style={uiBold}
                          >
                            {next.chip}
                          </span>
                        </span>
                      )}
                    </span>
                      );
                    })()}
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
      <div className={`report-page ${digest ? "report-digest block" : "hidden md:block"}`}>
      {digest ? null : <WeekSiteHeader />}
      <div className="sticky top-0 z-40 bg-[var(--report-beige,#F4F0EA)]">
        <div className={`flex h-12 items-center gap-3 border-b border-[var(--brand-border-default,#e2e8f0)] bg-[var(--report-beige,#F4F0EA)] ${pagePad}`}>
          <p className="min-w-0 flex-1 truncate text-sm text-black" style={romanBold}>
            <span>The Week · {briefing} · </span>
            <span className="tabular-nums" aria-label={`Story ${number(index)} of ${total}`}>
              {number(index)}/{total}
            </span>
          </p>
          <div className="flex items-center gap-3 text-[11px] font-bold tracking-[0.1em] uppercase" style={uiBold}>
            <Link
              href={layoutHref("digest", locked, ads)}
              className={digest ? "text-[#DF0A14]" : "text-[var(--brand-text-secondary,#45556c)] hover:text-[#DF0A14]"}
            >
              Digest
            </Link>
            <Link
              href={layoutHref("classic", locked, ads)}
              className={!digest ? "text-[#DF0A14]" : "text-[var(--brand-text-secondary,#45556c)] hover:text-[#DF0A14]"}
            >
              Classic
            </Link>
          </div>
          {!digest ? (
            <div className="relative">
              <button
                type="button"
                aria-expanded={open}
                aria-controls="story-index"
                onClick={() => setOpen((value) => !value)}
                className="brand-icon-button inline-flex h-10 items-center gap-1.5 rounded-[var(--brand-radius-control,8px)] px-2 text-xs font-bold tracking-[0.08em] text-[var(--brand-text-primary,#0f172b)] uppercase transition-colors hover:text-[#DF0A14]"
                style={uiBold}
              >
                Index
                <BrandIcon name="chevronDown" defaultIcon={ChevronDown} className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
              </button>
              {open ? (
                <>
                  <button type="button" aria-label="Close story list" className="fixed inset-0 z-40 cursor-default bg-black/20" onClick={() => setOpen(false)} />
                  <div className="absolute top-full right-0 z-50 mt-1 w-[min(420px,calc(100vw-24px))] overflow-hidden border border-[var(--brand-border-default,#e2e8f0)] bg-[var(--report-beige,#F4F0EA)] shadow-[0_18px_40px_rgba(10,10,10,0.16)]">
                    {storyIndex("story-index")}
                  </div>
                </>
              ) : null}
            </div>
          ) : (
            <button
              type="button"
              aria-expanded={open}
              aria-controls="story-index"
              onClick={() => setOpen((value) => !value)}
              className="inline-flex h-10 items-center gap-1.5 rounded-[var(--brand-radius-control,8px)] px-1 text-[11px] font-bold tracking-[0.12em] text-[#DF0A14] uppercase lg:hidden"
              style={uiBold}
            >
              Latest
              <BrandIcon name="chevronDown" defaultIcon={ChevronDown} className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
          )}
        </div>
        {digest ? (
          <div
            className="h-0.5 w-full bg-black/10 lg:hidden"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={stories.length}
            aria-valuenow={index + 1}
            aria-label="Briefing progress"
          >
            <div
              className="h-full bg-[#0A0A0A] transition-[width] duration-300 ease-out"
              style={{ width: `${Math.max(4, ((index + 1) / Math.max(stories.length, 1)) * 100)}%` }}
            />
          </div>
        ) : null}
      </div>

      {digest && open ? (
        <>
          <button type="button" aria-label="Close story list" className="fixed inset-0 z-40 cursor-default bg-black/20 lg:hidden" onClick={() => setOpen(false)} />
          <div className={`fixed inset-x-0 bottom-0 z-50 max-h-[70dvh] overflow-auto border-t border-black/10 bg-[#F4F0EA] px-4 py-4 lg:hidden ${brandScrollbar}`}>
            <DigestRail
              stories={stories}
              onJump={(id) => {
                setOpen(false);
                jump(id);
              }}
              currentId={stories[index]?.id}
            />
          </div>
        </>
      ) : null}

      {digest ? (
        <>
          <HeroSplitComposition
            briefing={briefing}
            stories={stories}
            onJump={jump}
            onExplore={() => {
              const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
              document.getElementById("report-briefing")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
            }}
          />
          <div id="report-briefing" className="w-full scroll-mt-12 bg-[#F4F0EA]">
            <div className="mx-auto grid max-w-[1480px] lg:grid-cols-12 lg:items-stretch">
              <aside className={`hidden min-h-0 border-r border-black/15 lg:col-span-2 lg:block ${DIGEST_WIDE_BAR}`}>
                <div className={`py-8 pr-5 pl-5 xl:pl-8 ${DIGEST_WIDE_BAR}`}>
                  <InsideEdition stories={stories} onJump={jump} />
                </div>
              </aside>
              <div className={`min-w-0 lg:col-span-7 ${DIGEST_GROUND}`}>
                <div className={`border-b border-black/15 py-8 lg:hidden ${digestTextPad}`}>
                  <InsideEdition stories={stories} onJump={jump} />
                </div>
                {stories.map((story, storyIndex) => (
                  <article key={story.id} data-story-article={story.id} className={`${DIGEST_GROUND} border-b border-black/10`}>
                    <StoryCover story={story} index={storyIndex} edition={storyIndex === 0} locked={locked && storyIndex > 0} layout={layout} />
                    <div className={digestTextPad}>
                      <StoryBody story={story} locked={locked} lead={storyIndex === 0} place="none" layout={layout} />
                    </div>
                  </article>
                ))}
              </div>
              <aside className={`hidden min-h-0 border-l border-black/15 lg:col-span-3 lg:block ${DIGEST_WIDE_BAR}`}>
                <div className={`sticky top-12 z-20 max-h-[calc(100svh-3rem)] overflow-y-auto overscroll-contain py-8 pr-6 pl-5 xl:pr-10 ${DIGEST_WIDE_BAR} ${brandScrollbar}`}>
                  <DigestRail stories={stories} onJump={jump} currentId={stories[index]?.id} />
                </div>
              </aside>
            </div>
          </div>
        </>
      ) : (
        stories.map((story, storyIndex) => (
          <div key={story.id}>
            <StoryCover story={story} index={storyIndex} edition={storyIndex === 0} locked={locked && storyIndex > 0} layout={layout} />
            <StoryBody story={story} locked={locked} lead={storyIndex === 0} place="none" layout="classic" />
          </div>
        ))
      )}

      <BriefingSources periods={periods} />
      <section className="flex min-h-[40vh] items-center justify-center bg-[#F4F0EA] px-4 py-20">
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
