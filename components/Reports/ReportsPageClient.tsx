"use client";

import Footer from "@/components/Footer/Footer";
import ReportSubmissionForm from "@/components/Reports/ReportSubmissionForm";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink, Download } from "lucide-react";
import { useSpring, animated } from "@react-spring/web";

const PDF_PATH = "/kron_daily_report.pdf";

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
              Daily business development report
            </animated.h1>
            <animated.p
              style={sectionAnimation}
              className="text-neutral-600 dark:text-neutral-400 text-lg"
            >
              View the official Kron daily report PDF: pages 1–3 are the blank form template; pages 4–6 show a
              filled example. Use the form below to submit your completed report or notes.
            </animated.p>
          </div>

          <animated.section
            style={sectionAnimation}
            className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/50 p-6 md:p-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-start gap-3">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    Report PDF
                  </h2>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    <span className="font-medium text-neutral-800 dark:text-neutral-200">Pages 1–3:</span> blank
                    form layout.
                    <br />
                    <span className="font-medium text-neutral-800 dark:text-neutral-200">Pages 4–6:</span> example
                    of a completed report.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 shrink-0">
                <Button variant="outline" size="sm" asChild>
                  <a href={PDF_PATH} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in new tab
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={PDF_PATH} download>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative w-full rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden bg-neutral-100 dark:bg-neutral-950 min-h-[min(70vh,720px)]">
              <iframe
                title="Kron daily report PDF"
                src={`${PDF_PATH}#view=FitH`}
                className="absolute inset-0 w-full h-full min-h-[min(70vh,720px)]"
              />
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-3">
              If the preview does not load in your browser, use Open in new tab or Download.
            </p>
          </animated.section>

          <section className="w-full max-w-[600px] mx-auto">
            <h2 className="text-2xl font-medium text-center text-neutral-900 dark:text-neutral-100 mb-2">
              Submit a report
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-center mb-8 text-sm">
              Send your daily report details here. You may attach a PDF or add notes only.
            </p>
            <ReportSubmissionForm />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
