'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X, Search, RotateCcw } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ui/ProductCard';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

const CATEGORY_TABS = [
  'All',
  'Skincare',
  'Makeup',
  "Women's Clothing",
  'Jewellery',
  'Handbags',
  'Watches',
  'Sunglasses',
  'Fashion Accessories',
  'Lifestyle Products',
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (selectedCategory !== 'All') {
        const catClean = selectedCategory.toLowerCase().trim();
        const prodCat = product.category.toLowerCase().trim();
        if (!prodCat.includes(catClean) && !catClean.includes(prodCat)) {
          return false;
        }
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q);
        if (!matches) return false;
      }

      if (priceRange === 'under-5000' && product.price >= 5000) return false;
      if (priceRange === '5000-15000' && (product.price < 5000 || product.price > 15000))
        return false;
      if (priceRange === 'above-15000' && product.price <= 15000) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return 0;
    });
  }, [selectedCategory, searchQuery, priceRange, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setPriceRange('all');
    setSortBy('featured');
  };

  return (
    <div className="py-8 sm:py-12 bg-[#FAF6F4] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Shop Catalog' }]} />

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-brand-muted/80 font-medium">
            EVERYDAY ESSENTIALS
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-brand-charcoal mt-1">
            Shop The Collection
          </h1>
          <div className="text-brand-berry text-xs mt-1">♥</div>
        </div>

        {/* Filter bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-brand-border shadow-xs mb-8 space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORY_TABS.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-brand-berry text-white font-medium shadow-xs'
                    : 'bg-[#FAF0F2] text-brand-charcoal hover:bg-[#F8DFE3]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search, Price, Sort Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-brand-border/60">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-3.5 h-3.5 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-9 pr-7 py-1.5 bg-[#FAF0F2] border border-brand-border rounded-full text-xs text-brand-charcoal placeholder-brand-muted/70 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-brand-muted"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="bg-[#FAF0F2] border border-brand-border rounded-full px-3 py-1.5 text-xs text-brand-charcoal focus:outline-none"
              >
                <option value="all">All Prices</option>
                <option value="under-5000">Under Rs. 5,000</option>
                <option value="5000-15000">Rs. 5,000 – Rs. 15,000</option>
                <option value="above-15000">Above Rs. 15,000</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#FAF0F2] border border-brand-border rounded-full px-3 py-1.5 text-xs text-brand-charcoal font-medium focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              {(selectedCategory !== 'All' || searchQuery || priceRange !== 'all') && (
                <button
                  onClick={resetFilters}
                  className="p-1.5 text-brand-berry hover:bg-brand-blush rounded-full transition"
                  title="Reset filters"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-brand-border my-8">
            <h3 className="font-serif text-xl font-medium text-brand-charcoal">
              No matching pieces found
            </h3>
            <p className="text-xs text-brand-muted mt-1.5">
              Try adjusting your category or price selection.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 px-6 py-2 bg-brand-berry text-white rounded-full text-xs font-medium"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-brand-muted">Loading collection...</div>}>
      <ShopContent />
    </Suspense>
  );
}
