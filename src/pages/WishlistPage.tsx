import React from 'react';
import { Product } from '../types';
import { products } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import { ProductList } from '../components/ProductList';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useI18n } from '../i18n/I18nProvider';
import './WishlistPage.css';

interface WishlistPageProps {
  onAddToCart: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({ onAddToCart, onQuickView }) => {
  const { t } = useI18n();
  const { wishlistIds } = useWishlist();
  const wishlistProducts = products.filter((p) => wishlistIds.has(p.id));

  return (
    <div className="wishlist-page">
      <div className="page-container wishlist-container">
        <Breadcrumbs
          items={[
            { label: t('bottomNav.home'), to: '/' },
            { label: t('wishlist.title') }
          ]}
        />
        <h1 className="wishlist-title">{t('wishlist.title')}</h1>
        {wishlistProducts.length === 0 ? (
          <div className="wishlist-empty">
            <p>{t('wishlist.empty')}</p>
            <a href="/category/all" className="btn-primary">{t('category.catalog')}</a>
          </div>
        ) : (
          <ProductList
            products={wishlistProducts}
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
          />
        )}
      </div>
    </div>
  );
};
