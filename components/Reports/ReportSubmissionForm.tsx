"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useSpring, animated } from "@react-spring/web";

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      render: (
        element: HTMLElement,
        options: { sitekey: string; callback: (token: string) => void }
      ) => number;
      reset: (widgetId: number) => void;
      getResponse: (widgetId: number) => string;
    };
  }
}

const RECAPTCHA_SITE_KEY = "6LeFG1osAAAAANmYQ51ZprcKziJC4JvLW5fp7REY";

export default function ReportSubmissionForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reportDate, setReportDate] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=explicit`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setIsRecaptchaLoaded(true);
      if (window.grecaptcha && recaptchaRef.current) {
        window.grecaptcha.ready(() => {
          if (recaptchaRef.current) {
            widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
              sitekey: RECAPTCHA_SITE_KEY,
              callback: (token: string) => setRecaptchaToken(token),
            });
          }
        });
      }
    };
    document.body.appendChild(script);
    return () => {
      const existingScript = document.querySelector(`script[src="${script.src}"]`);
      if (existingScript) document.body.removeChild(existingScript);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isRecaptchaLoaded) {
      setSubmitStatus({
        type: "error",
        message: "reCAPTCHA is loading. Please wait a moment and try again.",
      });
      return;
    }

    let currentToken = "";
    if (widgetIdRef.current !== null && window.grecaptcha) {
      try {
        currentToken = window.grecaptcha.getResponse(widgetIdRef.current);
        if (!currentToken) currentToken = recaptchaToken;
      } catch {
        currentToken = recaptchaToken;
      }
    } else {
      currentToken = recaptchaToken;
    }

    if (!currentToken) {
      setSubmitStatus({
        type: "error",
        message:
          "Please complete the reCAPTCHA verification by checking the I am not a robot box.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("email", email);
      fd.append("reportDate", reportDate);
      fd.append("message", message);
      fd.append("recaptchaToken", currentToken);
      if (file) fd.append("file", file);

      const response = await fetch("/api/report", {
        method: "POST",
        body: fd,
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message:
            "Thank you. Your report has been submitted. We will confirm if anything else is needed.",
        });
        setName("");
        setEmail("");
        setReportDate("");
        setMessage("");
        setFile(null);
        setRecaptchaToken("");
        if (widgetIdRef.current !== null && window.grecaptcha) {
          try {
            window.grecaptcha.reset(widgetIdRef.current);
          } catch {
            /* ignore */
          }
        }
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to submit report. Please try again.",
        });
        setRecaptchaToken("");
        if (widgetIdRef.current !== null && window.grecaptcha) {
          try {
            window.grecaptcha.reset(widgetIdRef.current);
          } catch {
            /* ignore */
          }
        }
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus({
        type: "error",
        message: "Failed to submit report. Please try again later.",
      });
      setRecaptchaToken("");
      if (widgetIdRef.current !== null && window.grecaptcha) {
        try {
          window.grecaptcha.reset(widgetIdRef.current);
        } catch {
          /* ignore */
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const formAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay: 200,
    config: { tension: 100, friction: 50 },
  });

  const statusAnimation = useSpring({
    opacity: submitStatus.type ? 1 : 0,
    transform: submitStatus.type ? "translateY(0px)" : "translateY(-10px)",
    config: { tension: 200, friction: 25 },
  });

  const inputClass =
    "w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  return (
    <animated.form onSubmit={handleSubmit} style={formAnimation} className="space-y-6">
      <div>
        <label htmlFor="report-name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Name
        </label>
        <input
          type="text"
          id="report-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={inputClass}
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="report-email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Email
        </label>
        <input
          type="email"
          id="report-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={inputClass}
          placeholder="your.email@example.com"
        />
      </div>

      <div>
        <label htmlFor="report-date" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Report date
        </label>
        <input
          type="date"
          id="report-date"
          value={reportDate}
          onChange={(e) => setReportDate(e.target.value)}
          required
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="report-file" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Completed report (PDF, optional)
        </label>
        <input
          type="file"
          id="report-file"
          accept=".pdf,application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className={`${inputClass} file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-neutral-100 dark:file:bg-neutral-800 file:text-sm`}
        />
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          Upload your filled daily report if you have it ready. You can also submit notes only and send the PDF separately by email.
        </p>
      </div>

      <div>
        <label htmlFor="report-notes" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          Notes (optional)
        </label>
        <textarea
          id="report-notes"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="Anything we should know about this submission..."
        />
      </div>

      {submitStatus.type && (
        <animated.div
          style={statusAnimation}
          className={`p-4 rounded-md ${
            submitStatus.type === "success"
              ? "bg-green-50 dark:bg-green-950/40 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800"
              : "bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800"
          }`}
        >
          {submitStatus.message}
        </animated.div>
      )}

      <div className="flex justify-center">
        <div ref={recaptchaRef} id="recaptcha-container-report" />
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting || !recaptchaToken}>
        {isSubmitting ? "Submitting..." : "Submit report"}
      </Button>

      <div className="text-xs text-neutral-500 text-center mt-2">
        This site is protected by reCAPTCHA and the Google{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Terms of Service
        </a>{" "}
        apply.
      </div>
    </animated.form>
  );
}
