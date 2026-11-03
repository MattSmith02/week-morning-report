import { EDITIONS, STORY_SOURCES, type WeekStory } from "../the-week/stories";
import { ReportBriefing, type SourcePeriod } from "./ReportBriefing";

export const dynamic = "force-dynamic";

/** Lesser pieces that demo typographic / gradient covers when editors lack art. */
const TEXT_ONLY_COVERS = new Set(["tact", "okinawa", "chicago-fire", "newspapers", "tall-tale"]);

function citedOutlets(story: WeekStory) {
  return (story.sources ?? STORY_SOURCES[story.id])?.outlets ?? [];
}

function sourcePeriod(id: string, label: string, detail: string, list: WeekStory[]): SourcePeriod {
  const uses = new Map<string, { name: string; count: number }>();
  const topics = new Map<string, number>();
  let citations = 0;

  for (const story of list) {
    if (story.chip) topics.set(story.chip, (topics.get(story.chip) ?? 0) + 2);
    if (story.displayTitle) topics.set(story.displayTitle, (topics.get(story.displayTitle) ?? 0) + 1);
    for (const outlet of citedOutlets(story)) {
      const current = uses.get(outlet.name);
      uses.set(outlet.name, { name: outlet.name, count: (current?.count ?? 0) + 1 });
      citations += 1;
    }
  }

  return {
    id,
    label,
    detail,
    citations,
    uses: [...uses.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)),
    topics: [...topics.entries()]
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
      .slice(0, 22),
  };
}

export default async function ReportPage({
  searchParams,
}: {
  searchParams: Promise<{ sources?: string; locked?: string; ads?: string }>;
}) {
  const params = await searchParams;
  const sourcesView = params.sources === "1";
  const locked = params.locked === "1";
  const ads = params.ads === "1";

  const edition = EDITIONS.find((item) => item.id === "morning");
  const sudoku = EDITIONS.find((item) => item.id === "evening")?.stories.find((story) => story.id === "sudoku");
  const videoStory: WeekStory = {
    id: "video-example",
    chip: "Video",
    format: "video",
    kicker: "Video",
    displayTitle: "The clip",
    dek: "A short video story",
    menuTitle: "A short video story",
    imageGradient: "linear-gradient(160deg, #1a2330 0%, #3d4a5c 42%, #11161c 100%)",
    imageCaption: "Example clip",
    videoSrc: "/the-week/example-video.mp4",
    whatHappened: "This story is a video. The picture above is the cover. Press play to watch the clip.",
    statsHeading: "",
    stats: [],
    statsNote: "",
  };
  const puzzleStory: WeekStory | null = sudoku
    ? {
        ...sudoku,
        displayTitle: "Sudoku",
        dek: "Daily sudoku",
        menuTitle: "Daily sudoku",
        whatHappened: "Each row, column, and box takes the numbers 1 to 9, once.",
      }
    : null;
  const morning = edition?.stories ?? [];
  const week = EDITIONS.filter((item) => item.id !== "all").flatMap((item) => item.stories);
  const stories = [...morning, videoStory, ...(puzzleStory ? [puzzleStory] : [])].map((story) => {
    const base = {
      ...story,
      sources: story.sources ?? STORY_SOURCES[story.id],
    };
    if (!TEXT_ONLY_COVERS.has(story.id)) return base;
    return { ...base, imageSrc: undefined, imageCaption: "" };
  });
  const periods = [
    sourcePeriod("today", "Today", "Citations in this Morning Report.", morning),
    sourcePeriod("week", "This week", "Morning, evening, Saturday, and Sunday editions.", week),
    sourcePeriod("month", "This month", "This file holds one week of editions, so the month matches the week.", week),
    sourcePeriod("overall", "Overall", "Every edition in this file.", week),
  ];

  return (
    <main className="bg-[#F4F0EA]">
      <ReportBriefing stories={stories} briefing={edition?.briefing ?? "Morning Report"} caughtUp={edition?.caughtUp ?? ""} periods={periods} sourcesView={sourcesView} locked={locked} ads={ads} />
    </main>
  );
}
