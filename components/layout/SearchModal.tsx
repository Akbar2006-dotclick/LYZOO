'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, Sparkles, ShoppingBag } from 'lucide-react';
import { useQuickView } from '@/context/QuickViewContext';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import { formatPKR } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

const POPULAR_SEARCHES = [
  'Skincare',
  'Lipstick',
  'Serum',
  'Rose',
  'Handbag',
  'Jewellery',
  'Candle',
];

export function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, openQuickView } = useQuickView();
  const { addToCart } = useCart();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase().trim();
    const filtered = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
    setResults(filtered);
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="fixed inset-0" onClick={() => setIsSearchOpen(false)} />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-brand-border overflow-hidden z-10 animate-slideDown">
        {/* Search Bar */}
        <div className="p-4 sm:p-5 border-b border-brand-border flex items-center gap-3 bg-[#FDF6F7]">
          <Search className="w-5 h-5 text-brand-berry shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for essentials, shades, or categories..."
            className="w-full bg-transparent text-sm text-brand-charcoal placeholder-brand-muted/70 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-brand-muted hover:text-brand-charcoal"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-[10px] uppercase font-mono px-2 py-1 rounded-full bg-white border text-brand-muted"
          >
            ESC
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto p-5">
          {!query && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-brand-muted font-semibold mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-berry" />
                Popular Curations
              </p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-xs px-3 py-1.5 rounded-full bg-[#FAF0F2] hover:bg-[#F8DFE3] text-brand-charcoal transition"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && results.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs text-brand-muted block pb-1">
                Found {results.length} items matching &ldquo;{query}&rdquo;
              </span>
              <div className="divide-y divide-brand-border/60">
                {results.map((product) => (
                  <div
                    key={product.id}
                    className="py-2.5 flex items-center justify-between gap-3 hover:bg-brand-blush/40 p-2 rounded-xl transition"
                  >
                    <Link
                      href={`/product/${product.id}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-3 flex-1 min-w-0"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-14 rounded-lg object-cover bg-brand-blush shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-[9px] uppercase tracking-wider text-brand-muted block">
                          {product.category}
                        </span>
                        <h4 className="text-xs sm:text-sm font-medium text-brand-charcoal truncate">
                          {product.name}
                        </h4>
                        <span className="text-xs font-semibold text-brand-berry mt-0.5 block">
                          {formatPKR(product.price)}
                        </span>
                      </div>
                    </Link>

                    <button
                      onClick={() => {
                        addToCart(product);
                        setIsSearchOpen(false);
                      }}
                      className="p-2 rounded-full bg-brand-berry text-white hover:bg-brand-berry-dark transition"
                      title="Add to bag"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {query && results.length === 0 && (
            <div className="text-center py-10">
              <p className="font-serif text-lg text-brand-charcoal">
                No items found for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-brand-muted mt-1">
                Try searching for &ldquo;Skincare&rdquo;, &ldquo;Lipstick&rdquo;, or &ldquo;Jewellery&rdquo;
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
