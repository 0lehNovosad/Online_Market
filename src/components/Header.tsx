import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../i18n/I18nProvider';
import { products } from '../data/products';
import { categoriesData } from '../data/categories';
import { pickText } from '../i18n/text';
import './Header.css';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onSearch?: (query: string) => void;
  onCatalogClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick, onSearch, onCatalogClick }) => {
  const { lang, setLang, t } = useI18n();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { wishlistIds } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number>(-1);
  const [scrolled, setScrolled] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  type Suggestion =
    | { kind: 'product'; id: number; label: string; subLabel?: string }
    | { kind: 'category'; key: string; label: string; subLabel?: string }
    | { kind: 'search'; label: string };

  const suggestions: Suggestion[] = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length < 2) return [];

    const cats = categoriesData
      .map((c) => ({
        kind: 'category' as const,
        key: c.key,
        label: pickText(c.label, lang),
        subLabel: t('category.catalog')
      }))
      .filter((c) => c.label.toLowerCase().includes(q))
      .slice(0, 4);

    const prods = products
      .map((p) => ({
        kind: 'product' as const,
        id: p.id,
        label: pickText(p.name, lang),
        subLabel: p.brand ? String(p.brand) : undefined
      }))
      .filter((p) => {
        const label = p.label.toLowerCase();
        const brand = (p.subLabel ?? '').toLowerCase();
        return label.includes(q) || brand.includes(q);
      })
      .slice(0, 6);

    const search: Suggestion[] = [{ kind: 'search', label: searchQuery.trim() }];
    return [...cats, ...prods, ...search].slice(0, 10);
  }, [searchQuery, lang, t]);

  const closeSuggest = () => {
    setIsSuggestOpen(false);
    setActiveIdx(-1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
      closeSuggest();
    }
  };

  const commitSuggestion = (s: Suggestion) => {
    if (s.kind === 'product') {
      navigate(`/product/${s.id}`);
      closeSuggest();
      return;
    }
    if (s.kind === 'category') {
      navigate(`/category/${encodeURIComponent(s.key)}`);
      closeSuggest();
      return;
    }
    if (s.kind === 'search') {
      if (onSearch && searchQuery.trim()) {
        onSearch(searchQuery.trim());
      } else {
        navigate(`/category/all?q=${encodeURIComponent(searchQuery.trim())}`);
      }
      closeSuggest();
    }
  };

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      const root = rootRef.current;
      if (!root) return;
      if (e.target instanceof Node && root.contains(e.target)) return;
      closeSuggest();
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
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
          <button className="catalog-btn btn-secondary" onClick={onCatalogClick}>
            <span>☰</span> <span>{t('header.catalog')}</span>
          </button>
          
          <Link to="/" className="logo-link">
            <h1 className="logo">🛍️ {t('header.storeName')}</h1>
          </Link>

          <div className="search-root" ref={rootRef}>
            <form className="search-form" onSubmit={handleSearch} role="search">
            <input
              type="text"
              className="search-input"
              placeholder={t('header.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSuggestOpen(true);
                setActiveIdx(-1);
              }}
              onFocus={() => setIsSuggestOpen(true)}
              onKeyDown={(e) => {
                if (!isSuggestOpen || suggestions.length === 0) return;
                if (e.key === 'Escape') {
                  e.preventDefault();
                  closeSuggest();
                } else if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  setActiveIdx((idx) => Math.min(idx + 1, suggestions.length - 1));
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  setActiveIdx((idx) => Math.max(idx - 1, 0));
                } else if (e.key === 'Enter' && activeIdx >= 0) {
                  e.preventDefault();
                  commitSuggestion(suggestions[activeIdx]);
                }
              }}
            />
            <button type="button" className="search-voice-btn" title={t('header.voiceSearch')}>🎤</button>
            <button type="submit" className="search-btn btn-primary">🔍</button>
            </form>

            {isSuggestOpen && suggestions.length > 0 && (
              <div className="search-suggest" role="listbox" aria-label="Search suggestions">
                {suggestions.map((s, idx) => (
                  <button
                    key={`${s.kind}-${'id' in s ? (s as any).id : ''}${'key' in s ? (s as any).key : ''}-${idx}`}
                    type="button"
                    className={`search-suggest-item ${idx === activeIdx ? 'active' : ''}`}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => commitSuggestion(s)}
                  >
                    <span className="search-suggest-main">
                      {s.kind === 'product' ? '🛍️ ' : s.kind === 'category' ? '📁 ' : '🔎 '}
                      {s.label}
                    </span>
                    {('subLabel' in s && s.subLabel) ? (
                      <span className="search-suggest-sub">{s.subLabel}</span>
                    ) : null}
                  </button>
                ))}
              </div>
            )}
          </div>

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
              <Link to="/login" className="header-login-btn btn-secondary" title={t('header.login')}>
                {t('header.login')}
              </Link>
            )}
            <Link to="/wishlist" className="header-icon-btn" title={t('header.favorites')}>
              ❤️
              {wishlistIds.size > 0 && (
                <span className="wishlist-badge">{wishlistIds.size}</span>
              )}
            </Link>
            <button
              type="button"
              className="header-icon-btn theme-toggle"
              onClick={toggleTheme}
              title={theme === 'dark' ? t('theme.light') : t('theme.dark')}
              aria-label={theme === 'dark' ? t('theme.light') : t('theme.dark')}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button className="cart-button btn-primary" onClick={onCartClick}>
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
