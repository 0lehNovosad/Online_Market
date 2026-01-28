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
