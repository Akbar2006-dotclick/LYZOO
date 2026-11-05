'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, User, ShoppingBag, Menu, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useQuickView } from '@/context/QuickViewContext';

export function Header({ onOpenMobileMenu }: { onOpenMobileMenu: () => void }) {
  const pathname = usePathname();
  const { itemCount, setIsCartOpen } = useCart();
  const { setIsSearchOpen } = useQuickView();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="w-full bg-white border-b border-brand-border/60 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        {/* Top row: Menu, Logo, Actions */}
        <div className="flex items-center justify-between">
          {/* Left: Mobile / Desktop Menu Trigger */}
          <div className="flex items-center">
            <button
              onClick={onOpenMobileMenu}
              aria-label="Open Menu"
              className="p-1.5 text-brand-charcoal hover:text-brand-berry transition"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Center: Brand Identity */}
          <div className="flex flex-col items-center text-center">
            {/* Delicate Bow Icon */}
            <div className="mb-0.5 text-brand-berry">
              <svg width="18" height="12" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto text-brand-berry">
                <path d="M12 8C10.5 5 7 3 4 5C1 7 3 11 6 11C9 11 11 9 12 8ZM12 8C13.5 5 17 3 20 5C23 7 21 11 18 11C15 11 13 9 12 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="8" r="2" fill="currentColor"/>
                <path d="M11 9.5L8 15M13 9.5L16 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>

            <Link href="/" className="group flex items-center justify-center gap-1">
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.18em] font-medium text-brand-charcoal group-hover:text-brand-berry transition-colors">
                LYZOO
              </span>
              <span className="text-brand-berry text-base -mt-2">♥</span>
            </Link>

            <span className="text-[7.5px] sm:text-[8px] tracking-[0.25em] uppercase text-brand-muted/90 font-light mt-0.5">
              YOUR LITTLE WORLD OF LOVELY
            </span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="p-1.5 text-brand-charcoal hover:text-brand-berry transition"
            >
              <Search className="w-4 h-4" />
            </button>

            <Link
              href="/contact"
              aria-label="Account"
              className="p-1.5 text-brand-charcoal hover:text-brand-berry transition hidden sm:inline-block"
            >
              <User className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              aria-label={`Shopping Bag (${itemCount})`}
              className="relative p-1.5 text-brand-charcoal hover:text-brand-berry transition"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 bg-brand-berry text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                {itemCount}
              </span>
            </button>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="flex items-center justify-center gap-6 sm:gap-8 pt-2 mt-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs tracking-wider transition-colors pb-0.5 ${
                  isActive
                    ? 'text-brand-charcoal font-medium border-b border-brand-charcoal'
                    : 'text-brand-charcoal/70 hover:text-brand-berry'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
