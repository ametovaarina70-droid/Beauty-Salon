import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SALON_MASTERS, MasterSpecialist } from '../data/salonData';
import { Award, Globe, Calendar, ArrowRight, Sparkles } from 'lucide-react';

interface TeamPageProps {
  onNavigateToBooking: (serviceId?: string) => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ onNavigateToBooking }) => {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#8C7A6B]">
          {language === 'cs' ? 'Mistři svého oboru' : language === 'ru' ? 'Ведущие эксперты' : 'Resident Artists'}
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 font-normal">
          {t.team.title}
        </h1>
        <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
          {t.team.subtitle}
        </p>
      </div>

      {/* Masters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {SALON_MASTERS.map((master) => (
          <div
            key={master.id}
            className="group bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D9] hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start"
          >
            {/* Master Photo */}
            <div className="relative shrink-0 mx-auto sm:mx-0">
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-stone-100 shadow-md">
                <img
                  src={master.photo}
                  alt={master.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#FAF8F5] border border-[#E8E2D9] px-2 py-0.5 rounded-full text-[10px] font-bold text-stone-800 shadow-xs">
                {master.experienceYears}y exp
              </div>
            </div>

            {/* Info */}
            <div className="space-y-4 flex-1">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8C7A6B] block">
                  {master.role[language]}
                </span>
                <h3 className="font-serif text-2xl font-medium text-stone-900 mt-0.5">
                  {master.name}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                {master.bio[language]}
              </p>

              {/* Languages spoken badge */}
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <Globe className="w-3.5 h-3.5 text-[#8C7A6B]" />
                <span className="font-medium text-stone-700">
                  {master.languages.join(' • ')}
                </span>
              </div>

              {/* Action */}
              <div className="pt-2">
                <button
                  onClick={() => onNavigateToBooking(master.specialties[0])}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1C1917] group-hover:bg-black text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#E7DED3]" />
                  <span>{t.team.bookWith}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Academy & Standards Note */}
      <div className="border-t border-[#E8E2D9] pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-left">
        <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D9] space-y-2">
          <div className="w-10 h-10 rounded-full bg-[#EAE3D8] text-stone-900 flex items-center justify-center mx-auto sm:mx-0">
            <Award className="w-5 h-5 text-[#8C7A6B]" />
          </div>
          <h4 className="font-serif text-lg font-medium text-stone-900">
            {language === 'cs' ? 'Certifikace Vidal Sassoon' : language === 'ru' ? 'Международные стандарты' : 'Vidal Sassoon Standards'}
          </h4>
          <p className="text-xs text-stone-500 leading-relaxed">
            {language === 'cs'
              ? 'Pravidelné stáže v Paříži, Miláně a Londýně pro zachování nejvyšších standardů řemesla.'
              : language === 'ru'
              ? 'Все стилисты регулярно проходят повышение квалификации в Париже, Милане и Лондоне.'
              : 'Our artists attend seasonal masterclasses in Paris, Milan and London.'}
          </p>
        </div>

        <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D9] space-y-2">
          <div className="w-10 h-10 rounded-full bg-[#EAE3D8] text-stone-900 flex items-center justify-center mx-auto sm:mx-0">
            <Sparkles className="w-5 h-5 text-[#8C7A6B]" />
          </div>
          <h4 className="font-serif text-lg font-medium text-stone-900">
            {language === 'cs' ? 'Lékařská sterilizace' : language === 'ru' ? 'Медицинская стерилизация' : 'Medical Grade Hygiene'}
          </h4>
          <p className="text-xs text-stone-500 leading-relaxed">
            {language === 'cs'
              ? 'Třístupňová sterilizace nástrojů v autoklávu třídy B. Bezpečnost a hygiena na 100%.'
              : language === 'ru'
              ? '3-этапная дезинфекция и стерилизация в сухожаре и автоклаве класса B. Одноразовые расходники.'
              : 'Triple-stage medical autoclave sterilization with single-use client care kits.'}
          </p>
        </div>

        <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D9] space-y-2">
          <div className="w-10 h-10 rounded-full bg-[#EAE3D8] text-stone-900 flex items-center justify-center mx-auto sm:mx-0">
            <Globe className="w-5 h-5 text-[#8C7A6B]" />
          </div>
          <h4 className="font-serif text-lg font-medium text-stone-900">
            {language === 'cs' ? 'Mluvíme vaším jazykem' : language === 'ru' ? 'Языковой комфорт' : 'Multilingual Ease'}
          </h4>
          <p className="text-xs text-stone-500 leading-relaxed">
            {language === 'cs'
              ? 'Plynulá domluva v češtině, angličtině i ruštině pro každého našeho hosta.'
              : language === 'ru'
              ? 'Полное взаимопонимание: администраторы и мастера свободно говорят на русском, чешском и английском.'
              : 'Seamless communication in Czech, English, and Russian across all appointments.'}
          </p>
        </div>
      </div>
    </div>
  );
};
