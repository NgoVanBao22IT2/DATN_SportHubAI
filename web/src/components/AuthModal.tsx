import React from 'react';
import { X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  authMode,
  setAuthMode,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} />
        </button>
        <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px' }}>
          {authMode === 'login' ? 'Đăng nhập SportHubAI' : 'Tạo tài khoản mới'}
        </h3>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
          {authMode === 'login' ? 'Nhập tài khoản để tiếp tục trải nghiệm dịch vụ đặt sân.' : 'Tham gia cộng đồng thể thao hàng đầu Việt Nam.'}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
          <input type="email" placeholder="Email của bạn" style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
          <input type="password" placeholder="Mật khẩu" style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
        </div>
        <button
          className="btn-search"
          style={{ width: '100%', justifyContent: 'center', marginBottom: '16px' }}
          onClick={() => {
            alert(authMode === 'login' ? 'Đăng nhập thành công!' : 'Đăng ký tài khoản thành công!');
            onClose();
          }}
        >
          <span>{authMode === 'login' ? 'Đăng nhập' : 'Đăng ký ngay'}</span>
        </button>
        <div style={{ textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
          {authMode === 'login' ? (
            <>Chưa có tài khoản? <span style={{ color: '#1989a8', fontWeight: 700, cursor: 'pointer' }} onClick={() => setAuthMode('register')}>Đăng ký ngay</span></>
          ) : (
            <>Đã có tài khoản? <span style={{ color: '#1989a8', fontWeight: 700, cursor: 'pointer' }} onClick={() => setAuthMode('login')}>Đăng nhập</span></>
          )}
        </div>
      </div>
    </div>
  );
};
