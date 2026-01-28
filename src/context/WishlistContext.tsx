import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { Product } from '../types';

const WISHLIST_KEY = 'online_market_wishlist';

interface WishlistContextValue {
  wishlistIds: Set<number>;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: number) => boolean;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

function loadWishlist(): Set<number> {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as number[];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function saveWishlist(ids: Set<number>) {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify([...ids]));
  } catch {}
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<Set<number>>(loadWishlist);

  useEffect(() => {
    saveWishlist(wishlistIds);
  }, [wishlistIds]);

  const toggleWishlist = useCallback((product: Product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) next.delete(product.id);
      else next.add(product.id);
      return next;
    });
  }, []);

  const isInWishlist = useCallback(
    (id: number) => wishlistIds.has(id),
    [wishlistIds]
  );

  return (
    <WishlistContext.Provider value={{ wishlistIds, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
