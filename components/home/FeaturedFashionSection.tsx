'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { FEATURED_FASHION } from '@/data/products';

export function FeaturedFashionSection() {
  const spotlightProducts = FEATURED_FASHION.slice(0, 3);

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-brand-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Editorial Banner Column */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden bg-brand-charcoal text-white aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:h-[620px] shadow-luxury flex flex-col justify-end p-8 sm:p-10 group">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85"
              alt="LYZOO Editorial Fashion"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="relative z-10 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[10px] uppercase tracking-[0.25em] text-brand-rose font-medium">
                <Sparkles className="w-3 h-3" />
                Featured Fashion Capsule
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight">
                The Silk & Tailoring Anthology
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                Sculpted silhouettes in 22mm Mulberry silk and structured virgin wool designed to capture understated power and fluid grace.
              </p>
              <div className="pt-2">
                <Link
                  href="/category/womens-clothing"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-charcoal hover:bg-brand-rose hover:text-white rounded-lg text-xs uppercase tracking-widest font-semibold transition"
                >
                  <span>Explore Fashion Edit</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Product Cards Column */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-brand-muted font-medium">
                  Selected Pieces
                </span>
                <h4 className="font-serif text-2xl font-medium text-brand-charcoal">
                  Atelier Highlights
                </h4>
              </div>
              <Link
                href="/category/womens-clothing"
                className="text-xs uppercase tracking-wider font-semibold text-brand-rose-dark hover:underline flex items-center gap-1"
              >
                View Category &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {spotlightProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {/* Editorial Footer Quote */}
            <div className="mt-8 p-6 bg-brand-ivory rounded-xl border border-brand-border/60 flex items-center justify-between gap-4">
              <div className="text-xs text-brand-charcoal">
                <p className="font-serif text-base italic text-brand-charcoal/90">
                  &ldquo;Elegance is not about standing out, but being remembered.&rdquo;
                </p>
                <p className="text-[10px] uppercase tracking-widest text-brand-muted mt-1">
                  — LYZOO Style Director, Milan Salon
                </p>
              </div>
              <Link
                href="/about"
                className="shrink-0 text-xs text-brand-charcoal underline underline-offset-4 font-medium hover:text-brand-rose transition"
              >
                Read Manifesto
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

