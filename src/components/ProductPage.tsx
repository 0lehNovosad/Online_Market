import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { products } from '../data/products';
import { useI18n } from '../i18n/I18nProvider';
import { pickText } from '../i18n/text';
import { getCategoryLabel } from '../data/catalogLookup';
import { Breadcrumbs } from './Breadcrumbs';
import { useToast } from '../context/ToastContext';
import { SkeletonRelatedGrid } from './Skeleton';
import './ProductPage.css';

const RELATED_LOAD_DELAY_MS = 250;

const PRODUCT_FAQ = [
  { q: { uk: 'Яка гарантія на товар?', en: 'What is the warranty?' }, a: { uk: 'Офіційна гарантія виробника 12–24 міс.', en: 'Official manufacturer warranty 12–24 months.' } },
  { q: { uk: 'Чи можлива доставка в інше місто?', en: 'Is delivery to another city possible?' }, a: { uk: 'Так, доставка по всій Україні.', en: 'Yes, delivery across Ukraine.' } },
  { q: { uk: 'Як повернути товар?', en: 'How to return the product?' }, a: { uk: 'В межах 14 днів з чеком та упаковкою.', en: 'Within 14 days with receipt and packaging.' } },
];

interface ProductPageProps {
  onAddToCart: (product: Product) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, lang } = useI18n();
  const { showToast } = useToast();
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [relatedLoading, setRelatedLoading] = useState(true);

  const product = products.find((p) => p.id === Number(id));

  useEffect(() => {
    setRelatedLoading(true);
    const timer = setTimeout(() => setRelatedLoading(false), RELATED_LOAD_DELAY_MS);
    return () => clearTimeout(timer);
  }, [id]);

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
        <Breadcrumbs
          items={[
            { label: t('bottomNav.home'), to: '/' },
            { label: t('category.catalog'), to: '/category/all' },
            { label: getCategoryLabel(product.categoryKey, lang), to: `/category/${encodeURIComponent(product.categoryKey)}` },
            { label: pickText(product.name, lang) }
          ]}
        />
        <button onClick={() => navigate('/')} className="back-button">
          ← {t('product.backToCatalog')}
        </button>
        
        <div className="product-details">
          <div className="product-details-image product-gallery">
            <div className="product-gallery-zoom">
              <img
                src={product.image}
                alt={pickText(product.name, lang)}
                loading="lazy"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>
          
          <div className="product-details-info product-details-sticky">
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
                className="add-to-cart-large-btn btn-primary"
                onClick={() => {
                  onAddToCart(product);
                  showToast(t('product.addedToCart'), 'success');
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

        {/* FAQ */}
        <div className="product-faq-section">
          <h2 className="product-faq-title">{t('product.faq.title')}</h2>
          <div className="product-faq-list">
            {PRODUCT_FAQ.map((item, idx) => (
              <div key={idx} className={`product-faq-item ${faqOpen === idx ? 'open' : ''}`}>
                <button
                  type="button"
                  className="product-faq-question"
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                >
                  {pickText(item.q, lang)}
                  <span className="product-faq-icon">+</span>
                </button>
                <div className="product-faq-answer">
                  <p>{pickText(item.a, lang)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bought together */}
        <div className="product-bought-together">
          <h2>{t('product.boughtTogether.title')}</h2>
          {relatedLoading ? (
            <SkeletonRelatedGrid count={3} className="bought-together-grid" />
          ) : (
            <div className="bought-together-grid">
              {products
                .filter((p) => p.categoryKey === product.categoryKey && p.id !== product.id)
                .slice(0, 3)
                .map((p) => (
                  <div key={p.id} className="bought-together-card" onClick={() => navigate(`/product/${p.id}`)}>
                    <img src={p.image} alt={pickText(p.name, lang)} loading="lazy" />
                    <span className="bought-together-name">{pickText(p.name, lang)}</span>
                    <span className="bought-together-price">{formatPrice(p.price)}</span>
                    <button
                      type="button"
                      className="btn-primary bought-together-add"
                      onClick={(e) => { e.stopPropagation(); onAddToCart(p); showToast(t('product.addedToCart'), 'success'); }}
                    >
                      {t('product.addToCart')}
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Reviews Section */}
        <div className="product-reviews-section">
          <div className="product-reviews-header">
            <h2>{t('product.reviews.title')}</h2>
            <div className="product-rating-summary">
              <span className="rating-stars-large">{'★'.repeat(5)}</span>
              <span className="rating-value-large">4.7</span>
              <span className="rating-count">(24 {lang === 'en' ? 'reviews' : 'відгуків'})</span>
            </div>
          </div>
          <div className="reviews-list">
            {[
              { name: 'Олександр П.', rating: 5, date: '15.01.2024', text: 'Чудовий товар! Якість на висоті, все працює як треба. Рекомендую!' },
              { name: 'Марія К.', rating: 4, date: '12.01.2024', text: 'Дуже задоволена покупкою. Швидка доставка, товар відповідає опису.' },
              { name: 'Дмитро В.', rating: 5, date: '10.01.2024', text: 'Відмінна якість за свою ціну. Обов\'язково куплю ще щось у цьому магазині.' }
            ].map((review, idx) => (
              <div key={idx} className="review-item">
                <div className="review-header">
                  <div className="review-author">{review.name}</div>
                  <div className="review-rating">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
                  <div className="review-date">{review.date}</div>
                </div>
                <div className="review-text">{review.text}</div>
              </div>
            ))}
          </div>
          <button className="write-review-btn btn-secondary">{t('product.reviews.write')}</button>
        </div>

        {/* Recommended Products */}
        <div className="product-recommended-section">
          <h2>{t('product.recommended.title')}</h2>
          {relatedLoading ? (
            <SkeletonRelatedGrid count={4} className="recommended-products-grid" />
          ) : (
            <div className="recommended-products-grid">
              {products
                .filter(p => p.categoryKey === product.categoryKey && p.id !== product.id)
                .slice(0, 4)
                .map((recProduct) => (
                  <div key={recProduct.id} className="recommended-product-card" onClick={() => navigate(`/product/${recProduct.id}`)}>
                    <img src={recProduct.image} alt={pickText(recProduct.name, lang)} loading="lazy" />
                    <h4>{pickText(recProduct.name, lang)}</h4>
                    <div className="recommended-product-price">{formatPrice(recProduct.price)}</div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
