import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n/I18nProvider';
import './BannerSection.css';

export const BannerSection: React.FC = () => {
  const { lang } = useI18n();
  const navigate = useNavigate();

  return (
    <div className="banner-section">
      <div className="banner-grid">
        <div className="banner-card promo" onClick={() => navigate('/category/all')}>
          <div className="banner-content">
            <h3>{lang === 'en' ? 'Deal!' : 'Акція!'}</h3>
            <p>{lang === 'en' ? 'Up to -40% off' : 'Знижки до -40%'}</p>
            <button className="banner-cta-btn btn-primary" onClick={(e) => { e.stopPropagation(); navigate('/category/all'); }}>
              {lang === 'en' ? 'Shop Now' : 'Купити зараз'}
            </button>
            <span className="banner-emoji">🎉</span>
          </div>
        </div>
        <div className="banner-card main" onClick={() => navigate('/category/all')}>
          <div className="banner-content">
            <h3>{lang === 'en' ? 'New arrivals' : 'Новинки'}</h3>
            <p>{lang === 'en' ? 'Latest products' : 'Останні надходження'}</p>
            <button className="banner-cta-btn btn-primary" onClick={(e) => { e.stopPropagation(); navigate('/category/all'); }}>
              {lang === 'en' ? 'View All' : 'Дивитися всі'}
            </button>
            <span className="banner-emoji">✨</span>
          </div>
        </div>
        <div className="banner-card sale" onClick={() => navigate('/category/all')}>
          <div className="banner-content">
            <h3>{lang === 'en' ? 'Sale' : 'Розпродаж'}</h3>
            <p>{lang === 'en' ? 'Outlet items' : 'OUTLET товари'}</p>
            <button className="banner-cta-btn btn-primary" onClick={(e) => { e.stopPropagation(); navigate('/category/all'); }}>
              {lang === 'en' ? 'Shop Sale' : 'Купити'}
            </button>
            <span className="banner-emoji">🔥</span>
          </div>
        </div>
      </div>
    </div>
  );
};
