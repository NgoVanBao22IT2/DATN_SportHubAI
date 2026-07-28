import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { type Venue } from '../types/venue';

interface BookingModalProps {
  selectedVenue: Venue | null;
  onClose: () => void;
  bookingConfirmed: boolean;
  setBookingConfirmed: (confirmed: boolean) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  bookingTimeSlot: string;
  setBookingTimeSlot: (slot: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  selectedVenue,
  onClose,
  bookingConfirmed,
  setBookingConfirmed,
  selectedDate,
  setSelectedDate,
  bookingTimeSlot,
  setBookingTimeSlot,
}) => {
  if (!selectedVenue) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} />
        </button>

        {!bookingConfirmed ? (
          <>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px' }}>
              Đặt sân tại {selectedVenue.name}
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
              📍 {selectedVenue.location}
            </p>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>
                CHỌN NGÀY ĐẶT
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '8px' }}>
                CHỌN KHUNG GIỜ GIỜ VÀNG
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {['16:00 - 17:00', '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00', '20:00 - 21:00', '21:00 - 22:00'].map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setBookingTimeSlot(slot)}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      border: bookingTimeSlot === slot ? '2px solid #1989a8' : '1px solid #e2e8f0',
                      background: bookingTimeSlot === slot ? '#e0f2fe' : '#ffffff',
                      color: bookingTimeSlot === slot ? '#0f5b70' : '#475569',
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}>
                <span>Giá thuê sân (1 giờ):</span>
                <span style={{ fontWeight: 700 }}>{selectedVenue.pricePerHour.toLocaleString('vi-VN')} đ</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 800, color: '#f59e0b' }}>
                <span>Tổng cộng:</span>
                <span>{selectedVenue.pricePerHour.toLocaleString('vi-VN')} đ</span>
              </div>
            </div>

            <button
              className="btn-search"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => setBookingConfirmed(true)}
            >
              <CheckCircle2 size={18} />
              <span>Xác nhận đặt sân</span>
            </button>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ width: '64px', height: '64px', background: '#dcfce7', borderRadius: '50%', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px', color: '#0f172a' }}>
              Đặt sân thành công!
            </h3>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
              Yêu cầu đặt {selectedVenue.name} ({bookingTimeSlot}) ngày {selectedDate} đã được ghi nhận.
            </p>
            <button
              className="btn-search"
              style={{ margin: '0 auto' }}
              onClick={onClose}
            >
              Hoàn tất
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
