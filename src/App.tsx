import React, { useState } from 'react';
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

function SalonApp() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);

  const handleNavigate = (page: string, serviceId?: string) => {
    setCurrentPage(page);
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToBooking = (serviceId?: string) => {
    setSelectedServiceId(serviceId);
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
