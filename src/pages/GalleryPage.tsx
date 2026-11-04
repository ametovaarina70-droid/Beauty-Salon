import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { INITIAL_GALLERY, GalleryPost } from '../data/salonData';
import { X } from 'lucide-react';

interface GalleryPageProps {
  onNavigateToBooking: (serviceId?: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigateToBooking }) => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePost, setActivePost] = useState<GalleryPost | null>(null);

  const categories = [
    { key: 'all', label: t.gallery.filterAll },
    { key: 'hair', label: t.services.categories.hair },
    { key: 'nails', label: t.services.categories.nails },
    { key: 'face', label: t.services.categories.face },
    { key: 'brows', label: t.services.categories.brows },
  ];

  const posts = INITIAL_GALLERY.filter(
    (post) => selectedCategory === 'all' || post.category === selectedCategory,
  );

  // Close the lightbox with Escape
  useEffect(() => {
    if (!activePost) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActivePost(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activePost]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-14">
      <header className="text-center">
        <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 font-normal">
          {language === 'cs' ? 'Galerie' : language === 'ru' ? 'Наши работы' : 'Our Work'}
        </h1>
      </header>

      <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`text-sm pb-1 border-b transition-colors cursor-pointer ${
              selectedCategory === cat.key
                ? 'text-stone-900 border-stone-900'
                : 'text-stone-500 border-transparent hover:text-stone-900'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {posts.map((post) => (
          <button
            key={post.id}
            onClick={() => setActivePost(post)}
            className="group aspect-square overflow-hidden rounded-2xl bg-stone-100 cursor-pointer"
            aria-label={post.caption[language]}
          >
            <img
              src={post.image}
              alt={post.caption[language]}
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
            />
          </button>
        ))}
      </div>

      <div className="text-center">
        <a
          href="https://instagram.com/atelier.luma.prague"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-stone-600 hover:text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition-colors"
        >
          Instagram · @atelier.luma.prague
        </a>
      </div>

      {activePost && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setActivePost(null)}
        >
          <div
            className="relative w-full max-w-3xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePost(null)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white cursor-pointer"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={activePost.image}
              alt={activePost.caption[language]}
              className="w-full max-h-[75vh] object-contain rounded-2xl bg-stone-900"
            />
            <div className="flex items-center justify-between gap-6 text-white">
              <p className="text-sm font-light text-white/80">
                {activePost.caption[language].replace(/\s*#\S+/g, '')}
              </p>
              <button
                onClick={() => {
                  setActivePost(null);
                  onNavigateToBooking();
                }}
                className="shrink-0 text-sm underline underline-offset-4 decoration-white/40 hover:decoration-white cursor-pointer"
              >
                {language === 'cs' ? 'Rezervovat' : language === 'ru' ? 'Записаться' : 'Book'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
