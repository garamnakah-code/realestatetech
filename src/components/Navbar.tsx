import { useEffect, useRef, useState } from 'react';
import { Menu, X, Calendar } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Residences', href: '#specifications' },
  { label: 'Prospectus', href: '#prospectus' },
  { label: 'Inspection', href: '#booking' },
];

function Logo() {
  return (
    <a href="#top" className="group flex items-center gap-3" aria-label="ODF Systems home">
      <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 bg-obsidian-50 transition-colors duration-300 group-hover:border-gold">
        <span className="font-serif text-lg font-bold gold-text">O</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-base font-semibold tracking-wide text-white">
          ODF <span className="gold-text">Systems</span>
        </span>
        <span className="mt-0.5 text-[9px] uppercase tracking-ultra text-white/40">
          Luxury Development Co.
        </span>
      </span>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div ref={sentinel} className="h-px w-full" aria-hidden />
      <header
        className={[
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled ? 'glass border-b border-white/10 py-3' : 'bg-transparent py-5',
        ].join(' ')}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          <Logo />

          <div className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative text-xs font-medium uppercase tracking-widest text-white/70 transition-colors duration-300 hover:text-white"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a href="#booking" className="btn-gold">
              <Calendar className="h-4 w-4" />
              Book Private Inspection
            </a>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile drawer */}
        <div
          className={[
            'overflow-hidden md:hidden',
            open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
            'transition-all duration-500 ease-out',
          ].join(' ')}
        >
          <div className="glass mx-4 mt-3 rounded-2xl border border-white/10 p-5">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium uppercase tracking-widest text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </a>
              ))}
            </div>
            <a
              href="#booking"
              onClick={() => setOpen(false)}
              className="btn-gold mt-4 w-full"
            >
              <Calendar className="h-4 w-4" />
              Book Private Inspection
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
