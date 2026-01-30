import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useI18n } from '../i18n/I18nProvider';
import { pickText } from '../i18n/text';
import { ProductCard } from './ProductCard';
import './CategorySection.css';

interface CategorySectionProps {
  categoryKey: string;
  categoryLabel: { uk: string; en: string };
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  categoryKey,
  categoryLabel,
  products,
  onAddToCart,
  onQuickView
}) => {
  const navigate = useNavigate();
  const { t, lang } = useI18n();

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
        <button className="category-view-all-btn btn-secondary" onClick={handleViewAll}>
          {t('bestOffers.viewAll').replace(' →', '')}
        </button>
      </div>
      <div className="category-products-grid">
        {displayProducts.map((product) => (
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
