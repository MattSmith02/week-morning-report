import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Botched execution | Morning Report | The Week",
  description: "The Morning Report, opened with a full-screen cover for each story.",
  robots: { index: false, follow: false },
};

export default function ReportLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-[#0A0A0A]" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
      {children}
    </div>
  );
}
