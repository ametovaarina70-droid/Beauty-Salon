import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { INITIAL_GALLERY, INSTAGRAM_SYNC_EXTRA_POSTS, GalleryPost } from '../data/salonData';
import { RefreshCw, Instagram, Heart, MessageCircle, ExternalLink, X, Calendar, Check, Sparkles, Filter } from 'lucide-react';

interface GalleryPageProps {
  onNavigateToBooking: (serviceId?: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigateToBooking }) => {
  const { t, language } = useLanguage();
  const [posts, setPosts] = useState<GalleryPost[]>(INITIAL_GALLERY);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);
  const [activePost, setActivePost] = useState<GalleryPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const categories = [
    { key: 'all', label: t.gallery.filterAll },
    { key: 'hair', label: t.services.categories.hair },
    { key: 'nails', label: t.services.categories.nails },
    { key: 'face', label: t.services.categories.face },
    { key: 'brows', label: t.services.categories.brows },
  ];

  // Instagram synchronization simulation with real-time feedback
  const handleInstagramSync = () => {
    setIsSyncing(true);
    setSyncNotice(null);

    setTimeout(() => {
      // Add extra recent posts from the Instagram feed
      setPosts((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const newPosts = INSTAGRAM_SYNC_EXTRA_POSTS.filter((p) => !existingIds.has(p.id));
        return [...newPosts, ...prev];
      });

      setIsSyncing(false);
      setSyncNotice(t.gallery.syncSuccess);

      // Dismiss notice after 4 seconds
      setTimeout(() => {
        setSyncNotice(null);
      }, 4000);
    }, 900);
  };

  const toggleLike = (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const filteredPosts = posts.filter(
    (post) => selectedCategory === 'all' || post.category === selectedCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header - Centered */}
      <div className="text-center max-w-3xl mx-auto space-y-6 pb-6 border-b border-[#E8E2D9]">
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#8C7A6B]">
            <Instagram className="w-4 h-4 text-pink-600" />
            <span>{t.gallery.instaTag} • Live Feed</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 font-normal">
            {t.gallery.title}
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            {t.gallery.subtitle}
          </p>
        </div>

        {/* Instagram Account Stat & Sync Button - Centered */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#E8E2D9] text-xs font-semibold text-stone-800 hover:text-black hover:border-stone-400 transition shadow-xs"
          >
            <Instagram className="w-4 h-4 text-[#C13584]" />
            <span>18.4k Followers</span>
            <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
          </a>

          <button
            onClick={handleInstagramSync}
            disabled={isSyncing}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1C1917] hover:bg-black text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-sm cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? (language === 'cs' ? 'Synchronizuji...' : language === 'ru' ? 'Синхронизация...' : 'Syncing...') : t.gallery.syncButton}</span>
          </button>
        </div>
      </div>

      {/* Sync Success Notification Toast */}
      {syncNotice && (
        <div className="max-w-2xl mx-auto p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center justify-between animate-in fade-in duration-300">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{syncNotice}</span>
          </div>
          <span className="text-[11px] text-emerald-700">{t.gallery.lastSynced}</span>
        </div>
      )}

      {/* Category Filter Pills - Centered */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-4 py-2 rounded-full text-xs uppercase font-medium tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.key
                ? 'bg-[#1C1917] text-[#FAF8F5]'
                : 'bg-white text-stone-600 hover:bg-stone-200/60 border border-[#E8E2D9]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredPosts.map((post) => {
          const isLiked = likedPosts[post.id];
          const likeCount = isLiked ? post.likes + 1 : post.likes;

          return (
            <div
              key={post.id}
              onClick={() => setActivePost(post)}
              className="group bg-white rounded-2xl overflow-hidden border border-[#E8E2D9] hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Photo */}
              <div className="relative aspect-square overflow-hidden bg-stone-100">
                <img
                  src={post.image}
                  alt={post.caption[language]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Live tag if synced */}
                {post.isRecentSync && (
                  <div className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    New Sync
                  </div>
                )}

                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Instagram className="w-3.5 h-3.5" />
                </div>

                {/* Overlay hover bar */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-medium text-xs">
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 fill-white" />
                    <span>{likeCount}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>

              {/* Caption and Social Micro Footer */}
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <p className="text-xs text-stone-700 line-clamp-2 leading-relaxed">
                  {post.caption[language]}
                </p>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                  <span className="text-[11px] font-medium text-stone-500">
                    {post.timestamp}
                  </span>

                  <button
                    onClick={(e) => toggleLike(e, post.id)}
                    className="flex items-center gap-1 text-stone-500 hover:text-red-500 transition cursor-pointer"
                    aria-label="Like post"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isLiked ? 'fill-red-500 text-red-500' : 'text-stone-400'
                      }`}
                    />
                    <span className="text-[11px]">{likeCount}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
            {/* Close button */}
            <button
              onClick={() => setActivePost(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black transition cursor-pointer"
              aria-label="Close image lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo side */}
            <div className="md:w-3/5 bg-stone-950 flex items-center justify-center">
              <img
                src={activePost.image}
                alt={activePost.caption[language]}
                className="w-full h-full object-contain max-h-[70vh] md:max-h-[85vh]"
              />
            </div>

            {/* Information & Actions side */}
            <div className="md:w-2/5 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                {/* Account info */}
                <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
                  <div className="w-10 h-10 rounded-full bg-[#1C1917] text-white flex items-center justify-center font-serif text-sm font-bold">
                    AL
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900 text-sm">atelier.luma.prague</h4>
                    <span className="text-xs text-stone-500">Královské Vinohrady, Praha</span>
                  </div>
                </div>

                {/* Caption */}
                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed whitespace-pre-line font-light">
                  {activePost.caption[language]}
                </p>

                {/* Social metadata */}
                <div className="flex items-center gap-4 text-xs text-stone-500">
                  <span className="flex items-center gap-1 font-semibold text-stone-800">
                    <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                    {activePost.likes} {language === 'cs' ? 'to se líbí' : language === 'ru' ? 'отметок «Нравится»' : 'likes'}
                  </span>
                  <span>•</span>
                  <span>{activePost.timestamp}</span>
                </div>
              </div>

              {/* Actions: Book this look & Open on Instagram */}
              <div className="space-y-3 pt-6 border-t border-stone-100">
                <button
                  onClick={() => {
                    setActivePost(null);
                    onNavigateToBooking();
                  }}
                  className="w-full py-3.5 bg-[#1C1917] hover:bg-black text-[#FAF8F5] rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#E7DED3]" />
                  <span>
                    {language === 'cs'
                      ? 'Objednat podobný styl'
                      : language === 'ru'
                      ? 'Записаться на этот образ'
                      : 'Book Similar Style'}
                  </span>
                </button>

                <a
                  href={activePost.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#C13584]" />
                  <span>{t.gallery.openInInsta}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
