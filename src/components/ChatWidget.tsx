import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send, Calendar, Sparkles, User, Mail, Phone } from 'lucide-react';
import { EDGE_FUNCTION_URL } from '@/lib/supabase';

const SUGGESTIONS = [
  'Show me floor plans',
  'What are the payment schedules?',
  'Book a site inspection',
  'Tell me about pricing',
];

const CALENDLY_URL = 'https://calendly.com/your-handle/obsidian-inspection';

type Msg = { from: 'ai' | 'user'; text: string };

const WELCOME: Msg = {
  from: 'ai',
  text: 'Welcome to The Obsidian Residences, Chief. Ask me about floor plans, payment schedules, or click below to lock in your site inspection date.',
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [lead, setLead] = useState({ name: '', email: '', phone: '' });
  const [leadSaved, setLeadSaved] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [msgs, typing, open, showLeadForm]);

  const callAI = async (text: string) => {
    setTyping(true);
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    if (!EDGE_FUNCTION_URL || !anonKey) {
      setMsgs((m) => [
        ...m,
        {
          from: 'ai',
          text: "I'm here to help with floor plans, pricing, payment schedules, or booking an inspection. What would you like to know, Chief?",
        },
      ]);
      setTyping(false);
      return;
    }
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);
      const res = await fetch(EDGE_FUNCTION_URL, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${anonKey}`,
          apikey: anonKey,
        },
        body: JSON.stringify({
          message: text,
          name: lead.name || undefined,
          email: lead.email || undefined,
          phone: lead.phone || undefined,
        }),
      });
      clearTimeout(timeout);
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data = await res.json();
      if (!data || typeof data.reply !== 'string') throw new Error('Bad response');
      setMsgs((m) => [...m, { from: 'ai', text: data.reply }]);
    } catch {
      setMsgs((m) => [
        ...m,
        {
          from: 'ai',
          text: "I'm here to help with floor plans, pricing, payment schedules, or booking an inspection. What would you like to know, Chief?",
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMsgs((m) => [...m, { from: 'user', text: t }]);
    setInput('');
    void callAI(t);
  };

  const saveLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead.name && !lead.email && !lead.phone) return;
    setLeadSaved(true);
    setMsgs((m) => [
      ...m,
      {
        from: 'ai',
        text: `Thank you, Chief${lead.name ? ' ' + lead.name : ''}. Your details are locked in — our sales director will reach out within the hour. Tap "Schedule Inspection" to pick your tour slot now.`,
      },
    ]);
    setShowLeadForm(false);
  };

  return (
    <>
      {/* Floating bubble */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="group fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full border border-gold/40 bg-obsidian-100 py-3 pl-3 pr-5 shadow-[0_10px_40px_-5px_rgba(0,0,0,0.7)] transition-all duration-300 hover:border-gold hover:shadow-[0_10px_40px_-5px_rgba(212,175,55,0.4)] sm:bottom-7 sm:right-7"
        aria-label="Chat 24/7 with our AI Sales Partner"
      >
        <span className="relative grid h-10 w-10 place-items-center rounded-full bg-gold text-obsidian">
          <span className="absolute inset-0 animate-pulse-gold rounded-full" />
          {open ? <X className="relative h-5 w-5" /> : <MessageCircle className="relative h-5 w-5" />}
        </span>
        <span className="hidden text-left sm:block">
          <span className="block text-[10px] font-semibold uppercase tracking-widest text-gold">
            AI Sales Partner
          </span>
          <span className="block text-xs font-light text-white/70">Chat 24/7</span>
        </span>
      </button>

      {/* Chat panel */}
      <div
        className={[
          'fixed bottom-24 right-3 z-50 w-[calc(100vw-1.5rem)] max-w-[380px] origin-bottom-right transition-all duration-300 sm:right-7',
          open ? 'pointer-events-auto scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0',
        ].join(' ')}
      >
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-obsidian-100 shadow-[0_30px_80px_-10px_rgba(0,0,0,0.85)]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-obsidian-50 to-obsidian-100 px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="relative grid h-9 w-9 place-items-center rounded-full border border-gold/40 bg-obsidian text-gold">
                <Sparkles className="h-4 w-4" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-obsidian-100 bg-emerald-400" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">Obsidian Concierge</p>
                <p className="text-[10px] font-light text-white/50">AI Sales Partner · Online 24/7</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="grid h-8 w-8 place-items-center rounded-full text-white/60 transition-colors hover:bg-white/5 hover:text-white"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="scrollbar-hide h-[320px] space-y-3 overflow-y-auto bg-obsidian-200 px-4 py-5">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={[
                    'max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                    m.from === 'user'
                      ? 'rounded-br-sm bg-gold text-obsidian'
                      : 'rounded-bl-sm border border-white/10 bg-obsidian-50 text-white/85',
                  ].join(' ')}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-2xl rounded-bl-sm border border-white/10 bg-obsidian-50 px-4 py-3">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold/70"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Lead capture form */}
            {showLeadForm && (
              <form
                onSubmit={saveLead}
                className="mt-3 space-y-2 rounded-2xl border border-gold/30 bg-obsidian-50 p-4"
              >
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-gold">
                  Save your details
                </p>
                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-obsidian-200 px-3">
                  <User className="h-3.5 w-3.5 text-white/40" />
                  <input
                    value={lead.name}
                    onChange={(e) => setLead({ ...lead, name: e.target.value })}
                    placeholder="Name"
                    className="w-full bg-transparent py-2 text-xs text-white placeholder:text-white/35 focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-obsidian-200 px-3">
                  <Mail className="h-3.5 w-3.5 text-white/40" />
                  <input
                    type="email"
                    value={lead.email}
                    onChange={(e) => setLead({ ...lead, email: e.target.value })}
                    placeholder="Email"
                    className="w-full bg-transparent py-2 text-xs text-white placeholder:text-white/35 focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-obsidian-200 px-3">
                  <Phone className="h-3.5 w-3.5 text-white/40" />
                  <input
                    value={lead.phone}
                    onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                    placeholder="Phone"
                    className="w-full bg-transparent py-2 text-xs text-white placeholder:text-white/35 focus:outline-none"
                  />
                </div>
                <button type="submit" className="btn-gold w-full py-2 text-[11px]">
                  Save & Continue
                </button>
              </form>
            )}
          </div>

          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 border-t border-white/10 bg-obsidian-200 px-4 py-3">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-gold/30 bg-obsidian-50 px-3 py-1.5 text-[11px] font-medium text-gold/90 transition-colors hover:bg-gold hover:text-obsidian"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Calendly + lead capture CTAs */}
          <div className="grid grid-cols-2 gap-2 border-t border-white/10 bg-obsidian-100 px-4 py-3">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-gold/40 bg-gold/10 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-obsidian"
            >
              <Calendar className="h-3.5 w-3.5" />
              Schedule
            </a>
            <button
              onClick={() => setShowLeadForm((v) => !v)}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-obsidian-50 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-white/80 transition-colors hover:border-gold hover:text-gold"
            >
              <User className="h-3.5 w-3.5" />
              {leadSaved ? 'Saved' : 'Save My Info'}
            </button>
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-white/10 bg-obsidian-100 px-4 py-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about floor plans, pricing…"
              className="flex-1 rounded-full border border-white/10 bg-obsidian-200 px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-gold/50 focus:outline-none"
            />
            <button
              type="submit"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold text-obsidian transition-transform active:scale-90"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
