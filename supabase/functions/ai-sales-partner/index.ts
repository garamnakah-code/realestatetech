// AI Sales Partner Edge Function for The Obsidian Residences
// Powers the chat widget with a property knowledge base + lead capture.

import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// Property knowledge base — keyword intents mapped to answers.
const KNOWLEDGE_BASE: { keywords: string[]; answer: string; interest: string }[] = [
  {
    keywords: ["floor plan", "layout", "bedroom", "bedrooms", "plan", "size", "square"],
    interest: "floor plans",
    answer:
      "We offer 12 distinct floor plans across three typologies — Terraces (2-3 bed), Duplexes (3-4 bed), and Waterfront Penthouses (4-5 bed). Sizes range from 180 sqm to 420 sqm with double-height ceilings. The full plan set is in the Structural Prospectus PDF. Shall I send the download link, Chief?",
  },
  {
    keywords: ["price", "pricing", "cost", "how much", "expensive", "afford"],
    interest: "pricing",
    answer:
      "Terraces start from ₦85M, Duplexes from ₦140M, and Waterfront Penthouses from ₦220M. All off-plan prices are locked at today's rate and appreciate on completion. Would you like the full price sheet in the prospectus?",
  },
  {
    keywords: ["payment", "deposit", "installment", "schedule", "pay", "20%"],
    interest: "payment schedule",
    answer:
      "You can secure your terrace with a 20% initial deposit, followed by a flexible installment schedule tailored to your timeline over the construction period (Q4 2027 delivery). No rigid monthly structure — we structure it around you. Shall I send the full payment breakdown?",
  },
  {
    keywords: ["inspection", "visit", "tour", "site", "see", "book", "appointment", "calendly"],
    interest: "inspection booking",
    answer:
      "Of course, Chief. Tap the 'Schedule Inspection' button below the chat to pick a private tour slot directly on our calendar — I'll confirm immediately. Tours run Tuesday to Sunday at the Lekki Phase 1 show residence.",
  },
  {
    keywords: ["smart", "automation", "technology", "home tech", "iot", "control"],
    interest: "smart home",
    answer:
      "Every residence ships with fully integrated smart home automation — lighting, climate, security, and ambience orchestrated from a single wall-mounted touchpanel and mobile app. Voice control via Alexa and Google Home is pre-wired.",
  },
  {
    keywords: ["marble", "finish", "italian", "quartz", "ceiling", "material", "quality"],
    interest: "finishes",
    answer:
      "Interiors feature hand-sourced Italian marble (Calacatta and Carrara) with premium quartz countertops, double-height ceilings, and bespoke joinery. Finish schedules are detailed page-by-page in the prospectus PDF.",
  },
  {
    keywords: ["waterfront", "penthouse", "balcony", "view", "marina", "water"],
    interest: "waterfront penthouses",
    answer:
      "The Waterfront Penthouses occupy the top two floors of the east tower, with panoramic marina views from private wraparound balconies. Only 6 penthouse units remain in this release.",
  },
  {
    keywords: ["location", "lekki", "address", "where", "area", "phase 1"],
    interest: "location",
    answer:
      "The Obsidian Residences sit on the prime waterfront corridor of Lekki Phase 1, Lagos — minutes from Victoria Island and the Lekki-Epe Expressway. The Certificate of Occupancy is fully secured.",
  },
  {
    keywords: ["prospectus", "brochure", "pdf", "download", "document", "details"],
    interest: "prospectus",
    answer:
      "The complete Structural Prospectus PDF (18.4 MB) contains all floor plans, finish schedules, payment plans, and title documents. Tap the 'Download Structural Prospectus PDF' button in the Resource Portal section to grab it from our Google Drive.",
  },
  {
    keywords: ["delivery", "complete", "ready", "when", "handover", "move in"],
    interest: "delivery",
    answer:
      "Construction is underway with projected handover in Q4 2027. Off-plan buyers lock today's pricing and benefit from appreciation upon completion. Title documents and the C of O are already secured.",
  },
  {
    keywords: ["investment", "roi", "return", "appreciate", "rent", "rental", "yield"],
    interest: "investment",
    answer:
      "Off-plan purchases at The Obsidian Residences have historically appreciated 25-40% by handover. Lekki Phase 1 waterfront assets command premium rental yields of 8-12% annually. This is a buy-and-hold wealth asset, Chief.",
  },
];

const GREETING_FOLLOWUP =
  "I can help with floor plans, pricing, payment schedules, smart home features, finishes, waterfront penthouses, or booking a private inspection. What interests you most, Chief?";

function matchIntent(message: string): { answer: string; interest: string } | null {
  const lower = message.toLowerCase();
  let best: { score: number; entry: (typeof KNOWLEDGE_BASE)[number] } | null = null;
  for (const entry of KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (lower.includes(kw)) score += kw.split(" ").length * 2;
    }
    if (score > 0 && (!best || score > best.score)) best = { score, entry };
  }
  return best ? { answer: best.entry.answer, interest: best.entry.interest } : null;
}

async function persistLead(body: {
  message?: string;
  name?: string;
  email?: string;
  phone?: string;
  interest?: string;
}) {
  try {
    await supabase.from("chat_leads").insert({
      first_message: body.message ?? null,
      name: body.name ?? null,
      email: body.email ?? null,
      phone: body.phone ?? null,
      interest: body.interest ?? null,
    });
  } catch {
    // Lead persistence is best-effort; never block the reply.
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const message: string = (body.message ?? "").toString();
    const name = body.name ? String(body.name) : undefined;
    const email = body.email ? String(body.email) : undefined;
    const phone = body.phone ? String(body.phone) : undefined;

    if (!message.trim()) {
      return new Response(
        JSON.stringify({ reply: GREETING_FOLLOWUP, interest: null }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const match = matchIntent(message);
    const reply = match ? match.answer : GREETING_FOLLOWUP;
    const interest = match ? match.interest : null;

    // Persist the lead in the background (don't block the response).
    EdgeRuntime.waitUntil(
      persistLead({ message, name, email, phone, interest }),
    );

    return new Response(
      JSON.stringify({ reply, interest }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        reply:
          "I'm here to help with floor plans, pricing, payment schedules, or booking an inspection. What would you like to know, Chief?",
        interest: null,
        error: err instanceof Error ? err.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
