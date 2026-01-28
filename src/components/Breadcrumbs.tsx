import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumbs.css';

export type BreadcrumbItem = {
  label: string;
  to?: string;
};

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => {
  const visible = items.filter((i) => i.label && i.label.trim().length > 0);
  if (visible.length <= 1) return null;

  return (
    <nav className={`breadcrumbs ${className ?? ''}`.trim()} aria-label="Breadcrumb">
      <ol className="breadcrumbs-list">
        {visible.map((item, idx) => {
          const isLast = idx === visible.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="breadcrumbs-item">
              {item.to && !isLast ? (
                <Link className="breadcrumbs-link" to={item.to}>
                  {item.label}
                </Link>
              ) : (
                <span className="breadcrumbs-current" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && <span className="breadcrumbs-sep">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

