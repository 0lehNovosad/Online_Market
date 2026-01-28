import React from 'react';
import './QuickCategories.css';

interface QuickCategoriesProps {
  categories: string[];
  onCategorySelect: (category: string) => void;
}

export const QuickCategories: React.FC<QuickCategoriesProps> = ({ categories, onCategorySelect }) => {
  const categoryIcons: Record<string, string> = {
    'Ноутбуки': '💻',
    'Смартфони': '📱',
    'Годинники': '⌚',
    'Аудіо': '🎧',
    'Планшети': '📱',
    'Фото': '📷'
  };

  const quickCategories = categories.slice(0, 5);

  return (
    <div className="quick-categories">
      {quickCategories.map((category) => (
        <button
          key={category}
          className="quick-category-btn"
          onClick={() => onCategorySelect(category)}
        >
          <span className="quick-category-icon">{categoryIcons[category] || '📦'}</span>
          <span className="quick-category-name">{category}</span>
        </button>
      ))}
    </div>
  );
};
