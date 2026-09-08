import { Mail, Phone, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="hairline bg-obsidian-200">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 font-serif text-sm font-bold gold-text">
              O
            </span>
            <span className="font-serif text-sm font-semibold text-white">
              ODF <span className="gold-text">Systems</span>
            </span>
          </div>

          <div className="flex items-center gap-5 text-white/50">
            <a href="mailto:concierge@odfsystems.com" className="transition-colors hover:text-gold" aria-label="Email">
              <Mail className="h-4 w-4" />
            </a>
            <a href="tel:+2348000000000" className="transition-colors hover:text-gold" aria-label="Phone">
              <Phone className="h-4 w-4" />
            </a>
            <a href="#" className="transition-colors hover:text-gold" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="transition-colors hover:text-gold" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-[11px] font-light text-white/40">
            © 2026 ODF Systems Luxury Development Co. · The Obsidian Residences, Lekki Phase 1
          </p>
          <p className="text-[11px] font-light text-white/40">
            All rights reserved · Off-plan release
          </p>
        </div>
      </div>
    </footer>
  );
}
