import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reports | A Little Better",
  description:
    "Download report templates and submit your completed daily business development report.",
};

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
