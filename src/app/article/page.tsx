"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { BrandScrollArrow } from "@/components/atoms/BrandScrollArrow/BrandScrollArrow";
import { BrandIcon } from "@/components/atoms/icons/BrandIcon";
import { ChevronRight, Lock } from "lucide-react";
import { EDITIONS } from "../the-week/stories";

const ROMAN = "Palatino, 'Palatino Linotype', 'Book Antiqua', Georgia, serif";
const UI = "Arial, Helvetica, sans-serif";
const roman: CSSProperties = { fontFamily: ROMAN, fontWeight: 400 };
const romanBold: CSSProperties = { fontFamily: ROMAN, fontWeight: 700 };
const ui: CSSProperties = { fontFamily: UI, fontWeight: 400 };
const uiBold: CSSProperties = { fontFamily: UI, fontWeight: 700 };

const CREAM = "#F4F0EA";
const SOFT = "#F0EAE1";
const weekCta =
  "inline-flex w-fit items-center justify-center gap-2 rounded-lg bg-[#DF0A14] px-4 py-3 text-xs font-bold tracking-[0.05em] text-[#FAFAFA] uppercase transition-colors duration-200 hover:bg-[#B20810] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DF0A14]";

const WEEK_SUBSCRIBE =
  "https://subscribe.theweek.com/pubs/W0/TWE/self1023_3formats_Dlink.jsp?cds_mag_code=TWE&cds_page_id=275740";

const NAV = [
  "Home",
  "The Explainer",
  "The Week Recommends",
  "Newsletters",
  "Cartoons",
  "From the Magazine",
  "More",
  "The Week Junior",
] as const;

const FOOTER_LINKS = [
  "About Us",
  "Contact Future's experts",
  "Terms and Conditions",
  "Privacy Policy",
  "Cookie Policy",
  "Advertise With Us",
  "FAQ",
  "GDPR consent",
] as const;

const TAGS = ["IPO", "Fashion and Beauty", "Finance", "The Week"] as const;

const RELATED = [
  "How IPOs work and what to know before investing",
  "What to consider when choosing a brokerage account",
  "Anthropic: the largest IPO ever?",
] as const;

const READ_MORE = [
  {
    kicker: "Wall Street",
    title: "Anthropic: the largest IPO ever?",
    image: "/the-week/musk.jpg",
  },
  {
    kicker: "Personal Finance",
    title: "What to consider when choosing a brokerage account",
    image: "/the-week/millionaire.jpg",
  },
  {
    kicker: "Sponsored Content",
    title: "Straight to your inbox",
    image: "/the-week/hero-sunday-field.jpg",
    action: "Sign up for free",
  },
] as const;

const HERO =
  "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=2000&q=80";
const AUTHOR =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80";

function WeekMark({ className = "h-12 w-[135px]" }: { className?: string }) {
  return (
    <span className={`relative inline-flex items-center justify-center bg-[#DF0A14] ${className}`}>
      <span className="text-[clamp(0.85rem,2.2vw,1.35rem)] font-bold tracking-[0.22em] text-white" style={romanBold}>
        THE WEEK
      </span>
    </span>
  );
}

function AdSlot({ height, label = "Advertisement" }: { height: number; label?: string }) {
  return (
    <div
      className="flex w-full items-center justify-center bg-[#EEEEEE] text-[12px] uppercase tracking-[0.14em] text-[#737373]"
      style={{ height, ...ui }}
      aria-label={label}
    >
      {label}
    </div>
  );
}

function ToolChip({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex h-[34px] items-center gap-1 rounded-[6px] border border-[#CCCCCC] px-2 text-[12px] leading-3 text-[#333333]"
      style={roman}
    >
      {children}
    </span>
  );
}

function GoogleMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden>
      <path fill="#4285F4" d="M17.6 9.2c0-.6-.1-1.2-.2-1.8H9v3.4h4.8a4.1 4.1 0 0 1-1.8 2.7v2.2h2.9c1.7-1.6 2.7-3.9 2.7-6.5Z" />
      <path fill="#34A853" d="M9 18c2.4 0 4.5-.8 6-2.2l-2.9-2.2c-.8.6-1.9.9-3.1.9-2.4 0-4.4-1.6-5.1-3.8H.9v2.3A9 9 0 0 0 9 18Z" />
      <path fill="#FBBC05" d="M3.9 10.7A5.4 5.4 0 0 1 3.6 9c0-.6.1-1.2.3-1.7V5H.9A9 9 0 0 0 0 9c0 1.4.3 2.8.9 4l3-2.3Z" />
      <path fill="#EA4335" d="M9 3.6c1.3 0 2.5.5 3.4 1.3l2.6-2.6A9 9 0 0 0 .9 5l3 2.3C4.6 5.2 6.6 3.6 9 3.6Z" />
    </svg>
  );
}

function PromoBar() {
  return (
    <div className="flex w-full items-center justify-center bg-[#FFD500] px-[30px] py-[7px]">
      <p className="text-center text-[18px] leading-[26px] text-black sm:text-[22px]" style={romanBold}>
        MIDTERMS SPECIAL DEAL. SAVE 87% TODAY.{" "}
        <a href={WEEK_SUBSCRIBE} target="_blank" rel="noreferrer" className="underline">
          TAKE THE SPECIAL DEAL!
        </a>
      </p>
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="relative z-30 bg-white">
      <div className="relative mx-auto flex h-[100px] max-w-[1280px] items-center justify-center px-4">
        <a
          href={WEEK_SUBSCRIBE}
          target="_blank"
          rel="noreferrer"
          className="absolute left-4 top-1/2 hidden -translate-y-1/2 items-center gap-1 lg:flex"
        >
          <span className="relative h-[60px] w-[60px] overflow-hidden bg-[#DF0A14]">
            <Image src="/the-week/sources/week-2024.jpg" alt="" fill sizes="60px" className="object-cover object-top" />
          </span>
          <span className="pl-1">
            <span className="block text-[12px] leading-[14px] font-bold text-[#DF0A14]" style={uiBold}>
              MIDTERMS SPECIAL
            </span>
            <span className="mt-[5px] block text-[12px] leading-[14px] font-bold text-[#333333]" style={uiBold}>
              Save 87% today
            </span>
          </span>
        </a>

        <Link href="/article" aria-label="The Week">
          <WeekMark className="h-[70px] w-[min(72vw,415px)]" />
        </Link>

        <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-3">
          <span className="hidden items-center gap-1 border-r border-[#EDEDED] pr-2.5 text-[10px] leading-7 text-[#333333] xl:inline-flex" style={ui}>
            US Edition
            <svg width="23" height="17" viewBox="0 0 23 17" aria-hidden className="ml-1">
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
          <button type="button" aria-label="Search" className="hidden text-[#333333] sm:inline-flex">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
              <path d="M16.5 16.5 21 21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          <a href="https://theweek.com/" className="inline-flex items-center gap-1 text-[10px] leading-none text-black" style={ui}>
            My Account
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <circle cx="10" cy="7" r="3.2" stroke="#333" strokeWidth="1.4" />
              <path d="M3.5 17c1.6-3 4-4.5 6.5-4.5S14.9 14 16.5 17" stroke="#333" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </a>
        </div>
      </div>

      <nav className="hidden border-y border-[#EDEDED] lg:block" aria-label="The Week sections">
        <ul className="mx-auto flex h-[42px] max-w-[1280px] items-center justify-center px-2.5">
          {NAV.map((item) => (
            <li key={item}>
              <a
                href="https://theweek.com/"
                className="whitespace-nowrap px-5 text-[14px] leading-10 font-bold capitalize text-[#333333]"
                style={romanBold}
              >
                {item}
                {item === "More" ? (
                  <span className="ml-1 inline-block text-[10px]" aria-hidden>
                    ▾
                  </span>
                ) : null}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function NewsletterForm() {
  return (
    <form className="relative" action="#">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <label className="sr-only" htmlFor="ipo-email">
          Your Email Address
        </label>
        <input
          id="ipo-email"
          type="email"
          name="email"
          placeholder="Your Email Address"
          className="h-12 w-full flex-1 border border-black/15 bg-white px-3.5 text-[16px] leading-[18px] text-black placeholder:text-black/45"
          style={ui}
        />
        <button type="submit" className={`${weekCta} h-12 w-full shrink-0 sm:w-auto sm:min-w-[148px]`} style={uiBold}>
          Sign up
        </button>
      </div>
      <div className="mt-6 flex flex-col gap-3.5">
        <label className="flex items-start gap-2.5 text-[14px] leading-5 text-black" style={ui}>
          <input type="checkbox" className="mt-0.5 h-[13px] w-[13px] shrink-0 rounded-[2px] border border-[#767676] bg-white" />
          Contact me with news and offers from other Future brands
        </label>
        <label className="flex items-start gap-2.5 text-[14px] leading-5 text-black" style={ui}>
          <input type="checkbox" className="mt-0.5 h-[13px] w-[13px] shrink-0 rounded-[2px] border border-[#767676] bg-white" />
          Receive email from us on behalf of our trusted partners or sponsors
        </label>
      </div>
    </form>
  );
}

function MiniLatestBriefing() {
  const edition = EDITIONS.find((item) => item.id === "morning") ?? EDITIONS[0];
  const withImages = edition.stories.filter((story) => story.imageSrc);
  const preview = withImages.slice(0, 3);
  const moreCount = Math.max(0, edition.stories.length - preview.length);
  const scrollerRef = useRef<HTMLDivElement>(null);
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
  }, [preview.length]);

  const go = (direction: -1 | 1) => {
    const root = scrollerRef.current;
    const card = root?.querySelector<HTMLElement>("[data-feed-card]");
    if (!root || !card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.scrollBy({ left: direction * (card.offsetWidth + 12), behavior: reduce ? "auto" : "smooth" });
  };

  if (!preview.length) return null;

  return (
    <section className="mt-10" style={{ background: CREAM }} aria-label="Morning Report preview">
      <div className="flex flex-col gap-5 px-4 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-6 lg:px-8">
        <div className="min-w-0 max-w-[36rem]">
          <p className="text-[11px] font-bold tracking-[0.14em] text-[#DF0A14] uppercase" style={uiBold}>
            Preview · From today’s edition
          </p>
          <h2 className="mt-2 text-[28px] leading-none text-[#011535] sm:text-[32px]" style={roman}>
            {edition.briefing}
          </h2>
          <div className="mt-3 h-[3px] w-14 bg-[#DF0A14]" aria-hidden />
          <p className="mt-4 text-[15px] leading-6 text-[#666666]" style={roman}>
            A short look at today’s top stories — then open the full briefing to keep reading.
          </p>
        </div>
        <Link href="/report" className={weekCta} style={uiBold}>
          Open briefing
          <BrandIcon name="chevronRight" defaultIcon={ChevronRight} className="h-4 w-4" />
        </Link>
      </div>

      <div className="relative px-4 pb-6 sm:px-6 lg:px-8">
        <div
          ref={scrollerRef}
          onScroll={syncEdges}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {preview.map((story) => (
            <article
              key={story.id}
              data-feed-card
              className="flex w-[min(78%,260px)] shrink-0 snap-start flex-col bg-white lg:w-auto lg:min-w-0"
            >
              <Link href={`/report#${story.id}`} className="relative aspect-[4/5] w-full overflow-hidden bg-[#111] lg:aspect-[4/3]">
                <Image
                  src={story.imageSrc!}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, 260px"
                  className={`object-cover object-[center_20%] ${story.imageFit === "contain" ? "object-contain" : ""}`}
                />
              </Link>
              <div className="flex flex-1 flex-col px-3 py-3 sm:px-4 sm:py-4" style={{ background: SOFT }}>
                <p className="text-[10px] font-bold tracking-[0.14em] text-[#DF0A14] uppercase" style={uiBold}>
                  {story.chip}
                </p>
                <p className="mt-1.5 line-clamp-3 text-[16px] leading-5 text-[#1B1B1B] lg:text-[18px] lg:leading-6" style={roman}>
                  {story.dek}
                </p>
                <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-[#666666]" style={roman}>
                  {story.whatHappened}
                </p>
                <Link
                  href={`/report#${story.id}`}
                  className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold tracking-[0.12em] text-[#DF0A14] uppercase"
                  style={uiBold}
                >
                  Continue
                  <BrandIcon name="chevronRight" defaultIcon={ChevronRight} className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-10 flex items-center justify-between px-2 lg:hidden">
          <BrandScrollArrow
            direction="left"
            label="Previous stories"
            disabled={atStart}
            onClick={() => go(-1)}
            className="pointer-events-auto"
          />
          <BrandScrollArrow
            direction="right"
            label="Next stories"
            disabled={atEnd}
            onClick={() => go(1)}
            className="pointer-events-auto"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-4 pb-6 sm:px-6 lg:px-8">
        <p className="text-[14px] leading-5 text-[#666666]" style={roman}>
          {moreCount > 0
            ? `${moreCount} more ${moreCount === 1 ? "story" : "stories"} in today’s briefing`
            : "The rest of today’s briefing is ready when you are"}
        </p>
        <Link
          href="/report"
          className="inline-flex items-center gap-1 text-[12px] font-bold tracking-[0.12em] text-[#DF0A14] uppercase"
          style={uiBold}
        >
          Continue to briefing
          <BrandIcon name="chevronRight" defaultIcon={ChevronRight} className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-10 bg-black px-5 py-10 text-white">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center">
        <a href={WEEK_SUBSCRIBE} target="_blank" rel="noreferrer" aria-label="Subscribe to The Week">
          <WeekMark className="h-12 w-[135px]" />
        </a>
        <ul className="mt-8 flex max-w-[936px] flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {FOOTER_LINKS.map((item) => (
            <li key={item}>
              <a href="https://theweek.com/" className="text-[14px] leading-8 uppercase" style={ui}>
                {item}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-[12px] leading-4 text-white" style={ui}>
          The Week US is part of Future US Inc, an international media group and leading digital publisher.
        </p>
        <p className="mt-2.5 text-center text-[12px] leading-4 text-white" style={ui}>
          © Future US, Inc. Full 7th Floor, 130 West 42nd Street, New York, NY 10036.
        </p>
      </div>
    </footer>
  );
}

export default function ArticlePage() {
  return (
    <div className="min-h-screen bg-white text-[#0A0A0A]">
      <PromoBar />
      <SiteHeader />

      <div className="flex min-h-[250px] w-full items-center justify-center py-12">
        <div className="w-full max-w-[1170px] px-4">
          <AdSlot height={250} label="Advertisement" />
        </div>
      </div>

      <article className="mx-auto w-full max-w-[1200px] bg-white">
        <header className="flex flex-col items-center px-4 pt-5 pb-10 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-[16px] leading-6 text-[#0A0A0A]" style={ui}>
            <Link href="/" className="underline">
              Home
            </Link>
            <span className="text-[#737373]" aria-hidden>
              /
            </span>
            <a href="https://theweek.com/" className="underline">
              Personal Finance
            </a>
          </nav>

          <a
            href="https://theweek.com/"
            className="mt-5 text-[12px] leading-[13px] font-bold tracking-[1.5px] text-[#DF0914] uppercase underline"
            style={uiBold}
          >
            The Explainer
          </a>

          <h1 className="mt-5 max-w-[900px] px-[30px] text-center text-[36px] leading-[1.2] text-[#1B1B1B] sm:text-[50px] sm:leading-[60px]" style={roman}>
            How IPOs work and what to know before investing
          </h1>

          <p className="mt-5 max-w-[800px] text-center text-[18px] leading-8 text-[#333333]" style={ui}>
            When a private company sells shares to the public for the first time
          </p>

          <div className="mt-[26px] flex flex-wrap items-center justify-center gap-3">
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#E5E7EB]">
              <Image src={AUTHOR} alt="" fill unoptimized sizes="40px" className="object-cover" />
            </span>
            <p className="flex flex-wrap items-center gap-x-2 text-[16px] leading-6 text-[#1B1B1B]" style={roman}>
              <span>By Becca Stanek, The Week US</span>
              <span className="hidden h-3 w-px bg-[#D1D5DC] sm:block" aria-hidden />
              <span className="text-[14px] leading-5">Published 14 hours ago</span>
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-[5px] bg-[#DF0A14] px-2.5 py-1.5 text-[11px] font-bold tracking-[0.12em] text-white uppercase" style={uiBold}>
              <Lock size={11} strokeWidth={2.4} aria-hidden />
              Exclusive
            </span>
          </div>
        </header>

        <div className="px-[15px] pb-10">
          <figure className="pb-[15px]">
            <div className="relative aspect-[1170/658] w-full min-h-[100px] overflow-hidden bg-[#111]">
              <Image src={HERO} alt="" fill priority unoptimized sizes="1170px" className="object-cover" />
            </div>
            <figcaption className="pt-2.5">
              <p className="text-[16px] leading-4 text-[#333333]" style={ui}>
                IPO investing can be high-risk
              </p>
              <p className="mt-[5px] text-[13px] leading-[18px] text-[#666666]" style={ui}>
                (Image credit: AlexSecret / Getty Images)
              </p>
            </figcaption>
          </figure>

          <div className="relative grid items-start gap-8 lg:grid-cols-[minmax(0,850px)_300px]">
            <div className="min-w-0">
              <div className="mx-auto flex w-full max-w-[600px] flex-col">
                <div className="flex w-full max-w-[600px] flex-wrap items-center justify-between gap-3 border-y border-[#D1D5DC] py-2">
                  <ToolChip>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M4 12v8h8M20 4l-9.5 9.5M14 4h6v6" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Share
                  </ToolChip>
                  <div className="flex flex-wrap gap-2">
                    <a href="https://www.google.com/preferences/source?q=theweek.com" target="_blank" rel="noreferrer">
                      <ToolChip>
                        <GoogleMark />
                        Follow us
                      </ToolChip>
                    </a>
                    <a href="#newsletter">
                      <ToolChip>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <rect x="3" y="5" width="18" height="14" rx="1.5" stroke="#333" strokeWidth="1.4" />
                          <path d="m4 7 8 6 8-6" stroke="#333" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Newsletter
                      </ToolChip>
                    </a>
                  </div>
                </div>

                <div className="flex flex-col gap-5 pt-5 text-[18px] leading-[30px] text-[#1B1B1B]" style={roman}>
                  <p>
                    An IPO, or initial public offering, is a major milestone for a company — and often a headline event for investors. It is the moment a private business first sells shares on a public exchange.
                  </p>
                  <p>
                    Most obviously, an IPO marks an initial opportunity for everyday investors to buy a stake. It can also change how the company raises money, reports results, and tells its story.
                  </p>
                </div>

                <h2 className="mt-5 text-[32px] leading-[42px] tracking-[-0.096px] text-[#333333]" style={roman}>
                  What is an IPO?
                </h2>
                <div className="mt-[5px] flex flex-col gap-8 text-[18px] leading-[30px] text-[#1B1B1B]" style={roman}>
                  <p>
                    It is the “event in which a private company converts its status and sells shares to public investors,” usually through underwriters who help price and place the stock. After listing day, the shares trade freely on an exchange.
                  </p>
                  <p>
                    For an IPO to happen, a company does not just flip a switch. It files a prospectus, meets exchange rules, and often spends months preparing financials and a roadshow for institutional buyers.
                  </p>
                </div>

                <h2 className="mt-5 text-[32px] leading-[42px] tracking-[-0.096px] text-[#333333]" style={roman}>
                  Why do companies go public?
                </h2>
                <p className="mt-[5px] text-[18px] leading-[30px] text-[#1B1B1B]" style={roman}>
                  There are a number of reasons. A major one is funding: selling shares can raise cash for growth, acquisitions, or paying down debt. Founders and early investors may also use the listing to sell some of their stake.
                </p>

                <h2 className="mt-6 text-[32px] leading-[42px] tracking-[-0.096px] text-[#333333]" style={roman}>
                  Is an IPO a good investment opportunity?
                </h2>
                <div className="mt-[5px] flex flex-col gap-5 text-[18px] leading-[30px] text-[#1B1B1B]" style={roman}>
                  <p>
                    While “prospective shareholders may view the IPO as a chance to get in early,” the first days of trading can be volatile. New listings often swing hard as the market digests the price and the story.
                  </p>
                  <p>
                    The main place to look is a company’s prospectus, which lays out the business, risks, use of proceeds, and who is selling shares. Read that before you chase the ticker.
                  </p>
                </div>

                <section id="newsletter" className="mt-8 px-5 py-10 sm:px-8 sm:py-12" style={{ background: CREAM }} aria-label="Newsletter">
                  <div className="mx-auto flex max-w-[34rem] flex-col items-center text-center">
                    <h2 className="text-[30px] leading-[1.15] text-[#1B1B1B] sm:text-[36px]" style={roman}>
                      Sign up to get Today’s Best Articles in your inbox
                    </h2>
                    <div className="mt-5 h-[3px] w-16 bg-[#DF0A14]" aria-hidden />
                    <p className="mt-5 text-[16px] leading-7 text-[#666666]" style={roman}>
                      A free daily email with the day’s biggest news and analysis – and the best features from TheWeek.com
                    </p>
                  </div>
                  <div className="mx-auto mt-8 max-w-[34rem] border border-black/10 bg-white p-5 sm:p-6">
                    <NewsletterForm />
                    <p className="mt-5 text-[13px] leading-5 text-[#666666]" style={ui}>
                      By submitting your information you agree to the Terms &amp; Conditions and Privacy Policy and are aged 16 or over.
                    </p>
                  </div>
                </section>

                <p className="mt-12 text-[18px] leading-[30px] text-[#1B1B1B]" style={roman}>
                  Beyond that, it’s important to have a handle on your own timeline and risk tolerance. IPO shares can jump — and they can fall just as fast once the lockups expire and the story cools.
                </p>

                <div className="mt-10 pb-8">
                  <div className="bg-white py-2">
                    <p className="text-[11px] font-bold tracking-[0.14em] text-[#DF0A14] uppercase" style={uiBold}>
                      Related
                    </p>
                    <div className="mt-2 h-[3px] w-14 bg-[#DF0A14]" aria-hidden />
                    <ul className="mt-5 flex flex-col gap-4">
                      {RELATED.map((item) => (
                        <li key={item}>
                          <a
                            href="#top"
                            className="group inline-flex items-start gap-2 text-[18px] leading-7 text-[#1B1B1B] transition-colors hover:text-[#DF0A14]"
                            style={roman}
                          >
                            <BrandIcon
                              name="chevronRight"
                              defaultIcon={ChevronRight}
                              className="mt-1.5 h-4 w-4 shrink-0 text-[#DF0A14]"
                            />
                            <span className="underline decoration-black/20 underline-offset-4 group-hover:decoration-[#DF0A14]/40">
                              {item}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    <p className="text-[11px] font-bold tracking-[0.14em] text-[#DF0A14] uppercase" style={uiBold}>
                      Topics
                    </p>
                    <div className="mt-2 h-[3px] w-14 bg-[#DF0A14]" aria-hidden />
                    <div className="mt-4 flex flex-wrap gap-2">
                      {TAGS.map((tag) => (
                        <a
                          key={tag}
                          href="https://theweek.com/"
                          className="inline-flex h-10 items-center border border-black/15 bg-white px-4 text-[12px] font-bold tracking-[0.08em] text-[#011535] uppercase transition-colors hover:border-[#DF0A14] hover:text-[#DF0A14]"
                          style={uiBold}
                        >
                          {tag}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <aside className="hidden w-full max-w-[300px] flex-col lg:flex" aria-label="Advertisements">
              <div className="pb-[120px]">
                <AdSlot height={250} />
              </div>
              <div className="pb-[120px] pt-5">
                <AdSlot height={250} />
              </div>
              <div className="pb-[120px]">
                <AdSlot height={600} />
              </div>
              <div className="pt-[140px] pb-[120px]">
                <AdSlot height={600} />
              </div>
            </aside>
          </div>

          <section className="mt-8 border-y border-black/15 py-6" aria-label="About the author">
            <div className="flex items-center gap-3">
              <p className="shrink-0 text-[11px] font-bold tracking-[0.14em] text-[#DF0A14] uppercase" style={uiBold}>
                About the author
              </p>
              <div className="h-px min-w-0 flex-1 bg-black/15" aria-hidden />
            </div>
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
              <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-[#E5E7EB] sm:h-20 sm:w-20">
                <Image src={AUTHOR} alt="" fill unoptimized sizes="80px" className="object-cover" />
              </span>
              <div className="min-w-0 flex-1">
                <a href="https://theweek.com/" className="text-[20px] leading-6 text-[#1B1B1B] sm:text-[22px]" style={romanBold}>
                  Becca Stanek
                </a>
                <p className="mt-1 text-[12px] font-bold tracking-[0.08em] text-[#666666] uppercase" style={uiBold}>
                  The Week US
                </p>
                <p className="mt-3 max-w-[65ch] text-[16px] leading-6 text-[#1B1B1B]" style={roman}>
                  Becca Stanek has worked as an editor and writer in personal finance and consumer journalism, covering the stories that help readers make sense of money.
                </p>
                <a
                  href="#newsletter"
                  className="mt-4 inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.12em] text-[#DF0A14] uppercase transition-opacity hover:opacity-80"
                  style={uiBold}
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#DF0A14] text-white">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <rect x="3" y="5" width="18" height="14" rx="1.5" stroke="white" strokeWidth="1.6" />
                      <path d="m4 7 8 6 8-6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  Email the author
                </a>
              </div>
            </div>
          </section>

          <MiniLatestBriefing />

          <div className="mt-10">
            <AdSlot height={280} />
          </div>

          <section className="mt-5" aria-label="Read more">
            <h2 className="border-t border-[#737373] py-8 text-center text-[30px] leading-8 tracking-[2px] text-[#171717] uppercase" style={roman}>
              Read more
            </h2>
            <ul className="grid gap-6 sm:grid-cols-3">
              {READ_MORE.map((item) => (
                <li key={item.title}>
                  <a href="#top" className="block">
                    <span className="relative block aspect-[374/210] overflow-hidden bg-[#EEEEEE]">
                      <Image src={item.image} alt="" fill sizes="374px" className="object-cover" />
                    </span>
                    <span className="mt-3.5 block text-[12px] leading-4 tracking-[0.5px] text-[#333333] uppercase" style={roman}>
                      {item.kicker}
                    </span>
                    <span className="mt-2.5 block text-[24px] leading-8 text-[#171717]" style={roman}>
                      {item.title}
                    </span>
                    {"action" in item && item.action ? (
                      <span className="mt-3.5 block text-[11px] leading-4 text-[#737373] uppercase" style={roman}>
                        {item.action}
                      </span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
