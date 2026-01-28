import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useI18n } from '../i18n/I18nProvider';
import { pickText } from '../i18n/text';
import './ProductOfDay.css';

interface ProductOfDayProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductOfDay: React.FC<ProductOfDayProps> = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  const { t, lang } = useI18n();
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 14,
    minutes: 33
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes } = prev;
        
        if (minutes > 0) {
          minutes--;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
        }
        
        return { days, hours, minutes };
      });
    }, 60000); // Оновлюємо кожну хвилину

    return () => clearInterval(timer);
  }, []);

  const formatPrice = (price: number): string => {
    const locale = lang === 'en' ? 'en-US' : 'uk-UA';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'UAH',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const oldPrice = Math.round(product.price * 1.4);
  const discount = oldPrice - product.price;
  const rating = 5;
  const reviews = 11;

  return (
    <div className="product-of-day">
      <div className="product-of-day-header">
        <h2 className="product-of-day-title">{t('productOfDay.title')}</h2>
        <div className="product-of-day-timer">
          <span>{String(timeLeft.days).padStart(2, '0')} {t('productOfDay.day')}</span>
          <span>{String(timeLeft.hours).padStart(2, '0')} {t('productOfDay.hours')}</span>
          <span>{String(timeLeft.minutes).padStart(2, '0')} {t('productOfDay.minutes')}</span>
        </div>
      </div>

      <div className="product-of-day-grid">
        <div
          className="product-of-day-card"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <div className="product-of-day-image-wrapper">
            <img
              src={product.image}
              alt={pickText(product.name, lang)}
              className="product-of-day-image"
            />
            <div className="product-of-day-discount">
              -{formatPrice(discount)}
            </div>
          </div>

          <div className="product-of-day-info">
            <h3 className="product-of-day-name">{pickText(product.name, lang)}</h3>

            <div className="product-of-day-rating">
              <span className="rating-stars">★★★★★</span>
              <span className="rating-value">{rating}</span>
              <span className="rating-reviews">({reviews})</span>
            </div>

            <div className="product-of-day-price">
              <span className="old-price">{formatPrice(oldPrice)}</span>
              <span className="current-price">{formatPrice(product.price)}</span>
            </div>

            <button
              className="product-of-day-cart-btn"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
            >
              🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
