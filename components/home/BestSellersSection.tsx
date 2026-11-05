'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Flame } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { BEST_SELLERS } from '@/data/products';

export function BestSellersSection() {
  return (
    <section className="py-20 sm:py-24 bg-brand-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-brand-rose font-semibold mb-2">
              <Flame className="w-3.5 h-3.5 text-brand-rose" />
              <span>Coveted Icons</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-brand-charcoal">
              Best Sellers
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-brand-muted max-w-md font-light leading-relaxed">
            The enduring favorites of our global patrons. Timeless investment pieces celebrated for peerless craftsmanship and distinctive luxury.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {BEST_SELLERS.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/shop?filter=best-seller"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-brand-charcoal hover:text-brand-rose transition group border-b border-brand-charcoal pb-1"
          >
            <span>View All Best Selling Creations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

