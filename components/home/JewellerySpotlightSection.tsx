'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Gem } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { JEWELLERY_COLLECTION } from '@/data/products';

export function JewellerySpotlightSection() {
  return (
    <section className="py-20 sm:py-28 bg-white border-b border-brand-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-brand-rose font-semibold mb-2">
              <Gem className="w-3.5 h-3.5 text-brand-rose" />
              <span>High Horology & Fine Gems</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-brand-charcoal">
              The Jewellery Sanctuary
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-brand-muted max-w-md font-light leading-relaxed">
            Organic natural baroque pearls, heavy 2.5-micron 18K vermeil, and Swiss Ronda movements designed as modern heirlooms.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {JEWELLERY_COLLECTION.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-14 p-8 sm:p-12 rounded-2xl bg-[#201D1A] text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="relative z-10 max-w-xl space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-rose font-semibold">
              Bespoke Gift Services
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-white">
              Every Piece Arrives In Our Signature Velvet Keepsake Box
            </h3>
            <p className="text-xs text-white/70 leading-relaxed font-light">
              Complimentary personalized calligraphy gift card and protective anti-tarnish suede pouch included with all fine jewellery orders.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              href="/category/jewellery"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-rose text-white hover:bg-brand-rose-dark rounded-lg text-xs uppercase tracking-widest font-semibold transition shadow-luxury"
            >
              <span>Explore All Jewellery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

