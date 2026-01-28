import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useI18n } from '../i18n/I18nProvider';
import { pickText } from '../i18n/text';
import { getCategoryLabel } from '../data/catalogLookup';
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

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-image">
        <img
          src={product.image}
          alt={pickText(product.name, lang)}
          loading="lazy"
          decoding="async"
        />
        <span className="product-category">{getCategoryLabel(product.categoryKey, lang)}</span>
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
        <p className="product-description">{pickText(product.description, lang)}</p>
        <div className="product-footer">
          <span className="product-price">{formatPrice(product.price)}</span>
          <div className="product-actions">
            <button
              className="quick-buy-btn btn-primary"
              onClick={handleAddToCart}
            >
              {t('product.quickBuy')}
            </button>
            <button
              className="add-to-cart-btn btn-secondary"
              onClick={handleAddToCart}
            >
              {t('product.addToCart')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
