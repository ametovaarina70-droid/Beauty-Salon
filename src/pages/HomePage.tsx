import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUpRight, Sparkles, MapPin, CheckCircle2, Star, Clock, ChevronRight, ShieldCheck, Heart } from 'lucide-react';
import { SALON_SERVICES, INITIAL_GALLERY } from '../data/salonData';

interface HomePageProps {
  onNavigate: (page: string, serviceId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const featuredServices = SALON_SERVICES.filter((s) => s.featured);

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-10 lg:pt-16 max-w-7xl mx-auto">
        {/* Centered Hero Text */}
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-stone-900 leading-[1.08] text-center">
              <span className="block italic">{t.hero.title1}</span>
              <span className="block font-medium">{t.hero.title2}</span>
            </h1>
            <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto font-light leading-relaxed pt-2 text-center">
              {t.hero.subtitle}
            </p>
          </div>

          {/* Centered CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('booking')}
              className="px-8 py-4 bg-[#1C1917] hover:bg-black text-[#FAF8F5] rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-200 shadow-lg hover:shadow-xl hover:translate-y-[-1px] cursor-pointer"
            >
              {t.hero.bookCta}
            </button>

            <button
              onClick={() => onNavigate('gallery')}
              className="group px-7 py-4 bg-transparent hover:bg-stone-200/50 text-stone-900 rounded-full text-xs font-semibold uppercase tracking-widest border border-stone-300 transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <span>{t.hero.viewGalleryCta}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* 3 Value Pillars Centered */}
        <div className="pt-12 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
          <div className="space-y-1">
            <div className="text-xs font-bold tracking-wider uppercase text-stone-900 flex items-center justify-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#8C7A6B]" />
              Vinohrady
            </div>
            <p className="text-xs text-stone-500 leading-relaxed max-w-xs mx-auto">
              {t.hero.features.location}
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-bold tracking-wider uppercase text-stone-900 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#8C7A6B]" />
              {language === 'cs' ? 'Kosmetika' : language === 'ru' ? 'Премиум уход' : 'Rituals'}
            </div>
            <p className="text-xs text-stone-500 leading-relaxed max-w-xs mx-auto">
              {t.hero.features.premium}
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-bold tracking-wider uppercase text-stone-900 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8C7A6B]" />
              {language === 'cs' ? 'Jazyky' : language === 'ru' ? 'Языки' : 'Languages'}
            </div>
            <p className="text-xs text-stone-500 leading-relaxed max-w-xs mx-auto">
              {t.hero.features.multilingual}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Services Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 pb-4 border-b border-[#E8E2D9] space-y-2">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#8C7A6B] block">
            {language === 'cs' ? 'Výběr z ceníku' : language === 'ru' ? 'Популярные процедуры' : 'Curated Selection'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-normal">
            {t.services.title}
          </h2>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-900 hover:text-[#8C7A6B] transition cursor-pointer"
            >
              <span>{language === 'cs' ? 'Zobrazit celý ceník' : language === 'ru' ? 'Весь прайс-лист' : 'View Full Menu'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl border border-[#E8E2D9] overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] overflow-hidden bg-stone-100 relative">
                  <img
                    src={service.image}
                    alt={service.name[language]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full text-[11px] font-semibold text-stone-900 shadow-xs">
                    {service.durationMin} {t.services.durationMin}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-serif text-lg font-medium text-stone-900 group-hover:text-[#8C7A6B] transition-colors leading-snug">
                    {service.name[language]}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {service.description[language]}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-stone-100 flex items-center justify-between mt-4">
                <div>
                  <div className="text-base font-bold text-stone-900">
                    {service.priceCZK.toLocaleString()} {t.services.currency}
                  </div>
                  <div className="text-[11px] text-stone-400">
                    ~{service.priceEUR} €
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('booking', service.id)}
                  className="px-3.5 py-2 rounded-xl bg-[#FAF8F5] group-hover:bg-[#1C1917] text-stone-900 group-hover:text-white text-xs font-semibold tracking-wider transition-colors cursor-pointer"
                >
                  {t.services.bookNow}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instagram Ribbon Live Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1C1917] rounded-3xl p-8 sm:p-12 text-[#FAF8F5] relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#E7DED3] font-semibold mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                {t.gallery.instaTag}
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white">
                {t.gallery.title}
              </h2>
            </div>
            <button
              onClick={() => onNavigate('gallery')}
              className="self-start md:self-auto px-6 py-3 rounded-full bg-white text-[#1C1917] hover:bg-[#E7DED3] text-xs font-bold uppercase tracking-wider transition cursor-pointer"
            >
              {language === 'cs' ? 'Otevřít galerii' : language === 'ru' ? 'Перейти в галерею' : 'Explore Gallery'}
            </button>
          </div>

          {/* Quick 4-grid Instagram snapshots */}
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {INITIAL_GALLERY.slice(0, 4).map((post) => (
              <div
                key={post.id}
                onClick={() => onNavigate('gallery')}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-stone-800"
              >
                <img
                  src={post.image}
                  alt="Atelier Luma Instagram Portfolio"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                  <div className="text-[11px] text-white flex items-center gap-1.5 font-medium">
                    <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                    <span>{post.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guest Reviews / Philosophy Strip */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <div className="flex justify-center gap-1 text-amber-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
          ))}
        </div>
        <blockquote className="font-serif text-2xl sm:text-3xl text-stone-800 font-light italic leading-snug">
          {language === 'cs'
            ? '„Nejkrásnější salon na Vinohradech. Přirozená barva vlasů mi vydržela bez nutnosti tónování více než půl roku. Absolutní klid a péče.“'
            : language === 'ru'
            ? '«Лучшее бьюти-пространство на Виноградах. Airtouch выглядит безупречно даже спустя 6 месяцев. Идеальный сервис, чай и внимание к деталям.»'
            : '“The ultimate quiet luxury atelier in Vinohrady. My Airtouch highlights have grown out flawlessly without brassiness. Pure calm and unmatched craft.”'}
        </blockquote>
        <div className="text-xs uppercase tracking-widest font-semibold text-stone-500">
          Markéta V. • Google Reviews (4.9 ★ / 180+ reviews)
        </div>
      </section>
    </div>
  );
};
