'use client';

import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Heart } from 'lucide-react';

export function FeatureBar() {
  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders above 3000 PKR',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payments',
      description: '100% safe & reliable',
    },
    {
      icon: RefreshCw,
      title: 'Easy Returns',
      description: 'Hassle-free 7 days',
    },
    {
      icon: Heart,
      title: 'Loved by Girls',
      description: 'Join our happy community',
    },
  ];

  return (
    <div className="w-full bg-white border-b border-brand-border/60 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 sm:gap-4 justify-start sm:justify-center"
              >
                <div className="w-10 h-10 rounded-full bg-brand-blush flex items-center justify-center shrink-0 text-brand-berry">
                  <Icon className="w-4 h-4 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-medium text-brand-charcoal">
                    {item.title}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-brand-muted font-light mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

