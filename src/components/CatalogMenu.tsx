import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoriesData } from '../data/categories';
import { useI18n } from '../i18n/I18nProvider';
import { pickText } from '../i18n/text';
import './CatalogMenu.css';

interface CatalogMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CatalogMenu: React.FC<CatalogMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { t, lang } = useI18n();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const visibleCategories = useMemo(() => {
    return categoriesData;
  }, []);

  const active = useMemo(() => {
    const fallback = visibleCategories[0]?.key ?? null;
    const key = activeCategory ?? fallback;
    return visibleCategories.find((c) => c.key === key) ?? null;
  }, [activeCategory, visibleCategories]);

  if (!isOpen) return null;

  const goCategory = (catKey: string) => {
    navigate(`/category/${encodeURIComponent(catKey)}`);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goCategoryFilter = (catKey: string, filter: string) => {
    navigate(`/category/${encodeURIComponent(catKey)}?filter=${encodeURIComponent(filter)}`);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    navigate('/');
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="catalog-overlay" onClick={onClose} />
      <div className="catalog-panel" role="dialog" aria-modal="true">
        <div className="catalog-header">
          <button className="catalog-back-btn" onClick={goHome}>
            ← {t('catalog.back')}
          </button>
          <button className="catalog-close" onClick={onClose} aria-label={t('catalog.close')}>
            ✕
          </button>
        </div>

        <div className="catalog-body">
          <aside className="catalog-left">
            {visibleCategories.map((cat) => (
              <button
                key={cat.key}
                className={`catalog-left-item ${active?.key === cat.key ? 'active' : ''}`}
                onMouseEnter={() => setActiveCategory(cat.key)}
                onFocus={() => setActiveCategory(cat.key)}
                onClick={() => setActiveCategory(cat.key)}
              >
                <span className="catalog-left-icon">{cat.icon}</span>
                <span className="catalog-left-text">{pickText(cat.label, lang)}</span>
              </button>
            ))}
          </aside>

          <main className="catalog-right">
            {active ? (
              <div className="catalog-right-content">
                {active.subcategories.map((sub, idx) => (
                  <section key={`${sub.key}-${idx}`} className="catalog-subcategory-section">
                    <div className="catalog-subcategory-header">
                      <span className="catalog-subcategory-icon"></span>
                      <h3 className="catalog-subcategory-title">{pickText(sub.label, lang)}</h3>
                    </div>
                    {sub.items && sub.items.length > 0 ? (
                      <>
                        <ul className="catalog-subcategory-list">
                          {sub.items.map((item) => (
                            <li key={item.key} className="catalog-subcategory-item">
                              <button
                                className="catalog-subcategory-link"
                                onClick={() => goCategoryFilter(active.key, item.key)}
                              >
                                {pickText(item.label, lang)}
                              </button>
                            </li>
                          ))}
                        </ul>
                        <button
                          className="catalog-view-all-link"
                          onClick={() => goCategory(active.key)}
                        >
                          {t('catalog.viewAll')} →
                        </button>
                      </>
                    ) : (
                      <button
                        className="catalog-view-all-link"
                        onClick={() => goCategory(active.key)}
                      >
                        {t('catalog.viewAll')} →
                      </button>
                    )}
                  </section>
                ))}
              </div>
            ) : (
              <div className="catalog-empty">—</div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

