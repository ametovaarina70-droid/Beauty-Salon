import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SALON_MASTERS } from '../data/salonData';

interface TeamPageProps {
  onNavigateToBooking: (serviceId?: string) => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ onNavigateToBooking }) => {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-14">
      <header className="text-center">
        <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 font-normal">
          {t.team.title}
        </h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {SALON_MASTERS.map((master) => (
          <article key={master.id} className="space-y-4">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-stone-100">
              <img src={master.photo} alt={master.name} className="w-full h-full object-cover" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-xl text-stone-900">{master.name}</h3>
              <div className="text-sm text-stone-500">{master.role[language]}</div>
            </div>
            <p className="text-sm text-stone-500 font-light leading-relaxed">{master.bio[language]}</p>
            <div className="text-xs text-stone-400">{master.languages.join(' · ')}</div>
            <button
              onClick={() => onNavigateToBooking(master.specialties[0])}
              className="text-sm text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 cursor-pointer"
            >
              {t.team.bookWith}
            </button>
          </article>
        ))}
      </div>
    </div>
  );
};
