import React, { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Product } from '../types';
import { products } from '../data/products';
import { ProductList } from '../components/ProductList';
import { useI18n } from '../i18n/I18nProvider';
import { categoriesData } from '../data/categories';
import { pickText } from '../i18n/text';
import './CategoryPage.css';

interface CategoryPageProps {
  onAddToCart: (product: Product) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ onAddToCart }) => {
  const { t, lang } = useI18n();
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  const filter = (searchParams.get('filter') ?? '').trim().toLowerCase();
  const q = (searchParams.get('q') ?? '').trim().toLowerCase();

  const decodedCategory = useMemo(() => {
    try {
      return category ? decodeURIComponent(category) : '';
    } catch {
      return category ?? '';
    }
  }, [category]);

  const categoryTitle = useMemo(() => {
    const cat = categoriesData.find((c) => c.key === decodedCategory);
    return cat ? pickText(cat.label, lang) : decodedCategory || t('category.catalog');
  }, [decodedCategory, lang, t]);

  const filtered = useMemo(() => {
    let list = products;
    const isAll = decodedCategory === 'all';
    if (decodedCategory && !isAll) {
      list = list.filter((p) => p.categoryKey === decodedCategory);
    }

    if (filter) {
      list = list.filter((p) => {
        const brand = (p.brand ?? '').toLowerCase();
        const sub = (p.subcategoryKey ?? '').toLowerCase();
        return brand.includes(filter) || sub.includes(filter);
      });
    }

    if (q) {
      list = list.filter((p) => {
        const name = pickText(p.name, lang).toLowerCase();
        const desc = pickText(p.description, lang).toLowerCase();
        const full = p.fullDescription ? pickText(p.fullDescription, lang).toLowerCase() : '';
        const brand = (p.brand ?? '').toLowerCase();
        return (
          name.includes(q) ||
          desc.includes(q) ||
          full.includes(q) ||
          brand.includes(q)
        );
      });
    }
    return list;
  }, [decodedCategory, filter, q, lang]);

  return (
    <div className="category-page">
      <div className="category-container">
        <div className="category-header">
          <h1 className="category-title">{categoryTitle}</h1>
          {(filter || q) && (
            <div className="category-chip">
              {t('category.search')} <strong>{q || filter}</strong>
            </div>
          )}
        </div>

        <ProductList products={filtered} onAddToCart={onAddToCart} />
      </div>
    </div>
  );
};

