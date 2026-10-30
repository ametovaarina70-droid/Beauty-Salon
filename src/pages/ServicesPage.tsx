import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SALON_SERVICES, ServiceItem } from '../data/salonData';
import { Search, Clock, Sparkles, Check, ArrowRight } from 'lucide-react';

interface ServicesPageProps {
  onNavigateToBooking: (serviceId?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigateToBooking }) => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { key: 'all', label: t.services.categories.all },
    { key: 'hair', label: t.services.categories.hair },
    { key: 'nails', label: t.services.categories.nails },
    { key: 'face', label: t.services.categories.face },
    { key: 'brows', label: t.services.categories.brows },
  ];

  const filteredServices = useMemo(() => {
    return SALON_SERVICES.filter((service) => {
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      const name = service.name[language].toLowerCase();
      const desc = service.description[language].toLowerCase();
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || name.includes(q) || desc.includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, language]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#8C7A6B]">
          {language === 'cs' ? 'Transparentní péče' : language === 'ru' ? 'Честные фиксированные цены' : 'Transparent Menu'}
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 font-normal">
          {t.services.title}
        </h1>
        <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
          {t.services.subtitle}
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-[#E8E2D9]">
        {/* Categories Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs uppercase font-medium tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.key
                  ? 'bg-[#1C1917] text-[#FAF8F5] shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-200/60 border border-[#E8E2D9]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.services.filterSearch}
            className="w-full bg-white border border-[#E8E2D9] rounded-full pl-10 pr-4 py-2 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900"
          />
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#E8E2D9] p-8">
          <p className="text-stone-500 text-sm">
            {language === 'cs'
              ? 'Nebyly nalezeny žádné služby odpovídající vašemu hledání.'
              : language === 'ru'
              ? 'Услуги по данному запросу не найдены.'
              : 'No services found matching your criteria.'}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 text-xs uppercase font-semibold text-stone-900 underline underline-offset-4 cursor-pointer"
          >
            {language === 'cs' ? 'Resetovat filtry' : language === 'ru' ? 'Сбросить фильтры' : 'Reset filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl p-6 border border-[#E8E2D9] hover:border-stone-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C7A6B]">
                      {t.services.categories[service.category]}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 mt-0.5">
                      {service.name[language]}
                    </h3>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xl font-bold text-stone-900">
                      {service.priceCZK.toLocaleString()} {t.services.currency}
                    </div>
                    <div className="text-xs text-stone-400">
                      ~{service.priceEUR} €
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                  {service.description[language]}
                </p>

                <div className="flex items-center gap-4 text-xs text-stone-500 pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    {service.durationMin} {t.services.durationMin}
                  </span>
                  <span className="text-stone-300">•</span>
                  <span className="flex items-center gap-1 text-emerald-700 font-medium">
                    <Sparkles className="w-3.5 h-3.5" />
                    {t.services.included}
                  </span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
                <div className="text-[11px] text-stone-400 uppercase tracking-wider">
                  Atelier Luma Vinohrady
                </div>

                <button
                  onClick={() => onNavigateToBooking(service.id)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#1C1917] group-hover:bg-black text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md"
                >
                  <span>{t.services.bookNow}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Note about bespoke consultations */}
      <div className="bg-[#F2ECE3] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#E2DBD1]">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-serif text-lg text-stone-900 font-medium">
            {language === 'cs' ? 'Potřebujete individuální konzultaci?' : language === 'ru' ? 'Не уверены, какая процедура вам подойдет?' : 'Need a bespoke consultation?'}
          </h4>
          <p className="text-xs text-stone-600 max-w-xl">
            {language === 'cs'
              ? 'Před složitějším barvením nabízíme 20minutovou osobní nebo online konzultaci zdarma.'
              : language === 'ru'
              ? 'Перед сложным окрашиванием или курсом ухода наши топ-мастера бесплатно проведут диагностику волос или кожи.'
              : 'We provide complimentary 20-minute diagnostic consultations prior to extensive color transformations.'}
          </p>
        </div>
        <button
          onClick={() => onNavigateToBooking()}
          className="whitespace-nowrap px-6 py-3 bg-[#1C1917] text-white rounded-full text-xs uppercase font-semibold tracking-wider hover:bg-black transition cursor-pointer"
        >
          {language === 'cs' ? 'Rezervovat konzultaci' : language === 'ru' ? 'Записаться на диагностику' : 'Book Consultation'}
        </button>
      </div>
    </div>
  );
};
