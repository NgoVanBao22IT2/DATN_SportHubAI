import React from 'react';
import { Globe, Mail, Phone } from 'lucide-react';

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateDetails: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateHome, onNavigateDetails }) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>SportHubAI</h3>
            <p>Nền tảng đặt sân và kết nối cộng đồng thể thao hàng đầu Việt Nam ứng dụng công nghệ AI.</p>
            <div className="social-links">
              <a href="#globe" className="social-icon"><Globe size={18} /></a>
              <a href="#mail" className="social-icon"><Mail size={18} /></a>
              <a href="#phone" className="social-icon"><Phone size={18} /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Dịch vụ</h4>
            <ul>
              <li><a href="#venues" onClick={onNavigateHome}>Đặt sân bóng đá</a></li>
              <li><a href="#venues" onClick={onNavigateHome}>Đặt sân Pickleball</a></li>
              <li><a href="#venues" onClick={onNavigateDetails}>Đặt sân cầu lông</a></li>
              <li><a href="#venues" onClick={onNavigateHome}>Đặt sân quần vợt</a></li>
              <li><a href="#venues" onClick={onNavigateHome}>Đặt sân bóng rổ</a></li>
              <li><a href="#venues" onClick={onNavigateHome}>Đặt sân bóng chuyền</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Công ty</h4>
            <ul>
              <li><a href="#about">Về chúng tôi</a></li>
              <li><a href="#news">Tin tức</a></li>
              <li><a href="#contact">Liên hệ</a></li>
              <li><a href="#careers">Hợp tác</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Chính sách</h4>
            <ul>
              <li><a href="#terms">Điều khoản</a></li>
              <li><a href="#privacy">Bảo mật</a></li>
              <li><a href="#support">Trung tâm hỗ trợ</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 SportHubAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
