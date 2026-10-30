export interface ServiceItem {
  id: string;
  category: 'hair' | 'nails' | 'face' | 'brows';
  name: {
    cs: string;
    en: string;
    ru: string;
  };
  description: {
    cs: string;
    en: string;
    ru: string;
  };
  durationMin: number;
  priceCZK: number;
  priceEUR: number;
  featured?: boolean;
  image: string;
}

export interface MasterSpecialist {
  id: string;
  name: string;
  role: {
    cs: string;
    en: string;
    ru: string;
  };
  experienceYears: number;
  languages: string[];
  photo: string;
  bio: {
    cs: string;
    en: string;
    ru: string;
  };
  specialties: string[];
}

export interface GalleryPost {
  id: string;
  image: string;
  caption: {
    cs: string;
    en: string;
    ru: string;
  };
  category: 'hair' | 'nails' | 'face' | 'brows';
  likes: number;
  comments: number;
  timestamp: string;
  isRecentSync?: boolean;
  instagramUrl: string;
}

export const SALON_SERVICES: ServiceItem[] = [
  // HAIR
  {
    id: 'airtouch-signature',
    category: 'hair',
    name: {
      cs: 'Airtouch Signature barvení',
      en: 'Airtouch Signature Highlighting',
      ru: 'Сложное окрашивание Airtouch Signature'
    },
    description: {
      cs: 'Exkluzivní technika přirozeného zesvětlení pomocí fénu. Hladký přechod u kořínků, vydrží 6–9 měsíců.',
      en: 'Gentle seamless air-blown highlighting technique. Extremely soft regrowth, lasts 6–9 months without touch-up.',
      ru: 'Премиальная техника выдува феном для максимально мягкого отрастания. Носка 6–9 месяцев без коррекции.'
    },
    durationMin: 210,
    priceCZK: 4800,
    priceEUR: 195,
    featured: true,
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'balayage-toning',
    category: 'hair',
    name: {
      cs: 'Balayage & Lesklé tónování',
      en: 'Balayage & Gloss Glaze',
      ru: 'Балаяж и глянцевое тонирование'
    },
    description: {
      cs: 'Měkké sluneční odlesky ve vlasech s hloubkovou péčí a kyselým tónováním pro maximální lesk.',
      en: 'Sun-kissed hand-painted highlights sealed with an acidic gloss treatment for mirror-like shine.',
      ru: 'Естественные солнечные переливы с уходом и безаммиачным тонированием для глубокого блеска.'
    },
    durationMin: 180,
    priceCZK: 3900,
    priceEUR: 158,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'editorial-cut-blowout',
    category: 'hair',
    name: {
      cs: 'Autorský střih & Foukaná',
      en: 'Signature Haircut & Volume Blowout',
      ru: 'Авторская стрижка и объемная укладка'
    },
    description: {
      cs: 'Střih přizpůsobený anatomii obličeje a struktuře vlasů. Mytí Davines a luxusní styling.',
      en: 'Precision haircut mapped to your facial symmetry and natural texture, finished with high-volume styling.',
      ru: 'Стрижка по анатомическим линиям лица и текстуре волос. Мытье Davines и фирменная укладка.'
    },
    durationMin: 75,
    priceCZK: 1650,
    priceEUR: 67,
    featured: true,
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'tokio-inkarami-treatment',
    category: 'hair',
    name: {
      cs: 'Japonská regenerace Tokio Inkarami',
      en: 'Tokio Inkarami Japanese Ritual',
      ru: 'Японское восстановление волос Tokio Inkarami'
    },
    description: {
      cs: 'Hloubková patentovaná obnova keratinových vazeb s fullerény. Navrací vlasům sílu a pružnost.',
      en: 'Patented multi-step keratin rebuilding infused with Nobel-prize fullerene technology. Reverses damage.',
      ru: 'Многоступенчатая реконструкция кортекса волос с фуллеренами. Возвращает плотность и шелк.'
    },
    durationMin: 90,
    priceCZK: 2400,
    priceEUR: 98,
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80'
  },

  // NAILS
  {
    id: 'russian-manicure-gel',
    category: 'nails',
    name: {
      cs: 'Přístrojová manikúra & Gel lak',
      en: 'Precision Russian Manicure & Gel',
      ru: 'Аппаратный маникюр и стойкое покрытие'
    },
    description: {
      cs: 'Čistá přístrojová úprava kutikuly, vyrovnání nehtové ploténky a aplikace barvy těsně pod kůžičku.',
      en: 'Flawless dry machine cuticle prep, rubber base reinforcement, and color application flush with the fold.',
      ru: 'Идеальная аппаратная обработка кутикулы, архитектурное выравнивание базой и покрытие под кутикулу.'
    },
    durationMin: 90,
    priceCZK: 1350,
    priceEUR: 55,
    featured: true,
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'japanese-manicure-pshine',
    category: 'nails',
    name: {
      cs: 'Japonská manikúra P-Shine',
      en: 'Japanese P-Shine Natural Manicure',
      ru: 'Японский эко-маникюр P-Shine'
    },
    description: {
      cs: 'Vyleštění přírodních nehtů včelím voskem a křemičitou hlinkou bez lakování pro perlový lesk.',
      en: 'Deep treatment sealing beeswax, diatomaceous earth, and vitamins directly into the natural nail bed.',
      ru: 'Экологичный уход с пчелиным воском и кремнием. Натуральный перламутровый блеск и укрепление.'
    },
    durationMin: 60,
    priceCZK: 990,
    priceEUR: 40,
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'smart-spa-pedicure',
    category: 'nails',
    name: {
      cs: 'Smart Pedikúra & Spa rituál',
      en: 'Smart Disk Pedicure & Spa Ritual',
      ru: 'Smart-педикюр дисками и Спа-ритуал'
    },
    description: {
      cs: 'Zrcadlová hladkost chodidel pomocí patentovaných Smart disků s molekulárním olejem.',
      en: 'Ultra-gentle rotating disc technique achieving baby-soft soles followed by hot towel herbal wrap.',
      ru: 'Аппаратная обработка стоп Smart-дисками и молекулярным маслом. Зеркальная гладкость до 4 недель.'
    },
    durationMin: 80,
    priceCZK: 1650,
    priceEUR: 67,
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80'
  },

  // FACE
  {
    id: 'hydrafacial-glow',
    category: 'face',
    name: {
      cs: 'HydraFacial Deluxe Glow',
      en: 'HydraFacial Deluxe Radiance',
      ru: 'HydraFacial Deluxe Глубокое сияние'
    },
    description: {
      cs: 'Vortex čištění, jemný peeling, hloubková extrakce a saturace pleti peptidy a kyselinou hyaluronovou.',
      en: '3-step vortex extraction, patented resurfacing peel, and intense antioxidant & peptide hydration.',
      ru: 'Вакуумный гидропилинг, глубокое очищение пор и насыщение кожи сыворотками с гиалуроновой кислотой.'
    },
    durationMin: 75,
    priceCZK: 3200,
    priceEUR: 130,
    featured: true,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sculpting-face-massage',
    category: 'face',
    name: {
      cs: 'Skulpturální bukální masáž obličeje',
      en: 'Sculptural Buccal Facial Massage',
      ru: 'Скульптурно-буккальный лифтинг-массаж'
    },
    description: {
      cs: 'Neinvazivní lifting obličeje, uvolnění svalových spasmů a modelace lícních kostí a čelisti.',
      en: 'Manual lifting ritual targeting deep facial muscle tension, sculpting cheekbones and jawline contour.',
      ru: 'Ручной лифтинг, снятие мышечных зажимов и четкий овал лица без инъекций. Мгновенный дренаж.'
    },
    durationMin: 60,
    priceCZK: 1850,
    priceEUR: 75,
    image: 'https://images.unsplash.com/photo-1512290900672-1f02e60473a2?auto=format&fit=crop&w=800&q=80'
  },

  // BROWS
  {
    id: 'brow-lamination-styling',
    category: 'brows',
    name: {
      cs: 'Laminace obočí & Architektura',
      en: 'Brow Lamination & Architecture',
      ru: 'Ламинирование и архитектура бровей'
    },
    description: {
      cs: 'Dlouhodobá fixace tvaru, barvení hybridní barvou a výživa keratinovým sérem pro plný nadýchaný efekt.',
      en: 'Fluffy directional setting, customized hybrid tinting, and botox keratin nourishment. Lasts 6 weeks.',
      ru: 'Долговременная укладка непослушных волосков, окрашивание стойким красителем и ботокс для питания.'
    },
    durationMin: 60,
    priceCZK: 1250,
    priceEUR: 51,
    featured: true,
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'lash-lift-keratin',
    category: 'brows',
    name: {
      cs: 'Lash Lift & Keratin Botox',
      en: 'Lash Lift & Keratin Botox',
      ru: 'Lash Lift & Кератиновый ботокс ресниц'
    },
    description: {
      cs: 'Elegantní natočení vlastních řas od kořínků, hluboké černé barvení a zahuštění keratinovou kůrou.',
      en: 'Natural lash lift from the root, saturated jet-black tint, and deep peptide conditioning.',
      ru: 'Эффект распахнутого взгляда: изящный завиток родных ресниц, глубокий черный цвет и утолщение.'
    },
    durationMin: 60,
    priceCZK: 1350,
    priceEUR: 55,
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80'
  }
];

export const SALON_MASTERS: MasterSpecialist[] = [
  {
    id: 'tereza-novakova',
    name: 'Tereza Nováková',
    role: {
      cs: 'Art Director & Senior Hair Stylist',
      en: 'Art Director & Senior Hair Stylist',
      ru: 'Арт-директор & Ведущий топ-стилист по волосам'
    },
    experienceYears: 11,
    languages: ['Čeština', 'English', 'Français'],
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    bio: {
      cs: 'Absolventka Vidal Sassoon Academy v Londýně. Specializuje se na techniky Airtouch a precizní geometrické střihy.',
      en: 'Vidal Sassoon London graduate. Specializes in seamless Airtouch and French effortless cuts.',
      ru: 'Выпускница академии Vidal Sassoon (Лондон). Эксперт сложных техник Airtouch и авторских стрижек.'
    },
    specialties: ['airtouch-signature', 'balayage-toning', 'editorial-cut-blowout', 'tokio-inkarami-treatment']
  },
  {
    id: 'elena-miller',
    name: 'Elena Miller',
    role: {
      cs: 'Top Nail Artist & Brow Specialist',
      en: 'Lead Nail Artist & Brow Specialist',
      ru: 'Топ-мастер маникюра и бровист'
    },
    experienceYears: 7,
    languages: ['Русский', 'English', 'Čeština'],
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    bio: {
      cs: 'Mistryně čisté přístrojové manikúry a architektury obočí. Důraz na sterilnost a zdraví přírodních nehtů.',
      en: 'Master of pristine dry Russian manicure and natural brow fluffiness. Dedicated to meticulous hygiene.',
      ru: 'Эксперт чистого аппаратного маникюра под кутикулу и естественной эстетики бровей. Перфекционист.'
    },
    specialties: ['russian-manicure-gel', 'japanese-manicure-pshine', 'smart-spa-pedicure', 'brow-lamination-styling']
  },
  {
    id: 'klara-dvorakova',
    name: 'Klára Dvořáková',
    role: {
      cs: 'Pleťový terapeut & Kosmetoložka',
      en: 'Aesthetician & Skin Therapist',
      ru: 'Косметолог-эстетист и спа-терапевт'
    },
    experienceYears: 9,
    languages: ['Čeština', 'English'],
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    bio: {
      cs: 'Odbornice na neinvazivní omlazení a hloubkovou péči Biologique Recherche a HydraFacial technologie.',
      en: 'Certified skin therapist specializing in non-invasive contouring and targeted clinical facials.',
      ru: 'Сертифицированный эксперт по уходовым протоколам Biologique Recherche и аппаратным процедурам.'
    },
    specialties: ['hydrafacial-glow', 'sculpting-face-massage']
  },
  {
    id: 'sofia-volkova',
    name: 'Sofia Volkova',
    role: {
      cs: 'Lash & Brow Stylist',
      en: 'Lash & Brow Stylist',
      ru: 'Стилист взгляда (ресницы & брови)'
    },
    experienceYears: 6,
    languages: ['Русский', 'English', 'Čeština'],
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    bio: {
      cs: 'Specializuje se na harmonické zvýraznění pohledu, laminaci řas a přírodní bio-tónování obočí.',
      en: 'Crafts bespoke eye aesthetics, emphasizing natural lash health and harmonized brow lines.',
      ru: 'Создает безупречный открытый взгляд. Деликатное ламинирование без заломов и сухости.'
    },
    specialties: ['brow-lamination-styling', 'lash-lift-keratin']
  }
];

export const INITIAL_GALLERY: GalleryPost[] = [
  {
    id: 'ig-post-1',
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1000&q=85',
    category: 'hair',
    caption: {
      cs: 'Airtouch Signature v odstínu perlový led. 4 hodiny precizní práce pro Terezu. #atelierluma #praguehair #airtouchprague',
      en: 'Airtouch Signature in Pearl Ice. 4 hours of pure precision craft. #atelierluma #praguehair #airtouchprague',
      ru: 'Фирменный Airtouch в холодном жемчужном оттенке. Мягкий переход и абсолютный шелк волос. #atelierluma #prague'
    },
    likes: 384,
    comments: 29,
    timestamp: '2h ago',
    instagramUrl: 'https://instagram.com/atelier.luma.prague'
  },
  {
    id: 'ig-post-2',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1000&q=85',
    category: 'nails',
    caption: {
      cs: 'Čistý minimalismus. Mléčná báze s mikro-třpytem a hloubková suchá manikúra. #nailsprague #vinohrady',
      en: 'Pure minimalism. Milky sheer base with subtle micro-shimmer and dry cuticle treatment. #nailsprague',
      ru: 'Минимализм вне времени: молочный нюд и безупречная чистота кутикулы. #маникюрпрага'
    },
    likes: 412,
    comments: 34,
    timestamp: '5h ago',
    instagramUrl: 'https://instagram.com/atelier.luma.prague'
  },
  {
    id: 'ig-post-3',
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=1000&q=85',
    category: 'brows',
    caption: {
      cs: 'Laminace obočí a hybridní tónování bez tmavých grafických linek. Přirozenost nade vše. #browprague',
      en: 'Feathery brow lamination & custom hybrid tint. No harsh lines, just natural grace. #browprague',
      ru: 'Воздушная ламинация бровей без эффекта прилизанности. Мягкий оттенок под тон корней. #бровипрага'
    },
    likes: 298,
    comments: 18,
    timestamp: '1d ago',
    instagramUrl: 'https://instagram.com/atelier.luma.prague'
  },
  {
    id: 'ig-post-4',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=85',
    category: 'face',
    caption: {
      cs: 'HydraFacial Glow protokol. Pleť vyčištěná, hydratovaná a zářící ještě před důležitým večerem v Rudolfinu. #facialsprague',
      en: 'HydraFacial Glow ritual results. Clean, plumped, radiant skin ready for Prague Philharmonic gala. #facialsprague',
      ru: 'Результат ухода HydraFacial: сияющая, наполненная влагой кожа без единого покраснения. #косметологпрага'
    },
    likes: 521,
    comments: 42,
    timestamp: '2d ago',
    instagramUrl: 'https://instagram.com/atelier.luma.prague'
  },
  {
    id: 'ig-post-5',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85',
    category: 'hair',
    caption: {
      cs: 'Francouzská balayage v teplých medových tónech pro podzimní Prahu. #balayageprague #davines',
      en: 'French balayage in rich honey and beige undertones for golden autumn in Vinohrady. #balayageprague',
      ru: 'Медовый балаяж с мягким контурингом у лица. Идеальная глубина цвета на фоне Праги.'
    },
    likes: 467,
    comments: 26,
    timestamp: '3d ago',
    instagramUrl: 'https://instagram.com/atelier.luma.prague'
  },
  {
    id: 'ig-post-6',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=85',
    category: 'nails',
    caption: {
      cs: 'Japonská manikúra P-Shine. Zdravé, pevné nehty s přírodním leskem bez chemických laků. #pshine #ecobeauty',
      en: 'Japanese P-Shine technique. Deep mineral nourishment for glossy chemical-free nails. #pshine',
      ru: 'Японский эко-глянец P-Shine: пчелиный воск, морские минералы и шелковистая текстура.'
    },
    likes: 350,
    comments: 15,
    timestamp: '4d ago',
    instagramUrl: 'https://instagram.com/atelier.luma.prague'
  }
];

export const INSTAGRAM_SYNC_EXTRA_POSTS: GalleryPost[] = [
  {
    id: 'ig-post-live-1',
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1000&q=85',
    category: 'hair',
    caption: {
      cs: 'Právě dokončeno: Texturovaný bob a chladný tónovaný lesk. Nový post z dnešního odpoledne na salonu.',
      en: 'Just finished today: Textured French bob with gloss glaze. Fresh from our studio styling chair.',
      ru: 'Только что с кресла: Текстурный французский боб и тонирование холодным блеском.'
    },
    likes: 189,
    comments: 14,
    timestamp: 'Právě teď • Just now',
    isRecentSync: true,
    instagramUrl: 'https://instagram.com/atelier.luma.prague'
  },
  {
    id: 'ig-post-live-2',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=85',
    category: 'brows',
    caption: {
      cs: 'Lash lift nová generace s peptidy. Řasy vypadají delší o 40% zcela bez prodlužování.',
      en: 'Next-gen peptide lash lift. Natural lashes appearing 40% longer without false extensions.',
      ru: 'Ламинирование ресниц с пептидным комплексом. Эффект туши без склеивания.'
    },
    likes: 245,
    comments: 19,
    timestamp: '12 min ago',
    isRecentSync: true,
    instagramUrl: 'https://instagram.com/atelier.luma.prague'
  }
];
