'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Instagram, Youtube } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="w-full bg-[#FAF6F4] text-brand-charcoal border-t border-brand-border/60 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-brand-border/60">
          {/* Col 1: Brand & Socials (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-1">
                <span className="font-serif text-2xl tracking-[0.2em] font-medium text-brand-charcoal">
                  LYZOO
                </span>
                <span className="text-brand-berry text-base -mt-2">♥</span>
              </div>
              <span className="text-[7.5px] uppercase tracking-[0.25em] text-brand-muted/90 block mt-0.5">
                YOUR LITTLE WORLD OF LOVELY
              </span>
            </Link>

            {/* Social Icons: Instagram, TikTok, Pinterest, YouTube */}
            <div className="flex items-center gap-3 pt-2 text-brand-charcoal/70">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-7 h-7 rounded-full bg-white border border-brand-border flex items-center justify-center hover:text-brand-berry hover:border-brand-berry transition shadow-xs"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="w-7 h-7 rounded-full bg-white border border-brand-border flex items-center justify-center hover:text-brand-berry hover:border-brand-berry transition shadow-xs text-xs font-semibold"
              >
                <span className="text-[10px] font-bold">d</span>
              </a>

              {/* Pinterest */}
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
                className="w-7 h-7 rounded-full bg-white border border-brand-border flex items-center justify-center hover:text-brand-berry hover:border-brand-berry transition shadow-xs text-xs font-bold"
              >
                <span className="text-[11px] font-serif font-bold">P</span>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-7 h-7 rounded-full bg-white border border-brand-border flex items-center justify-center hover:text-brand-berry hover:border-brand-berry transition shadow-xs"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2.5 cols) */}
          <div className="lg:col-span-2 space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-charcoal">
              Quick Links
            </h4>
            <ul className="space-y-1.5 text-xs text-brand-charcoal/70 font-light">
              <li>
                <Link href="/" className="hover:text-brand-berry transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-brand-berry transition">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-berry transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-berry transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-berry transition">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care (2.5 cols) */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-charcoal">
              Customer Care
            </h4>
            <ul className="space-y-1.5 text-xs text-brand-charcoal/70 font-light">
              <li>
                <Link href="/contact" className="hover:text-brand-berry transition">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-berry transition">
                  Return & Exchange
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-berry transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-berry transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Stay in the Loop (3 cols) */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-charcoal">
              Stay in the Loop
            </h4>
            <p className="text-xs text-brand-charcoal/70 font-light leading-relaxed">
              Be the first to know about new arrivals, exclusive offers and more.
            </p>

            {subscribed ? (
              <p className="text-xs text-brand-berry font-medium pt-1">
                Thank you for subscribing! ♡
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="relative flex items-center pt-1">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-2 pl-3.5 pr-10 rounded-full bg-white text-xs text-brand-charcoal placeholder-brand-muted/70 focus:outline-none border border-brand-border shadow-xs"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1 w-6 h-6 rounded-full bg-brand-berry text-white flex items-center justify-center hover:bg-brand-berry-dark transition shadow-xs text-xs"
                >
                  →
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-muted/80">
          <p className="text-[11px]">
            &copy; {new Date().getFullYear()} LYZOO. All rights reserved.
          </p>

          <p className="font-script text-lg text-brand-charcoal/70">
            Made for your kind of lovely. ♡
          </p>
        </div>
      </div>
    </footer>
  );
}
