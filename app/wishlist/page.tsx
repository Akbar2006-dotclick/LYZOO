'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { formatPKR } from '@/lib/utils';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToBag = (product: any) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  const handleAddAllToBag = () => {
    wishlist.forEach((item) => {
      addToCart(item.product, 1);
    });
  };

  if (wishlist.length === 0) {
    return (
      <div className="bg-[#FAF6F4] min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Saved Wishlist' }]} />

          <div className="bg-white rounded-3xl p-12 text-center max-w-xl mx-auto border border-brand-border shadow-xs">
            <div className="w-16 h-16 rounded-full bg-brand-blush text-brand-berry mx-auto flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 stroke-1" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-medium text-brand-charcoal">
              Your Wishlist is Empty
            </h1>
            <p className="text-xs text-brand-muted mt-2 max-w-xs mx-auto leading-relaxed font-light">
              Save your favorite beauty and lifestyle essentials by clicking the heart on any piece.
            </p>
            <div className="mt-6">
              <Link
                href="/shop"
                className="px-6 py-2.5 bg-brand-berry hover:bg-brand-berry-dark text-white rounded-full text-xs font-medium transition shadow-xs inline-block"
              >
                Explore Curations →
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF6F4] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Wishlist' }]} />

        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-brand-muted">
              SAVED FOR LATER
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-medium text-brand-charcoal mt-0.5">
              My Wishlist ({wishlistCount})
            </h1>
            <div className="text-brand-berry text-xs mt-0.5">♥</div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleAddAllToBag}
              className="px-4 py-2 bg-brand-berry text-white hover:bg-brand-berry-dark rounded-full text-xs font-medium transition flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add All to Bag</span>
            </button>
            <button
              onClick={clearWishlist}
              className="px-3.5 py-2 bg-white border border-brand-border text-brand-muted hover:text-red-500 rounded-full text-xs transition"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlist.map(({ product }) => (
            <div
              key={product.id}
              className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-brand-border/70 hover:border-brand-berry/40 shadow-xs transition-all duration-300"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-brand-blush">
                <Link href={`/product/${product.id}`}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 text-brand-berry hover:bg-red-500 hover:text-white transition flex items-center justify-center shadow-xs"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-brand-muted block mb-0.5">
                    {product.category}
                  </span>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-serif text-sm font-medium text-brand-charcoal hover:text-brand-berry transition line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="font-semibold text-xs sm:text-sm text-brand-berry mt-1">
                    {formatPKR(product.price)}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-brand-border/60">
                  <button
                    onClick={() => handleMoveToBag(product)}
                    className="w-full py-2 bg-brand-berry text-white hover:bg-brand-berry-dark rounded-full text-xs font-medium transition flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
