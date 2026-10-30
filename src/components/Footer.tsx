import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../i18n/translations';
import { Instagram, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t, language, setLanguage } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C1917] text-[#FAF8F5] pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-serif text-2xl sm:text-3xl tracking-widest font-medium text-white block">
              ATELIER LUMA
            </span>
            <p className="text-xs text-stone-400 font-light leading-relaxed max-w-sm">
              {t.footer.desc}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:border-stone-600 transition"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="tel:+420773892104"
                className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:border-stone-600 transition"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@atelierluma.cz"
                className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:border-stone-600 transition"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#E7DED3]">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400 font-light">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition cursor-pointer"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition cursor-pointer"
                >
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-white transition cursor-pointer"
                >
                  {t.nav.gallery}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('booking')}
                  className="hover:text-white transition cursor-pointer"
                >
                  {t.nav.booking}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('team')}
                  className="hover:text-white transition cursor-pointer"
                >
                  {t.nav.team}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contacts')}
                  className="hover:text-white transition cursor-pointer"
                >
                  {t.nav.contacts}
                </button>
              </li>
            </ul>
          </div>

          {/* Hours & Address */}
          <div className="md:col-span-4 space-y-3 text-xs text-stone-400 font-light">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#E7DED3]">
              {t.footer.workingHours} & Studio
            </h4>
            <p className="leading-relaxed text-stone-300">
              Vinohradská 114, 130 00 Praha 2
              <br />
              Královské Vinohrady (Metro A)
            </p>
            <p className="leading-relaxed">
              {t.contacts.hoursWeek}
              <br />
              {t.contacts.hoursSun}
            </p>

            <div className="pt-2">
              <span className="text-[11px] text-stone-500 uppercase tracking-wider block mb-1">
                Jazyk / Language / Язык:
              </span>
              <div className="flex gap-2 text-xs font-medium">
                {(['cs', 'en', 'ru'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-2.5 py-1 rounded uppercase transition cursor-pointer ${
                      language === lang
                        ? 'bg-white text-stone-900 font-bold'
                        : 'bg-stone-900 text-stone-400 hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div>
            © {new Date().getFullYear()} ATELIER LUMA PRAHA. {t.footer.rights}
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-stone-400 transition cursor-pointer">
              {t.footer.privacy}
            </span>
            <span className="hover:text-stone-400 transition cursor-pointer">
              {t.footer.terms}
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-stone-900 text-stone-400 hover:text-white transition cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
