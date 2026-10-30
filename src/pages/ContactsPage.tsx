import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { InteractiveMap } from '../components/InteractiveMap';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, Instagram, Train, Car, Navigation } from 'lucide-react';

export const ContactsPage: React.FC = () => {
  const { t, language } = useLanguage();

  // Feedback form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formSubject, setFormSubject] = useState(
    language === 'cs' ? 'Dotaz na termín' : language === 'ru' ? 'Консультация по услугам' : 'General Inquiry'
  );
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormName('');
      setFormEmail('');
      setFormPhone('');
      setFormMessage('');
    }, 700);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#8C7A6B]">
          {language === 'cs' ? 'Praha 2 • Vinohrady' : language === 'ru' ? 'Прага 2 • Винограды' : 'Vinohrady Sanctuary'}
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 font-normal">
          {t.contacts.title}
        </h1>
        <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
          {t.contacts.subtitle}
        </p>
      </div>

      {/* Interactive Map Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-900">
            <MapPin className="w-4 h-4 text-[#8C7A6B]" />
            <span>{language === 'cs' ? 'Interaktivní mapa Vinohrad' : language === 'ru' ? 'Интерактивная карта студии' : 'Interactive Studio Map'}</span>
          </div>
          <span className="text-xs text-stone-500 font-light hidden sm:inline">
            Vinohradská 114, Praha 2
          </span>
        </div>

        <InteractiveMap />
      </div>

      {/* Grid: Salon Details & Feedback Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Studio Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">
              {language === 'cs' ? 'Přijďte nás navštívit' : language === 'ru' ? 'Ждем вас в гости' : 'Visit Our Studio'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
              {language === 'cs'
                ? 'Náš salon se nachází v tiché historické části Vinohrad s výbornou dostupností metrem i autem.'
                : language === 'ru'
                ? 'Уютное бьюти-пространство в самом сердце исторического района Винограды.'
                : 'A serene retreat located in the tranquil, elegant architectural district of Královské Vinohrady.'}
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm">
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-white border border-[#E8E2D9] text-stone-800 shrink-0">
                <MapPin className="w-5 h-5 text-[#8C7A6B]" />
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-stone-900 uppercase tracking-wider text-xs">
                  {t.contacts.addressTitle}
                </div>
                <div className="text-stone-700 leading-relaxed font-light">
                  {t.contacts.addressValue}
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-white border border-[#E8E2D9] text-stone-800 shrink-0">
                <Clock className="w-5 h-5 text-[#8C7A6B]" />
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-stone-900 uppercase tracking-wider text-xs">
                  {t.contacts.hoursTitle}
                </div>
                <div className="text-stone-700 leading-relaxed font-light">
                  {t.contacts.hoursWeek}
                  <br />
                  {t.contacts.hoursSun}
                </div>
              </div>
            </div>

            {/* Phone & Instant WhatsApp */}
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-white border border-[#E8E2D9] text-stone-800 shrink-0">
                <Phone className="w-5 h-5 text-[#8C7A6B]" />
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-stone-900 uppercase tracking-wider text-xs">
                  {t.contacts.phoneTitle}
                </div>
                <div className="text-stone-700 leading-relaxed font-light">
                  <a
                    href="tel:+420773892104"
                    className="hover:text-black font-medium transition"
                  >
                    +420 773 892 104
                  </a>
                  <div className="flex items-center gap-3 pt-1">
                    <a
                      href="https://wa.me/420773892104"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-900"
                    >
                      WhatsApp Chat
                    </a>
                    <span className="text-stone-300">•</span>
                    <a
                      href="https://t.me"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-700 hover:text-sky-900"
                    >
                      Telegram
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-white border border-[#E8E2D9] text-stone-800 shrink-0">
                <Mail className="w-5 h-5 text-[#8C7A6B]" />
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-stone-900 uppercase tracking-wider text-xs">
                  {t.contacts.emailTitle}
                </div>
                <div className="text-stone-700 leading-relaxed font-light">
                  <a
                    href="mailto:info@atelierluma.cz"
                    className="hover:text-black transition"
                  >
                    info@atelierluma.cz
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Feedback Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E2D9] shadow-sm">
          <div className="space-y-2 mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">
              {t.contacts.feedbackTitle}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-light">
              {t.contacts.feedbackSubtitle}
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-8 rounded-2xl bg-[#FAF8F5] border border-emerald-200 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-medium text-stone-900">
                  {language === 'cs' ? 'Zpráva úspěšně odeslána!' : language === 'ru' ? 'Сообщение отправлено!' : 'Message Received!'}
                </h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  {t.contacts.formSuccess}
                </p>
              </div>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-4 px-6 py-2.5 bg-[#1C1917] text-white rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-black transition cursor-pointer"
              >
                {language === 'cs' ? 'Odeslat další dotaz' : language === 'ru' ? 'Написать еще' : 'Send Another Message'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                    {t.contacts.formName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Anna Miller"
                    className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-4 py-3 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                    {t.contacts.formEmail} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="anna@example.com"
                    className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-4 py-3 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                    {t.contacts.formPhone}
                  </label>
                  <input
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+420 773 000 000"
                    className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-4 py-3 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                    {t.contacts.formSubject}
                  </label>
                  <select
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-4 py-3 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white cursor-pointer"
                  >
                    <option value="Booking inquiry">
                      {language === 'cs' ? 'Dotaz na termín' : language === 'ru' ? 'Вопрос по записи' : 'Booking inquiry'}
                    </option>
                    <option value="Treatment advice">
                      {language === 'cs' ? 'Doporučení péče' : language === 'ru' ? 'Консультация по уходу' : 'Treatment advice'}
                    </option>
                    <option value="Collaboration">
                      {language === 'cs' ? 'Spolupráce' : language === 'ru' ? 'Сотрудничество' : 'Collaboration'}
                    </option>
                    <option value="Other">
                      {language === 'cs' ? 'Jiné' : language === 'ru' ? 'Другое' : 'Other'}
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  {t.contacts.formMessage} *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder={
                    language === 'cs'
                      ? 'Napište nám svůj dotaz, představu o barvení nebo preferovaný čas...'
                      : language === 'ru'
                      ? 'Опишите ваш запрос, текущее состояние волос/кожи или удобное время для визита...'
                      : 'Tell us about your hair/skin goals or any specific wishes...'
                  }
                  className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-4 py-3 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#1C1917] hover:bg-black text-[#FAF8F5] rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-60"
              >
                <Send className="w-4 h-4 text-[#E7DED3]" />
                <span>
                  {isSubmitting
                    ? language === 'cs'
                      ? 'Odesílám...'
                      : language === 'ru'
                      ? 'Отправка...'
                      : 'Sending...'
                    : t.contacts.formSubmit}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
