'use client';

import React from 'react';
import Link from 'next/link';

export function AnnouncementBar() {
  return (
    <div className="bg-brand-rose-bar text-white py-2 px-4 text-xs font-light text-center tracking-wider select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <span className="text-[11px] sm:text-xs tracking-wide">
          ✦ Free Shipping on Orders Above 3000 PKR | Shop with Confidence ✦
        </span>
      </div>
    </div>
  );
}
