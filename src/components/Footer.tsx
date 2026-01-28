import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nProvider';
import './Footer.css';

export const Footer: React.FC = () => {
  const { t, lang } = useI18n();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>{lang === 'en' ? 'About' : 'Про магазин'}</h3>
            <p>{lang === 'en' ? 'Your trusted online store for quality products' : 'Ваш надійний інтернет-магазин якісних товарів'}</p>
            <div className="footer-security">
              <span className="security-badge">🔒 {lang === 'en' ? 'Secure Payment' : 'Безпечна оплата'}</span>
              <span className="security-badge">✓ {lang === 'en' ? 'SSL Encrypted' : 'SSL Захист'}</span>
            </div>
          </div>

          <div className="footer-section">
            <h3>{lang === 'en' ? 'Information' : 'Інформація'}</h3>
            <ul className="footer-links">
              <li><Link to="/">{lang === 'en' ? 'Delivery' : 'Доставка'}</Link></li>
              <li><Link to="/">{lang === 'en' ? 'Returns' : 'Повернення'}</Link></li>
              <li><Link to="/">{lang === 'en' ? 'Warranty' : 'Гарантія'}</Link></li>
              <li><Link to="/">{lang === 'en' ? 'Privacy Policy' : 'Політика конфіденційності'}</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>{lang === 'en' ? 'Customer Service' : 'Служба підтримки'}</h3>
            <ul className="footer-links">
              <li><Link to="/">{lang === 'en' ? 'Help Center' : 'Центр допомоги'}</Link></li>
              <li><Link to="/">{lang === 'en' ? 'Contact Us' : 'Контакти'}</Link></li>
              <li><Link to="/">{lang === 'en' ? 'FAQ' : 'Питання та відповіді'}</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>{lang === 'en' ? 'Follow Us' : 'Ми в соцмережах'}</h3>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="Telegram">✈️</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {t('header.storeName')}. {lang === 'en' ? 'All rights reserved.' : 'Всі права захищені.'}</p>
        </div>
      </div>
    </footer>
  );
};
