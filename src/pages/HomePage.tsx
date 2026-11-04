import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SALON_SERVICES } from '../data/salonData';

interface HomePageProps {
  onNavigate: (page: string, serviceId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const featuredServices = SALON_SERVICES.filter((s) => s.featured).slice(0, 4);

  return (
    <div className="space-y-28 pt-16 lg:pt-24 pb-28">
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center space-y-10">
        <div className="space-y-6">
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-stone-900 leading-[1.08]">
            <span className="block italic">{t.hero.title1}</span>
            <span className="block font-medium">{t.hero.title2}</span>
          </h1>
          <p className="text-base sm:text-lg text-stone-500 max-w-xl mx-auto font-light leading-relaxed">
            {t.hero.subtitle}
          </p>
        </div>

        <button
          onClick={() => onNavigate('booking')}
          className="px-8 py-4 bg-[#1C1917] hover:bg-black text-[#FAF8F5] rounded-full text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer"
        >
          {t.hero.bookCta}
        </button>
      </section>

      {/* Featured services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal text-center">
          {t.services.title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredServices.map((service) => (
            <button
              key={service.id}
              onClick={() => onNavigate('booking', service.id)}
              className="group text-left space-y-4 cursor-pointer"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-stone-100">
                <img
                  src={service.image}
                  alt={service.name[language]}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg text-stone-900 leading-snug">
                  {service.name[language]}
                </h3>
                <div className="text-sm text-stone-500">
                  {service.priceCZK.toLocaleString()} {t.services.currency}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => onNavigate('services')}
            className="text-sm text-stone-600 hover:text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition-colors cursor-pointer"
          >
            {language === 'cs' ? 'Celý ceník' : language === 'ru' ? 'Весь прайс-лист' : 'Full price list'}
          </button>
        </div>
      </section>

      {/* Review */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <blockquote className="font-serif text-2xl sm:text-3xl text-stone-800 font-light italic leading-snug">
          {language === 'cs'
            ? '„Nejkrásnější salon na Vinohradech. Přirozená barva vlasů mi vydržela bez nutnosti tónování více než půl roku. Absolutní klid a péče.“'
            : language === 'ru'
            ? '«Лучшее бьюти-пространство на Виноградах. Airtouch выглядит безупречно даже спустя 6 месяцев. Идеальный сервис, чай и внимание к деталям.»'
            : '“The ultimate quiet luxury atelier in Vinohrady. My Airtouch highlights have grown out flawlessly without brassiness. Pure calm and unmatched craft.”'}
        </blockquote>
        <div className="text-sm text-stone-500">— Markéta V.</div>
      </section>
    </div>
  );
};
