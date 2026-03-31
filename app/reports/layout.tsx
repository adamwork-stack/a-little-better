import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Reports | A Little Better",
  description:
    "View the Kron daily business development report template and submit your completed report.",
};

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
