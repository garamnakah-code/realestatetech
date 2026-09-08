import { FileText, Download, ShieldCheck, Eye, Layers } from 'lucide-react';
import { trackProspectusDownload } from '@/lib/supabase';

// Button now opens the 4K cinematic walkthrough video on Google Drive
const DRIVE_VIDEO_URL = 'https://drive.google.com/file/d/1pVPt2OiwNyaHO1aYyd-Uov5eQ0CsjE0l/view';

const FACTS = [
  { icon: <Layers className="h-4 w-4" />, label: 'Floor Plans', value: '12 Layouts' },
  { icon: <ShieldCheck className="h-4 w-4" />, label: 'Title', value: 'C of O Secured' },
  { icon: <Eye className="h-4 w-4" />, label: 'Delivery', value: 'Q4 2027' },
];

export default function Prospectus() {
  return (
    <section id="prospectus" className="relative py-24 sm:py-32">
      {/* Decorative gold line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left: copy + CTA */}
          <div>
            <span className="section-label">The Materials Download</span>
            <h2 className="mt-4 font-serif text-3xl font-medium text-white sm:text-4xl md:text-5xl">
              Interactive <span className="gold-text">Resource Portal</span>
            </h2>
            <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-white/55 sm:text-base">
              The complete structural prospectus is available for private download. Review
              floor plans, payment schedules, title documents, and finish schedules at your
              leisure.
            </p>

            {/* Facts row */}
            <div className="mt-8 flex flex-wrap gap-3">
              {FACTS.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-2.5 rounded-full border border-white/10 bg-obsidian-50 px-4 py-2.5"
                >
                  <span className="text-gold">{f.icon}</span>
                  <span className="text-xs font-light text-white/50">{f.label}</span>
                  <span className="text-xs font-semibold text-white">{f.value}</span>
                </div>
              ))}
            </div>

            <a
              href={DRIVE_VIDEO_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => void trackProspectusDownload('prospectus-section')}
              className="btn-gold mt-8 w-full sm:w-auto"
            >
              <FileText className="h-4 w-4" />
              📄 Download Property Prospectus PDF
            </a>
            <p className="mt-3 text-[11px] font-light text-white/40">
              4K Cinematic Walkthrough · Secure Google Drive link
            </p>
          </div>

          {/* Right: document mockup */}
          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-gold/20 via-transparent to-gold/10 blur-xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-obsidian-50 p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-b from-obsidian-100 to-obsidian-200 p-7 sm:p-10">
                {/* Doc header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div className="flex items-center gap-2">
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-gold/40 font-serif text-sm font-bold gold-text">
                      O
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-white/60">
                      ODF Systems
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-gold/70">
                    Prospectus
                  </span>
                </div>

                {/* Doc body lines */}
                <div className="mt-7 space-y-3">
                  <div className="h-5 w-3/4 rounded bg-white/15" />
                  <div className="h-3 w-full rounded bg-white/10" />
                  <div className="h-3 w-11/12 rounded bg-white/10" />
                  <div className="h-3 w-10/12 rounded bg-white/10" />
                </div>

                {/* Mini grid */}
                <div className="mt-7 grid grid-cols-3 gap-3">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-transparent"
                    />
                  ))}
                </div>

                <div className="mt-7 space-y-3">
                  <div className="h-3 w-full rounded bg-white/10" />
                  <div className="h-3 w-9/12 rounded bg-white/10" />
                </div>

                {/* Floating download chip */}
                <div className="absolute bottom-6 right-6 flex items-center gap-2 rounded-full border border-gold/40 bg-obsidian/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-gold backdrop-blur-md">
                  <Download className="h-3.5 w-3.5" />
                  PDF
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
