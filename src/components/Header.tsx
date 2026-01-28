import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../i18n/I18nProvider';
import './Header.css';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onSearch?: (query: string) => void;
  onCatalogClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick, onSearch, onCatalogClick }) => {
  const { lang, setLang, t } = useI18n();
  const { user, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-top-container">
          <nav className="header-nav">
            <Link to="/" className="nav-link">{t('nav.promos')}</Link>
            <Link to="/" className="nav-link">{t('nav.delivery')}</Link>
            <Link to="/" className="nav-link">{t('nav.returns')}</Link>
            <Link to="/" className="nav-link">{t('nav.help')}</Link>
          </nav>
        </div>
      </div>
      <div className="header-main">
        <div className="header-container">
          <button className="catalog-btn" onClick={onCatalogClick}>
            <span>☰</span> <span>{t('header.catalog')}</span>
          </button>
          
          <Link to="/" className="logo-link">
            <h1 className="logo">🛍️ {t('header.storeName')}</h1>
          </Link>

          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              className="search-input"
              placeholder={t('header.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="button" className="search-voice-btn" title={t('header.voiceSearch')}>🎤</button>
            <button type="submit" className="search-btn">🔍</button>
          </form>

          <div className="header-actions">
            <div className="lang-switch" title="Language">
              <button
                className={`lang-btn ${lang === 'uk' ? 'active' : ''}`}
                onClick={() => setLang('uk')}
                type="button"
              >
                UA
              </button>
              <button
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => setLang('en')}
                type="button"
              >
                EN
              </button>
            </div>

            {isAuthenticated ? (
              <Link to="/profile" className="header-icon-btn profile-link" title={t('header.profile')}>
                {user?.avatar ? (
                  <img src={user.avatar} alt="Профіль" className="header-avatar" />
                ) : (
                  <span>👤</span>
                )}
              </Link>
            ) : (
              <Link to="/login" className="header-login-btn" title={t('header.login')}>
                {t('header.login')}
              </Link>
            )}
            <button className="header-icon-btn" title={t('header.favorites')}>
              ❤️
            </button>
            <button className="cart-button" onClick={onCartClick}>
              🛒 {t('header.cart')}
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
