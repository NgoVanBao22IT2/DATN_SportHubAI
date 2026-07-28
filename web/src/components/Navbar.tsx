import React from 'react';
import { Bell, X } from 'lucide-react';

interface NavbarProps {
  activeNavTab: 'home' | 'datsan' | 'khampha' | 'bando' | 'noibat';
  setActiveNavTab: (tab: 'home' | 'datsan' | 'khampha' | 'bando' | 'noibat') => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showNotificationDrawer: boolean;
  setShowNotificationDrawer: (show: boolean) => void;
  onOpenAuthModal: (mode: 'login' | 'register') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeNavTab,
  setActiveNavTab,
  mobileNavOpen,
  setMobileNavOpen,
  showNotificationDrawer,
  setShowNotificationDrawer,
  onOpenAuthModal,
}) => {
  const closeMobileNav = () => setMobileNavOpen(false);

  return (
    <>
      {/* MOBILE NAV OVERLAY */}
      <div className={`mobile-nav ${mobileNavOpen ? 'open' : ''}`}>
        <button
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '8px',
            color: '#fff',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={closeMobileNav}
        >
          <X size={20} />
        </button>
        <a
          href="#home"
          className={`nav-link ${activeNavTab === 'home' ? 'active' : ''}`}
          onClick={() => {
            setActiveNavTab('home');
            closeMobileNav();
          }}
        >
          Trang chủ
        </a>
        <a
          href="#datsan"
          className={`nav-link ${activeNavTab === 'datsan' ? 'active' : ''}`}
          onClick={() => {
            setActiveNavTab('datsan');
            closeMobileNav();
          }}
        >
          Đặt sân
        </a>
        <a
          href="#khampha"
          className={`nav-link ${activeNavTab === 'khampha' ? 'active' : ''}`}
          onClick={() => {
            setActiveNavTab('khampha');
            closeMobileNav();
          }}
        >
          Khám phá
        </a>
        <a
          href="#bando"
          className={`nav-link ${activeNavTab === 'bando' ? 'active' : ''}`}
          onClick={() => {
            setActiveNavTab('bando');
            closeMobileNav();
          }}
        >
          Bản đồ
        </a>
        <a
          href="#noibat"
          className={`nav-link ${activeNavTab === 'noibat' ? 'active' : ''}`}
          onClick={() => {
            setActiveNavTab('noibat');
            closeMobileNav();
          }}
        >
          Nổi bật
        </a>
        <div className="mobile-nav-actions">
          <button
            className="btn-login"
            onClick={() => {
              onOpenAuthModal('login');
              closeMobileNav();
            }}
          >
            Đăng nhập
          </button>
          <button
            className="btn-register"
            onClick={() => {
              onOpenAuthModal('register');
              closeMobileNav();
            }}
          >
            Đăng ký
          </button>
        </div>
      </div>

      {/* NAVBAR */}
      <header className="navbar">
        <div className="container navbar-inner">
          <div className="logo-group" onClick={() => setActiveNavTab('home')}>
            <div className="logo-icon-wrap">
              <span style={{ fontSize: '20px' }}>🏸</span>
            </div>
            <span className="logo-text">
              SportHub<span>AI</span>
            </span>
          </div>

          <nav className="nav-links">
            <a
              href="#home"
              className={`nav-link ${activeNavTab === 'home' ? 'active' : ''}`}
              onClick={() => setActiveNavTab('home')}
            >
              Trang chủ
            </a>
            <a
              href="#datsan"
              className={`nav-link ${activeNavTab === 'datsan' ? 'active' : ''}`}
              onClick={() => setActiveNavTab('datsan')}
            >
              Đặt sân
            </a>
            <a
              href="#khampha"
              className={`nav-link ${activeNavTab === 'khampha' ? 'active' : ''}`}
              onClick={() => setActiveNavTab('khampha')}
            >
              Khám phá
            </a>
            <a
              href="#bando"
              className={`nav-link ${activeNavTab === 'bando' ? 'active' : ''}`}
              onClick={() => setActiveNavTab('bando')}
            >
              Bản đồ
            </a>
            <a
              href="#noibat"
              className={`nav-link ${activeNavTab === 'noibat' ? 'active' : ''}`}
              onClick={() => setActiveNavTab('noibat')}
            >
              Nổi bật
            </a>
          </nav>

          <div className="nav-actions">
            <button className="btn-login" onClick={() => onOpenAuthModal('login')}>
              Đăng nhập
            </button>
            <button className="btn-register" onClick={() => onOpenAuthModal('register')}>
              Đăng ký
            </button>
            <button
              className="btn-icon-bell"
              onClick={() => setShowNotificationDrawer(!showNotificationDrawer)}
              title="Thông báo"
            >
              <Bell size={18} />
              <span className="bell-badge" />
            </button>
          </div>

          {/* Hamburger — visible on mobile only */}
          <button
            className={`hamburger ${mobileNavOpen ? 'open' : ''}`}
            onClick={() => setMobileNavOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
    </>
  );
};
