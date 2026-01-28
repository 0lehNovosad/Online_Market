import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../i18n/I18nProvider';
import './BottomNav.css';

interface BottomNavProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ cartItemCount, onCartClick }) => {
  const location = useLocation();
  const { t } = useI18n();
  const { isAuthenticated } = useAuth();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bottom-nav">
      <Link to="/" className={`bottom-nav-item ${isActive('/') ? 'active' : ''}`}>
        <span className="bottom-nav-icon">🏠</span>
        <span className="bottom-nav-label">{t('bottomNav.home')}</span>
      </Link>
      
      <button 
        className={`bottom-nav-item ${isActive('/category') ? 'active' : ''}`}
        onClick={() => {
          const event = new CustomEvent('openCatalog');
          window.dispatchEvent(event);
        }}
        type="button"
      >
        <span className="bottom-nav-icon">📋</span>
        <span className="bottom-nav-label">{t('bottomNav.catalog')}</span>
      </button>
      
      <button 
        className={`bottom-nav-item ${isActive('/checkout') ? 'active' : ''}`}
        onClick={onCartClick}
      >
        <span className="bottom-nav-icon">🛒</span>
        <span className="bottom-nav-label">{t('bottomNav.cart')}</span>
        {cartItemCount > 0 && (
          <span className="bottom-nav-badge">{cartItemCount}</span>
        )}
      </button>
      
      <Link to="/wishlist" className={`bottom-nav-item ${isActive('/wishlist') ? 'active' : ''}`}>
        <span className="bottom-nav-icon">❤️</span>
        <span className="bottom-nav-label">{t('bottomNav.favorites')}</span>
      </Link>
      
      <Link 
        to={isAuthenticated ? '/profile' : '/login'} 
        className={`bottom-nav-item ${isActive('/profile') || isActive('/login') ? 'active' : ''}`}
      >
        <span className="bottom-nav-icon">👤</span>
        <span className="bottom-nav-label">{t('bottomNav.account')}</span>
      </Link>
    </nav>
  );
};
