'use client';

import React from 'react';
import Link from 'next/link';
import { X, Search, Heart, ShoppingBag, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useQuickView } from '@/context/QuickViewContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { setIsSearchOpen } = useQuickView();

  if (!isOpen) return null;

  const categories = [
    { name: 'Skincare', href: '/shop?category=Skincare' },
    { name: 'Makeup', href: '/shop?category=Makeup' },
    { name: 'Hair Care', href: '/shop?category=Hair%20Care' },
    { name: 'Fragrance', href: '/shop?category=Lifestyle%20Products' },
    { name: 'Accessories', href: '/shop?category=Fashion%20Accessories' },
    { name: 'Lifestyle', href: '/shop?category=Lifestyle%20Products' },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-slideLeft">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-brand-border bg-[#FDF6F7]">
          <div>
            <div className="flex items-center gap-1">
              <span className="font-serif text-xl tracking-[0.2em] font-medium text-brand-charcoal">
                LYZOO
              </span>
              <span className="text-brand-berry text-sm -mt-2">♥</span>
            </div>
            <span className="block text-[7.5px] tracking-[0.25em] uppercase text-brand-muted font-light">
              YOUR LITTLE WORLD OF LOVELY
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-brand-charcoal hover:bg-brand-blush transition"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Actions Bar */}
        <div className="p-3 grid grid-cols-3 gap-2 bg-[#FAF0F2] border-b border-brand-border text-center text-xs">
          <button
            onClick={() => {
              onClose();
              setIsSearchOpen(true);
            }}
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white transition text-brand-charcoal"
          >
            <Search className="w-4 h-4 text-brand-berry" />
            <span className="text-[10px] uppercase font-medium">Search</span>
          </button>

          <Link
            href="/wishlist"
            onClick={onClose}
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white transition text-brand-charcoal relative"
          >
            <Heart className="w-4 h-4 text-brand-berry" />
            <span className="text-[10px] uppercase font-medium">
              Wishlist {wishlistCount > 0 ? `(${wishlistCount})` : ''}
            </span>
          </Link>

          <button
            onClick={() => {
              onClose();
              setIsCartOpen(true);
            }}
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white transition text-brand-charcoal"
          >
            <ShoppingBag className="w-4 h-4 text-brand-berry" />
            <span className="text-[10px] uppercase font-medium">
              Bag {itemCount > 0 ? `(${itemCount})` : ''}
            </span>
          </button>
        </div>

        {/* Main Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-brand-blush text-xs font-medium text-brand-charcoal transition"
          >
            <span>Home</span>
            <ChevronRight className="w-4 h-4 text-brand-muted" />
          </Link>

          <Link
            href="/shop"
            onClick={onClose}
            className="flex items-center justify-between p-2.5 rounded-xl bg-brand-blush/60 text-brand-berry font-medium text-xs transition"
          >
            <span>All Products (Shop)</span>
            <ChevronRight className="w-4 h-4 text-brand-berry" />
          </Link>

          <div className="pt-3 pb-1 border-t border-brand-border/60 mt-3">
            <p className="text-[9px] uppercase tracking-widest text-brand-muted/80 font-semibold px-2 mb-1">
              Find What You Love
            </p>
            {categories.map((c, i) => (
              <Link
                key={i}
                href={c.href}
                onClick={onClose}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-brand-blush text-xs text-brand-charcoal transition"
              >
                <span>{c.name}</span>
                <ChevronRight className="w-3.5 h-3.5 text-brand-muted" />
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-brand-border/60 mt-3 space-y-1">
            <Link
              href="/about"
              onClick={onClose}
              className="block p-2 rounded-lg hover:bg-brand-blush text-xs text-brand-charcoal"
            >
              Our Story
            </Link>
            <Link
              href="/contact"
              onClick={onClose}
              className="block p-2 rounded-lg hover:bg-brand-blush text-xs text-brand-charcoal"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="p-4 border-t border-brand-border bg-[#FDF6F7] text-center">
          <p className="font-script text-lg text-brand-charcoal">
            Made for your kind of lovely. ♡
          </p>
        </div>
      </div>
    </div>
  );
}
