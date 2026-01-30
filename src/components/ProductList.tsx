import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { useI18n } from '../i18n/I18nProvider';
import { SkeletonProductGrid } from './Skeleton';
import './ProductList.css';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  /** Показувати скелетони замість списку (стан завантаження) */
  loading?: boolean;
  /** Кількість скелетонів при loading (за замовчуванням 8) */
  skeletonCount?: number;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  onAddToCart,
  onQuickView,
  loading = false,
  skeletonCount = 8
}) => {
  const { t } = useI18n();

  if (loading) {
    return (
      <div className="product-list-container">
        <h2 className="section-title">{t('products.catalogTitle')}</h2>
        <SkeletonProductGrid count={skeletonCount} />
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <h2 className="section-title">{t('products.catalogTitle')}</h2>
      {products.length === 0 ? (
        <div className="no-products">
          <p>{t('products.notFound')}</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      )}
    </div>
  );
};
