import { Video, Smartphone, Bot, ArrowRight } from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/2348000000000?text=I%20want%20to%20secure%20a%20September%20deployment%20slot%20for%20my%20brand';

const SERVICES = [
  {
    icon: <Video className="h-6 w-6" />,
    title: 'Cinema-Grade AI Creative Production',
    desc: '5 high-end 4K cinematic property walkthrough video reels with executive voiceover narration.',
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: 'High-Performance Mobile Launch Portals',
    desc: 'Lightning-fast, dark-themed single-property web interfaces built for immediate capital conversion.',
  },
  {
    icon: <Bot className="h-6 w-6" />,
    title: '24/7 Automated AI WhatsApp Triage',
    desc: 'An intelligent system integrated into your active chat lines to qualify buyers, deliver property brochures, and schedule site inspections automatically.',
  },
];

export default function B2BSection() {
  return (
    <section className="relative w-full bg-[#0A0A0A]">
      {/* 2px solid metallic gold top border */}
      <div className="h-0.5 w-full bg-gold" style={{ height: '2px', backgroundColor: '#D4AF37' }} />

      <div className="mx-auto max-w-[800px] px-5 py-20 sm:py-28">
        {/* 1. Caption Hook */}
        <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-gold sm:text-sm">
          Attention: Luxury Real Estate Developers &amp; Executive Directors
        </p>

        {/* 2. Main Header */}
        <h2 className="mt-6 text-center font-serif text-2xl font-bold uppercase leading-tight text-white sm:text-3xl md:text-4xl">
          We Can Deploy This Exact Sales Infrastructure For Your Own Brand
        </h2>

        {/* 3. Who We Are & The Leakage Problem */}
        <div className="mt-12 space-y-8">
          <div>
            <h3 className="font-serif text-lg font-semibold text-white sm:text-xl">
              Who We Are
            </h3>
            <p className="mt-3 text-sm font-light leading-relaxed text-[#CCCCCC] sm:text-base">
              ODF Business Systems is an elite digital sales and automation engineering
              boutique. We do not build generic social media templates or run slow marketing
              campaigns. We construct high-velocity digital sales pipelines engineered
              strictly for premium residential property builders.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold text-white sm:text-xl">
              What Your Current Brand Is Missing
            </h3>
            <p className="mt-3 text-sm font-light leading-relaxed text-[#CCCCCC] sm:text-base">
              Traditional property sales desks leak up to 40% of high-net-worth international
              interest due to slow response times, unoptimized mobile interfaces, and
              low-retention visual assets. When a diaspora buyer requests blueprints from a
              different time zone at 2:00 AM, human delay variables kill the deal.
            </p>
          </div>
        </div>

        {/* 4. The 3-in-1 Service Stack */}
        <div className="mt-14 space-y-6">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="flex gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-5 sm:p-6"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-gold/30 bg-gold/5 text-gold">
                {s.icon}
              </span>
              <div>
                <h4 className="text-sm font-bold text-white sm:text-base">{s.title}</h4>
                <p className="mt-1.5 text-xs font-light leading-relaxed text-[#CCCCCC] sm:text-sm">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 5. The Un-Rejectable Offer Container */}
        <div className="mt-14 rounded-2xl border-2 border-dashed border-gold bg-[#111111] p-8 text-center sm:p-10">
          <h3 className="font-serif text-base font-bold uppercase tracking-wide text-gold sm:text-lg">
            Our 100% Risk-Reversal Performance Guarantee
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-sm font-light leading-relaxed text-white sm:text-base">
            We deploy your company's full digital sales infrastructure in 10 business days flat
            for a total implementation fee of &#8358;6,600,000 NGN ($4,000 USD). We absorb 100% of
            the technical risk: If our system is not fully operational within 10 days, we issue a
            100% immediate refund, and your brand keeps all custom video assets and landing
            portal designs for completely free.
          </p>
        </div>

        {/* 6. Call To Action Button */}
        <div className="mt-10 flex justify-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-wide text-[#0A0A0A] transition-all duration-300 hover:bg-gold-light hover:shadow-[0_8px_30px_rgba(212,175,55,0.4)] active:scale-95"
          >
            Secure Your September Deployment Slot
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* 7. Mandatory Brand Footer Signature */}
      <div className="border-t border-white/5 py-6">
        <p className="text-center text-[11px] font-light text-[#666666]">
          Engineered and Managed by ODF Business Systems. &copy; 2026 All Rights Reserved.
        </p>
      </div>
    </section>
  );
}
