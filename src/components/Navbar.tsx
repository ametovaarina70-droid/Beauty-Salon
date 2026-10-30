import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../i18n/translations';
import { Menu, X, Calendar } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { t, language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', label: t.nav.home },
    { key: 'services', label: t.nav.services },
    { key: 'gallery', label: t.nav.gallery },
    { key: 'team', label: t.nav.team },
    { key: 'contacts', label: t.nav.contacts },
  ];

  const handleNavClick = (pageKey: string) => {
    onNavigate(pageKey);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav border-b border-[#EBE5DC]/80 transition-all duration-300">
      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group cursor-pointer"
        >
          <span className="font-serif text-2xl sm:text-3xl tracking-widest font-medium text-stone-900 group-hover:text-stone-700 transition">
            ATELIER LUMA
          </span>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-wider uppercase font-medium">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNavClick(item.key)}
              className={`relative py-1 transition-colors cursor-pointer ${
                currentPage === item.key
                  ? 'text-stone-900 font-semibold'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {item.label}
              {currentPage === item.key && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-stone-900 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Right actions: Language Switcher & Book Now CTA */}
        <div className="hidden sm:flex items-center gap-4">
          {/* 3-Language Selector */}
          <div className="flex items-center bg-[#ECE6DD]/70 p-1 rounded-full text-xs font-semibold tracking-wider">
            {(['cs', 'en', 'ru'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2.5 py-1 rounded-full uppercase transition-all duration-200 cursor-pointer ${
                  language === lang
                    ? 'bg-[#1C1917] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-950'
                }`}
                title={lang === 'cs' ? 'Čeština' : lang === 'en' ? 'English' : 'Русский'}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Booking CTA */}
          <button
            onClick={() => handleNavClick('booking')}
            className="flex items-center gap-2 bg-[#1C1917] hover:bg-black text-[#FAF8F5] px-5 py-2.5 rounded-full text-xs uppercase font-medium tracking-wider transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#E7DED3]" />
            <span>{t.nav.booking}</span>
          </button>
        </div>

        {/* Mobile menu and Language toggle */}
        <div className="flex sm:hidden items-center gap-2">
          {/* Quick mobile language pill */}
          <div className="flex items-center bg-[#ECE6DD] p-0.5 rounded-full text-[11px] font-semibold">
            {(['cs', 'en', 'ru'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2 py-0.5 rounded-full uppercase ${
                  language === lang
                    ? 'bg-[#1C1917] text-white'
                    : 'text-stone-600'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-700 hover:text-stone-950 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#FAF8F5] border-b border-[#E8E2D9] px-6 py-6 animate-in slide-in-from-top-2 duration-200 shadow-xl">
          <div className="space-y-4 text-center">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`block w-full py-2.5 text-base tracking-widest uppercase cursor-pointer ${
                  currentPage === item.key
                    ? 'font-bold text-stone-900 border-b border-stone-900'
                    : 'text-stone-600'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-4 border-t border-[#E8E2D9]">
              <button
                onClick={() => handleNavClick('booking')}
                className="w-full flex items-center justify-center gap-2 bg-[#1C1917] text-white py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase cursor-pointer shadow-md"
              >
                <Calendar className="w-4 h-4 text-[#E7DED3]" />
                <span>{t.nav.booking}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
