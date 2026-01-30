import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useI18n } from '../i18n/I18nProvider';
import { ProductCard } from './ProductCard';
import './BestProducts.css';

interface BestProductsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export const BestProducts: React.FC<BestProductsProps> = ({ products, onAddToCart, onQuickView }) => {
  const navigate = useNavigate();
  const { t } = useI18n();

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
        {bestProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
          />
        ))}
      </div>
    </div>
  );
};
