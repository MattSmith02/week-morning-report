import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "How IPOs work and what to know before investing | The Week US",
  description: "When a private company sells shares to the public for the first time.",
  robots: { index: false, follow: false },
};

export default function ArticleLayout({ children }: { children: ReactNode }) {
  return children;
}
