import { useState } from 'react';
import { Calendar, Clock, MapPin, ArrowRight, Check } from 'lucide-react';
import { submitInspectionRequest } from '@/lib/supabase';

const CALENDLY_URL = 'https://calendly.com/garamnakah/30min';

export default function Booking() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', preferred_date: '', notes: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    const { error } = await submitInspectionRequest({
      name: form.name,
      email: form.email,
      phone: form.phone,
      preferred_date: form.preferred_date || undefined,
      notes: form.notes || undefined,
    });
    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setForm({ name: '', email: '', phone: '', preferred_date: '', notes: '' });
    }
  };

  return (
    <section id="booking" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.08),transparent_50%)]" />
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-b from-obsidian-50 to-obsidian-100 p-8 sm:p-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* Left: info + form */}
            <div>
              <span className="section-label">The System Integration</span>
              <h2 className="mt-4 font-serif text-3xl font-medium text-white sm:text-4xl">
                Lock in your <span className="gold-text">Private Inspection</span>
              </h2>
              <p className="mt-5 text-sm font-light leading-relaxed text-white/55 sm:text-base">
                Reserve a private tour of the show residence and model floor plans. Our sales
                director will confirm your slot within the hour.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/30 text-gold">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span>Lekki Phase 1, Lagos · Show Residence</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/30 text-gold">
                    <Clock className="h-4 w-4" />
                  </span>
                  <span>60-minute private tour · Tue–Sun</span>
                </div>
              </div>

              {/* Quick request form */}
              {status === 'success' ? (
                <div className="mt-8 flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4">
                  <Check className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm text-white/80">
                    Request received, Chief. Our sales director will call you within the hour.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-3">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Full name"
                      className="rounded-xl border border-white/10 bg-obsidian-200 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-gold/50 focus:outline-none"
                    />
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="Phone number"
                      className="rounded-xl border border-white/10 bg-obsidian-200 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-gold/50 focus:outline-none"
                    />
                  </div>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Email (optional)"
                    className="w-full rounded-xl border border-white/10 bg-obsidian-200 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-gold/50 focus:outline-none"
                  />
                  <input
                    type="date"
                    value={form.preferred_date}
                    onChange={(e) => setForm({ ...form, preferred_date: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-obsidian-200 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-gold/50 focus:outline-none [color-scheme:dark]"
                  />
                  <button type="submit" disabled={status === 'submitting'} className="btn-gold w-full">
                    <Calendar className="h-4 w-4" />
                    {status === 'submitting' ? 'Submitting…' : 'Request Inspection'}
                  </button>
                  {status === 'error' && (
                    <p className="text-xs text-red-400">Something went wrong. Please try again.</p>
                  )}
                </form>
              )}

              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost mt-4 w-full"
              >
                <Calendar className="h-4 w-4" />
                Open Scheduling Calendar
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Right: live Calendly embed */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-obsidian-200">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
                  Live Scheduler
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Connected
                </span>
              </div>
              <div className="aspect-[4/5] w-full sm:aspect-auto sm:h-[520px]">
                <iframe
                  src={`${CALENDLY_URL}?hide_gdpr_header=1&background=1a1a1a&text_color=ffffff&primary_color=d4af37`}
                  title="Schedule a private inspection"
                  className="h-full w-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
