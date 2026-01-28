import React from 'react';
import { useI18n } from '../i18n/I18nProvider';
import './BannerSection.css';

export const BannerSection: React.FC = () => {
  const { lang } = useI18n();
  return (
    <div className="banner-section">
      <div className="banner-grid">
        <div className="banner-card promo">
          <div className="banner-content">
            <h3>{lang === 'en' ? 'Deal!' : 'Акція!'}</h3>
            <p>{lang === 'en' ? 'Up to -40% off' : 'Знижки до -40%'}</p>
            <span className="banner-emoji">🎉</span>
          </div>
        </div>
        <div className="banner-card main">
          <div className="banner-content">
            <h3>{lang === 'en' ? 'New arrivals' : 'Новинки'}</h3>
            <p>{lang === 'en' ? 'Latest products' : 'Останні надходження'}</p>
            <span className="banner-emoji">✨</span>
          </div>
        </div>
        <div className="banner-card sale">
          <div className="banner-content">
            <h3>{lang === 'en' ? 'Sale' : 'Розпродаж'}</h3>
            <p>{lang === 'en' ? 'Outlet items' : 'OUTLET товари'}</p>
            <span className="banner-emoji">🔥</span>
          </div>
        </div>
      </div>
    </div>
  );
};
