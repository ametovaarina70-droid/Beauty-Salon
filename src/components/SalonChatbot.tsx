import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Calendar, Clock, MapPin, ChevronRight, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SALON_SERVICES, SALON_MASTERS } from '../data/salonData';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestedAction?: {
    type: 'booking' | 'page';
    label: string;
    target?: string;
  };
}

interface SalonChatbotProps {
  onNavigateToBooking: (serviceId?: string) => void;
  onNavigateToPage?: (page: string) => void;
}

export const SalonChatbot: React.FC<SalonChatbotProps> = ({
  onNavigateToBooking,
  onNavigateToPage
}) => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message when language changes
  useEffect(() => {
    const welcomeText = t.chat.welcomeMessage;
    setMessages([
      {
        id: 'welcome-msg',
        sender: 'bot',
        text: welcomeText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedAction: {
          type: 'booking',
          label: t.chat.suggestBooking
        }
      }
    ]);
  }, [language, t.chat.welcomeMessage, t.chat.suggestBooking]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
    }
  }, [messages, isOpen]);

  // Deep Knowledge Base Fallback Engine for exact/precise questions
  const getSemanticFallbackResponse = (userPrompt: string): { text: string; action?: { type: 'booking' | 'page'; label: string; target?: string } } => {
    const q = userPrompt.toLowerCase();

    // 0. Address, Location & How to find us
    if (
      q.includes('где') ||
      q.includes('адрес') ||
      q.includes('находит') ||
      q.includes('локаци') ||
      q.includes('добрат') ||
      q.includes('улиц') ||
      q.includes('район') ||
      q.includes('where') ||
      q.includes('address') ||
      q.includes('location') ||
      q.includes('locate') ||
      q.includes('kde') ||
      q.includes('adresa')
    ) {
      if (language === 'cs') {
        return {
          text: 'Náš salon Atelier Luma sídlí na adrese:\n📍 Vinohradská 114, 130 00 Praha 2 – Královské Vinohrady.\n\n• Metro: linka A – stanice Jiřího z Poděbrad (2 minuty chůze) nebo Náměstí Míru (6 minut).\n• Tramvaje: 11, 13, 10, 16 (zastávka Radhošťská nebo Jiřího z Poděbrad).\n• Vstup: Přízemí, výloha přímo do ulice Vinohradská.',
          action: { type: 'page', label: 'Zobrazit na mapě', target: 'contacts' }
        };
      } else if (language === 'ru') {
        return {
          text: 'Наш салон Atelier Luma находится по адресу:\n📍 Vinohradská 114, 130 00 Praha 2 – Винограды.\n\n• Метро: Линия A – станция Jiřího z Poděbrad (2 минуты пешком) или Náměstí Míru (6 минут).\n• Трамваи: 11, 13, 10, 16 (остановка Radhošťská или Jiřího z Poděbrad).\n• Вход: 1 этаж, отдельный вход и витрина прямо с улицы Vinohradská.',
          action: { type: 'page', label: 'Открыть карту и контакты', target: 'contacts' }
        };
      } else {
        return {
          text: 'Atelier Luma is located at:\n📍 Vinohradská 114, 130 00 Prague 2 – Vinohrady.\n\n• Metro: Line A – Jiřího z Poděbrad station (2 min walk) or Náměstí Míru (6 min walk).\n• Trams: 11, 13, 10, 16 (station Radhošťská or Jiřího z Poděbrad).\n• Entrance: Ground floor storefront directly on Vinohradská street.',
          action: { type: 'page', label: 'View on Map', target: 'contacts' }
        };
      }
    }

    // 0.1 Opening Hours & Schedule
    if (
      q.includes('час') ||
      q.includes('врем') ||
      q.includes('график') ||
      q.includes('когда открыт') ||
      q.includes('когда работа') ||
      q.includes('hour') ||
      q.includes('schedule') ||
      q.includes('open') ||
      q.includes('otevírací') ||
      q.includes('otevřeno')
    ) {
      if (language === 'cs') {
        return {
          text: 'Otevírací doba Atelier Luma:\n• Pondělí – Sobota: 09:00 – 20:00\n• Neděle: 10:00 – 18:00 (na objednání)',
          action: { type: 'booking', label: 'Rezervovat termín' }
        };
      } else if (language === 'ru') {
        return {
          text: 'График работы салона Atelier Luma:\n• Понедельник – Суббота: 09:00 – 20:00\n• Воскресенье: 10:00 – 18:00 (по предварительной записи)',
          action: { type: 'booking', label: 'Записаться онлайн' }
        };
      } else {
        return {
          text: 'Atelier Luma opening hours:\n• Monday – Saturday: 09:00 – 20:00\n• Sunday: 10:00 – 18:00 (by appointment)',
          action: { type: 'booking', label: 'Book Appointment' }
        };
      }
    }

    // 0.2 Contacts, Phone, WhatsApp, Email
    if (
      q.includes('телефон') ||
      q.includes('номер') ||
      q.includes('whatsapp') ||
      q.includes('ватсап') ||
      q.includes('инстаграм') ||
      q.includes('instagram') ||
      q.includes('почт') ||
      q.includes('email') ||
      q.includes('phone') ||
      q.includes('kontakt')
    ) {
      if (language === 'cs') {
        return {
          text: 'Kontakty Atelier Luma:\n• Telefon / WhatsApp: +420 773 892 104\n• E-mail: info@atelierluma.cz\n• Instagram: @atelier.luma.prague\n• Adresa: Vinohradská 114, Praha 2',
          action: { type: 'page', label: 'Otevřít kontakty', target: 'contacts' }
        };
      } else if (language === 'ru') {
        return {
          text: 'Контакты Atelier Luma:\n• Телефон / WhatsApp: +420 773 892 104\n• E-mail: info@atelierluma.cz\n• Instagram: @atelier.luma.prague\n• Адрес: Vinohradská 114, Praha 2 (Винограды)',
          action: { type: 'page', label: 'Открыть контакты', target: 'contacts' }
        };
      } else {
        return {
          text: 'Atelier Luma Contacts:\n• Phone / WhatsApp: +420 773 892 104\n• Email: info@atelierluma.cz\n• Instagram: @atelier.luma.prague\n• Address: Vinohradská 114, Prague 2',
          action: { type: 'page', label: 'View Contacts', target: 'contacts' }
        };
      }
    }

    // 0.3 Duration of Services (Длительность всех процедур)
    if (
      q.includes('длительн') ||
      q.includes('сколько времени') ||
      q.includes('сколько длит') ||
      q.includes('время процедур') ||
      q.includes('как долго') ||
      q.includes('duration') ||
      q.includes('how long') ||
      q.includes('trvání') ||
      q.includes('jak dlouho') ||
      q.includes('kolik času')
    ) {
      if (language === 'cs') {
        return {
          text: '⏳ Doba trvání jednotlivých procedur v Atelier Luma:\n\n💇‍♀️ VLASY & STYLING:\n• Airtouch Signature: 210 min (3,5–4 hodiny)\n• Balayage & Glaze: 180 min (3 hodiny)\n• Autorský střih & foukaná: 75 min (1 h 15 min)\n• Japonská kúra Tokio Inkarami: 90 min (1,5 hodiny)\n\n💅 NEHTY:\n• Přístrojová manikúra & gel lak: 90 min (1,5 hodiny)\n• Japonská manikúra P-Shine: 60 min (1 hodina)\n• Smart pedikúra disky: 80 min (1 h 20 min)\n\n✨ PÉČE O PLEŤ & OBOČÍ:\n• HydraFacial Deluxe: 75 min (1 h 15 min)\n• Skulpturální bukální masáž: 60 min (1 hodina)\n• Laminace & architektura obočí: 60 min (1 hodina)\n• Lash Lift & Keratin Botox: 60 min (1 hodina)',
          action: { type: 'booking', label: 'Rezervovat termín' }
        };
      } else if (language === 'ru') {
        return {
          text: '⏳ Длительность всех процедур в Atelier Luma:\n\n💇‍♀️ ВОЛОСЫ И СТРИЖКИ:\n• Сложное окрашивание Airtouch: 210 мин (3.5–4 часа)\n• Балаяж и глянцевое тонирование: 180 мин (3 часа)\n• Авторская стрижка и укладка: 75 мин (1 час 15 мин)\n• Японский уход Tokio Inkarami: 90 мин (1.5 часа)\n\n💅 МАНИКЮР И ПЕДИКЮР:\n• Аппаратный маникюр и гель-лак: 90 мин (1.5 часа)\n• Японский эко-маникюр P-Shine: 60 мин (1 час)\n• Smart-педикюр дисками и спа: 80 мин (1 час 20 мин)\n\n✨ КОСМЕТОЛОГИЯ И БРОВИ:\n• HydraFacial Deluxe сияние: 75 мин (1 час 15 мин)\n• Скульптурно-буккальный массаж: 60 мин (1 час)\n• Ламинирование и архитектура бровей: 60 мин (1 час)\n• Lash Lift и ботокс ресниц: 60 мин (1 час)',
          action: { type: 'booking', label: 'Выбрать время онлайн' }
        };
      } else {
        return {
          text: '⏳ Treatment Durations at Atelier Luma:\n\n💇‍♀️ HAIR & STYLING:\n• Airtouch Signature: 210 min (3.5 – 4 hours)\n• Balayage & Glaze: 180 min (3 hours)\n• Signature Cut & Blowout: 75 min (1 hr 15 min)\n• Tokio Inkarami Ritual: 90 min (1.5 hours)\n\n💅 NAILS:\n• Russian Manicure & Gel: 90 min (1.5 hours)\n• Japanese P-Shine: 60 min (1 hour)\n• Smart Disk Pedicure: 80 min (1 hr 20 min)\n\n✨ SKIN & BROWS:\n• HydraFacial Deluxe: 75 min (1 hr 15 min)\n• Sculptural Buccal Massage: 60 min (1 hour)\n• Brow Lamination & Tint: 60 min (1 hour)\n• Lash Lift & Keratin Botox: 60 min (1 hour)',
          action: { type: 'booking', label: 'Book Appointment' }
        };
      }
    }

    // 1. Pets / Dogs policy
    if (q.includes('dog') || q.includes('pet') || q.includes('собак') || q.includes('питомц') || q.includes('животн') || q.includes('pes') || q.includes('psa') || q.includes('pejsk')) {
      if (language === 'cs') {
        return {
          text: 'Ano, Atelier Luma je dog-friendly! Vašeho vychovaného pejska můžete vzít s sebou do salonního lounge. Rádi mu nabídneme čerstvou vodu i pamlsek.',
          action: { type: 'booking', label: 'Rezervovat termín' }
        };
      } else if (language === 'ru') {
        return {
          text: 'Да, наш салон полностью pet-friendly! Вы можете прийти с воспитанной собакой на поводке — в зоне ожидания мы с радостью предложим ей миску со свежей водой и лакомство.',
          action: { type: 'booking', label: 'Записаться онлайн' }
        };
      } else {
        return {
          text: 'Yes, Atelier Luma is proudly dog-friendly! You are very welcome to bring your well-behaved pet on a leash. We offer fresh water bowls and organic treats in our lounge.',
          action: { type: 'booking', label: 'Book Appointment' }
        };
      }
    }

    // 2. Cosmetics & Brands used (Davines, Biologique Recherche, Tokio Inkarami, Luxio)
    if (q.includes('brand') || q.includes('product') || q.includes('kosmetik') || q.includes('косметик') || q.includes('бренд') || q.includes('davines') || q.includes('biologique') || q.includes('tokio') || q.includes('luxio') || q.includes('краск') || q.includes('dye') || q.includes('barv')) {
      if (language === 'cs') {
        return {
          text: 'Pracujeme výhradně s prémiovou certifikovanou kosmetikou:\n• Vlasy & Barvy: Davines (Itálie, ekologická a veganská péče)\n• Hloubková kúra: Tokio Inkarami (Japonsko, fullerény)\n• Péče o pleť: Biologique Recherche (Francie)\n• Nehty: Luxio & Akzentz (Kanada, bezpečné 9-free složení)',
          action: { type: 'booking', label: 'Vybrat proceduru' }
        };
      } else if (language === 'ru') {
        return {
          text: 'Мы работаем исключительно с сертифицированными премиум-брендами:\n• Окрашивание и уход за волосами: Davines (Италия, эко-формулы без повреждения волос)\n• Реконструкция кортекса: Tokio Inkarami (Япония)\n• Косметология: Biologique Recherche (Франция)\n• Маникюр: Luxio & Akzentz (Канада, безопасная формула 9-free).',
          action: { type: 'booking', label: 'Выбрать услугу' }
        };
      } else {
        return {
          text: 'We exclusively formulate rituals using world-class certified care:\n• Hair Color & Care: Davines (Italy, clean sustainable luxury)\n• Hair Rebuilding: Tokio Inkarami (Japan, Nobel-prize fullerene technology)\n• Skin Aesthetics: Biologique Recherche (France)\n• Manicure & Pedicure: Luxio & Akzentz (Canada, 9-free pure gel).',
          action: { type: 'booking', label: 'Explore Services' }
        };
      }
    }

    // 3. Difference between Airtouch and Balayage
    if ((q.includes('airtouch') && q.includes('balayage')) || q.includes('разниц') || q.includes('rozdíl') || q.includes('difference')) {
      if (language === 'cs') {
        return {
          text: 'Rozdíl mezi technikami:\n• Airtouch Signature (4 800 Kč, 210 min): Vlasy se oddělují proudem vzduchu fénem. Přechod je mikroskopicky jemný, vydrží 6–9 měsíců bez nutnosti korekce odrostu.\n• Balayage (3 900 Kč, 180 min): Ruční malování pramenů štětcem vytvářející kontrastní sluneční odlesky s přirozenou hloubkou.',
          action: { type: 'booking', label: 'Rezervovat Airtouch', target: 'airtouch-signature' }
        };
      } else if (language === 'ru') {
        return {
          text: 'В чем ключевая разница:\n• Airtouch Signature (4 800 Kč, 210 мин): Прядки выдуваются потоком воздуха фена. Отрастание абсолютно незаметно, носка 6–9 месяцев без коррекции.\n• Балаяж (3 900 Kč, 180 мин): Техника свободной руки кистью, создает мягкие солнечные блики и объемную глубину.',
          action: { type: 'booking', label: 'Записаться на Airtouch', target: 'airtouch-signature' }
        };
      } else {
        return {
          text: 'Key differences:\n• Airtouch Signature (4,800 CZK, 210 min): Strands are separated with a precise hairdryer airflow. Extremely seamless regrowth, lasting 6–9 months without touch-ups.\n• Balayage (3,900 CZK, 180 min): Freehand surface painting for sun-kissed contrast and multi-dimensional depth.',
          action: { type: 'booking', label: 'Book Airtouch Signature', target: 'airtouch-signature' }
        };
      }
    }

    // 4. Exact haircut & blowout prices
    if (q.includes('střih') || q.includes('foukaná') || q.includes('стрижк') || q.includes('укладк') || q.includes('haircut') || q.includes('blowout')) {
      if (language === 'cs') {
        return {
          text: 'Autorský střih & foukaná stojí 1 650 Kč (75 min). Zahrnuje diagnostiku tvaru obličeje, mytí vlasů s maskou Davines a luxusní objemový styling. Provádí Art Director Tereza Nováková.',
          action: { type: 'booking', label: 'Rezervovat střih', target: 'editorial-cut-blowout' }
        };
      } else if (language === 'ru') {
        return {
          text: 'Авторская стрижка и объемная укладка стоит 1 650 Kč (~67 €, 75 мин). Включает мытье головы, уходовую маску Davines и стайлинг. Топ-мастер — арт-директор Тереза Новакова.',
          action: { type: 'booking', label: 'Записаться на стрижку', target: 'editorial-cut-blowout' }
        };
      } else {
        return {
          text: 'Signature Haircut & Volume Blowout is 1,650 CZK (~€67, 75 min). Includes anatomical facial mapping, Davines wash ritual and editorial styling directed by Tereza Nováková.',
          action: { type: 'booking', label: 'Book Haircut', target: 'editorial-cut-blowout' }
        };
      }
    }

    // 5. Tokio Inkarami
    if (q.includes('tokio') || q.includes('inkarami') || q.includes('регенерат') || q.includes('восстановлен') || q.includes('keratin')) {
      if (language === 'cs') {
        return {
          text: 'Japonská patentovaná kúra Tokio Inkarami stojí 2 400 Kč (90 min). Hloubkově regeneruje vazby v kortexu vlasů pomocí 6 typů keratinu a fullerénů. Vlasy jsou okamžitě pružné a lesklé.',
          action: { type: 'booking', label: 'Objednat Tokio Inkarami', target: 'tokio-inkarami-treatment' }
        };
      } else if (language === 'ru') {
        return {
          text: 'Японское восстановление волос Tokio Inkarami стоит 2 400 Kč (~98 €, 90 мин). Запатентованный многоступенчатый протокол с фуллеренами восстанавливает прочность поврежденных и осветленных волос на клеточном уровне.',
          action: { type: 'booking', label: 'Записаться на Tokio Inkarami', target: 'tokio-inkarami-treatment' }
        };
      } else {
        return {
          text: 'Tokio Inkarami Japanese treatment is 2,400 CZK (~€98, 90 min). Patented 4-step keratin reconstruction with Nobel-prize fullerenes that instantly restores bleached and heat-damaged hair.',
          action: { type: 'booking', label: 'Book Tokio Inkarami', target: 'tokio-inkarami-treatment' }
        };
      }
    }

    // 6. Japanese manicure P-Shine
    if (q.includes('p-shine') || q.includes('pshine') || q.includes('japonsk') || q.includes('японск') || q.includes('japanese')) {
      if (language === 'cs') {
        return {
          text: 'Japonská eko-manikúra P-Shine stojí 990 Kč (60 min). Do nehtového lůžka se zaleští včelí vosk, křemík a vitamíny. Vytváří přirozený perleťový lesk bez laku a zpevňuje slabé nehty.',
          action: { type: 'booking', label: 'Rezervovat P-Shine', target: 'japanese-manicure-pshine' }
        };
      } else if (language === 'ru') {
        return {
          text: 'Японский эко-маникюр P-Shine стоит 990 Kč (~40 €, 60 мин). В пластину втирается пчелиный воск, кремний и витамины. Без лака, дает стойкий натуральный перламутровый глянец и укрепляет ногти.',
          action: { type: 'booking', label: 'Записаться на P-Shine', target: 'japanese-manicure-pshine' }
        };
      } else {
        return {
          text: 'Japanese P-Shine organic manicure is 990 CZK (~€40, 60 min). Sealing bee wax, mineral earth, and vitamins directly into the natural nail bed for lasting pearl shine without polish.',
          action: { type: 'booking', label: 'Book P-Shine', target: 'japanese-manicure-pshine' }
        };
      }
    }

    // 7. Parking specifics & Sunday parking
    if (q.includes('park') || q.includes('парковк') || q.includes('fialov') || q.includes('зон') || q.includes('auto') || q.includes('машин')) {
      if (language === 'cs') {
        return {
          text: 'Parkování u salonu: Přímo před vchodem na Vinohradské je FIALOVÁ parkovací zóna pro návštěvníky.\n• Po–Pá: 30 Kč/hod (platba snadno v aplikaci ParkSimply nebo EasyPark)\n• V noci (20:00–08:00) a celou NEDĚLI: PARKOVÁNÍ ZDARMA!',
          action: { type: 'page', label: 'Zobrazit na mapě', target: 'contacts' }
        };
      } else if (language === 'ru') {
        return {
          text: 'Парковка возле салона:\n• Прямо перед входом на ул. Vinohradská находится ФИОЛЕТОВАЯ зона (30 Kč/час в будни через приложение ParkSimply).\n• В ночное время (с 20:00 до 08:00) и всё ВОСКРЕСЕНЬЕ парковка полностью БЕСПЛАТНАЯ!',
          action: { type: 'page', label: 'Посмотреть локацию', target: 'contacts' }
        };
      } else {
        return {
          text: 'Parking instructions:\n• Purple visitor parking zone located directly on Vinohradská in front of our entrance (30 CZK/hr Mon–Fri via ParkSimply or EasyPark app).\n• Completely FREE overnight (20:00 – 08:00) and all day on SUNDAY!',
          action: { type: 'page', label: 'View on Map', target: 'contacts' }
        };
      }
    }

    // 8. Masters specific inquiry (Elena Miller, Tereza, Sofia, Klara)
    if (q.includes('elena') || q.includes('miller') || q.includes('миллер') || q.includes('тереза') || q.includes('tereza') || q.includes('klara') || q.includes('клара') || q.includes('sofia') || q.includes('софия')) {
      if (language === 'cs') {
        return {
          text: 'Naši mistři:\n• Tereza Nováková: Art Director, střihy & Airtouch (11 let praxe, Vidal Sassoon Londýn)\n• Elena Miller: Přístrojová manikúra, P-Shine & obočí (7 let praxe)\n• Klára Dvořáková: Pleťová terapeutka, HydraFacial & Biologique Recherche (9 let praxe)\n• Sofia Volkova: Lash lift & laminace obočí (6 let praxe)',
          action: { type: 'page', label: 'Prohlédnout tým', target: 'team' }
        };
      } else if (language === 'ru') {
        return {
          text: 'Наши ведущие мастера:\n• Тереза Новакова: Арт-директор, Airtouch и авторские стрижки (11 лет опыта, Vidal Sassoon Лондон)\n• Елена Миллер: Аппаратный маникюр под кутикулу и брови (7 лет опыта)\n• Клара Дворжакова: Косметолог, HydraFacial и Biologique Recherche (9 лет опыта)\n• София Волкова: Lash lift и ламинирование ресниц (6 лет опыта)',
          action: { type: 'page', label: 'Познакомиться с мастерами', target: 'team' }
        };
      } else {
        return {
          text: 'Our Resident Artists:\n• Tereza Nováková: Art Director, Vidal Sassoon London graduate, Airtouch & precision cuts (11y exp)\n• Elena Miller: Lead Nail & Brow Artist, Russian e-file manicure (7y exp)\n• Klára Dvořáková: Aesthetician, Biologique Recherche & HydraFacial (9y exp)\n• Sofia Volkova: Lash Lift & Brow Stylist (6y exp)',
          action: { type: 'page', label: 'Meet the Team', target: 'team' }
        };
      }
    }

    // 9. Complimentary Drinks / Coffee / Prosecco
    if (q.includes('coffee') || q.includes('tea') || q.includes('prosecco') || q.includes('чай') || q.includes('кофе') || q.includes('напит') || q.includes('káva') || q.includes('matcha')) {
      if (language === 'cs') {
        return {
          text: 'Během každé návštěvy vám náš personál zdarma připraví výběrovou kávu od pražských pražíren (cappuccino, flat white), bio japonské matcha latte, sklenku italského Prosecca nebo bylinkový čaj.',
          action: { type: 'booking', label: 'Rezervovat návštěvu' }
        };
      } else if (language === 'ru') {
        return {
          text: 'Во время каждого визита мы с удовольствием угостим вас зерновым кофе (капучино, флэт уайт), органическим японским матча-латте, бокалом охлажденного Prosecco или премиальным листовым чаем бесплатно.',
          action: { type: 'booking', label: 'Записаться онлайн' }
        };
      } else {
        return {
          text: 'During every appointment, we serve complimentary specialty barista coffee (cappuccino, flat white), organic ceremonial matcha latte, chilled Prosecco, and artisan loose-leaf herbal teas.',
          action: { type: 'booking', label: 'Book Appointment' }
        };
      }
    }

    // 10. Cancellation & Reschedule policy
    if (q.includes('cancel') || q.includes('reschedul') || q.includes('отмен') || q.includes('перенес') || q.includes('zruš') || q.includes('změn')) {
      if (language === 'cs') {
        return {
          text: 'Storno podmínky: Rezervaci můžete bezplatně změnit nebo zrušit nejpozději 24 hodin před plánovaným termínem online nebo na tel. +420 773 892 104.',
          action: { type: 'page', label: 'Kontakty', target: 'contacts' }
        };
      } else if (language === 'ru') {
        return {
          text: 'Условия отмены: Вы можете бесплатно отменить или перенести запись минимум за 24 часа до визита через подтверждающее письмо или по телефону/WhatsApp +420 773 892 104.',
          action: { type: 'page', label: 'Контакты', target: 'contacts' }
        };
      } else {
        return {
          text: 'Cancellation policy: Appointments can be rescheduled or cancelled free of charge up to 24 hours prior to the session via email confirmation or via WhatsApp +420 773 892 104.',
          action: { type: 'page', label: 'Studio Contacts', target: 'contacts' }
        };
      }
    }

    // 11. Payment methods (Cards, Apple Pay, Cash)
    if (q.includes('pay') || q.includes('card') || q.includes('cash') || q.includes('platb') || q.includes('kart') || q.includes('hotov') || q.includes('оплат') || q.includes('карт') || q.includes('наличн')) {
      if (language === 'cs') {
        return {
          text: 'Přijímáme všechny platební metody: platební karty (Visa, Mastercard), Apple Pay, Google Pay, hotovost v CZK i EUR a okamžitý bankovní převod přes QR kód.',
          action: { type: 'booking', label: 'Rezervovat termín' }
        };
      } else if (language === 'ru') {
        return {
          text: 'Мы принимаем банковские карты (Visa, Mastercard), Apple Pay, Google Pay, наличные в кронах (CZK) и евро (EUR), а также мгновенные чешские QR-переводы.',
          action: { type: 'booking', label: 'Записаться онлайн' }
        };
      } else {
        return {
          text: 'We accept credit & debit cards (Visa, Mastercard), Apple Pay, Google Pay, cash in CZK & EUR, and instant Czech QR mobile bank transfers.',
          action: { type: 'booking', label: 'Book Appointment' }
        };
      }
    }

    // 12. General Airtouch
    if (q.includes('airtouch') || q.includes('zesvětlení') || q.includes('окрашиван') || q.includes('мелирован')) {
      if (language === 'cs') {
        return {
          text: 'Airtouch Signature (4 800 Kč, 210 min) je naše špičková technika s fénem. Vydrží 6–9 měsíců s neviditelným odrostem, vlasy si zachovávají lesk a jemnost. Provádí Tereza Nováková.',
          action: { type: 'booking', label: 'Objednat Airtouch', target: 'airtouch-signature' }
        };
      } else if (language === 'ru') {
        return {
          text: 'Сложное окрашивание Airtouch Signature (4 800 Kč, 210 мин, ~195 €). Бережный выдув феном, идеальный градиент, носка до 9 месяцев без коррекции корней.',
          action: { type: 'booking', label: 'Записаться на Airtouch', target: 'airtouch-signature' }
        };
      } else {
        return {
          text: 'Airtouch Signature Highlighting (4,800 CZK, 210 min, ~€195) uses air-blown feathering for seamless growth lasting 6–9 months without line demarcation.',
          action: { type: 'booking', label: 'Book Airtouch', target: 'airtouch-signature' }
        };
      }
    }

    // 13. Manicure / Nails
    if (q.includes('manik') || q.includes('pedik') || q.includes('neht') || q.includes('ногт') || q.includes('nail') || q.includes('gel')) {
      if (language === 'cs') {
        return {
          text: 'Nehtové služby:\n• Přístrojová manikúra & gel lak: 1 350 Kč (90 min)\n• Japonská manikúra P-Shine: 990 Kč (60 min)\n• Smart pedikúra disky & Spa: 1 650 Kč (80 min)\nTop specialistka: Elena Miller.',
          action: { type: 'booking', label: 'Rezervovat nehty', target: 'russian-manicure-gel' }
        };
      } else if (language === 'ru') {
        return {
          text: 'Ногтевой сервис:\n• Аппаратный маникюр и стойкий гель-лак: 1 350 Kč (90 мин)\n• Японский эко-маникюр P-Shine: 990 Kč (60 мин)\n• Smart-педикюр дисками и спа: 1 650 Kč (80 мин)\nМастер — Елена Миллер.',
          action: { type: 'booking', label: 'Записаться на маникюр', target: 'russian-manicure-gel' }
        };
      } else {
        return {
          text: 'Nail treatments:\n• Precision Russian Manicure & Gel: 1,350 CZK (90 min)\n• Japanese P-Shine Natural Manicure: 990 CZK (60 min)\n• Smart Disk Spa Pedicure: 1,650 CZK (80 min)\nLead artist: Elena Miller.',
          action: { type: 'booking', label: 'Book Manicure', target: 'russian-manicure-gel' }
        };
      }
    }

    // 14. Facial / Skincare
    if (q.includes('pleť') || q.includes('hydrafacial') || q.includes('obličej') || q.includes('кожа') || q.includes('лицо') || q.includes('массаж') || q.includes('skin') || q.includes('facial')) {
      if (language === 'cs') {
        return {
          text: 'Péče o obličej:\n• HydraFacial Deluxe Glow: 3 200 Kč (75 min, vortex čištění a peptidy)\n• Skulpturální bukální masáž: 1 850 Kč (60 min, okamžitý lifting)\nKosmetoložka: Klára Dvořáková.',
          action: { type: 'booking', label: 'Rezervovat péči o pleť', target: 'hydrafacial-glow' }
        };
      } else if (language === 'ru') {
        return {
          text: 'Уход за лицом:\n• HydraFacial Deluxe Radiance: 3 200 Kč (75 мин, глубокий вакуумный пилинг и пептиды)\n• Скульптурно-буккальный массаж: 1 850 Kč (60 мин, четкий контур лица)\nКосметолог — Клара Дворжакова.',
          action: { type: 'booking', label: 'Записаться на HydraFacial', target: 'hydrafacial-glow' }
        };
      } else {
        return {
          text: 'Facial aesthetics:\n• HydraFacial Deluxe Radiance: 3,200 CZK (75 min, vortex extraction & peptide serum)\n• Sculptural Buccal Facial Massage: 1,850 CZK (60 min, non-invasive contouring)\nTherapist: Klára Dvořáková.',
          action: { type: 'booking', label: 'Book Facial', target: 'hydrafacial-glow' }
        };
      }
    }

    // 15. General Price List inquiry
    if (q.includes('цен') || q.includes('прайс') || q.includes('стоимост') || q.includes('ceník') || q.includes('price') || q.includes('cost')) {
      if (language === 'cs') {
        return {
          text: 'Orientační ceník Atelier Luma:\n• Airtouch Signature: 4 800 Kč (210 min)\n• Balayage & Glaze: 3 900 Kč (180 min)\n• Střih & foukaná: 1 650 Kč (75 min)\n• Tokio Inkarami kúra: 2 400 Kč (90 min)\n• Přístrojová manikúra & gel: 1 350 Kč (90 min)\n• P-Shine japonská manikúra: 990 Kč (60 min)\n• Smart pedikúra: 1 650 Kč (80 min)\n• HydraFacial Deluxe: 3 200 Kč (75 min)\n• Laminace obočí: 1 250 Kč (60 min)',
          action: { type: 'page', label: 'Zobrazit celý ceník', target: 'services' }
        };
      } else if (language === 'ru') {
        return {
          text: 'Прайс-лист основных услуг Atelier Luma:\n• Airtouch Signature: 4 800 Kč (210 мин)\n• Балаяж & глянец: 3 900 Kč (180 мин)\n• Авторская стрижка и укладка: 1 650 Kč (75 мин)\n• Tokio Inkarami восстановление: 2 400 Kč (90 мин)\n• Аппаратный маникюр и гель-лак: 1 350 Kč (90 мин)\n• Японский маникюр P-Shine: 990 Kč (60 мин)\n• Smart-педикюр дисками: 1 650 Kč (80 мин)\n• HydraFacial Deluxe: 3 200 Kč (75 мин)\n• Ламинирование бровей: 1 250 Kč (60 мин)',
          action: { type: 'page', label: 'Открыть весь прайс-лист', target: 'services' }
        };
      } else {
        return {
          text: 'Atelier Luma Price Overview:\n• Airtouch Signature: 4,800 CZK (210 min)\n• Balayage & Glaze: 3,900 CZK (180 min)\n• Haircut & Blowout: 1,650 CZK (75 min)\n• Tokio Inkarami Ritual: 2,400 CZK (90 min)\n• Russian Manicure & Gel: 1,350 CZK (90 min)\n• Japanese P-Shine: 990 CZK (60 min)\n• Smart Pedicure: 1,650 CZK (80 min)\n• HydraFacial Deluxe: 3,200 CZK (75 min)\n• Brow Lamination: 1,250 CZK (60 min)',
          action: { type: 'page', label: 'View Full Menu', target: 'services' }
        };
      }
    }

    // Default polite comprehensive response
    if (language === 'cs') {
      return {
        text: 'V Atelier Luma poskytujeme precizní vlasový styling (Airtouch, střihy, Tokio Inkarami), přístrojovou manikúru, laminaci obočí a ošetření HydraFacial. Můžete se zeptat na konkrétní cenu, volný čas nebo přímo provést online rezervaci.',
        action: { type: 'booking', label: 'Online rezervace' }
      };
    } else if (language === 'ru') {
      return {
        text: 'В Atelier Luma (Прага, Винограды) мы специализируемся на сложном окрашивании Airtouch, чистом аппаратном маникюре, японском уходе Tokio Inkarami и процедурах HydraFacial. Вы можете задать любой точный вопрос или записаться онлайн за 1 минуту.',
        action: { type: 'booking', label: 'Записаться онлайн' }
      };
    } else {
      return {
        text: 'At Atelier Luma (Prague Vinohrady), we specialize in Airtouch highlighting, precision Russian manicures, Tokio Inkarami hair restoration, and HydraFacial therapies. Feel free to ask about any specific detail or book online directly.',
        action: { type: 'booking', label: 'Book Online' }
      };
    }
  };

  // Fast Bot Response Handler with instant semantic resolution and rapid API fallback
  const generateBotResponse = async (userPrompt: string): Promise<{ text: string; action?: { type: 'booking' | 'page'; label: string; target?: string } }> => {
    const q = userPrompt.toLowerCase().trim();

    // Check if the query is a recognized salon topic (prices, services, masters, parking, dogs, coffee, booking, hours)
    // If recognized, reply instantly without waiting for network roundtrips!
    const isKnownTopic =
      q.includes('airtouch') || q.includes('balayage') || q.includes('střih') || q.includes('стрижк') ||
      q.includes('haircut') || q.includes('manik') || q.includes('pedik') || q.includes('ногт') ||
      q.includes('nail') || q.includes('p-shine') || q.includes('pshine') || q.includes('tokio') ||
      q.includes('hydrafacial') || q.includes('pleť') || q.includes('лиц') || q.includes('face') ||
      q.includes('dog') || q.includes('собак') || q.includes('pes') || q.includes('pet') ||
      q.includes('coffee') || q.includes('кофе') || q.includes('matcha') || q.includes('чай') ||
      q.includes('prosecco') || q.includes('park') || q.includes('парковк') || q.includes('metro') ||
      q.includes('адрес') || q.includes('adresa') || q.includes('address') || q.includes('where') ||
      q.includes('где') || q.includes('kde') || q.includes('elena') || q.includes('тереза') ||
      q.includes('tereza') || q.includes('miller') || q.includes('мастер') || q.includes('cancel') ||
      q.includes('отмен') || q.includes('zruš') || q.includes('pay') || q.includes('card') ||
      q.includes('оплат') || q.includes('platb') || q.includes('цен') || q.includes('price') ||
      q.includes('ceník') || q.includes('kolik') || q.includes('сколько') || q.includes('how much') ||
      q.includes('brand') || q.includes('davines') || q.includes('biologique') || q.includes('косметик') ||
      q.includes('длительн') || q.includes('сколько времени') || q.includes('duration') || q.includes('trvání') || q.includes('dlouho');

    if (isKnownTopic) {
      // Natural micro-delay so the typing indicator feels human (180ms)
      await new Promise((resolve) => setTimeout(resolve, 180));
      return getSemanticFallbackResponse(userPrompt);
    }

    // For open-ended queries, query /api/chat with a tight 1.5s timeout
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1500);

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          message: userPrompt,
          language: language,
          conversationHistory: messages.slice(-4).map((m) => ({
            sender: m.sender,
            text: m.text,
          }))
        })
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data && data.text && typeof data.text === 'string' && data.text.trim()) {
          const lower = data.text.toLowerCase();
          let action: { type: 'booking' | 'page'; label: string; target?: string } | undefined = undefined;

          if (lower.includes('airtouch')) {
            action = { type: 'booking', label: t.chat.suggestBooking, target: 'airtouch-signature' };
          } else if (lower.includes('manik') || lower.includes('nail') || lower.includes('ногт')) {
            action = { type: 'booking', label: t.chat.suggestBooking, target: 'russian-manicure-gel' };
          } else if (lower.includes('hydrafacial') || lower.includes('pleť') || lower.includes('лиц')) {
            action = { type: 'booking', label: t.chat.suggestBooking, target: 'hydrafacial-glow' };
          } else if (lower.includes('rezerv') || lower.includes('book') || lower.includes('запис')) {
            action = { type: 'booking', label: t.chat.suggestBooking };
          }

          return { text: data.text, action };
        }
      }
    } catch {
      // Fallback seamlessly on timeout or error
    }

    return getSemanticFallbackResponse(userPrompt);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await generateBotResponse(messageContent);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedAction: response.action
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const fallback = getSemanticFallbackResponse(messageContent);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: fallback.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedAction: fallback.action
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating launcher button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#1C1917] text-[#FAF8F5] flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          aria-label={t.chat.launcherText}
          title={t.chat.launcherText}
        >
          <Sparkles className="w-5 h-5" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 sm:right-6 z-50 w-[calc(100vw-2.5rem)] sm:w-[420px] max-w-[440px] h-[580px] max-h-[85vh] bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#E8E2D9] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="px-5 py-4 bg-[#1C1917] text-[#FAF8F5] flex items-center justify-between border-b border-[#2E2A27]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E7DED3] text-[#1C1917] flex items-center justify-center font-serif text-lg font-bold shadow-inner">
                AL
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-base tracking-wide font-medium text-white">
                    {t.chat.headerTitle}
                  </h3>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    AI Concierge
                  </span>
                </div>
                <p className="text-[11px] text-stone-300">{t.chat.headerSubtitle}</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-4 py-2 bg-[#F3EFE9] border-b border-[#E8E2D9] overflow-x-auto flex gap-2 scrollbar-none">
            {t.chat.quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white text-stone-700 text-xs hover:bg-[#1C1917] hover:text-white transition border border-[#E5DFD5] shadow-xs cursor-pointer font-sans"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#1C1917] text-[#FAF8F5] rounded-br-xs'
                      : 'bg-white text-[#1C1917] border border-[#E8E2D9] shadow-xs rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Suggested Quick Action Button if any */}
                  {msg.suggestedAction && (
                    <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          if (msg.suggestedAction?.type === 'booking') {
                            onNavigateToBooking(msg.suggestedAction.target);
                            setIsOpen(false);
                          } else if (msg.suggestedAction?.type === 'page' && onNavigateToPage) {
                            onNavigateToPage(msg.suggestedAction.target || 'contacts');
                            setIsOpen(false);
                          }
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C7A6B] hover:text-[#1C1917] bg-[#F7F4EE] hover:bg-[#EAE4D9] px-3 py-1.5 rounded-lg transition cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{msg.suggestedAction.label}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-stone-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-stone-500 text-xs p-2">
                <div className="flex gap-1 items-center bg-white px-3 py-2 rounded-xl border border-[#E8E2D9]">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce [animation-delay:0.4s]" />
                </div>
                <span className="text-[11px] text-stone-400">{t.chat.thinking}</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-[#E8E2D9] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.chat.inputPlaceholder}
              className="flex-1 bg-[#F9F7F4] border border-[#E8E2D9] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-[#1C1917] focus:bg-white transition"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 bg-[#1C1917] text-white rounded-xl hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
              aria-label={t.chat.send}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
