import React, { useMemo } from 'react';
import { Product } from '../types';
import { products } from '../data/products';
import { categoriesData } from '../data/categories';
import { BannerSection } from '../components/BannerSection';
import { BestProducts } from '../components/BestProducts';
import { CategorySection } from '../components/CategorySection';
import { ProductOfDay } from '../components/ProductOfDay';
import './HomePage.css';

interface HomePageProps {
  onAddToCart: (product: Product) => void;
  onCatalogClick?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onAddToCart, onCatalogClick }) => {
  const categoryProducts = useMemo(() => {
    const result: Record<string, Product[]> = {};
    
    categoriesData.forEach((category) => {
      const categoryItems = products.filter(
        (p) => p.categoryKey === category.key
      );
      if (categoryItems.length > 0) {
        result[category.key] = categoryItems;
      }
    });
    
    return result;
  }, []);

  // Вибір товару дня (перший товар)
  const productOfDay = products[0];

  return (
    <div className="home-page">
      <div className="home-page-container">
        <div className="home-page-main">
          <BannerSection />

          <div className="main-sections">
            <div className="left-section">
              {productOfDay && (
                <ProductOfDay product={productOfDay} onAddToCart={onAddToCart} />
              )}
              <BestProducts products={products} onAddToCart={onAddToCart} />
              
              {categoriesData.map((category) => {
                const categoryItems = categoryProducts[category.key];
                if (!categoryItems || categoryItems.length === 0) {
                  return null;
                }
                
                return (
                  <CategorySection
                    key={category.key}
                    categoryKey={category.key}
                    categoryLabel={category.label}
                    products={categoryItems}
                    onAddToCart={onAddToCart}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
