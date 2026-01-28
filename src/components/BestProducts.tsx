import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useI18n } from '../i18n/I18nProvider';
import { pickText } from '../i18n/text';
import './BestProducts.css';

interface BestProductsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const BestProducts: React.FC<BestProductsProps> = ({ products, onAddToCart }) => {
  const navigate = useNavigate();
  const { t, lang } = useI18n();

  const formatPrice = (price: number): string => {
    const locale = lang === 'en' ? 'en-US' : 'uk-UA';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'UAH'
    }).format(price);
  };

  const bestProducts = products.slice(0, 4);

  return (
    <div className="best-products">
      <div className="best-products-header">
        <h2>{t('bestOffers.title')}</h2>
        <button className="view-all-btn" onClick={() => navigate('/')}>
          {t('bestOffers.viewAll').replace(' →', '')}
        </button>
      </div>
      
      <div className="best-products-grid">
        {bestProducts.map((product) => {
          const oldPrice = Math.round(product.price * 1.2);
          const discount = oldPrice - product.price;
          const discountPercent = Math.round((discount / oldPrice) * 100);
          const rating = (4.4 + Math.random() * 0.5).toFixed(1);
          const reviews = Math.floor(Math.random() * 200) + 10;

          return (
            <div
              key={product.id}
              className="best-product-card"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="best-product-image">
                <img src={product.image} alt={pickText(product.name, lang)} />
                <div className="discount-badge">{t('bestOffers.discount')} {discountPercent}%</div>
                <button className="favorite-btn" title={t('bestOffers.favorite')}>❤️</button>
              </div>
              <div className="best-product-info">
                <h4>{pickText(product.name, lang)}</h4>
                <div className="best-product-rating">
                  <span className="rating-stars">{'★'.repeat(Math.floor(parseFloat(rating)))}</span>
                  <span className="rating-value">{rating}</span>
                  <span className="rating-reviews">({reviews})</span>
                </div>
                <div className="best-product-price">
                  <span className="old-price">{formatPrice(oldPrice)}</span>
                  <span className="current-price">{formatPrice(product.price)}</span>
                </div>
                <button
                  className="add-to-cart-best-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                >
                  {t('bestOffers.addToCart')}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
