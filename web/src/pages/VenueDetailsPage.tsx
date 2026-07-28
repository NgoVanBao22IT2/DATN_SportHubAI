import React, { useState } from 'react';
import {
  Star,
  Heart,
  MapPin,
  Clock,
  Phone,
  Calendar,
  Info,
  CheckCircle2,
  Navigation,
  ChevronRight,
  Image,
  LayoutGrid,
  CreditCard,
  GraduationCap,
  FileText,
  Receipt,
  Sun,
  Wind,
  Sparkles,
  Car,
  Square,
  Edit3
} from 'lucide-react';
import { type Venue } from '../types/venue';

interface VenueDetailsPageProps {
  venue: Venue;
  favorites: Set<string>;
  filteredVenues: Venue[];
  toggleFavorite: (id: string, e?: React.MouseEvent) => void;
  onSelectVenueForBooking: (venue: Venue) => void;
  onNavigateHome: () => void;
}

export const VenueDetailsPage: React.FC<VenueDetailsPageProps> = ({
  venue,
  favorites,
  filteredVenues,
  toggleFavorite,
  onSelectVenueForBooking,
  onNavigateHome,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'thongtin' | 'hinhanh' | 'dichvu' | 'dieukhoan' | 'danhgia'>('danhgia');
  
  // Pricing Day Toggle States
  const [dayFilterGeneral, setDayFilterGeneral] = useState<'t2t6' | 't7cn'>('t2t6');
  const [dayFilterStudent, setDayFilterStudent] = useState<'t2t6' | 't7cn'>('t2t6');

  return (
    <div>
      {/* Top Hero Banner */}
      <div className="venue-hero-banner">
        <div className="venue-hero-overlay" />
      </div>

      {/* Venue Floating Header Card */}
      <div className="container">
        <div className="venue-floating-card">
          <div className="venue-floating-left">
            <div className="venue-logo-box">
              <span className="venue-logo-text">ACE</span>
            </div>
            <div className="venue-info-block">
              <div className="venue-rating-badge">
                <Star size={13} fill="#d97706" color="#d97706" />
                <span>{venue.rating}</span>
              </div>
              <h1 className="venue-title-name">{venue.name}</h1>
              <div className="venue-detail-meta">
                <MapPin size={14} color="#64748b" />
                <span>{venue.location}</span>
              </div>
              <div className="venue-detail-meta">
                <Clock size={14} color="#64748b" />
                <span>04:30 - 23:30 hàng ngày</span>
              </div>
              <div className="venue-detail-meta">
                <Phone size={14} color="#64748b" />
                <span>090 123 4567</span>
              </div>
            </div>
          </div>

          <div className="venue-floating-actions">
            <button
              className="btn-venue-action-primary"
              onClick={() => onSelectVenueForBooking(venue)}
            >
              <Calendar size={18} />
              <span>Đặt lịch</span>
            </button>
            <button
              className="btn-venue-action-secondary"
              onClick={() => toggleFavorite(venue.id)}
            >
              <Heart size={18} fill={favorites.has(venue.id) ? '#ef4444' : 'none'} color={favorites.has(venue.id) ? '#ef4444' : '#1989a8'} />
              <span>Yêu thích</span>
            </button>
          </div>
        </div>

        {/* Secondary Sub Navigation Tabs Bar */}
        <div className="venue-detail-subnav">
          <div
            className={`subnav-tab-item ${activeSubTab === 'thongtin' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('thongtin')}
          >
            Thông tin
          </div>
          <div
            className={`subnav-tab-item ${activeSubTab === 'hinhanh' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('hinhanh')}
          >
            Hình ảnh
          </div>
          <div
            className={`subnav-tab-item ${activeSubTab === 'dichvu' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('dichvu')}
          >
            Dịch vụ
          </div>
          <div
            className={`subnav-tab-item ${activeSubTab === 'dieukhoan' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('dieukhoan')}
          >
            Điều khoản & quy định
          </div>
          <div
            className={`subnav-tab-item ${activeSubTab === 'danhgia' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('danhgia')}
          >
            Đánh giá
          </div>
        </div>

        {/* TAB CONTENT CONDITIONAL */}
        {activeSubTab === 'danhgia' ? (
          /* TAB ĐÁNH GIÁ & RATING SUMMARY */
          <div>
            {/* Block 1: Rating Summary Card */}
            <div className="rating-summary-card">
              {/* Left Score Box */}
              <div>
                <div className="rating-big-score">4.8</div>
                <div className="rating-stars-row">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={18} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <div className="rating-count-text">(254 đánh giá)</div>
              </div>

              {/* Right Bars Breakdown */}
              <div className="rating-bars-list">
                <div className="rating-bar-item">
                  <span>5 ★</span>
                  <div className="rating-bar-track">
                    <div className="rating-bar-fill" style={{ width: '82.6%' }} />
                  </div>
                  <span>210</span>
                </div>
                <div className="rating-bar-item">
                  <span>4 ★</span>
                  <div className="rating-bar-track">
                    <div className="rating-bar-fill" style={{ width: '15%' }} />
                  </div>
                  <span>38</span>
                </div>
                <div className="rating-bar-item">
                  <span>3 ★</span>
                  <div className="rating-bar-track">
                    <div className="rating-bar-fill" style={{ width: '2%' }} />
                  </div>
                  <span>5</span>
                </div>
                <div className="rating-bar-item">
                  <span>2 ★</span>
                  <div className="rating-bar-track">
                    <div className="rating-bar-fill" style={{ width: '0.4%' }} />
                  </div>
                  <span>1</span>
                </div>
                <div className="rating-bar-item">
                  <span>1 ★</span>
                  <div className="rating-bar-track">
                    <div className="rating-bar-fill" style={{ width: '0%' }} />
                  </div>
                  <span>0</span>
                </div>
              </div>
            </div>

            {/* Block 2: Danh mục đánh giá */}
            <div style={{ marginBottom: '28px' }}>
              <div className="section-header" style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a' }}>Danh mục đánh giá</h3>
                <a href="#all" className="link-see-all" onClick={(e) => { e.preventDefault(); alert('Xem tất cả danh mục đánh giá...'); }}>
                  <span>Xem tất cả</span>
                  <ChevronRight size={16} />
                </a>
              </div>

              <div className="review-cats-grid">
                <div className="review-cat-card">
                  <div className="review-cat-icon">
                    <Square size={16} />
                  </div>
                  <span className="review-cat-name">Mặt sân</span>
                  <span className="review-cat-score">4.8</span>
                </div>
                <div className="review-cat-card">
                  <div className="review-cat-icon">
                    <Sun size={16} />
                  </div>
                  <span className="review-cat-name">Ánh sáng</span>
                  <span className="review-cat-score">4.9</span>
                </div>
                <div className="review-cat-card">
                  <div className="review-cat-icon">
                    <Wind size={16} />
                  </div>
                  <span className="review-cat-name">Thông gió</span>
                  <span className="review-cat-score">4.7</span>
                </div>
                <div className="review-cat-card">
                  <div className="review-cat-icon">
                    <Sparkles size={16} />
                  </div>
                  <span className="review-cat-name">Vệ sinh</span>
                  <span className="review-cat-score">4.8</span>
                </div>
                <div className="review-cat-card">
                  <div className="review-cat-icon">
                    <Car size={16} />
                  </div>
                  <span className="review-cat-name">Bãi giữ xe</span>
                  <span className="review-cat-score">4.6</span>
                </div>
              </div>
            </div>

            {/* Block 3: Đánh giá nổi bật */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>Đánh giá nổi bật</h3>

              <div className="user-reviews-list">
                {/* User Review 1 */}
                <div className="user-review-card">
                  <div className="user-review-header">
                    <div className="user-avatar-group">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
                        alt="Nguyễn Minh Tuấn"
                        className="user-avatar-img"
                      />
                      <div>
                        <div className="user-name-text">Nguyễn Minh Tuấn</div>
                        <div style={{ display: 'flex', gap: '2px', marginTop: '2px' }}>
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={12} fill="#f59e0b" color="#f59e0b" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="user-review-date">12/05/2026</span>
                  </div>
                  <p className="user-review-comment">
                    Sân đẹp, sạch sẽ. Ánh sáng tốt. Nhân viên nhiệt tình, phục vụ rất tốt. Sẽ ủng hộ lâu dài!
                  </p>
                  <div className="user-review-photos">
                    <div className="user-review-photo-item">
                      <img src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=300&auto=format&fit=crop" alt="Review photo 1" />
                    </div>
                    <div className="user-review-photo-item">
                      <img src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=300&auto=format&fit=crop" alt="Review photo 2" />
                    </div>
                    <div className="user-review-photo-item">
                      <img src="https://images.unsplash.com/photo-1574629810360-7ab2e98b9a64?q=80&w=300&auto=format&fit=crop" alt="Review photo 3" />
                    </div>
                  </div>
                </div>

                {/* User Review 2 */}
                <div className="user-review-card">
                  <div className="user-review-header">
                    <div className="user-avatar-group">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
                        alt="Trần Hoàng Anh"
                        className="user-avatar-img"
                      />
                      <div>
                        <div className="user-name-text">Trần Hoàng Anh</div>
                        <div style={{ display: 'flex', gap: '2px', marginTop: '2px' }}>
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={12} fill="#f59e0b" color="#f59e0b" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="user-review-date">08/05/2026</span>
                  </div>
                  <p className="user-review-comment">
                    Không gian thoáng mát, có đầy đủ tiện ích. Giá cả hợp lý. Rất hài lòng!
                  </p>
                </div>
              </div>

              {/* Block 4: Button Viết đánh giá */}
              <button
                className="btn-write-review"
                onClick={() => alert('Mở form viết đánh giá sân...')}
              >
                <Edit3 size={18} />
                <span>Viết đánh giá</span>
              </button>
            </div>
          </div>
        ) : activeSubTab === 'dieukhoan' ? (
          /* TAB ĐIỀU KHOẢN & QUY ĐỊNH */
          <div>
            {/* Card 1: Nội quy sân */}
            <div className="venue-card-box" style={{ marginBottom: '24px' }}>
              <div className="box-header-row">
                <div className="box-icon-circle">
                  <FileText size={18} />
                </div>
                <h3 className="box-title-text">Nội quy sân</h3>
              </div>
              <div className="rules-list">
                <div className="rule-item-row">
                  <div className="rule-icon-bullet">📄</div>
                  <p className="rule-text-content">
                    Vui lòng mang giày thể thao đế cao su (giày cầu lông chuyên dụng) để bảo vệ mặt sân gỗ.
                  </p>
                </div>
                <div className="rule-item-row">
                  <div className="rule-icon-bullet">📄</div>
                  <p className="rule-text-content">
                    Nghiêm cấm hút thuốc lá và mang theo các chất dễ cháy nổ vào khu vực thi đấu.
                  </p>
                </div>
                <div className="rule-item-row">
                  <div className="rule-icon-bullet">📄</div>
                  <p className="rule-text-content">
                    Giữ gìn vệ sinh chung, bỏ rác đúng nơi quy định.
                  </p>
                </div>
                <div className="rule-item-row">
                  <div className="rule-icon-bullet">📄</div>
                  <p className="rule-text-content">
                    Có mặt đúng giờ đã đặt. Sân sẽ bị hủy nếu quá 15 phút mà không thông báo.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Chính sách hoàn/hủy */}
            <div className="venue-card-box" style={{ marginBottom: '40px' }}>
              <div className="box-header-row">
                <div className="box-icon-circle">
                  <Receipt size={18} />
                </div>
                <h3 className="box-title-text">Chính sách hoàn/hủy</h3>
              </div>

              <div className="cancellation-rows-list">
                <div className="cancel-row-item">
                  <span className="cancel-condition-text">Hủy trước 24 giờ</span>
                  <span className="cancel-refund-badge refund-100">Hoàn 100%</span>
                </div>
                <div className="cancel-row-item">
                  <span className="cancel-condition-text">Hủy trước 12 giờ</span>
                  <span className="cancel-refund-badge refund-50">Hoàn 50%</span>
                </div>
                <div className="cancel-row-item">
                  <span className="cancel-condition-text">Hủy dưới 12 giờ</span>
                  <span className="cancel-refund-badge refund-0">Không hoàn phí</span>
                </div>
              </div>

              <p className="pricing-footer-note" style={{ marginTop: '16px', marginBottom: 0 }}>
                * Tiền hoàn sẽ được cộng vào ví SportHub của bạn trong vòng 3 - 5 ngày làm việc.
              </p>
            </div>
          </div>
        ) : activeSubTab === 'dichvu' ? (
          /* TAB DỊCH VỤ & BẢNG GIÁ SÂN */
          <div>
            {/* Block 1: Giá Chung */}
            <div className="pricing-block-card">
              <div className="pricing-header-row">
                <div className="pricing-icon-circle">
                  <CreditCard size={18} />
                </div>
                <h3 className="pricing-title-text">Giá Chung</h3>
              </div>

              {/* Day Segment Toggle */}
              <div className="pricing-day-toggle">
                <button
                  className={`day-toggle-btn ${dayFilterGeneral === 't2t6' ? 'active' : ''}`}
                  onClick={() => setDayFilterGeneral('t2t6')}
                >
                  T2 - T6
                </button>
                <button
                  className={`day-toggle-btn ${dayFilterGeneral === 't7cn' ? 'active' : ''}`}
                  onClick={() => setDayFilterGeneral('t7cn')}
                >
                  T7 - CN
                </button>
              </div>

              {/* Table */}
              <div className="pricing-table-container">
                <table className="pricing-table">
                  <thead>
                    <tr>
                      <th>KHUNG GIỜ</th>
                      <th>CỐ ĐỊNH (VNĐ/GIỜ)</th>
                      <th>VÃNG LAI (VNĐ/GIỜ)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dayFilterGeneral === 't2t6' ? (
                      <>
                        <tr>
                          <td>05:00 - 15:00</td>
                          <td className="price-codinh">40.000đ</td>
                          <td className="price-vanglai">30.000đ</td>
                        </tr>
                        <tr>
                          <td>15:00 - 17:30</td>
                          <td className="price-codinh">50.000đ</td>
                          <td className="price-vanglai">40.000đ</td>
                        </tr>
                        <tr>
                          <td>17:30 - 21:30</td>
                          <td className="price-codinh">60.000đ</td>
                          <td className="price-vanglai">50.000đ</td>
                        </tr>
                        <tr>
                          <td>21:30 - 23:30</td>
                          <td className="price-codinh">70.000đ</td>
                          <td className="price-vanglai">60.000đ</td>
                        </tr>
                      </>
                    ) : (
                      <>
                        <tr>
                          <td>05:00 - 15:00</td>
                          <td className="price-codinh">50.000đ</td>
                          <td className="price-vanglai">40.000đ</td>
                        </tr>
                        <tr>
                          <td>15:00 - 17:30</td>
                          <td className="price-codinh">60.000đ</td>
                          <td className="price-vanglai">50.000đ</td>
                        </tr>
                        <tr>
                          <td>17:30 - 21:30</td>
                          <td className="price-codinh">70.000đ</td>
                          <td className="price-vanglai">60.000đ</td>
                        </tr>
                        <tr>
                          <td>21:30 - 23:30</td>
                          <td className="price-codinh">80.000đ</td>
                          <td className="price-vanglai">70.000đ</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Block 2: Học Sinh - Sinh Viên */}
            <div className="pricing-block-card">
              <div className="pricing-header-row">
                <div className="pricing-icon-circle">
                  <GraduationCap size={18} />
                </div>
                <h3 className="pricing-title-text">Học Sinh - Sinh Viên</h3>
              </div>

              {/* Day Segment Toggle */}
              <div className="pricing-day-toggle">
                <button
                  className={`day-toggle-btn ${dayFilterStudent === 't2t6' ? 'active' : ''}`}
                  onClick={() => setDayFilterStudent('t2t6')}
                >
                  T2 - T6
                </button>
                <button
                  className={`day-toggle-btn ${dayFilterStudent === 't7cn' ? 'active' : ''}`}
                  onClick={() => setDayFilterStudent('t7cn')}
                >
                  T7 - CN
                </button>
              </div>

              {/* Table */}
              <div className="pricing-table-container">
                <table className="pricing-table">
                  <thead>
                    <tr>
                      <th>KHUNG GIỜ</th>
                      <th>CỐ ĐỊNH (VNĐ/GIỜ)</th>
                      <th>VÃNG LAI (VNĐ/GIỜ)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dayFilterStudent === 't2t6' ? (
                      <>
                        <tr>
                          <td>05:00 - 15:00</td>
                          <td className="price-codinh">30.000đ</td>
                          <td className="price-vanglai">25.000đ</td>
                        </tr>
                        <tr>
                          <td>15:00 - 17:30</td>
                          <td className="price-codinh">40.000đ</td>
                          <td className="price-vanglai">30.000đ</td>
                        </tr>
                        <tr>
                          <td>17:30 - 21:30</td>
                          <td className="price-codinh">50.000đ</td>
                          <td className="price-vanglai">40.000đ</td>
                        </tr>
                        <tr>
                          <td>21:30 - 23:30</td>
                          <td className="price-codinh">60.000đ</td>
                          <td className="price-vanglai">50.000đ</td>
                        </tr>
                      </>
                    ) : (
                      <>
                        <tr>
                          <td>05:00 - 15:00</td>
                          <td className="price-codinh">40.000đ</td>
                          <td className="price-vanglai">30.000đ</td>
                        </tr>
                        <tr>
                          <td>15:00 - 17:30</td>
                          <td className="price-codinh">50.000đ</td>
                          <td className="price-vanglai">40.000đ</td>
                        </tr>
                        <tr>
                          <td>17:30 - 21:30</td>
                          <td className="price-codinh">60.000đ</td>
                          <td className="price-vanglai">50.000đ</td>
                        </tr>
                        <tr>
                          <td>21:30 - 23:30</td>
                          <td className="price-codinh">70.000đ</td>
                          <td className="price-vanglai">60.000đ</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="pricing-footer-note">
              * Giá có thể thay đổi theo thời điểm hoặc chương trình khuyến mãi.
            </p>
          </div>
        ) : activeSubTab === 'hinhanh' ? (
          /* Card: Hình ảnh sân */
          <div className="venue-card-box" style={{ marginBottom: '40px' }}>
            <div className="box-header-row">
              <div className="box-icon-circle">
                <Image size={18} />
              </div>
              <h3 className="box-title-text">Hình ảnh sân</h3>
            </div>

            <div className="gallery-grid-layout">
              {/* Main Large Image (Left) */}
              <div className="gallery-main-item">
                <img
                  src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1000&auto=format&fit=crop"
                  alt="Sân Cầu Lông ACE Badminton"
                />
              </div>

              {/* Sub Grid 2x2 (Right) */}
              <div className="gallery-sub-grid">
                <div className="gallery-sub-item">
                  <img
                    src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=600&auto=format&fit=crop"
                    alt="Vợt & Cầu Lông"
                  />
                </div>
                <div className="gallery-sub-item">
                  <img
                    src="https://images.unsplash.com/photo-1574629810360-7ab2e98b9a64?q=80&w=600&auto=format&fit=crop"
                    alt="Khu vực sân"
                  />
                </div>
                <div className="gallery-sub-item">
                  <img
                    src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=600&auto=format&fit=crop"
                    alt="Vạch kẻ sân"
                  />
                </div>
                <div className="gallery-sub-item">
                  <img
                    src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=600&auto=format&fit=crop"
                    alt="Tất cả hình ảnh"
                  />
                  <div
                    className="gallery-more-overlay"
                    onClick={() => alert('Đang mở toàn bộ 15 hình ảnh sân ACE BADMINTON...')}
                  >
                    <LayoutGrid size={22} />
                    <span className="gallery-more-text">Xem tất cả</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Details Content Grid (2 Columns) - Tab Thông tin */
          <div className="venue-details-grid">
            {/* Left Column (Info Cards) */}
            <div>
              {/* Card 1: Giới thiệu */}
              <div className="venue-card-box">
                <div className="box-header-row">
                  <div className="box-icon-circle">
                    <Info size={18} />
                  </div>
                  <h3 className="box-title-text">Giới thiệu</h3>
                </div>
                <p className="box-description-text">
                  Câu lạc bộ Cầu lông Đất Việt tự hào sở hữu 10 sân thảm tiêu chuẩn thi đấu quốc tế. Không gian thoáng đãng, hệ thống ánh sáng chống chói mắt chuyên dụng, đảm bảo trải nghiệm tốt nhất cho các vận động viên từ phong trào đến chuyên nghiệp. Sân tọa lạc tại vị trí thuận lợi, dễ dàng tìm kiếm và có bãi đỗ xe rộng rãi.
                </p>
              </div>

              {/* Card 2: Dịch vụ & Tiện ích */}
              <div className="venue-card-box">
                <div className="box-header-row">
                  <div className="box-icon-circle">
                    <Info size={18} />
                  </div>
                  <h3 className="box-title-text">Dịch vụ & Tiện ích</h3>
                </div>
                <div className="amenities-grid-list">
                  <div className="amenity-item-row">
                    <div className="amenity-check-icon">
                      <CheckCircle2 size={14} />
                    </div>
                    <span className="amenity-text">Cho thuê vợt (Victor, Yonex)</span>
                  </div>
                  <div className="amenity-item-row">
                    <div className="amenity-check-icon">
                      <CheckCircle2 size={14} />
                    </div>
                    <span className="amenity-text">Bán nước giải khát & Snack</span>
                  </div>
                  <div className="amenity-item-row">
                    <div className="amenity-check-icon">
                      <CheckCircle2 size={14} />
                    </div>
                    <span className="amenity-text">Wifi miễn phí tốc độ cao</span>
                  </div>
                  <div className="amenity-item-row">
                    <div className="amenity-check-icon">
                      <CheckCircle2 size={14} />
                    </div>
                    <span className="amenity-text">Phòng thay đồ & Nhà tắm</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Map Card) */}
            <div>
              <div className="venue-card-box">
                <div className="box-header-row">
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MapPin size={18} />
                  </div>
                  <h3 className="box-title-text">Vị trí sân</h3>
                </div>
                <div className="map-preview-container">
                  <div className="map-pin-overlay">
                    <div className="map-pin-logo-box">ACE</div>
                    <div>
                      <span className="map-pin-text">ACE BADMINTON</span>
                      <div style={{ fontSize: '9px', color: '#64748b' }}>2A, Hòa Nam 6...</div>
                    </div>
                  </div>
                  <button
                    className="btn-map-directions"
                    onClick={() => alert('Đang mở bản đồ dẫn đường tới ACE BADMINTON...')}
                  >
                    <Navigation size={14} />
                    <span>Chỉ đường</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section "Sân tương tự gần đây" */}
        <div className="similar-venues-section">
          <div className="section-header">
            <div className="section-title-group">
              <h2>Sân tương tự gần đây</h2>
              <p className="section-subtitle">Các câu lạc bộ chất lượng cao cùng khu vực</p>
            </div>
            <a href="#all" className="link-see-all" onClick={onNavigateHome}>
              <span>Xem tất cả</span>
              <ChevronRight size={16} />
            </a>
          </div>

          <div className="venues-grid">
            {filteredVenues.map((venue) => (
              <div key={venue.id} className="venue-card" onClick={onNavigateHome}>
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
        </div>
      </div>
    </div>
  );
};
