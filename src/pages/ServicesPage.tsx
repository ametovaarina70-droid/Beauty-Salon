import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SALON_SERVICES } from '../data/salonData';

interface ServicesPageProps {
  onNavigateToBooking: (serviceId?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigateToBooking }) => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: t.services.categories.all },
    { key: 'hair', label: t.services.categories.hair },
    { key: 'nails', label: t.services.categories.nails },
    { key: 'face', label: t.services.categories.face },
    { key: 'brows', label: t.services.categories.brows },
  ];

  const services = SALON_SERVICES.filter(
    (s) => selectedCategory === 'all' || s.category === selectedCategory,
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-14">
      <header className="text-center space-y-4">
        <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 font-normal">
          {t.services.title}
        </h1>
        <p className="text-stone-500 text-sm sm:text-base font-light">{t.services.subtitle}</p>
      </header>

      <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`text-sm pb-1 border-b transition-colors cursor-pointer ${
              selectedCategory === cat.key
                ? 'text-stone-900 border-stone-900'
                : 'text-stone-500 border-transparent hover:text-stone-900'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      <ul className="divide-y divide-[#E8E2D9] border-y border-[#E8E2D9]">
        {services.map((service) => (
          <li key={service.id}>
            <button
              onClick={() => onNavigateToBooking(service.id)}
              className="group w-full text-left py-6 flex items-start justify-between gap-6 cursor-pointer"
            >
              <div className="space-y-1.5 min-w-0">
                <h3 className="font-serif text-xl text-stone-900 group-hover:text-[#8C7A6B] transition-colors">
                  {service.name[language]}
                </h3>
                <p className="text-sm text-stone-500 font-light leading-relaxed">
                  {service.description[language]}
                </p>
              </div>
              <div className="text-right shrink-0 space-y-1.5">
                <div className="text-base text-stone-900">
                  {service.priceCZK.toLocaleString()} {t.services.currency}
                </div>
                <div className="text-xs text-stone-400">
                  {service.durationMin} {t.services.durationMin}
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <p className="text-center text-sm text-stone-500 font-light">
        {language === 'cs'
          ? 'Před barvením nabízíme 20minutovou konzultaci zdarma.'
          : language === 'ru'
          ? 'Перед окрашиванием — бесплатная 20-минутная консультация.'
          : 'A complimentary 20-minute consultation is offered before any colour work.'}{' '}
        <button
          onClick={() => onNavigateToBooking()}
          className="text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 cursor-pointer"
        >
          {language === 'cs' ? 'Rezervovat' : language === 'ru' ? 'Записаться' : 'Book'}
        </button>
      </p>
    </div>
  );
};
