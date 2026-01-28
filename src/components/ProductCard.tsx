import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useI18n } from '../i18n/I18nProvider';
import { pickText } from '../i18n/text';
import { getCategoryLabel } from '../data/catalogLookup';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  const { t, lang } = useI18n();

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

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-image">
        <img src={product.image} alt={pickText(product.name, lang)} />
        <span className="product-category">{getCategoryLabel(product.categoryKey, lang)}</span>
      </div>
      <div className="product-info">
        <h3 className="product-name">{pickText(product.name, lang)}</h3>
        <p className="product-description">{pickText(product.description, lang)}</p>
        <div className="product-footer">
          <span className="product-price">{formatPrice(product.price)}</span>
          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
          >
            {t('product.addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
};
