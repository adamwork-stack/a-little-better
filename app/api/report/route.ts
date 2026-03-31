import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const reportDate = formData.get("reportDate");
    const message = formData.get("message");
    const recaptchaToken = formData.get("recaptchaToken");
    const file = formData.get("file");

    if (!name || !email || !reportDate) {
      return NextResponse.json(
        { error: "Name, email, and report date are required." },
        { status: 400 }
      );
    }

    if (typeof name !== "string" || typeof email !== "string" || typeof reportDate !== "string") {
      return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
    }

    const messageStr = typeof message === "string" ? message : "";

    if (!recaptchaToken || typeof recaptchaToken !== "string") {
      return NextResponse.json(
        { error: "reCAPTCHA token is missing. Please complete the verification." },
        { status: 400 }
      );
    }

    const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!recaptchaSecretKey) {
      console.error("RECAPTCHA_SECRET_KEY is not configured");
      return NextResponse.json(
        { error: "Server configuration error. Please contact support." },
        { status: 500 }
      );
    }

    const encodedSecret = encodeURIComponent(recaptchaSecretKey);
    const encodedToken = encodeURIComponent(recaptchaToken);

    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${encodedSecret}&response=${encodedToken}`,
      }
    );

    if (!recaptchaResponse.ok) {
      return NextResponse.json(
        { error: "reCAPTCHA verification service error. Please try again." },
        { status: 500 }
      );
    }

    const recaptchaResult = await recaptchaResponse.json();
    if (!recaptchaResult.success) {
      return NextResponse.json(
        { error: "reCAPTCHA verification failed. Please try again." },
        { status: 400 }
      );
    }

    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;
    if (!formspreeEndpoint) {
      console.error("FORMSPREE_ENDPOINT is not configured");
      return NextResponse.json(
        { error: "Email service is not configured. Please contact support." },
        { status: 500 }
      );
    }

    const emailBody = `
Daily report submission (A Little Better website)

Name: ${name}
Email: ${email}
Report date: ${reportDate}

Notes:
${messageStr || "(none)"}

---
This message was sent from the daily report form on A Little Better website.
Reply to: ${email}
`.trim();

    const outbound = new FormData();
    outbound.append("name", name);
    outbound.append("email", email);
    outbound.append("_replyto", email);
    outbound.append("_subject", `Daily report: ${reportDate} — ${name}`);
    outbound.append("message", emailBody);

    if (file instanceof File && file.size > 0) {
      const maxBytes = 20 * 1024 * 1024;
      if (file.size > maxBytes) {
        return NextResponse.json(
          { error: "File is too large. Maximum size is 20 MB." },
          { status: 400 }
        );
      }
      outbound.append("attachment", file, file.name);
    }

    const formspreeResponse = await fetch(formspreeEndpoint, {
      method: "POST",
      body: outbound,
    });

    if (!formspreeResponse.ok) {
      const errorText = await formspreeResponse.text();
      console.error("Formspree HTTP error:", formspreeResponse.status, errorText);
      return NextResponse.json(
        { error: "Failed to send report. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Report submitted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing report form:", error);
    return NextResponse.json(
      { error: "Failed to process your request. Please try again later." },
      { status: 500 }
    );
  }
}
