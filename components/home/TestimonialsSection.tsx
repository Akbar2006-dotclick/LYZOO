'use client';

import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS, BRAND_VALUES } from '@/data/testimonials';

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-28 bg-white border-b border-brand-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-rose font-semibold">
            Patron Reflections
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium text-brand-charcoal mt-2">
            Praised by Discriminating Clients
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-brand-muted font-light leading-relaxed">
            Discover why connoisseurs of style across Pakistan choose LYZOO for timeless elegance, artisanal silk tailoring, and uncompromising clean beauty.
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-brand-ivory rounded-2xl p-6 sm:p-8 border border-brand-border/70 shadow-luxury flex flex-col justify-between relative hover:border-brand-rose/40 transition duration-300"
            >
              <div className="space-y-4">
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Verified Patron
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-lg font-semibold text-brand-charcoal">
                  &ldquo;{item.title}&rdquo;
                </h3>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed font-light italic">
                  {item.quote}
                </p>
              </div>

              {/* Author & Product */}
              <div className="pt-6 mt-6 border-t border-brand-border/60 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-brand-border"
                />
                <div>
                  <h4 className="text-xs font-semibold text-brand-charcoal">{item.name}</h4>
                  <p className="text-[10px] text-brand-muted">{item.location}</p>
                  <p className="text-[10px] text-brand-rose-dark font-medium mt-0.5 truncate max-w-[200px]">
                    Acquired: {item.productName}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Four Brand Pillars */}
        <div className="mt-20 pt-16 border-t border-brand-border/50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {BRAND_VALUES.map((val, idx) => (
            <div key={idx} className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-brand-rose font-bold">
                0{idx + 1}
              </span>
              <h4 className="font-serif text-lg font-medium text-brand-charcoal">
                {val.title}
              </h4>
              <p className="text-xs text-brand-muted leading-relaxed font-light">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

