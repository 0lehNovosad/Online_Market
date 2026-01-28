import React, { useState } from 'react';
import { categoriesData } from '../data/categories';
import { FilterMenu, SortOption } from './FilterMenu';
import { useI18n } from '../i18n/I18nProvider';
import { pickText } from '../i18n/text';
import './Sidebar.css';

interface SidebarProps {
  categories: string[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
  sortOption?: SortOption;
  onSortChange?: (sort: SortOption) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  sortOption,
  onSortChange,
  isOpen,
  onClose
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const { lang } = useI18n();

  const getCategoryData = (categoryName: string) => {
    // `categories` prop is a list of display names (legacy). Match against current i18n labels.
    return categoriesData.find(
      (cat) => cat.label.uk === categoryName || cat.label.en === categoryName
    );
  };

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'show' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Категорії</h2>
          <button className="sidebar-close" onClick={onClose}>×</button>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`sidebar-item ${selectedCategory === null ? 'active' : ''}`}
            onClick={() => {
              onCategorySelect(null);
              onClose();
            }}
          >
            <span>🏠</span>
            <span>Всі товари</span>
          </button>
          {categories.map((category) => {
            const categoryData = getCategoryData(category);
            return (
              <div
                key={category}
                className="sidebar-category-wrapper"
                onMouseEnter={() => setHoveredCategory(category)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <button
                  className={`sidebar-item ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => {
                    onCategorySelect(category);
                    if (window.innerWidth < 1200) {
                      onClose();
                    }
                  }}
                >
                  <span>{categoryData?.icon || '📦'}</span>
                  <span>{category}</span>
                  {categoryData && categoryData.subcategories.length > 0 && (
                    <span className="sidebar-arrow">›</span>
                  )}
                </button>
                
                {hoveredCategory === category && categoryData && categoryData.subcategories.length > 0 && (
                  <div className="sidebar-submenu">
                    {categoryData.subcategories.map((subcat, index) => (
                      <div key={index} className="subcategory-section">
                        <h4 className="subcategory-title">{pickText(subcat.label, lang)}</h4>
                        {subcat.items && (
                          <ul className="subcategory-items">
                            {subcat.items.map((item, itemIndex) => (
                              <li key={itemIndex}>
                                <button
                                  className="subcategory-item"
                                  onClick={() => {
                                    onCategorySelect(category);
                                    if (window.innerWidth < 1200) {
                                      onClose();
                                    }
                                  }}
                                >
                                  {pickText(item.label, lang)}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        
        {sortOption && onSortChange && (
          <div className="sidebar-filters">
            <FilterMenu
              categories={categories}
              selectedCategory={selectedCategory}
              sortOption={sortOption}
              onCategoryChange={onCategorySelect}
              onSortChange={onSortChange}
            />
          </div>
        )}
      </aside>
    </>
  );
};
