export type Language = 'cs' | 'en' | 'ru';

export interface TranslationDictionary {
  brandName: string;
  tagline: string;
  nav: {
    home: string;
    services: string;
    gallery: string;
    booking: string;
    team: string;
    contacts: string;
  };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    bookCta: string;
    viewGalleryCta: string;
    features: {
      location: string;
      premium: string;
      multilingual: string;
    };
  };
  services: {
    title: string;
    subtitle: string;
    categories: {
      all: string;
      hair: string;
      nails: string;
      face: string;
      brows: string;
    };
    durationMin: string;
    bookNow: string;
    currency: string;
    included: string;
    filterSearch: string;
  };
  gallery: {
    title: string;
    subtitle: string;
    instaTag: string;
    syncButton: string;
    syncSuccess: string;
    lastSynced: string;
    filterAll: string;
    openInInsta: string;
    viewsCount: string;
  };
  booking: {
    title: string;
    subtitle: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    selectService: string;
    selectMaster: string;
    anyMaster: string;
    selectDate: string;
    selectTime: string;
    contactInfo: string;
    fullName: string;
    phone: string;
    email: string;
    notes: string;
    notesPlaceholder: string;
    confirmBooking: string;
    successTitle: string;
    successMessage: string;
    bookingSummary: string;
    date: string;
    time: string;
    specialist: string;
    total: string;
    downloadCalendar: string;
    newBooking: string;
    validationError: string;
  };
  team: {
    title: string;
    subtitle: string;
    experience: string;
    languages: string;
    bookWith: string;
  };
  contacts: {
    title: string;
    subtitle: string;
    addressTitle: string;
    addressValue: string;
    hoursTitle: string;
    hoursWeek: string;
    hoursSun: string;
    phoneTitle: string;
    emailTitle: string;
    transportTitle: string;
    metroInfo: string;
    tramInfo: string;
    parkingInfo: string;
    feedbackTitle: string;
    feedbackSubtitle: string;
    formName: string;
    formEmail: string;
    formPhone: string;
    formSubject: string;
    formMessage: string;
    formSubmit: string;
    formSuccess: string;
    mapOpenDirections: string;
  };
  chat: {
    launcherText: string;
    headerTitle: string;
    headerSubtitle: string;
    inputPlaceholder: string;
    send: string;
    welcomeMessage: string;
    quickPrompts: string[];
    suggestBooking: string;
    thinking: string;
  };
  footer: {
    desc: string;
    quickLinks: string;
    workingHours: string;
    rights: string;
    privacy: string;
    terms: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  cs: {
    brandName: "ATELIER LUMA",
    tagline: "Estetický salon v srdci Královských Vinohrad",
    nav: {
      home: "Úvod",
      services: "Služby",
      gallery: "Galerie",
      booking: "Online Rezervace",
      team: "Náš Tým",
      contacts: "Kontakty"
    },
    hero: {
      badge: "Praha 2 • Vinohrady",
      title1: "Čistá elegance.",
      title2: "Vaše přirozená krása.",
      subtitle: "Minimalistický prostor věnovaný vlasovému stylingu, precizní manikúře a hloubkové péči o pleť.",
      bookCta: "Rezervovat termín",
      viewGalleryCta: "Prohlédnout portfolio",
      features: {
        location: "Vinohradská 114, Praha 2",
        premium: "Špičková péče Davines & Biologique Recherche",
        multilingual: "Mluvíme česky, anglicky i rusky"
      }
    },
    services: {
      title: "Služby & Ceník",
      subtitle: "Transparentní ceny bez skrytých poplatků. Výběrová kosmetika a individuální přístup.",
      categories: {
        all: "Všechny služby",
        hair: "Vlasy & Barvení",
        nails: "Manikúra & Pedikúra",
        face: "Péče o pleť",
        brows: "Obočí & Řasy"
      },
      durationMin: "min",
      bookNow: "Rezervovat",
      currency: "Kč",
      included: "V ceně je zahrnuta konzultace a prémiová péče",
      filterSearch: "Vyhledat službu..."
    },
    gallery: {
      title: "Portfolio & Živý Instagram",
      subtitle: "Reálné práce našich stylistů. Galerie se automaticky synchronizuje s naším profilem.",
      instaTag: "@atelier.luma.prague",
      syncButton: "Aktualizovat z Instagramu",
      syncSuccess: "Galerie byla úspěšně synchronizována s Instagramem",
      lastSynced: "Poslední synchronizace: právě teď",
      filterAll: "Vše",
      openInInsta: "Otevřít na Instagramu",
      viewsCount: "zhlédnutí"
    },
    booking: {
      title: "Online Rezervace",
      subtitle: "Zvolte si požadovanou službu, mistra a termín. Během 1 minuty máte rezervaci potvrzenou.",
      step1: "1. Výběr služby",
      step2: "2. Výběr specialisty",
      step3: "3. Datum a čas",
      step4: "4. Vaše údaje",
      selectService: "Vyberte službu",
      selectMaster: "Vyberte specialistu",
      anyMaster: "Kterýkoliv volný mistr",
      selectDate: "Vyberte datum",
      selectTime: "Dostupné časy",
      contactInfo: "Kontaktní údaje pro potvrzení",
      fullName: "Jméno a příjmení",
      phone: "Telefonní číslo",
      email: "E-mail pro potvrzení",
      notes: "Poznámka (nepovinné)",
      notesPlaceholder: "Alergie, speciální přání, předchozí barvení...",
      confirmBooking: "Potvrdit rezervaci",
      successTitle: "Rezervace byla úspěšně potvrzena!",
      successMessage: "Poslali jsme potvrzení a detailní informace na váš e-mail a SMS.",
      bookingSummary: "Shrnutí termínu",
      date: "Datum",
      time: "Čas",
      specialist: "Mistr",
      total: "Celková cena",
      downloadCalendar: "Přidat do kalendáře (.ics)",
      newBooking: "Nová rezervace",
      validationError: "Prosím vyplňte všechna povinná pole."
    },
    team: {
      title: "Náš Tým Specialistů",
      subtitle: "Zkušení mistři s mezinárodní praxí v Praze, Paříži a Miláně.",
      experience: "Praxe",
      languages: "Jazyky",
      bookWith: "Objednat se k mistrovi"
    },
    contacts: {
      title: "Kde nás najdete",
      subtitle: "Klidná oáza na Vinohradech, pár kroků od metra Jiřího z Poděbrad a Náměstí Míru.",
      addressTitle: "Adresa salonu",
      addressValue: "Vinohradská 114, 130 00 Praha 2 - Vinohrady",
      hoursTitle: "Otevírací doba",
      hoursWeek: "Pondělí – Sobota: 09:00 – 20:00",
      hoursSun: "Neděle: 10:00 – 18:00 (na objednání)",
      phoneTitle: "Telefon / WhatsApp",
      emailTitle: "E-mail",
      transportTitle: "Dopravní dostupnost",
      metroInfo: "Metro A: Jiřího z Poděbrad (2 minuty pěšky) nebo Náměstí Míru (6 minut)",
      tramInfo: "Tramvaje 11, 13, 10, 16 (zastávka Radhošťská nebo Jiřího z Poděbrad)",
      parkingInfo: "Parkování: Fialová zóna přímo před salonem (snadná platba v aplikaci ParkSimply / EasyPark)",
      feedbackTitle: "Napište nám",
      feedbackSubtitle: "Máte dotaz nebo přání? Ozveme se vám do 30 minut.",
      formName: "Vaše jméno",
      formEmail: "Váš e-mail",
      formPhone: "Telefon",
      formSubject: "Téma zprávy",
      formMessage: "Zpráva",
      formSubmit: "Odeslat zprávu",
      formSuccess: "Děkujeme! Vaše zpráva byla odeslána. Brzy vás budeme kontaktovat.",
      mapOpenDirections: "Navigovat do salonu (Google Maps)"
    },
    chat: {
      launcherText: "Asistent salonu online",
      headerTitle: "Aura Concierge",
      headerSubtitle: "Odpovídám v reálném čase • Čeština, English, Русский",
      inputPlaceholder: "Zeptejte se na ceny, volné termíny, doporučení...",
      send: "Odeslat",
      welcomeMessage: "Dobrý den! Jsem online asistent Atelier Luma v Praze. Mohu vám pomoci s výběrem služby, ověřením volného termínu nebo navigací do salonu. Jak vám mohu pomoci?",
      quickPrompts: [
        "Kolik stojí Airtouch?",
        "Jak dlouho trvají procedury?",
        "Kde přesně na Vinohradech sídlíte?",
        "Jaký je nejbližší volný termín?"
      ],
      suggestBooking: "Přejít k online rezervaci",
      thinking: "Asistent přemýšlí..."
    },
    footer: {
      desc: "Prémiový salon krásy na Vinohradech. Precizní řemeslo, minimalistická estetika a atmosféra klidu.",
      quickLinks: "Rychlé odkazy",
      workingHours: "Otevírací doba",
      rights: "Všechna práva vyhrazena.",
      privacy: "Zásady ochrany osobních údajů",
      terms: "Obchodní podmínky"
    }
  },

  en: {
    brandName: "ATELIER LUMA",
    tagline: "Aesthetic Atelier in the Heart of Vinohrady, Prague",
    nav: {
      home: "Home",
      services: "Services",
      gallery: "Gallery",
      booking: "Book Online",
      team: "Team",
      contacts: "Contacts"
    },
    hero: {
      badge: "Prague 2 • Vinohrady",
      title1: "Quiet luxury.",
      title2: "Your authentic radiance.",
      subtitle: "A minimalist sanctuary dedicated to effortless hair styling, precision Russian manicure, and restorative skin aesthetics.",
      bookCta: "Book Appointment",
      viewGalleryCta: "View Portfolio",
      features: {
        location: "Vinohradská 114, Prague 2",
        premium: "Curated Davines & Biologique Recherche rituals",
        multilingual: "English, Czech & Russian spoken fluently"
      }
    },
    services: {
      title: "Services & Price List",
      subtitle: "Clear, transparent pricing in CZK. Exceptional products with an unhurried, tailored approach.",
      categories: {
        all: "All Services",
        hair: "Hair & Color",
        nails: "Manicure & Pedicure",
        face: "Skin Aesthetics",
        brows: "Brows & Lashes"
      },
      durationMin: "min",
      bookNow: "Book Now",
      currency: "CZK",
      included: "Includes personal consultation and luxury care wash",
      filterSearch: "Search service..."
    },
    gallery: {
      title: "Works & Live Instagram Feed",
      subtitle: "Actual work by our resident artists. Automatically synchronized with our Instagram feed.",
      instaTag: "@atelier.luma.prague",
      syncButton: "Sync with Instagram",
      syncSuccess: "Gallery freshly synchronized with live Instagram stream",
      lastSynced: "Last synced: just now",
      filterAll: "All",
      openInInsta: "Open on Instagram",
      viewsCount: "views"
    },
    booking: {
      title: "Online Reservation",
      subtitle: "Select your desired treatment, artist, and preferred time slot. Instant booking confirmed in 60 seconds.",
      step1: "1. Service",
      step2: "2. Master",
      step3: "3. Date & Time",
      step4: "4. Details",
      selectService: "Choose a service",
      selectMaster: "Select a specialist",
      anyMaster: "First available specialist",
      selectDate: "Select date",
      selectTime: "Available slots",
      contactInfo: "Contact details for confirmation",
      fullName: "Full Name",
      phone: "Phone Number",
      email: "Email Address",
      notes: "Notes / Special Requests",
      notesPlaceholder: "Allergies, previous color history, preferences...",
      confirmBooking: "Confirm Reservation",
      successTitle: "Appointment Confirmed!",
      successMessage: "We have sent your confirmation receipt and visit details via email and SMS.",
      bookingSummary: "Booking Overview",
      date: "Date",
      time: "Time",
      specialist: "Specialist",
      total: "Total Price",
      downloadCalendar: "Add to Calendar (.ics)",
      newBooking: "Book Another Service",
      validationError: "Please complete all required fields."
    },
    team: {
      title: "Resident Artists",
      subtitle: "Passionate professionals with master certifications from Prague, Paris, and Milan.",
      experience: "Experience",
      languages: "Languages",
      bookWith: "Book with Artist"
    },
    contacts: {
      title: "Find Our Sanctuary",
      subtitle: "Located on prestigious Vinohrady, minutes away from Jiřího z Poděbrad and Náměstí Míru.",
      addressTitle: "Studio Address",
      addressValue: "Vinohradská 114, 130 00 Prague 2 - Vinohrady",
      hoursTitle: "Studio Hours",
      hoursWeek: "Monday – Saturday: 09:00 – 20:00",
      hoursSun: "Sunday: 10:00 – 18:00 (by appointment)",
      phoneTitle: "Phone / WhatsApp",
      emailTitle: "Email",
      transportTitle: "How to Arrive",
      metroInfo: "Metro Line A: Jiřího z Poděbrad (2 min walk) or Náměstí Míru (6 min walk)",
      tramInfo: "Trams 11, 13, 10, 16 (Station: Radhošťská or Jiřího z Poděbrad)",
      parkingInfo: "Parking: Purple zone directly in front of salon (easy pay via EasyPark app)",
      feedbackTitle: "Send a Message",
      feedbackSubtitle: "Questions or custom requests? We usually respond within 30 minutes.",
      formName: "Your Name",
      formEmail: "Your Email",
      formPhone: "Phone",
      formSubject: "Subject",
      formMessage: "Message",
      formSubmit: "Send Message",
      formSuccess: "Thank you! Your message has been sent. We'll be in touch shortly.",
      mapOpenDirections: "Navigate via Google Maps"
    },
    chat: {
      launcherText: "Concierge Online",
      headerTitle: "Aura Concierge",
      headerSubtitle: "Live Beauty Assistant • Multilingual",
      inputPlaceholder: "Ask about prices, available slots, parking, or advice...",
      send: "Send",
      welcomeMessage: "Welcome to Atelier Luma Prague! I am your real-time salon concierge. Looking for pricing, available slots today, or treatment recommendations? How may I assist you?",
      quickPrompts: [
        "How much is Airtouch coloring?",
        "How long do treatments take?",
        "Where can I park nearby?",
        "Any openings this weekend?"
      ],
      suggestBooking: "Go to Online Booking",
      thinking: "Concierge is typing..."
    },
    footer: {
      desc: "Minimalist luxury atelier in Prague Vinohrady. Masterful craft, calm aesthetics, and heartfelt care.",
      quickLinks: "Navigation",
      workingHours: "Hours",
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service"
    }
  },

  ru: {
    brandName: "ATELIER LUMA",
    tagline: "Эстетическое пространство красоты в Праге • Винограды",
    nav: {
      home: "Главная",
      services: "Услуги",
      gallery: "Галерея",
      booking: "Онлайн-запись",
      team: "Мастера",
      contacts: "Контакты"
    },
    hero: {
      badge: "Прага 2 • Винограды",
      title1: "Тихая роскошь.",
      title2: "Ваша естественная красота.",
      subtitle: "Минималистичное пространство в Праге: сложное окрашивание, аппаратный маникюр, ламинирование и профессиональный уход за кожей.",
      bookCta: "Записаться онлайн",
      viewGalleryCta: "Смотреть работы",
      features: {
        location: "Vinohradská 114, Praha 2",
        premium: "Премиальная косметика Davines & Biologique",
        multilingual: "Обслуживаем на русском, чешском и английском"
      }
    },
    services: {
      title: "Прайс-лист и Услуги",
      subtitle: "Честные фиксированные цены в CZK. Премиальные материалы и бережный индивидуальный подход.",
      categories: {
        all: "Все услуги",
        hair: "Волосы и Окрашивание",
        nails: "Маникюр и Педикюр",
        face: "Косметология и Уход",
        brows: "Брови и Ресницы"
      },
      durationMin: "мин",
      bookNow: "Записаться",
      currency: "Kč",
      included: "Включает мытье головы, уход и индивидуальную консультацию",
      filterSearch: "Поиск услуги..."
    },
    gallery: {
      title: "Галерея работ и Instagram",
      subtitle: "Реальные работы наших топ-мастеров. Лента автоматически синхронизируется с Instagram-аккаунтом.",
      instaTag: "@atelier.luma.prague",
      syncButton: "Обновить из Instagram",
      syncSuccess: "Лента успешно обновлена из Instagram",
      lastSynced: "Синхронизировано: только что",
      filterAll: "Все",
      openInInsta: "Открыть в Instagram",
      viewsCount: "просмотров"
    },
    booking: {
      title: "Онлайн-запись",
      subtitle: "Выберите желаемую услугу, мастера и удобное время. Моментальное подтверждение за 1 минуту.",
      step1: "1. Услуга",
      step2: "2. Специалист",
      step3: "3. Дата и время",
      step4: "4. Ваши данные",
      selectService: "Выберите услугу",
      selectMaster: "Выберите мастера",
      anyMaster: "Любой свободный мастер",
      selectDate: "Выберите дату",
      selectTime: "Свободное время",
      contactInfo: "Контактные данные для записи",
      fullName: "Имя и Фамилия",
      phone: "Номер телефона",
      email: "E-mail для подтверждения",
      notes: "Пожелания (необязательно)",
      notesPlaceholder: "История предыдущих окрашиваний, аллергии, пожелания к чаю/кофе...",
      confirmBooking: "Подтвердить запись",
      successTitle: "Запись успешно подтверждена!",
      successMessage: "Мы отправили квитанцию и подробности визита на ваш e-mail и по SMS.",
      bookingSummary: "Детали вашей записи",
      date: "Дата",
      time: "Время",
      specialist: "Мастер",
      total: "Итоговая стоимость",
      downloadCalendar: "Добавить в календарь (.ics)",
      newBooking: "Записаться на другую услугу",
      validationError: "Пожалуйста, заполните все обязательные поля."
    },
    team: {
      title: "Команда мастеров",
      subtitle: "Опытные специалисты с международным опытом и сертификатами ведущих академий Европы.",
      experience: "Опыт работы",
      languages: "Языки",
      bookWith: "Записаться к мастеру"
    },
    contacts: {
      title: "Контакты и Локация",
      subtitle: "Уютный салон на Виноградах в 2 минутах от метро Jiřího z Poděbrad.",
      addressTitle: "Адрес студии",
      addressValue: "Vinohradská 114, 130 00 Praha 2 - Vinohrady",
      hoursTitle: "График работы",
      hoursWeek: "Понедельник – Суббота: 09:00 – 20:00",
      hoursSun: "Воскресенье: 10:00 – 18:00 (по записи)",
      phoneTitle: "Телефон / WhatsApp",
      emailTitle: "E-mail",
      transportTitle: "Как добраться",
      metroInfo: "Метро Линия A: станция Jiřího z Poděbrad (2 мин пешком) или Náměstí Míru (6 мин)",
      tramInfo: "Трамваи 11, 13, 10, 16 (остановка Radhošťská или Jiřího z Poděbrad)",
      parkingInfo: "Парковка: Фиолетовая зона прямо перед входом (оплата через приложение ParkSimply)",
      feedbackTitle: "Форма обратной связи",
      feedbackSubtitle: "Есть вопрос или хотите индивидуальную консультацию? Мы ответим в течение 30 минут.",
      formName: "Ваше имя",
      formEmail: "Ваш e-mail",
      formPhone: "Телефон",
      formSubject: "Тема обращения",
      formMessage: "Сообщение",
      formSubmit: "Отправить сообщение",
      formSuccess: "Спасибо! Ваше сообщение отправлено. Администратор свяжется с вами в ближайшее время.",
      mapOpenDirections: "Открыть маршрут в Google Maps"
    },
    chat: {
      launcherText: "Онлайн-консьерж",
      headerTitle: "Aura Concierge",
      headerSubtitle: "Чат-бот в реальном времени • RU / EN / CS",
      inputPlaceholder: "Спросите про стоимость, свободные окна, парковку...",
      send: "Отправить",
      welcomeMessage: "Здравствуйте! Я виртуальный консьерж салона Atelier Luma в Праге. Помогу сориентироваться по ценам, подобрать процедуру или свободное время. Чем могу помочь?",
      quickPrompts: [
        "Сколько стоит сложное окрашивание Airtouch?",
        "Сколько длятся процедуры?",
        "Где находится ваш салон?",
        "Есть ли свободные окошки на маникюр?"
      ],
      suggestBooking: "Перейти к онлайн-записи",
      thinking: "Печатает ответ..."
    },
    footer: {
      desc: "Минималистичное бьюти-пространство в Праге (Винограды). Высокая культура сервиса, премиальные бренды и гармония.",
      quickLinks: "Навигация",
      workingHours: "Часы работы",
      rights: "Все права защищены.",
      privacy: "Политика конфиденциальности",
      terms: "Правила посещения"
    }
  }
};
