'use client';

import React, { useState, useMemo } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { SlidersHorizontal, ArrowLeft, Sparkles, Search, X } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ui/ProductCard';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const category = CATEGORIES.find((c) => c.slug === slug);

  const [subcatFilter, setSubcatFilter] = useState('All');
  const [priceSort, setPriceSort] = useState<'featured' | 'low-high' | 'high-low' | 'newest'>('featured');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');

  if (!category) {
    return (
      <div className="py-24 text-center">
        <h2 className="font-serif text-3xl text-brand-charcoal">Category Not Found</h2>
        <p className="text-xs text-brand-muted mt-2">The requested category universe could not be located.</p>
        <Link href="/shop" className="mt-6 inline-block px-6 py-2.5 bg-brand-charcoal text-white rounded-lg text-xs uppercase tracking-widest">
          Explore All Categories
        </Link>
      </div>
    );
  }

  // Get all products belonging to this category
  const allCategoryProducts = PRODUCTS.filter((p) => p.category === category.name);

  // Extract distinct subcategories
  const subcategories = ['All', ...Array.from(new Set(allCategoryProducts.map((p) => p.subcategory)))];

  // Filtered and sorted products
  const products = useMemo(() => {
    return allCategoryProducts
      .filter((p) => {
        if (subcatFilter !== 'All' && p.subcategory !== subcatFilter) return false;
        if (searchFilter.trim()) {
          const q = searchFilter.toLowerCase().trim();
          if (!p.name.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q)) {
            return false;
          }
        }
        if (priceRange === 'under-10000' && p.price >= 10000) return false;
        if (priceRange === '10000-20000' && (p.price < 10000 || p.price > 20000)) return false;
        if (priceRange === 'above-20000' && p.price <= 20000) return false;
        return true;
      })
      .sort((a, b) => {
        if (priceSort === 'low-high') return a.price - b.price;
        if (priceSort === 'high-low') return b.price - a.price;
        if (priceSort === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return 0;
      });
  }, [allCategoryProducts, subcatFilter, searchFilter, priceRange, priceSort]);

  // Other related categories
  const otherCategories = CATEGORIES.filter((c) => c.slug !== slug);

  return (
    <div className="bg-brand-ivory min-h-screen pb-20">
      {/* Editorial Category Banner */}
      <div className="relative w-full h-[360px] sm:h-[440px] flex items-center justify-center overflow-hidden bg-brand-charcoal text-white">
        <img
          src={category.bannerImage || category.image}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.65]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] uppercase tracking-[0.25em] text-brand-rose font-medium">
            <Sparkles className="w-3 h-3 text-brand-rose" />
            <span>Exclusive Department</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white">
            {category.name}
          </h1>

          <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto font-light leading-relaxed">
            {category.description}
          </p>

          <div className="pt-2 text-[11px] uppercase tracking-widest text-brand-rose font-medium">
            {allCategoryProducts.length} Atelier Pieces Available
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Shop Catalog', href: '/shop' },
            { label: category.name },
          ]}
        />

        {/* Filter and Control Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-brand-border/70 shadow-sm mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Subcategory Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
            {subcategories.map((subcat) => (
              <button
                key={subcat}
                onClick={() => setSubcatFilter(subcat)}
                className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium whitespace-nowrap transition ${
                  subcatFilter === subcat
                    ? 'bg-brand-charcoal text-white'
                    : 'bg-brand-ivory text-brand-charcoal hover:bg-brand-beige border border-brand-border/50'
                }`}
              >
                {subcat}
              </button>
            ))}
          </div>

          {/* Search within this category & sorting */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search category..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="pl-3 pr-7 py-1.5 text-xs bg-brand-ivory border border-brand-border rounded-lg text-brand-charcoal placeholder-brand-muted/70 focus:outline-none focus:border-brand-charcoal w-36 sm:w-44"
              />
              {searchFilter && (
                <button
                  onClick={() => setSearchFilter('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-charcoal"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Price Filter Presets */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="bg-brand-ivory border border-brand-border rounded-lg px-2.5 py-1.5 text-xs text-brand-charcoal focus:outline-none"
            >
              <option value="all">All Prices</option>
              <option value="under-10000">Under Rs. 10,000</option>
              <option value="10000-20000">Rs. 10,000 – Rs. 20,000</option>
              <option value="above-20000">Above Rs. 20,000</option>
            </select>

            {/* Sorting */}
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value as any)}
              className="bg-brand-ivory border border-brand-border rounded-lg px-2.5 py-1.5 text-xs text-brand-charcoal font-medium focus:outline-none"
            >
              <option value="featured">Featured Curations</option>
              <option value="newest">Newest First</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid Area */}
        {products.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-brand-border/70 my-8">
            <h3 className="font-serif text-2xl text-brand-charcoal font-medium">
              No matching pieces in {category.name}
            </h3>
            <p className="text-xs text-brand-muted mt-2 max-w-sm mx-auto">
              Try adjusting your subcategory selection or price filters.
            </p>
            <button
              onClick={() => {
                setSubcatFilter('All');
                setSearchFilter('');
                setPriceRange('all');
              }}
              className="mt-5 px-6 py-2.5 bg-brand-charcoal text-white rounded-lg text-xs uppercase tracking-widest font-medium"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Explore Other Universes */}
        <div className="mt-24 pt-16 border-t border-brand-border/60">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-brand-rose font-semibold">
                Continue Exploring
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-brand-charcoal mt-1">
                Other Luxury Universes
              </h3>
            </div>
            <Link
              href="/shop"
              className="text-xs font-semibold uppercase tracking-wider text-brand-charcoal hover:text-brand-rose underline underline-offset-4 decoration-brand-border"
            >
              All Categories &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {otherCategories.slice(0, 4).map((c) => (
              <Link
                key={c.id}
                href={`/category/${c.slug}`}
                className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-brand-charcoal shadow-sm flex items-end p-4 text-white"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="relative z-10">
                  <span className="text-[10px] uppercase tracking-widest text-brand-rose block">
                    Universe
                  </span>
                  <h4 className="font-serif text-base font-medium text-white group-hover:text-brand-rose-light transition-colors">
                    {c.name}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

