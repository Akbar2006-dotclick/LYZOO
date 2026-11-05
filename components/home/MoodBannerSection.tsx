'use client';

import React from 'react';
import Link from 'next/link';

export function MoodBannerSection() {
  return (
    <section className="w-full bg-[#FAF0F2] border-b border-brand-border/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#FDF6F7] rounded-3xl p-6 sm:p-12 border border-brand-border/70 shadow-sm">
          {/* Left Text (6 cols) */}
          <div className="md:col-span-6 space-y-4">
            <h3 className="font-script text-3xl sm:text-5xl text-brand-charcoal font-medium leading-tight">
              Same girl,
              <br />
              Different moods ♡
            </h3>

            <p className="text-xs sm:text-sm text-brand-charcoal/80 font-light leading-relaxed max-w-sm pt-1">
              Because every mood deserves something special.
            </p>

            <p className="font-script text-2xl text-brand-berry pt-2">
              LYZOO ♡
            </p>
          </div>

          {/* Right Image (6 cols) */}
          <div className="md:col-span-6">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] shadow-xs">
              <img
                src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=80"
                alt="Same girl, Different moods"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-3 right-3 bg-white/85 backdrop-blur-xs px-2.5 py-1 rounded text-[10px] text-brand-charcoal font-medium border border-white/60">
                Better Days ♡
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

