import type { APIRoute } from "astro";

const PUBLIC_SITE_URL = "https://portefolio-hiba-chghaf.vercel.app";
const REDIRECT_SUCCESS = "/?contact=success#contact";
const REDIRECT_ERROR = "/?contact=error#contact";
const REDIRECT_CONFIG = "/?contact=config#contact";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
const CONTACT_TO_EMAIL = import.meta.env.CONTACT_TO_EMAIL ?? "h.chghaf@esisa.ac.ma";
const CONTACT_TO_EMAILS = (import.meta.env.CONTACT_TO_EMAILS ?? CONTACT_TO_EMAIL)
  .split(",")
  .map((email: string) => email.trim())
  .filter(Boolean)
  .slice(0, 100);
const CONTACT_FROM_EMAIL = import.meta.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const website = String(formData.get("website") ?? "").trim();

    // Basic anti-spam: hidden honeypot field must stay empty.
    if (website) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!name || !email || !subject || !message) {
      return jsonOrRedirect(request, false, 400);
    }

    if (!RESEND_API_KEY) {
      return jsonOrRedirect(request, false, 500, "config");
    }

    if (CONTACT_TO_EMAILS.length === 0) {
      return jsonOrRedirect(request, false, 500, "config");
    }

    const safeSubject = subject.slice(0, 140);
    const safeName = name.slice(0, 100);
    const safeEmail = email.slice(0, 180);
    const safeMessage = message.slice(0, 5000);

    const htmlBody = `
      <h2>Nouveau message depuis le portfolio</h2>
      <p><strong>Nom:</strong> ${escapeHtml(safeName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(safeEmail)}</p>
      <p><strong>Sujet:</strong> ${escapeHtml(safeSubject)}</p>
      <hr />
      <p>${escapeHtml(safeMessage).replace(/\n/g, "<br />")}</p>
    `;

    const textBody = [
      "Nouveau message depuis le portfolio",
      `Nom: ${safeName}`,
      `Email: ${safeEmail}`,
      `Sujet: ${safeSubject}`,
      "",
      safeMessage,
    ].join("\n");

    const upstream = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: CONTACT_TO_EMAILS,
        reply_to: safeEmail,
        subject: `Portfolio contact: ${safeSubject}`,
        text: textBody,
        html: htmlBody,
      }),
    });

    if (!upstream.ok) {
      return jsonOrRedirect(request, false, 502);
    }

    return jsonOrRedirect(request, true, 200);
  } catch {
    return jsonOrRedirect(request, false, 500);
  }
};

function jsonOrRedirect(
  request: Request,
  ok: boolean,
  status: number,
  reason: "error" | "config" = "error",
): Response {
  const accept = request.headers.get("accept") ?? "";
  const wantsJson = accept.includes("application/json");

  if (wantsJson) {
    return new Response(JSON.stringify({ ok, reason }), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }

  const redirectPath = ok ? REDIRECT_SUCCESS : reason === "config" ? REDIRECT_CONFIG : REDIRECT_ERROR;
  return Response.redirect(new URL(redirectPath, PUBLIC_SITE_URL), 303);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
