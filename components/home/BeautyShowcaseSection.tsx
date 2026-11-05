'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Droplets } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { BEAUTY_COLLECTION } from '@/data/products';

export function BeautyShowcaseSection() {
  return (
    <section className="py-20 sm:py-28 bg-brand-ivory border-b border-brand-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Top Headline */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-rose-light text-brand-rose-dark text-xs uppercase tracking-[0.25em] font-semibold mb-3">
            <Droplets className="w-3.5 h-3.5" />
            <span>Pure Botanical Alchemy</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium text-brand-charcoal">
            Makeup & Clean Beauty
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-brand-muted font-light leading-relaxed">
            Formulations born in Swiss and Italian laboratories. Harnessing cold-pressed botanical oils, active peptides, and weightless mineral pigments.
          </p>
        </div>

        {/* 4-Column Product Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {BEAUTY_COLLECTION.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Beauty Dual Banners */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-brand-charcoal p-8 flex flex-col justify-end group">
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80"
              alt="Makeup Collection"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.7]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-widest text-brand-rose font-medium">
                Color Cosmetics
              </span>
              <h3 className="font-serif text-2xl text-white font-medium mt-1">
                Velvet Matte & Luminous Glow
              </h3>
              <Link
                href="/category/makeup"
                className="mt-3 inline-flex items-center gap-1 text-xs text-brand-rose font-medium hover:underline"
              >
                Shop All Makeup &rarr;
              </Link>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-brand-charcoal p-8 flex flex-col justify-end group">
            <img
              src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80"
              alt="Skincare Rituals"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.7]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-widest text-brand-rose font-medium">
                Dermatological Serums
              </span>
              <h3 className="font-serif text-2xl text-white font-medium mt-1">
                Restorative Skincare Rituals
              </h3>
              <Link
                href="/category/skincare"
                className="mt-3 inline-flex items-center gap-1 text-xs text-brand-rose font-medium hover:underline"
              >
                Shop Skincare &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

