import React, { useEffect } from 'react';
import { Product } from '../types';
import { useI18n } from '../i18n/I18nProvider';
import { pickText } from '../i18n/text';
import { getCategoryLabel } from '../data/catalogLookup';
import './QuickViewModal.css';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onGoToProduct: (id: number) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onGoToProduct
}) => {
  const { t, lang } = useI18n();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  if (!product) return null;

  const formatPrice = (price: number): string => {
    const locale = lang === 'en' ? 'en-US' : 'uk-UA';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'UAH'
    }).format(price);
  };

  return (
    <div className="quick-view-overlay" onClick={onClose}>
      <div className="quick-view-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="quick-view-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className="quick-view-content">
          <div className="quick-view-image">
            <img
              src={product.image}
              alt={pickText(product.name, lang)}
              loading="lazy"
            />
          </div>
          <div className="quick-view-info">
            <span className="quick-view-category">{getCategoryLabel(product.categoryKey, lang)}</span>
            <h2 className="quick-view-name">{pickText(product.name, lang)}</h2>
            <p className="quick-view-description">{pickText(product.description, lang)}</p>
            <div className="quick-view-price">{formatPrice(product.price)}</div>
            <div className="quick-view-actions">
              <button
                type="button"
                className="quick-view-buy btn-primary"
                onClick={() => onAddToCart(product)}
              >
                {t('product.quickBuy')}
              </button>
              <button
                type="button"
                className="quick-view-full btn-secondary"
                onClick={() => onGoToProduct(product.id)}
              >
                {t('product.addToCart')}
              </button>
            </div>
            <button
              type="button"
              className="quick-view-link"
              onClick={() => onGoToProduct(product.id)}
            >
              {t('product.quickView')} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
