'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { PRODUCTS } from '@/data/products';

const FILTER_TABS = ['All New', "Women's Clothing", 'Makeup', 'Skincare', 'Jewellery'];

export function NewArrivalsSection() {
  const [activeTab, setActiveTab] = useState('All New');

  const newProducts = PRODUCTS.filter((p) => p.isNewArrival);

  const displayedProducts =
    activeTab === 'All New'
      ? newProducts.slice(0, 8)
      : newProducts.filter((p) => p.category === activeTab).slice(0, 8);

  return (
    <section className="py-20 sm:py-24 bg-white border-y border-brand-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-brand-rose font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Autumn / Winter Novelties</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-brand-charcoal">
              New Arrivals
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'bg-brand-charcoal text-white shadow-sm'
                    : 'bg-brand-ivory hover:bg-brand-beige text-brand-charcoal border border-brand-border'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Section Bottom CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/shop?filter=new-arrival"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-charcoal text-white hover:bg-brand-rose rounded-lg text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md group"
          >
            <span>Explore Entire New Collection ({newProducts.length} Pieces)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

