'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Copy, Check, ArrowRight } from 'lucide-react';

export function PromoBannerSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('LYZOO10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-16 sm:py-20 bg-brand-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-brand-charcoal text-white shadow-luxury-lg border border-brand-charcoal/20">
          {/* Subtle Background Art */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C89F9A_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-brand-rose/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 p-8 sm:p-14 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Promo Info */}
            <div className="max-w-2xl text-center lg:text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-rose/20 text-brand-rose text-xs uppercase tracking-[0.25em] font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Private Patron Invitation</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight">
                Enjoy 10% Off Your Curated Order
              </h2>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light max-w-lg">
                Enter code <span className="text-brand-rose font-medium font-mono">LYZOO10</span> during demo checkout to receive an automatic 10% courtesy discount across the entire collection, plus complimentary white-glove express delivery.
              </p>
            </div>

            {/* Voucher Code Box & Button */}
            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={handleCopyCode}
                className="group flex items-center gap-3 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 transition backdrop-blur-md"
                title="Click to copy voucher code"
              >
                <div className="text-left">
                  <span className="block text-[9px] uppercase tracking-widest text-white/50">
                    Promo Code
                  </span>
                  <span className="font-mono text-base font-bold tracking-widest text-brand-rose">
                    LYZOO10
                  </span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/70 group-hover:text-white transition">
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </div>
              </button>

              <Link
                href="/shop"
                className="px-8 py-4 bg-brand-rose text-white hover:bg-brand-rose-dark rounded-xl text-xs uppercase tracking-widest font-semibold transition shadow-luxury flex items-center gap-2"
              >
                <span>Shop With Privilege</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

