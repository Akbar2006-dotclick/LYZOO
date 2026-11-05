'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, Heart, ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '@/types';
import { formatPKR, calculateDiscount } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useQuickView } from '@/context/QuickViewContext';
import { Badge } from '@/components/ui/Badge';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { openQuickView } = useQuickView();
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const discount = calculateDiscount(product.price, product.compareAtPrice);
  const hasMultipleImages = product.images.length > 1;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <div
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-brand-border/70 hover:border-brand-berry/40 hover:shadow-card transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Area */}
      <Link href={`/product/${product.id}`} className="relative aspect-[3/4] overflow-hidden bg-[#FAF2F4]">
        <img
          src={product.images[0]}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isHovered && hasMultipleImages
              ? 'opacity-0 scale-105'
              : 'opacity-100 scale-100'
          }`}
          loading={priority ? 'eager' : 'lazy'}
        />

        {/* Secondary image on hover */}
        {hasMultipleImages && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        )}

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 items-start z-10 pointer-events-none">
          {product.isNewArrival && (
            <span className="px-2 py-0.5 rounded-full text-[9px] font-medium uppercase tracking-wider bg-brand-berry text-white">
              New
            </span>
          )}
          {product.isBestSeller && !product.isNewArrival && (
            <span className="px-2 py-0.5 rounded-full text-[9px] font-medium uppercase tracking-wider bg-[#B86B77] text-white">
              Bestseller
            </span>
          )}
          {discount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[9px] font-medium uppercase tracking-wider bg-[#B34E63] text-white">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 z-10 shadow-xs ${
            inWishlist
              ? 'bg-brand-berry text-white'
              : 'bg-white/90 text-brand-charcoal hover:bg-white hover:text-brand-berry'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Floating Quick Action Overlay on desktop */}
        <div
          className={`absolute inset-x-2.5 bottom-2.5 flex items-center gap-1.5 transition-all duration-300 z-10 ${
            isHovered
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2 pointer-events-none'
          } hidden sm:flex`}
        >
          <button
            onClick={handleQuickView}
            className="flex-1 py-1.5 px-3 bg-white/95 text-brand-charcoal hover:bg-brand-berry hover:text-white rounded-full text-[11px] font-medium tracking-wide shadow-sm transition flex items-center justify-center gap-1"
          >
            <Eye className="w-3 h-3" />
            <span>Quick View</span>
          </button>

          <button
            onClick={handleQuickAdd}
            aria-label="Add to bag"
            className="py-1.5 px-3 bg-brand-berry text-white hover:bg-brand-berry-dark rounded-full text-[11px] font-medium tracking-wide shadow-sm transition flex items-center justify-center"
          >
            {justAdded ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <ShoppingBag className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </Link>

      {/* Product Content Details */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category */}
          <span className="uppercase tracking-wider text-[9px] text-brand-muted/80 block mb-1">
            {product.category}
          </span>

          {/* Title */}
          <Link href={`/product/${product.id}`} className="group-hover:text-brand-berry transition">
            <h3 className="font-serif text-sm sm:text-base font-medium text-brand-charcoal leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Subtitle */}
          {product.subtitle && (
            <p className="text-[10px] text-brand-muted line-clamp-1 mt-0.5 font-light">
              {product.subtitle}
            </p>
          )}
        </div>

        {/* Price & Mobile Add Button */}
        <div className="mt-2.5 pt-2 border-t border-brand-border/60 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-semibold text-xs sm:text-sm text-brand-charcoal">
              {formatPKR(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-[10px] text-brand-muted line-through">
                {formatPKR(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Mobile action button */}
          <button
            onClick={handleQuickAdd}
            className="sm:hidden p-1.5 rounded-full bg-brand-berry text-white hover:bg-brand-berry-dark transition"
            aria-label="Add to bag"
          >
            {justAdded ? <Check className="w-3 h-3" /> : <ShoppingBag className="w-3 h-3" />}
          </button>
        </div>
      </div>
    </div>
  );
}
