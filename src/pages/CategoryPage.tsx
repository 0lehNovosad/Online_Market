import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Product } from '../types';
import { products } from '../data/products';
import { ProductList } from '../components/ProductList';
import { useI18n } from '../i18n/I18nProvider';
import { categoriesData } from '../data/categories';
import { pickText } from '../i18n/text';
import { Breadcrumbs } from '../components/Breadcrumbs';
import './CategoryPage.css';

const PRODUCTS_LOAD_DELAY_MS = 400;

interface CategoryPageProps {
  onAddToCart: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ onAddToCart, onQuickView }) => {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = (searchParams.get('filter') ?? '').trim().toLowerCase();
  const q = (searchParams.get('q') ?? '').trim().toLowerCase();
  const sort = (searchParams.get('sort') ?? 'relevance').trim().toLowerCase();
  const parseNum = (raw: string | null) => {
    if (raw == null) return undefined;
    const s = raw.trim();
    if (!s) return undefined;
    const n = Number(s);
    return Number.isFinite(n) ? n : undefined;
  };
  const minPrice = parseNum(searchParams.get('minPrice'));
  const maxPrice = parseNum(searchParams.get('maxPrice'));
  const [minPriceDraft, setMinPriceDraft] = useState<string>(minPrice !== undefined ? String(minPrice) : '');
  const [maxPriceDraft, setMaxPriceDraft] = useState<string>(maxPrice !== undefined ? String(maxPrice) : '');

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

    if (minPrice !== undefined) list = list.filter((p) => p.price >= minPrice);
    if (maxPrice !== undefined) list = list.filter((p) => p.price <= maxPrice);

    if (sort === 'price_asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sort === 'name_asc') {
      list = [...list].sort((a, b) => pickText(a.name, lang).localeCompare(pickText(b.name, lang)));
    } else if (sort === 'name_desc') {
      list = [...list].sort((a, b) => pickText(b.name, lang).localeCompare(pickText(a.name, lang)));
    }
    return list;
  }, [decodedCategory, filter, q, lang, minPrice, maxPrice, sort]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), PRODUCTS_LOAD_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const applyFilters = () => {
    const next = new URLSearchParams(searchParams);
    const min = (minPriceDraft ?? '').trim();
    const max = (maxPriceDraft ?? '').trim();
    if (min) next.set('minPrice', min);
    else next.delete('minPrice');
    if (max) next.set('maxPrice', max);
    else next.delete('maxPrice');
    setSearchParams(next, { replace: true });
  };

  const clearFilters = () => {
    const next = new URLSearchParams(searchParams);
    next.delete('minPrice');
    next.delete('maxPrice');
    next.delete('sort');
    setMinPriceDraft('');
    setMaxPriceDraft('');
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="category-page">
      <div className="category-container">
        <Breadcrumbs
          items={[
            { label: t('bottomNav.home'), to: '/' },
            { label: t('category.catalog'), to: '/category/all' },
            decodedCategory && decodedCategory !== 'all'
              ? { label: categoryTitle, to: `/category/${encodeURIComponent(decodedCategory)}` }
              : { label: categoryTitle }
          ]}
        />
        <div className="category-header">
          <h1 className="category-title">{categoryTitle}</h1>
          {(filter || q) && (
            <div className="category-chip">
              {t('category.search')} <strong>{q || filter}</strong>
            </div>
          )}
        </div>

        <div className="category-controls">
          <div className="category-controls-row">
            <div className="category-controls-group">
              <label className="category-controls-label" htmlFor="sort">
                {t('filters.sort')}
              </label>
              <select
                id="sort"
                className="category-controls-select"
                value={sort}
                onChange={(e) => {
                  const next = new URLSearchParams(searchParams);
                  const v = e.target.value;
                  if (!v || v === 'relevance') next.delete('sort');
                  else next.set('sort', v);
                  setSearchParams(next, { replace: true });
                }}
              >
                <option value="relevance">{t('filters.sort.relevance')}</option>
                <option value="price_asc">{t('filters.sort.priceAsc')}</option>
                <option value="price_desc">{t('filters.sort.priceDesc')}</option>
                <option value="name_asc">{t('filters.sort.nameAsc')}</option>
                <option value="name_desc">{t('filters.sort.nameDesc')}</option>
              </select>
            </div>

            <div className="category-controls-group">
              <span className="category-controls-label">{t('filters.price')}</span>
              <div className="category-controls-price">
                <input
                  inputMode="numeric"
                  className="category-controls-input"
                  placeholder={t('filters.priceFrom')}
                  value={minPriceDraft}
                  onChange={(e) => setMinPriceDraft(e.target.value)}
                />
                <input
                  inputMode="numeric"
                  className="category-controls-input"
                  placeholder={t('filters.priceTo')}
                  value={maxPriceDraft}
                  onChange={(e) => setMaxPriceDraft(e.target.value)}
                />
                <button type="button" className="category-controls-btn" onClick={applyFilters}>
                  {t('filters.apply')}
                </button>
                <button type="button" className="category-controls-btn secondary" onClick={clearFilters}>
                  {t('filters.clear')}
                </button>
              </div>
            </div>
          </div>

          {((minPrice !== undefined) || (maxPrice !== undefined) || sort !== 'relevance') && (
            <button
              type="button"
              className="category-controls-inline-link"
              onClick={() => navigate(`/category/${encodeURIComponent(decodedCategory || 'all')}${q ? `?q=${encodeURIComponent(q)}` : ''}`)}
            >
              {t('filters.resetAll')}
            </button>
          )}
        </div>

        <ProductList
          products={filtered}
          onAddToCart={onAddToCart}
          onQuickView={onQuickView}
          loading={loading}
          skeletonCount={12}
        />
      </div>
    </div>
  );
};

