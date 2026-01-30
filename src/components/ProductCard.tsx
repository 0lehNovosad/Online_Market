import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useI18n } from '../i18n/I18nProvider';
import { pickText } from '../i18n/text';
import { useWishlist } from '../context/WishlistContext';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onQuickView }) => {
  const navigate = useNavigate();
  const { t, lang } = useI18n();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const formatPrice = (price: number): string => {
    const locale = lang === 'en' ? 'en-US' : 'uk-UA';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'UAH'
    }).format(price);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickView?.(product);
  };

  const inWishlist = isInWishlist(product.id);

  const oldPrice = Math.round(product.price * 1.22);
  const discountPercent = Math.round(((oldPrice - product.price) / oldPrice) * 100);
  const rating = (4.2 + (product.id % 8) / 10).toFixed(1);
  const reviewCount = 30 + (product.id % 100);

  return (
    <div className="product-card product-card--v2" onClick={handleCardClick}>
      <div className="product-image">
        <img
          src={product.image}
          alt={pickText(product.name, lang)}
          loading="lazy"
          decoding="async"
        />
        <span className="product-benefit-badge">
          {t('product.benefit')} {discountPercent}%
        </span>
        <button
          type="button"
          className={`product-wishlist-btn ${inWishlist ? 'active' : ''}`}
          onClick={handleWishlist}
          title={t('header.favorites')}
          aria-label={t('header.favorites')}
        >
          {inWishlist ? '❤️' : '🤍'}
        </button>
        {onQuickView && (
          <button
            type="button"
            className="product-quick-view-btn"
            onClick={handleQuickView}
            title={t('product.quickView')}
          >
            {t('product.quickView')}
          </button>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-name">{pickText(product.name, lang)}</h3>
        <div className="product-rating">
          <span className="product-rating-stars">{'★'.repeat(Math.floor(parseFloat(rating)))}</span>
          <span className="product-rating-value">{rating}</span>
          <span className="product-rating-count">({reviewCount})</span>
        </div>
        <div className="product-prices">
          <span className="product-old-price">{formatPrice(oldPrice)}</span>
          <span className="product-price">{formatPrice(product.price)}</span>
        </div>
        <button
          type="button"
          className="product-add-cart-btn"
          onClick={handleAddToCart}
        >
          {t('product.addToCart').toUpperCase()}
        </button>
      </div>
    </div>
  );
};
