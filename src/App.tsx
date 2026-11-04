import React, { useEffect, useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SalonChatbot } from './components/SalonChatbot';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { GalleryPage } from './pages/GalleryPage';
import { BookingPage } from './pages/BookingPage';
import { TeamPage } from './pages/TeamPage';
import { ContactsPage } from './pages/ContactsPage';

const PAGES = ['home', 'services', 'gallery', 'booking', 'team', 'contacts'];

function pageFromPath(pathname: string): string {
  const slug = pathname.replace(/^\/+|\/+$/g, '');
  return PAGES.includes(slug) ? slug : 'home';
}

function pathFromPage(page: string): string {
  return page === 'home' ? '/' : `/${page}`;
}

function SalonApp() {
  const [currentPage, setCurrentPage] = useState<string>(() => pageFromPath(window.location.pathname));
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(
    () => window.history.state?.serviceId,
  );

  // Browser Back/Forward buttons: restore the page stored in the URL
  useEffect(() => {
    const onPopState = (event: PopStateEvent) => {
      setCurrentPage(pageFromPath(window.location.pathname));
      setSelectedServiceId(event.state?.serviceId);
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const goTo = (page: string, serviceId?: string) => {
    const path = pathFromPage(page);
    if (page !== currentPage || serviceId !== selectedServiceId) {
      window.history.pushState({ page, serviceId }, '', path);
    }
    setCurrentPage(page);
    setSelectedServiceId(serviceId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (page: string, serviceId?: string) => {
    goTo(page, serviceId ?? (page === 'booking' ? selectedServiceId : undefined));
  };

  const handleNavigateToBooking = (serviceId?: string) => {
    goTo('booking', serviceId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1917] selection:bg-[#E7DED3]">
      {/* Top Navbar */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Page Content - Separate Pages */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} />
        )}

        {currentPage === 'services' && (
          <ServicesPage onNavigateToBooking={handleNavigateToBooking} />
        )}

        {currentPage === 'gallery' && (
          <GalleryPage onNavigateToBooking={handleNavigateToBooking} />
        )}

        {currentPage === 'booking' && (
          <BookingPage
            initialServiceId={selectedServiceId}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentPage === 'team' && (
          <TeamPage onNavigateToBooking={handleNavigateToBooking} />
        )}

        {currentPage === 'contacts' && (
          <ContactsPage />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Real-time AI Salon Concierge Chatbot available across all pages */}
      <SalonChatbot
        onNavigateToBooking={handleNavigateToBooking}
        onNavigateToPage={handleNavigate}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <SalonApp />
    </LanguageProvider>
  );
}
