'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Heart } from 'lucide-react';

export function CategorySection() {
  const categories = [
    {
      name: 'Skincare',
      slug: 'skincare',
      icon: (
        // Face with sparkle
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9"/>
          <path d="M9 10h.01"/>
          <path d="M15 10h.01"/>
          <path d="M9.5 15a3.5 3.5 0 0 0 5 0"/>
          <path d="M19 4l.5 1.5L21 6l-1.5.5L19 8l-.5-1.5L17 6l1.5-.5z" fill="currentColor"/>
        </svg>
      ),
    },
    {
      name: 'Makeup',
      slug: 'makeup',
      icon: (
        // Lipstick
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 11V21H15V11"/>
          <path d="M9 15H15"/>
          <path d="M10 11V6.5L12 3L14 6.5V11H10Z"/>
        </svg>
      ),
    },
    {
      name: 'Hair Care',
      slug: 'hair-care',
      icon: (
        // Flowing hair silhouette
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 6C7 4.5 8.5 3 11 3C15 3 17 5.5 17 9C17 14 13.5 17 14 21"/>
          <path d="M11 6C11 8.5 9 10 9 13C9 16 10 18 10 21"/>
          <circle cx="11.5" cy="8" r="1.5" fill="currentColor"/>
        </svg>
      ),
    },
    {
      name: 'Fragrance',
      slug: 'lifestyle-products',
      icon: (
        // Perfume bottle
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="9" width="12" height="12" rx="3"/>
          <path d="M10 9V6H14V9"/>
          <circle cx="12" cy="15" r="2.5"/>
          <path d="M12 3V5"/>
        </svg>
      ),
    },
    {
      name: 'Accessories',
      slug: 'fashion-accessories',
      icon: (
        // Bow / ribbon
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 11C10.5 8 7 6 4 8C1 10 3 14 6 14C9 14 11 12 12 11ZM12 11C13.5 8 17 6 20 8C23 10 21 14 18 14C15 14 13 12 12 11Z"/>
          <circle cx="12" cy="11" r="2" fill="currentColor"/>
          <path d="M11 13L8 20M13 13L16 20"/>
        </svg>
      ),
    },
    {
      name: 'Lifestyle',
      slug: 'lifestyle-products',
      icon: (
        // Heart
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-brand-muted/80 font-medium">
          SHOP BY CATEGORY
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl text-brand-charcoal font-medium mt-1 mb-2">
          Find What You Love
        </h2>
        <div className="flex items-center justify-center text-brand-berry text-xs mb-10">
          ♥
        </div>

        {/* 6 Circular Categories Row */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group flex flex-col items-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FBF0F2] group-hover:bg-[#F8DFE3] flex items-center justify-center text-brand-berry border border-brand-border/60 transition-all duration-300 transform group-hover:scale-105 shadow-xs">
                {cat.icon}
              </div>
              <span className="text-xs sm:text-sm text-brand-charcoal group-hover:text-brand-berry font-medium mt-3 transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
