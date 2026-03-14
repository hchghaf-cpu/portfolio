import type { APIRoute } from "astro";

const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/h.chghaf@esisa.ac.ma";
const REDIRECT_SUCCESS = "/?contact=success#contact";
const REDIRECT_ERROR = "/?contact=error#contact";

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

    const outbound = new FormData();
    outbound.set("name", name);
    outbound.set("email", email);
    outbound.set("subject", subject);
    outbound.set("message", message);
    outbound.set("_captcha", "false");
    outbound.set("_template", "table");
    outbound.set("_subject", `Portfolio contact: ${subject}`);

    const upstream = await fetch(FORMSUBMIT_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: outbound,
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
): Response {
  const accept = request.headers.get("accept") ?? "";
  const wantsJson = accept.includes("application/json");

  if (wantsJson) {
    return new Response(JSON.stringify({ ok }), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }

  return Response.redirect(new URL(ok ? REDIRECT_SUCCESS : REDIRECT_ERROR, request.url), 303);
}
