import React from 'react';
import './FilterMenu.css';

export type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

interface FilterMenuProps {
  categories: string[];
  selectedCategory: string | null;
  sortOption: SortOption;
  onCategoryChange: (category: string | null) => void;
  onSortChange: (sort: SortOption) => void;
}

export const FilterMenu: React.FC<FilterMenuProps> = ({
  categories,
  selectedCategory,
  sortOption,
  onCategoryChange,
  onSortChange
}) => {
  return (
    <div className="filter-menu">
      <div className="filter-section">
        <h3 className="filter-title">Категорії</h3>
        <div className="category-buttons">
          <button
            className={`category-btn ${selectedCategory === null ? 'active' : ''}`}
            onClick={() => onCategoryChange(null)}
          >
            Всі товари
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Сортування</h3>
        <select
          className="sort-select"
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
        >
          <option value="price-asc">Ціна: від дешевих до дорогих</option>
          <option value="price-desc">Ціна: від дорогих до дешевих</option>
          <option value="name-asc">Назва: А-Я</option>
          <option value="name-desc">Назва: Я-А</option>
        </select>
      </div>
    </div>
  );
};
