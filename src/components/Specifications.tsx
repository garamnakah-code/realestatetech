import { Cpu, Gem, Waves, Wallet } from 'lucide-react';

type Spec = {
  icon: React.ReactNode;
  title: string;
  desc: string;
  meta: string;
};

const SPECS: Spec[] = [
  {
    icon: <Cpu className="h-6 w-6" />,
    title: 'Smart Home Automation',
    desc: 'Fully integrated structural control systems — lighting, climate, security, and ambience orchestrated from a single touchpoint.',
    meta: 'IoT-Ready',
  },
  {
    icon: <Gem className="h-6 w-6" />,
    title: 'Italian Marble Finishes',
    desc: 'Double-height ceilings and premium quartz finishes hand-sourced from Italian quarries for an uncompromising interior language.',
    meta: 'Imported Stone',
  },
  {
    icon: <Waves className="h-6 w-6" />,
    title: 'Waterfront Penthouses',
    desc: 'Panoramic marina views from your private balcony — a rarefied vantage point over the Lekki waterfront corridor.',
    meta: 'Marina Front',
  },
  {
    icon: <Wallet className="h-6 w-6" />,
    title: 'Flexible Allocations',
    desc: 'Secure your terrace with a 20% initial deposit and a tailored payment schedule structured around your timeline.',
    meta: '20% Deposit',
  },
];

function SpecCard({ spec, index }: { spec: Spec; index: number }) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-obsidian-50 p-7 transition-all duration-500 hover:border-gold/40 hover:bg-obsidian-100"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      {/* Gold corner accent */}
      <span className="pointer-events-none absolute right-0 top-0 h-16 w-16 bg-gradient-to-bl from-gold/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="mb-5 inline-grid h-14 w-14 place-items-center rounded-xl border border-gold/30 bg-obsidian text-gold transition-all duration-500 group-hover:border-gold group-hover:shadow-[0_0_24px_rgba(212,175,55,0.25)]">
        {spec.icon}
      </div>

      <div className="mb-2 flex items-center gap-3">
        <h3 className="font-serif text-xl font-semibold text-white">{spec.title}</h3>
      </div>
      <span className="mb-4 inline-block rounded-full border border-gold/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold/90">
        {spec.meta}
      </span>
      <p className="text-sm font-light leading-relaxed text-white/60">{spec.desc}</p>

      <span className="mt-6 block h-px w-0 bg-gradient-to-r from-gold/60 to-transparent transition-all duration-500 group-hover:w-full" />
    </div>
  );
}

export default function Specifications() {
  return (
    <section id="specifications" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-label">The Value Proposition</span>
          <h2 className="mt-4 font-serif text-3xl font-medium text-white sm:text-4xl md:text-5xl">
            Premium Structural <span className="gold-text">Specifications</span>
          </h2>
          <p className="mt-5 text-sm font-light leading-relaxed text-white/55 sm:text-base">
            Every residence is engineered with a singular intent — to deliver an address that
            appreciates in stature as much as in value.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SPECS.map((s, i) => (
            <SpecCard key={s.title} spec={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
