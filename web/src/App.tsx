import React, { useState, useMemo } from 'react';
import { type Venue, VENUES } from './types/venue';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { AiModal } from './components/AiModal';
import { AuthModal } from './components/AuthModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { HomePage } from './pages/HomePage';
import { VenueDetailsPage } from './pages/VenueDetailsPage';
import './App.css';

export function App() {
  // Navigation & View States
  const [activeNavTab, setActiveNavTab] = useState<'home' | 'datsan' | 'khampha' | 'bando' | 'noibat'>('datsan');
  
  // Search & Filter States
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('2026-07-28');
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['2']));
  
  // Modal & Drawer States
  const [selectedVenueForBooking, setSelectedVenueForBooking] = useState<Venue | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingTimeSlot, setBookingTimeSlot] = useState('18:00 - 19:00');
  
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiModalType, setAiModalType] = useState<'assistant' | 'matchmaking'>('assistant');
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Toggle Favorite Handler
  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Filtered Venues List for Home Page
  const filteredVenues = useMemo(() => {
    return VENUES.filter((venue) => {
      const matchCat = activeCategory === 'all' || venue.sport === activeCategory;
      const matchSearch =
        venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchLoc =
        !locationQuery || venue.location.toLowerCase().includes(locationQuery.toLowerCase());
      return matchCat && matchSearch && matchLoc;
    });
  }, [activeCategory, searchQuery, locationQuery]);

  const handleOpenAiModal = (type: 'assistant' | 'matchmaking') => {
    setAiModalType(type);
    setShowAiModal(true);
  };

  const handleOpenAuthModal = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const aceVenue = VENUES[1]; // Default venue for VenueDetailsPage (ACE BADMINTON)

  return (
    <div className="app-container">
      {/* NAVBAR */}
      <Navbar
        activeNavTab={activeNavTab}
        setActiveNavTab={setActiveNavTab}
        mobileNavOpen={mobileNavOpen}
        setMobileNavOpen={setMobileNavOpen}
        showNotificationDrawer={showNotificationDrawer}
        setShowNotificationDrawer={setShowNotificationDrawer}
        onOpenAuthModal={handleOpenAuthModal}
      />

      {/* MAIN SCREEN/PAGE CONTENT */}
      {activeNavTab === 'datsan' ? (
        <VenueDetailsPage
          venue={aceVenue}
          favorites={favorites}
          filteredVenues={filteredVenues}
          toggleFavorite={toggleFavorite}
          onSelectVenueForBooking={(venue) => {
            setSelectedVenueForBooking(venue);
            setBookingConfirmed(false);
          }}
          onNavigateHome={() => setActiveNavTab('home')}
        />
      ) : (
        <HomePage
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          locationQuery={locationQuery}
          setLocationQuery={setLocationQuery}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          filteredVenues={filteredVenues}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          onSelectVenueForBooking={(venue) => {
            setSelectedVenueForBooking(venue);
            setBookingConfirmed(false);
          }}
          onOpenAiModal={handleOpenAiModal}
          onNavigateDetails={() => setActiveNavTab('datsan')}
        />
      )}

      {/* FOOTER */}
      <Footer
        onNavigateHome={() => setActiveNavTab('home')}
        onNavigateDetails={() => setActiveNavTab('datsan')}
      />

      {/* MODALS & DRAWERS */}
      <BookingModal
        selectedVenue={selectedVenueForBooking}
        onClose={() => setSelectedVenueForBooking(null)}
        bookingConfirmed={bookingConfirmed}
        setBookingConfirmed={setBookingConfirmed}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        bookingTimeSlot={bookingTimeSlot}
        setBookingTimeSlot={setBookingTimeSlot}
      />

      <AiModal
        isOpen={showAiModal}
        onClose={() => setShowAiModal(false)}
        type={aiModalType}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        authMode={authMode}
        setAuthMode={setAuthMode}
      />

      <NotificationDrawer
        isOpen={showNotificationDrawer}
        onClose={() => setShowNotificationDrawer(false)}
      />
    </div>
  );
}

export default App;
