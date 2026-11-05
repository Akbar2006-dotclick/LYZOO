'use client';

import React from 'react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FBF0F2] border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Text Column (7 cols) */}
          <div className="md:col-span-7 space-y-4 sm:space-y-6 z-10">
            {/* Script "Welcome to" */}
            <p className="font-script text-3xl sm:text-4xl text-brand-charcoal/80 transform -rotate-1 select-none">
              Welcome to
            </p>

            {/* Brand Title: LYZOO ♥ */}
            <div className="flex items-baseline gap-2">
              <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight text-brand-berry font-medium leading-none">
                LYZOO
              </h1>
              <span className="text-brand-berry text-3xl sm:text-5xl -mt-2">♥</span>
            </div>

            {/* Tagline */}
            <p className="text-xs sm:text-sm md:text-base text-brand-charcoal/80 leading-relaxed font-light max-w-md">
              Your happy place for everyday essentials,
              <br />
              made for the girl who dreams bigger.
            </p>

            {/* Pill CTA button: Shop Now → */}
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-brand-berry hover:bg-brand-berry-dark text-white text-xs tracking-wider font-medium transition-all shadow-sm hover:shadow"
              >
                <span>Shop Now</span>
                <span className="text-sm">→</span>
              </Link>
            </div>
          </div>

          {/* Right Image Column (5 cols) */}
          <div className="md:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[4/3] md:aspect-[5/4] shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=80"
                alt="LYZOO Pink Flowers and Good Things Take Time"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />

              {/* Decorative Subtle Overlay Book Quote */}
              <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-lg text-[10px] text-brand-charcoal font-medium border border-white/60 shadow-xs hidden sm:block">
                Good Things Take Time ♥
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
