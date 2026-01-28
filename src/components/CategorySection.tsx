import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useI18n } from '../i18n/I18nProvider';
import { pickText } from '../i18n/text';
import './CategorySection.css';

interface CategorySectionProps {
  categoryKey: string;
  categoryLabel: { uk: string; en: string };
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  categoryKey,
  categoryLabel,
  products,
  onAddToCart
}) => {
  const navigate = useNavigate();
  const { t, lang } = useI18n();

  const formatPrice = (price: number): string => {
    const locale = lang === 'en' ? 'en-US' : 'uk-UA';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'UAH',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // Показуємо максимум 4 товари
  const displayProducts = products.slice(0, 4);

  if (displayProducts.length === 0) {
    return null;
  }

  const handleViewAll = () => {
    navigate(`/category/${categoryKey}`);
  };

  return (
    <div className="category-section">
      <div className="category-section-header">
        <h2 className="category-section-title">{pickText(categoryLabel, lang)}</h2>
        <button className="category-view-all-btn" onClick={handleViewAll}>
          {t('bestOffers.viewAll').replace(' →', '')}
        </button>
      </div>

      <div className="category-products-grid">
        {displayProducts.map((product) => {
          const oldPrice = Math.round(product.price * 1.15);
          const discount = oldPrice - product.price;
          const discountAmount = formatPrice(discount);
          const rating = (4.4 + Math.random() * 0.5).toFixed(1);
          const reviews = Math.floor(Math.random() * 200) + 10;

          return (
            <div
              key={product.id}
              className="category-product-card"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="category-product-image-wrapper">
                <img
                  src={product.image}
                  alt={pickText(product.name, lang)}
                  className="category-product-image"
                />
                {discount > 0 && (
                  <div className="category-discount-badge">
                    {t('bestOffers.discount')} {discountAmount}
                  </div>
                )}
                <button
                  className="category-favorite-btn"
                  title={t('bestOffers.favorite')}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  ❤️
                </button>
              </div>

              <div className="category-product-info">
                <h3 className="category-product-name">{pickText(product.name, lang)}</h3>

                <div className="category-product-rating">
                  <span className="rating-stars">{'★'.repeat(Math.floor(parseFloat(rating)))}</span>
                  <span className="rating-value">{rating}</span>
                  <span className="rating-reviews">({reviews})</span>
                </div>

                <div className="category-product-delivery">
                  {t('category.delivery')} {t('category.deliveryPrice')}
                </div>

                <div className="category-product-price">
                  {discount > 0 && (
                    <span className="category-old-price">{formatPrice(oldPrice)}</span>
                  )}
                  <span className="category-current-price">{formatPrice(product.price)}</span>
                </div>

                <div className="category-product-bonus">
                  +{Math.round(product.price * 0.01)}₴ {t('category.bonus')}
                </div>

                <button
                  className="category-add-to-cart-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                >
                  🛒 {t('bestOffers.addToCart')}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
