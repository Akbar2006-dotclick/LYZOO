'use client';

import React, { useState } from 'react';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { QuickViewProvider } from '@/context/QuickViewContext';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { SearchModal } from '@/components/layout/SearchModal';
import { QuickViewModal } from '@/components/ui/QuickViewModal';
import { CartDrawer } from '@/components/ui/CartDrawer';
import { Footer } from '@/components/layout/Footer';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <CartProvider>
      <WishlistProvider>
        <QuickViewProvider>
          <div className="min-h-screen flex flex-col bg-brand-ivory text-brand-charcoal selection:bg-brand-rose selection:text-white">
            {/* Top Announcement Bar */}
            <AnnouncementBar />

            {/* Responsive Header */}
            <Header onOpenMobileMenu={() => setMobileMenuOpen(true)} />

            {/* Mobile Drawer Menu */}
            <MobileMenu
              isOpen={mobileMenuOpen}
              onClose={() => setMobileMenuOpen(false)}
            />

            {/* Main Page Body */}
            <main className="flex-1">{children}</main>

            {/* Universal Modals and Drawers */}
            <SearchModal />
            <QuickViewModal />
            <CartDrawer />

            {/* Premium Footer */}
            <Footer />
          </div>
        </QuickViewProvider>
      </WishlistProvider>
    </CartProvider>
  );
}

