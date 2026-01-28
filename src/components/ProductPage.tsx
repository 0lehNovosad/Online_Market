import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { products } from '../data/products';
import { useI18n } from '../i18n/I18nProvider';
import { pickText } from '../i18n/text';
import { getCategoryLabel } from '../data/catalogLookup';
import './ProductPage.css';

interface ProductPageProps {
  onAddToCart: (product: Product) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, lang } = useI18n();
  
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="product-page">
        <div className="product-not-found">
          <h2>{t('product.notFound')}</h2>
          <button onClick={() => navigate('/')} className="back-button">
            {t('product.backToCatalog')}
          </button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number): string => {
    const locale = lang === 'en' ? 'en-US' : 'uk-UA';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'UAH'
    }).format(price);
  };

  return (
    <div className="product-page">
      <div className="product-page-container">
        <button onClick={() => navigate('/')} className="back-button">
          ← {t('product.backToCatalog')}
        </button>
        
        <div className="product-details">
          <div className="product-details-image">
            <img src={product.image} alt={pickText(product.name, lang)} />
          </div>
          
          <div className="product-details-info">
            <span className="product-details-category">{getCategoryLabel(product.categoryKey, lang)}</span>
            <h1 className="product-details-name">{pickText(product.name, lang)}</h1>
            <p className="product-details-description">{pickText(product.description, lang)}</p>
            
            {product.fullDescription && (
              <div className="product-details-full-description">
                <p>{pickText(product.fullDescription, lang)}</p>
              </div>
            )}
            
            <div className="product-details-price-section">
              <span className="product-details-price">{formatPrice(product.price)}</span>
            </div>
            
            <div className="product-details-actions">
              <button
                className="add-to-cart-large-btn"
                onClick={() => {
                  onAddToCart(product);
                  alert(t('product.addedToCart'));
                }}
              >
                {t('product.addToCart')}
              </button>
            </div>
            
            <div className="product-details-specs">
              <h3>{t('product.specs')}</h3>
              <div className="specs-list">
                {product.specs && product.specs.length > 0 ? (
                  product.specs.map((spec, index) => (
                    <div key={index} className="spec-item">
                      <span className="spec-label">{pickText(spec.label, lang)}</span>
                      <span className="spec-value">{pickText(spec.value, lang)}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="spec-item">
                      <span className="spec-label">{t('product.spec.category')}</span>
                      <span className="spec-value">{getCategoryLabel(product.categoryKey, lang)}</span>
                    </div>
                    {product.brand && (
                      <div className="spec-item">
                        <span className="spec-label">{t('product.spec.brand')}</span>
                        <span className="spec-value">{product.brand}</span>
                      </div>
                    )}
                    <div className="spec-item">
                      <span className="spec-label">{t('product.spec.price')}</span>
                      <span className="spec-value">{formatPrice(product.price)}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">{t('product.spec.id')}</span>
                      <span className="spec-value">#{product.id}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
