import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Copy, Check, Train, Car, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const InteractiveMap: React.FC = () => {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);

  const salonAddress = "Vinohradská 114, 130 00 Praha 2 - Vinohrady";
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Vinohradsk%C3%A1+114,+130+00+Praha+2";
  const iframeSrc = "https://maps.google.com/maps?q=Vinohradsk%C3%A1+114,+130+00+Praha+2+-+Vinohrady&t=&z=16&ie=UTF8&iwloc=&output=embed";

  const handleCopy = () => {
    navigator.clipboard.writeText(salonAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-4">
      {/* Google Map Container with Iframe */}
      <div className="relative rounded-3xl overflow-hidden border border-[#E8E2D9] shadow-md bg-[#F5F2EC]">
        {/* Top Floating Badge on Map */}
        <div className="absolute top-4 left-4 z-20 hidden sm:flex items-center gap-2">
          <div className="px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-md border border-[#E2DBD1] flex items-center gap-2.5 text-xs text-stone-900 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-serif font-bold text-sm tracking-wide">ATELIER LUMA</span>
            <span className="text-stone-300">•</span>
            <span className="text-stone-600 font-sans">Vinohradská 114</span>
          </div>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2.5 text-xs font-semibold tracking-wider uppercase bg-[#1C1917] text-[#FAF8F5] shadow-md rounded-2xl hover:bg-black transition flex items-center gap-1.5 cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5 text-[#E7DED3]" />
            <span>Google Maps</span>
            <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
          </a>
        </div>

        {/* Google Maps Embed Iframe without API key */}
        <div className="w-full h-[380px] sm:h-[460px]">
          <iframe
            src={iframeSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Atelier Luma Prague"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Prominent Salon Address Card directly after/below the Map */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D9] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-100">
          <div className="space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#8C7A6B] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>{t.contacts.addressTitle}</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">
              {salonAddress}
            </h3>
            <p className="text-xs text-stone-500">
              {language === 'cs'
                ? 'Přízemí historického vinohradského domu, výloha přímo do ulice Vinohradská.'
                : language === 'ru'
                ? 'Первый этаж исторического дома на Виноградах, отдельный вход и витрина с улицы.'
                : 'Ground floor of a classic Vinohrady residence, storefront entry directly on Vinohradská.'}
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-full border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-semibold tracking-wider uppercase transition flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">
                    {language === 'cs' ? 'Zkopírováno' : language === 'ru' ? 'Скопировано' : 'Copied'}
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-500" />
                  <span>
                    {language === 'cs' ? 'Kopírovat adresu' : language === 'ru' ? 'Скопировать' : 'Copy Address'}
                  </span>
                </>
              )}
            </button>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#1C1917] hover:bg-black text-[#FAF8F5] text-xs font-semibold tracking-wider uppercase transition flex items-center gap-1.5 shadow-sm"
            >
              <Navigation className="w-3.5 h-3.5 text-[#E7DED3]" />
              <span>{t.contacts.mapOpenDirections}</span>
            </a>
          </div>
        </div>

        {/* Quick Access Badges (Metro, Tram, Parking, Hours) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-1">
            <div className="font-semibold text-stone-900 flex items-center gap-2">
              <Train className="w-4 h-4 text-[#8C7A6B]" />
              <span>{language === 'cs' ? 'Metro & Tramvaj' : language === 'ru' ? 'Метро и Трамвай' : 'Metro & Tram'}</span>
            </div>
            <p className="text-stone-600 leading-relaxed font-light">
              {t.contacts.metroInfo}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-1">
            <div className="font-semibold text-stone-900 flex items-center gap-2">
              <Car className="w-4 h-4 text-[#8C7A6B]" />
              <span>{language === 'cs' ? 'Parkovací zóna' : language === 'ru' ? 'Парковка' : 'Parking Zone'}</span>
            </div>
            <p className="text-stone-600 leading-relaxed font-light">
              {t.contacts.parkingInfo}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] space-y-1">
            <div className="font-semibold text-stone-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#8C7A6B]" />
              <span>{t.contacts.hoursTitle}</span>
            </div>
            <p className="text-stone-600 leading-relaxed font-light">
              {t.contacts.hoursWeek} • {t.contacts.hoursSun}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
