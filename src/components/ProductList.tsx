import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { useI18n } from '../i18n/I18nProvider';
import './ProductList.css';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  const { t } = useI18n();
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
            />
          ))}
        </div>
      )}
    </div>
  );
};
