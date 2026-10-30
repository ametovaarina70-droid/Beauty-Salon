import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SALON_SERVICES, SALON_MASTERS, ServiceItem, MasterSpecialist } from '../data/salonData';
import { Check, Calendar as CalendarIcon, Clock, User, Phone, Mail, Sparkles, ChevronLeft, ChevronRight, Download, ArrowRight, ShieldCheck } from 'lucide-react';

interface BookingPageProps {
  initialServiceId?: string;
  onNavigateHome: () => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  initialServiceId,
  onNavigateHome
}) => {
  const { t, language } = useLanguage();

  // Wizard Steps: 1 = Service, 2 = Master, 3 = Date & Time, 4 = Details, 5 = Confirmation
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Selections
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(() => {
    if (initialServiceId) {
      return SALON_SERVICES.find((s) => s.id === initialServiceId) || null;
    }
    return null;
  });

  const [selectedMaster, setSelectedMaster] = useState<MasterSpecialist | null>(null);
  const [isAnyMaster, setIsAnyMaster] = useState<boolean>(true);

  // Date selection (next 7 days starting from today)
  const availableDates = Array.from({ length: 8 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  const [selectedDate, setSelectedDate] = useState<Date>(availableDates[0]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('11:00');

  // Contact form fields
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('+420 ');
  const [clientEmail, setClientEmail] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [bookingCode, setBookingCode] = useState('');

  // Update selected service if prop changes
  useEffect(() => {
    if (initialServiceId) {
      const match = SALON_SERVICES.find((s) => s.id === initialServiceId);
      if (match) {
        setSelectedService(match);
        setCurrentStep(2);
      }
    }
  }, [initialServiceId]);

  // Available time slots
  const timeSlots = ['09:30', '11:00', '13:00', '14:30', '16:00', '17:30', '19:00'];

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim() || !clientEmail.trim()) {
      setErrorMessage(t.booking.validationError);
      return;
    }
    setErrorMessage('');
    const randomCode = `AL-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingCode(randomCode);
    setCurrentStep(5);
  };

  // Download real .ICS calendar event for Google/Apple Calendar
  const handleDownloadICS = () => {
    if (!selectedService) return;
    const dateStr = selectedDate.toISOString().split('T')[0].replace(/-/g, '');
    const [hours, minutes] = selectedTimeSlot.split(':');
    const startStr = `${dateStr}T${hours.padStart(2, '0')}${minutes.padStart(2, '0')}00`;

    // Estimate end time based on duration
    const endH = (parseInt(hours, 10) + Math.floor(selectedService.durationMin / 60)).toString().padStart(2, '0');
    const endM = ((parseInt(minutes, 10) + (selectedService.durationMin % 60)) % 60).toString().padStart(2, '0');
    const endStr = `${dateStr}T${endH}${endM}00`;

    const masterName = isAnyMaster ? 'Atelier Luma Specialist' : selectedMaster?.name || 'Specialist';

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Atelier Luma Prague//Online Booking//EN',
      'BEGIN:VEVENT',
      `UID:${bookingCode || 'AL-EVENT'}@atelierluma.cz`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${startStr}`,
      `DTEND:${endStr}`,
      `SUMMARY:Atelier Luma Prague: ${selectedService.name[language]}`,
      `DESCRIPTION:Booking Code: ${bookingCode}\\nSpecialist: ${masterName}\\nDuration: ${selectedService.durationMin} min\\nPrice: ${selectedService.priceCZK} CZK`,
      'LOCATION:Vinohradská 114\\, 130 00 Praha 2 - Vinohrady\\, Czech Republic',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Atelier-Luma-Booking-${bookingCode || 'visit'}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#8C7A6B]">
          {language === 'cs' ? 'Rychlá rezervace' : language === 'ru' ? 'Моментальная бронь' : 'Instant Reservation'}
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 font-normal">
          {t.booking.title}
        </h1>
        <p className="text-stone-600 text-sm font-light">
          {t.booking.subtitle}
        </p>
      </div>

      {/* Wizard Progress Steps Bar */}
      {currentStep < 5 && (
        <div className="grid grid-cols-4 gap-2 mb-10 text-center">
          {[
            { step: 1, label: t.booking.step1 },
            { step: 2, label: t.booking.step2 },
            { step: 3, label: t.booking.step3 },
            { step: 4, label: t.booking.step4 },
          ].map((item) => (
            <div key={item.step} className="space-y-1.5">
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentStep >= item.step ? 'bg-[#1C1917]' : 'bg-[#E8E2D9]'
                }`}
              />
              <span
                className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider block truncate ${
                  currentStep === item.step ? 'text-stone-900' : 'text-stone-400'
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* STEP 1: SERVICE SELECTION */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9]">
            <h2 className="font-serif text-2xl text-stone-900 font-medium">
              {t.booking.selectService}
            </h2>
            <span className="text-xs text-stone-500 font-light">
              {SALON_SERVICES.length} {language === 'cs' ? 'služeb k dispozici' : language === 'ru' ? 'доступных услуг' : 'treatments available'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SALON_SERVICES.map((service) => {
              const isSelected = selectedService?.id === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#1C1917] bg-white ring-2 ring-[#1C1917] shadow-md'
                      : 'border-[#E8E2D9] bg-white hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C7A6B]">
                        {t.services.categories[service.category]}
                      </span>
                      <h3 className="font-serif text-lg font-medium text-stone-900 mt-0.5">
                        {service.name[language]}
                      </h3>
                      <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                        {service.description[language]}
                      </p>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                        isSelected
                          ? 'border-[#1C1917] bg-[#1C1917] text-white'
                          : 'border-stone-300'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      {service.durationMin} {t.services.durationMin}
                    </span>
                    <span className="font-bold text-stone-900 text-sm">
                      {service.priceCZK.toLocaleString()} {t.services.currency}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-6 flex justify-end">
            <button
              onClick={() => setCurrentStep(2)}
              disabled={!selectedService}
              className="px-8 py-3.5 bg-[#1C1917] text-[#FAF8F5] rounded-full text-xs uppercase font-semibold tracking-wider hover:bg-black transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shadow-md"
            >
              <span>{language === 'cs' ? 'Pokračovat k výběru mistra' : language === 'ru' ? 'Выбрать мастера' : 'Continue to Specialist'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: MASTER SELECTION */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9]">
            <h2 className="font-serif text-2xl text-stone-900 font-medium">
              {t.booking.selectMaster}
            </h2>
            <span className="text-xs text-stone-500">
              {selectedService?.name[language]}
            </span>
          </div>

          {/* Any Available Option */}
          <div
            onClick={() => {
              setIsAnyMaster(true);
              setSelectedMaster(null);
            }}
            className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
              isAnyMaster
                ? 'border-[#1C1917] bg-white ring-2 ring-[#1C1917] shadow-sm'
                : 'border-[#E8E2D9] bg-white hover:border-stone-400'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#EAE3D8] flex items-center justify-center text-stone-800">
                <Sparkles className="w-5 h-5 text-[#8C7A6B]" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900 text-sm">
                  {t.booking.anyMaster}
                </h3>
                <p className="text-xs text-stone-500">
                  {language === 'cs'
                    ? 'Přiřadíme vám nejbližšího certifikovaného specialistu pro maximální flexibilitu.'
                    : language === 'ru'
                    ? 'Подберем первого свободного сертифицированного мастера для максимального выбора времени.'
                    : 'We will assign the earliest available senior artist for maximum flexibility.'}
                </p>
              </div>
            </div>

            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                isAnyMaster
                  ? 'border-[#1C1917] bg-[#1C1917] text-white'
                  : 'border-stone-300'
              }`}
            >
              {isAnyMaster && <Check className="w-3.5 h-3.5" />}
            </div>
          </div>

          {/* Individual Masters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SALON_MASTERS.map((master) => {
              const isSelected = !isAnyMaster && selectedMaster?.id === master.id;
              return (
                <div
                  key={master.id}
                  onClick={() => {
                    setIsAnyMaster(false);
                    setSelectedMaster(master);
                  }}
                  className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#1C1917] bg-white ring-2 ring-[#1C1917] shadow-md'
                      : 'border-[#E8E2D9] bg-white hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={master.photo}
                      alt={master.name}
                      className="w-14 h-14 rounded-full object-cover border border-stone-200"
                    />
                    <div>
                      <h3 className="font-serif text-lg font-medium text-stone-900">
                        {master.name}
                      </h3>
                      <p className="text-xs text-stone-500">
                        {master.role[language]}
                      </p>
                      <span className="text-[11px] text-stone-400 block mt-0.5">
                        {master.experienceYears} {language === 'cs' ? 'let praxe' : language === 'ru' ? 'лет опыта' : 'years experience'} • {master.languages.join(', ')}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span>Atelier Senior Stylist</span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-[#1C1917] bg-[#1C1917] text-white'
                          : 'border-stone-300'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-6 flex justify-between items-center">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-6 py-3 border border-stone-300 rounded-full text-xs uppercase font-semibold text-stone-700 hover:bg-stone-100 transition cursor-pointer flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{language === 'cs' ? 'Zpět' : language === 'ru' ? 'Назад' : 'Back'}</span>
            </button>

            <button
              onClick={() => setCurrentStep(3)}
              className="px-8 py-3.5 bg-[#1C1917] text-[#FAF8F5] rounded-full text-xs uppercase font-semibold tracking-wider hover:bg-black transition cursor-pointer flex items-center gap-2 shadow-md"
            >
              <span>{language === 'cs' ? 'Pokračovat k termínu' : language === 'ru' ? 'Выбрать дату и время' : 'Choose Date & Time'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: DATE & TIME SELECTION */}
      {currentStep === 3 && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="pb-3 border-b border-[#E8E2D9]">
            <h2 className="font-serif text-2xl text-stone-900 font-medium">
              {t.booking.selectDate} & {t.booking.selectTime}
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              {selectedService?.name[language]} • {isAnyMaster ? t.booking.anyMaster : selectedMaster?.name}
            </p>
          </div>

          {/* Date Picker Carousel */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-3">
              {t.booking.selectDate}
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {availableDates.map((date, idx) => {
                const isSelected =
                  date.toDateString() === selectedDate.toDateString();
                const dayName = date.toLocaleDateString(
                  language === 'cs' ? 'cs-CZ' : language === 'ru' ? 'ru-RU' : 'en-US',
                  { weekday: 'short' }
                );
                const dayNum = date.getDate();

                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDate(date)}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#1C1917] bg-[#1C1917] text-white shadow-md'
                        : 'border-[#E8E2D9] bg-white text-stone-800 hover:border-stone-400'
                    }`}
                  >
                    <span className="block text-[11px] uppercase tracking-wider opacity-70">
                      {dayName}
                    </span>
                    <span className="block text-lg font-bold mt-1">
                      {dayNum}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slot Picker */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-3">
              {t.booking.selectTime}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {timeSlots.map((slot) => {
                const isSelected = selectedTimeSlot === slot;
                return (
                  <button
                    key={slot}
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`py-3 px-4 rounded-xl border text-xs font-semibold tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      isSelected
                        ? 'border-[#1C1917] bg-[#1C1917] text-white shadow-sm'
                        : 'border-[#E8E2D9] bg-white text-stone-800 hover:bg-stone-50'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{slot}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="pt-6 flex justify-between items-center border-t border-[#E8E2D9]">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-3 border border-stone-300 rounded-full text-xs uppercase font-semibold text-stone-700 hover:bg-stone-100 transition cursor-pointer flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{language === 'cs' ? 'Zpět' : language === 'ru' ? 'Назад' : 'Back'}</span>
            </button>

            <button
              onClick={() => setCurrentStep(4)}
              className="px-8 py-3.5 bg-[#1C1917] text-[#FAF8F5] rounded-full text-xs uppercase font-semibold tracking-wider hover:bg-black transition cursor-pointer flex items-center gap-2 shadow-md"
            >
              <span>{language === 'cs' ? 'Kontaktní údaje' : language === 'ru' ? 'Ввести контакты' : 'Guest Details'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: CONTACT INFORMATION & CONFIRMATION TRIGGER */}
      {currentStep === 4 && (
        <form onSubmit={handleConfirmBooking} className="space-y-6 animate-in fade-in duration-200">
          <div className="pb-3 border-b border-[#E8E2D9]">
            <h2 className="font-serif text-2xl text-stone-900 font-medium">
              {t.booking.contactInfo}
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              {language === 'cs'
                ? 'Potvrzení a SMS připomínku pošleme zdarma před termínem.'
                : language === 'ru'
                ? 'Квитанция и напоминание о визите придут на указанный номер и почту.'
                : 'Confirmation and appointment reminder will be sent via SMS & email.'}
            </p>
          </div>

          {/* Quick Summary Card */}
          <div className="p-4 rounded-2xl bg-[#F4EFE8] border border-[#E8E2D9] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-bold">
                {t.booking.step1}
              </span>
              <span className="font-semibold text-stone-900 truncate block">
                {selectedService?.name[language]}
              </span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-bold">
                {t.booking.specialist}
              </span>
              <span className="font-semibold text-stone-900 truncate block">
                {isAnyMaster ? t.booking.anyMaster : selectedMaster?.name}
              </span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-bold">
                {t.booking.date} & {t.booking.time}
              </span>
              <span className="font-semibold text-stone-900 block">
                {selectedDate.toLocaleDateString(language === 'cs' ? 'cs-CZ' : language === 'ru' ? 'ru-RU' : 'en-US', { day: 'numeric', month: 'short' })}, {selectedTimeSlot}
              </span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-bold">
                {t.booking.total}
              </span>
              <span className="font-bold text-stone-900 text-sm block">
                {selectedService?.priceCZK.toLocaleString()} {t.services.currency}
              </span>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-medium border border-red-200">
              {errorMessage}
            </div>
          )}

          {/* Form fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                {t.booking.fullName} *
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Elena / Tereza / Anna"
                className="w-full bg-white border border-[#E8E2D9] rounded-xl px-4 py-3 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                {t.booking.phone} *
              </label>
              <input
                type="tel"
                required
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="+420 773 000 000"
                className="w-full bg-white border border-[#E8E2D9] rounded-xl px-4 py-3 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
              {t.booking.email} *
            </label>
            <input
              type="email"
              required
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="client@example.com"
              className="w-full bg-white border border-[#E8E2D9] rounded-xl px-4 py-3 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
              {t.booking.notes}
            </label>
            <textarea
              rows={2}
              value={clientNotes}
              onChange={(e) => setClientNotes(e.target.value)}
              placeholder={t.booking.notesPlaceholder}
              className="w-full bg-white border border-[#E8E2D9] rounded-xl px-4 py-3 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
            />
          </div>

          {/* Buttons */}
          <div className="pt-4 flex justify-between items-center border-t border-[#E8E2D9]">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-6 py-3 border border-stone-300 rounded-full text-xs uppercase font-semibold text-stone-700 hover:bg-stone-100 transition cursor-pointer flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{language === 'cs' ? 'Zpět' : language === 'ru' ? 'Назад' : 'Back'}</span>
            </button>

            <button
              type="submit"
              className="px-8 py-3.5 bg-[#1C1917] text-[#FAF8F5] rounded-full text-xs uppercase font-semibold tracking-wider hover:bg-black transition cursor-pointer flex items-center gap-2 shadow-lg"
            >
              <Check className="w-4 h-4 text-emerald-400" />
              <span>{t.booking.confirmBooking}</span>
            </button>
          </div>
        </form>
      )}

      {/* STEP 5: SUCCESS CONFIRMATION RECEIPT */}
      {currentStep === 5 && (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E2D9] shadow-xl text-center space-y-8 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
            <Check className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-[#8C7A6B] uppercase">
              {bookingCode}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal">
              {t.booking.successTitle}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
              {t.booking.successMessage}
            </p>
          </div>

          {/* Details Ticket */}
          <div className="max-w-md mx-auto bg-[#FAF8F5] rounded-2xl p-6 border border-[#E8E2D9] text-left text-xs space-y-3">
            <div className="flex justify-between border-b border-stone-200/60 pb-2">
              <span className="text-stone-500">{t.booking.step1}:</span>
              <span className="font-semibold text-stone-900">{selectedService?.name[language]}</span>
            </div>
            <div className="flex justify-between border-b border-stone-200/60 pb-2">
              <span className="text-stone-500">{t.booking.specialist}:</span>
              <span className="font-semibold text-stone-900">
                {isAnyMaster ? t.booking.anyMaster : selectedMaster?.name}
              </span>
            </div>
            <div className="flex justify-between border-b border-stone-200/60 pb-2">
              <span className="text-stone-500">{t.booking.date} & {t.booking.time}:</span>
              <span className="font-semibold text-stone-900">
                {selectedDate.toLocaleDateString(language === 'cs' ? 'cs-CZ' : language === 'ru' ? 'ru-RU' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}, {selectedTimeSlot}
              </span>
            </div>
            <div className="flex justify-between border-b border-stone-200/60 pb-2">
              <span className="text-stone-500">{language === 'cs' ? 'Lokalita' : language === 'ru' ? 'Локация' : 'Location'}:</span>
              <span className="font-semibold text-stone-900">Vinohradská 114, Praha 2</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-stone-500 font-medium">{t.booking.total}:</span>
              <span className="font-bold text-stone-900 text-sm">
                {selectedService?.priceCZK.toLocaleString()} {t.services.currency} (~{selectedService?.priceEUR} €)
              </span>
            </div>
          </div>

          {/* Actions: Download .ICS Calendar + New Booking */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={handleDownloadICS}
              className="px-6 py-3.5 bg-[#1C1917] hover:bg-black text-[#FAF8F5] rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition cursor-pointer shadow-md"
            >
              <Download className="w-4 h-4 text-[#E7DED3]" />
              <span>{t.booking.downloadCalendar}</span>
            </button>

            <button
              onClick={() => {
                setCurrentStep(1);
                setSelectedService(null);
                setSelectedMaster(null);
                setIsAnyMaster(true);
              }}
              className="px-6 py-3.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-full text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
            >
              {t.booking.newBooking}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
