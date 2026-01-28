import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categoriesData } from '../data/categories';
import { useI18n } from '../i18n/I18nProvider';
import { pickText } from '../i18n/text';
import './MobileCategories.css';

interface MobileCategoriesProps {
  onCatalogClick?: () => void;
}

export const MobileCategories: React.FC<MobileCategoriesProps> = ({ onCatalogClick }) => {
  const navigate = useNavigate();
  const { t, lang } = useI18n();

  const handleCategoryClick = (categoryKey: string) => {
    navigate(`/category/${categoryKey}`);
  };

  const handleCatalogClick = () => {
    if (onCatalogClick) {
      onCatalogClick();
    } else {
      const event = new CustomEvent('openCatalog');
      window.dispatchEvent(event);
    }
  };

  // Показуємо перші 4 категорії
  const mainCategories = categoriesData.slice(0, 4);

  return (
    <div className="mobile-categories">
      <div className="mobile-categories-grid">
        {mainCategories.map((category) => (
          <button
            key={category.key}
            className="mobile-category-btn"
            onClick={() => handleCategoryClick(category.key)}
          >
            <span className="mobile-category-icon">{category.icon}</span>
            <span className="mobile-category-name">{pickText(category.label, lang)}</span>
          </button>
        ))}
      </div>
      
      <button className="mobile-catalog-btn" onClick={handleCatalogClick}>
        <span className="mobile-catalog-icon">☰</span>
        <span className="mobile-catalog-text">{t('mobile.catalog')}</span>
      </button>
    </div>
  );
};
