import React from 'react';
import './Skeleton.css';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
  borderRadius = 'var(--radius-sm)',
  className = ''
}) => {
  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius
  };
  return <div className={`skeleton ${className}`.trim()} style={style} aria-hidden />;
};

export const SkeletonCard: React.FC = () => (
  <div className="skeleton-card">
    <Skeleton height={200} borderRadius={0} className="skeleton-card-image" />
    <div className="skeleton-card-body">
      <Skeleton height={18} width="80%" />
      <Skeleton height={14} width="100%" className="skeleton-mt" />
      <Skeleton height={14} width="60%" className="skeleton-mt" />
      <div className="skeleton-card-footer">
        <Skeleton height={24} width={80} />
        <Skeleton height={40} width={120} />
      </div>
    </div>
  </div>
);

export const SkeletonProductGrid: React.FC<{ count?: number }> = ({ count = 8 }) => (
  <div className="product-grid">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

/** Скелетон блоку «Товар дня» на головній */
export const SkeletonProductOfDay: React.FC = () => (
  <div className="skeleton-product-of-day">
    <div className="skeleton-product-of-day-header">
      <Skeleton height={24} width="40%" />
      <Skeleton height={16} width="35%" />
    </div>
    <div className="product-of-day-grid">
      <div className="skeleton-card skeleton-card--compact">
        <Skeleton height={140} borderRadius={0} className="skeleton-card-image" />
        <div className="skeleton-card-body">
          <Skeleton height={18} width="85%" />
          <Skeleton height={14} width="60%" className="skeleton-mt" />
          <Skeleton height={28} width={100} className="skeleton-mt" />
        </div>
      </div>
    </div>
  </div>
);

/** Скелетон блоку «Кращі пропозиції» (4 картки) */
export const SkeletonBestProducts: React.FC = () => (
  <div className="best-products">
    <div className="best-products-header">
      <Skeleton height={28} width={180} />
      <Skeleton height={36} width={80} />
    </div>
    <div className="best-products-grid">
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  </div>
);

/** Скелетон сітки для блоків «Разом купують» / «Рекомендовані» на сторінці товару */
export const SkeletonRelatedGrid: React.FC<{ count?: number; className?: string }> = ({
  count = 4,
  className = ''
}) => (
  <div className={className || 'bought-together-grid'}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="skeleton-related-card">
        <Skeleton height={120} borderRadius={0} className="skeleton-related-image" />
        <Skeleton height={14} width="90%" className="skeleton-related-name" />
        <Skeleton height={18} width={70} className="skeleton-related-price" />
        <Skeleton height={36} width="100%" borderRadius={6} />
      </div>
    ))}
  </div>
);
