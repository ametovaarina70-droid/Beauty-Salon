import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { InteractiveMap, GOOGLE_MAPS_URL } from '../components/InteractiveMap';

export const ContactsPage: React.FC = () => {
  const { t, language } = useLanguage();

  // Feedback form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
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

  const label = 'text-sm text-stone-400 mb-1';
  const link = 'text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-16">
      <header className="text-center">
        <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 font-normal">
          {language === 'cs' ? 'Kontakty' : language === 'ru' ? 'Контакты' : 'Contacts'}
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Studio info */}
        <dl className="space-y-8 text-base text-stone-800 font-light">
          <div>
            <dt className={label}>{t.contacts.addressTitle}</dt>
            <dd className="space-y-1">
              <div>{t.contacts.addressValue}</div>
              <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className={`text-sm ${link}`}>
                Google Maps
              </a>
            </dd>
          </div>
          <div>
            <dt className={label}>{t.contacts.hoursTitle}</dt>
            <dd>{t.contacts.hoursWeek}<br />{t.contacts.hoursSun}</dd>
          </div>
          <div>
            <dt className={label}>{t.contacts.phoneTitle}</dt>
            <dd className="space-y-1">
              <a href="tel:+420773892104" className="hover:text-black">+420 773 892 104</a>
              <div>
                <a href="https://wa.me/420773892104" target="_blank" rel="noopener noreferrer" className={`text-sm ${link}`}>
                  WhatsApp
                </a>
              </div>
            </dd>
          </div>
          <div>
            <dt className={label}>{t.contacts.emailTitle}</dt>
            <dd><a href="mailto:info@atelierluma.cz" className="hover:text-black">info@atelierluma.cz</a></dd>
          </div>
          <div>
            <dt className={label}>{language === 'cs' ? 'Jak se k nám dostat' : language === 'ru' ? 'Как добраться' : 'Getting here'}</dt>
            <dd className="text-sm text-stone-500 space-y-1">
              <p>{t.contacts.metroInfo}</p>
              <p>{t.contacts.parkingInfo}</p>
            </dd>
          </div>
        </dl>

        {/* Message form */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl text-stone-900 font-normal">{t.contacts.feedbackTitle}</h2>
          {isSubmitted ? (
            <div className="py-10 text-center space-y-4">
              <p className="font-serif text-2xl text-stone-900">
                {language === 'cs' ? 'Děkujeme!' : language === 'ru' ? 'Спасибо!' : 'Thank you!'}
              </p>
              <p className="text-sm text-stone-500">{t.contacts.formSuccess}</p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-sm text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 cursor-pointer"
              >
                {language === 'cs' ? 'Napsat znovu' : language === 'ru' ? 'Написать ещё' : 'Send another'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-stone-600 mb-1.5">
                    {t.contacts.formName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Anna Miller"
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm text-stone-600 mb-1.5">
                    {t.contacts.formEmail} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="anna@example.com"
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-stone-600 mb-1.5">
                    {t.contacts.formPhone}
                  </label>
                  <input
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+420 773 000 000"
                    className="w-full bg-white border border-[#E8E2D9] rounded-xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white"
                  />
                </div>

              </div>

              <div>
                <label className="block text-sm text-stone-600 mb-1.5">
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
                  className="w-full bg-white border border-[#E8E2D9] rounded-xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#1C1917] hover:bg-black text-[#FAF8F5] rounded-full text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer disabled:opacity-60"
              >
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

      <InteractiveMap />
    </div>
  );
};
