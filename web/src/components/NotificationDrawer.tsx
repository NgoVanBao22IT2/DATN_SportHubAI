import React from 'react';
import { X } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '400px', margin: '0 20px 0 auto', height: '100vh', borderRadius: '0' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} />
        </button>
        <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px' }}>Thông báo mới (3)</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ padding: '12px', background: '#f0f9ff', borderRadius: '10px', borderLeft: '4px solid #1989a8' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Đặt lịch thành công</p>
            <p style={{ fontSize: '12px', color: '#64748b' }}>Sân ACE BADMINTON lúc 18:00 hôm nay.</p>
          </div>
          <div style={{ padding: '12px', background: '#fff7ed', borderRadius: '10px', borderLeft: '4px solid #f59e0b' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Ghép kèo AI mới</p>
            <p style={{ fontSize: '12px', color: '#64748b' }}>Có 2 đối thủ muốn ghép trận Cầu Lông.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
