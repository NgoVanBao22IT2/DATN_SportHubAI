import React from 'react';
import {
  Search,
  MapPin,
  Calendar,
  Star,
  Heart,
  ChevronRight,
  Sparkles,
  Users,
  Zap,
  Home,
  Bot
} from 'lucide-react';
import { type Venue, CATEGORIES, VENUES } from '../types/venue';

interface HomePageProps {
  activeCategory: string;
  setActiveCategory: (catId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  locationQuery: string;
  setLocationQuery: (loc: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  filteredVenues: Venue[];
  favorites: Set<string>;
  toggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectVenueForBooking: (venue: Venue) => void;
  onOpenAiModal: (type: 'assistant' | 'matchmaking') => void;
  onNavigateDetails: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  locationQuery,
  setLocationQuery,
  selectedDate,
  setSelectedDate,
  filteredVenues,
  favorites,
  toggleFavorite,
  onSelectVenueForBooking,
  onOpenAiModal,
  onNavigateDetails,
}) => {
  return (
    <div>
      {/* HERO SECTION */}
      <section className="hero-section" id="hero">
        <div className="hero-overlay" />
        <div className="container">
          <div className="hero-content animate-fade-in">
            <h1 className="hero-title">
              Đặt sân thể thao nhanh chóng, tiện lợi
            </h1>
            <p className="hero-subtitle">
              Hệ thống đặt sân thể thao thông minh giúp bạn dễ dàng tìm kiếm và đặt sân phù hợp chỉ trong vài cú click.
            </p>

            {/* SEARCH CARD */}
            <div className="search-card">
              <div className="search-field">
                <Search size={18} className="search-field-icon" />
                <input
                  type="text"
                  placeholder="Tên sân/Môn thể thao..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="search-field">
                <MapPin size={18} className="search-field-icon" />
                <input
                  type="text"
                  placeholder="Thành phố, Quận..."
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                />
              </div>

              <div className="search-field">
                <Calendar size={18} className="search-field-icon" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              <button className="btn-search">
                <Search size={18} />
                <span>Tìm ngay</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="section container" id="explore">
        <div className="section-header">
          <div className="section-title-group">
            <h2>Khám phá</h2>
          </div>
          <a href="#venues" className="link-see-all" onClick={() => setActiveCategory('all')}>
            <span>Xem tất cả</span>
            <ChevronRight size={16} />
          </a>
        </div>

        <div className="categories-grid">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className={`category-card ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(activeCategory === cat.id ? 'all' : cat.id)}
            >
              <div className="category-icon-box">
                <span style={{ fontSize: '24px' }}>{cat.icon}</span>
              </div>
              <span className="category-name">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PROMOTIONAL & FEATURE BANNERS ROW */}
      <section className="section container">
        <div className="promo-grid">
          {/* Left Large Card */}
          <div className="promo-large-card">
            <div className="promo-large-overlay" />
            <div className="promo-large-content">
              <span className="promo-badge">ƯU ĐÃI HÔM NAY</span>
              <h3 className="promo-title">Giảm 20% cho sân Pickleball mới</h3>
              <p className="promo-subtitle">
                Khám phá các sân Pickleball mới mở trải nghiệm ngay hôm nay với mức giá ưu đãi đặc biệt.
              </p>
              <button
                className="btn-promo"
                onClick={() => {
                  const pVenue = VENUES.find((v) => v.sport === 'pickleball');
                  if (pVenue) onSelectVenueForBooking(pVenue);
                }}
              >
                <span>Đặt sân ngay</span>
                <span>⚡</span>
              </button>
            </div>
          </div>

          {/* Right Cards Stack */}
          <div className="feature-cards-stack">
            {/* Top Light Blue Card */}
            <div className="feature-card-light" onClick={() => onOpenAiModal('assistant')}>
              <div className="feature-icon-title">
                <div className="feature-icon-badge-blue">
                  <Bot size={20} />
                </div>
                <div>
                  <h3>Trợ lý SportHubAI</h3>
                  <p>Hệ thống AI thông minh giúp đề xuất sân và khung giờ phù hợp nhất với tiêu chí của bạn.</p>
                </div>
              </div>
              <div className="feature-link-blue">
                <span>Thử ngay</span>
                <ChevronRight size={16} />
              </div>
            </div>

            {/* Bottom Dark Navy Card */}
            <div className="feature-card-dark" onClick={() => onOpenAiModal('matchmaking')}>
              <div className="feature-icon-title">
                <div className="feature-icon-badge-teal">
                  <Users size={20} />
                </div>
                <div>
                  <h3>
                    <span>Ghép kèo AI</span>
                    <Sparkles size={16} color="#38bdf8" />
                  </h3>
                  <p>Tìm đối thủ hoặc bạn tập phù hợp ngay lập tức với hệ thống ghép kèo thông minh.</p>
                </div>
              </div>
              <div className="feature-link-gold">
                <span>Tìm kèo</span>
                <span>➔</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED VENUES SECTION */}
      <section className="section container" id="venues">
        <div className="section-header">
          <div className="section-title-group">
            <h2>Sân thể thao nổi bật</h2>
            <p className="section-subtitle">Được đề xuất bởi hệ thống SportHub</p>
          </div>
          <a href="#venues" className="link-see-all" onClick={() => setActiveCategory('all')}>
            <span>Xem tất cả</span>
            <ChevronRight size={16} />
          </a>
        </div>

        <div className="venues-grid">
          {filteredVenues.map((venue) => (
            <div key={venue.id} className="venue-card" onClick={onNavigateDetails}>
              <div className="venue-image-wrap">
                <img src={venue.image} alt={venue.name} />
                <div className="rating-badge">
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <span>{venue.rating} ({venue.reviews})</span>
                </div>
                <button
                  className={`btn-favorite ${favorites.has(venue.id) ? 'active' : ''}`}
                  onClick={(e) => toggleFavorite(venue.id, e)}
                  title="Yêu thích"
                >
                  <Heart size={16} fill={favorites.has(venue.id) ? '#ef4444' : 'none'} color={favorites.has(venue.id) ? '#ef4444' : '#ffffff'} />
                </button>
              </div>

              <div className="venue-info">
                <h3 className="venue-name">{venue.name}</h3>
                <div className="venue-location">
                  <MapPin size={14} />
                  <span>{venue.location}</span>
                </div>
                <button
                  className="btn-book-venue"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectVenueForBooking(venue);
                  }}
                >
                  <Calendar size={16} />
                  <span>Đặt sân</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ECOSYSTEM SECTION */}
      <section className="container">
        <div className="ecosystem-section">
          <div className="ecosystem-grid">
            <div className="ecosystem-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800&auto=format&fit=crop"
                alt="Badminton Smash Action"
              />
            </div>

            <div>
              <span className="ecosystem-tag">SPORTHUBAI ECOSYSTEM</span>
              <h2 className="ecosystem-title">Cá nhân hóa trải nghiệm thể thao của bạn</h2>

              <div className="ecosystem-features">
                <div className="eco-feature-item">
                  <div className="eco-feature-icon">
                    <Home size={22} />
                  </div>
                  <div className="eco-feature-text">
                    <h4>Đề xuất thông minh</h4>
                    <p>Đề xuất lịch chơi và sân chơi phù hợp dựa trên thói quen bóng của bạn.</p>
                  </div>
                </div>

                <div className="eco-feature-item">
                  <div className="eco-feature-icon">
                    <Zap size={22} />
                  </div>
                  <div className="eco-feature-text">
                    <h4>Xác nhận tức thì</h4>
                    <p>Giữ chỗ ngay sau khi đặt cọc. Hệ thống giữ sân tự động không lo trùng lịch.</p>
                  </div>
                </div>

                <div className="eco-feature-item">
                  <div className="eco-feature-icon">
                    <Users size={22} />
                  </div>
                  <div className="eco-feature-text">
                    <h4>Kết nối đồng đội</h4>
                    <p>Hệ thống giao lưu sôi nổi kết nối người cùng sở thích thể thao trong khu vực.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
