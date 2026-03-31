"use client";

import Footer from "@/components/Footer/Footer";
import ReportSubmissionForm from "@/components/Reports/ReportSubmissionForm";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { useSpring, animated } from "@react-spring/web";

const PDF_PATH = "/kron_daily_report.pdf";

const REPORTS = [
  {
    id: "kron-daily",
    title: "Kron daily business development report",
    description:
      "Official template and example in one PDF. Pages 1–3: blank form. Pages 4–6: example of a completed report.",
    href: PDF_PATH,
    fileName: "kron_daily_report.pdf",
  },
] as const;

export default function ReportsPageClient() {
  const titleAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 100, friction: 50 },
  });

  const sectionAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(16px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay: 80,
    config: { tension: 100, friction: 50 },
  });

  return (
    <>
      <main className="min-h-screen flex flex-col items-center py-16 px-6">
        <div className="w-full max-w-4xl space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <animated.h1
              style={titleAnimation}
              className="text-4xl font-medium text-neutral-900 dark:text-neutral-100 mb-4"
            >
              Reports
            </animated.h1>
            <animated.p
              style={sectionAnimation}
              className="text-neutral-600 dark:text-neutral-400 text-lg"
            >
              Download report templates below, then use the form to submit your completed report or notes.
            </animated.p>
          </div>

          <animated.section style={sectionAnimation} className="space-y-4">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              All reports
            </h2>
            <ul className="space-y-3">
              {REPORTS.map((report) => (
                <li
                  key={report.id}
                  className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/50 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-neutral-900 dark:text-neutral-100">{report.title}</p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{report.description}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0" asChild>
                    <a href={report.href} download={report.fileName}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </a>
                  </Button>
                </li>
              ))}
            </ul>
          </animated.section>

          <section className="w-full max-w-[600px] mx-auto">
            <h2 className="text-2xl font-medium text-center text-neutral-900 dark:text-neutral-100 mb-2">
              Submit a report
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-center mb-8 text-sm">
              Send your daily report here. You may attach a PDF or add notes only.
            </p>
            <ReportSubmissionForm />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
