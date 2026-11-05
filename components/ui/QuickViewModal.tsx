'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Star, Heart, ShoppingBag, Check, ArrowRight } from 'lucide-react';
import { useQuickView } from '@/context/QuickViewContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPKR, calculateDiscount } from '@/lib/utils';
import { ProductVariantColor } from '@/types';

export function QuickViewModal() {
  const { quickViewProduct, closeQuickView } = useQuickView();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<ProductVariantColor | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setActiveImageIndex(0);
      setQuantity(1);
      if (quickViewProduct.availableSizes && quickViewProduct.availableSizes.length > 0) {
        setSelectedSize(quickViewProduct.availableSizes[0]);
      } else {
        setSelectedSize('');
      }
      if (quickViewProduct.availableColors && quickViewProduct.availableColors.length > 0) {
        setSelectedColor(quickViewProduct.availableColors[0]);
      } else {
        setSelectedColor(undefined);
      }
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const inWishlist = isInWishlist(quickViewProduct.id);
  const discount = calculateDiscount(quickViewProduct.price, quickViewProduct.compareAtPrice);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, selectedSize, selectedColor);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      closeQuickView();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="fixed inset-0" onClick={closeQuickView} />

      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-brand-border overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row animate-slideDown">
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-brand-charcoal hover:text-brand-berry transition shadow-xs"
          aria-label="Close Quick View"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Gallery */}
        <div className="md:w-1/2 p-4 sm:p-6 bg-[#FAF2F4] flex flex-col justify-between">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-brand-blush">
            <img
              src={quickViewProduct.images[activeImageIndex] || quickViewProduct.images[0]}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover"
            />
            {discount > 0 && (
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] bg-brand-berry text-white font-medium">
                -{discount}%
              </span>
            )}
          </div>

          {quickViewProduct.images.length > 1 && (
            <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
              {quickViewProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-12 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition ${
                    activeImageIndex === idx
                      ? 'border-brand-berry'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-brand-muted block mb-1">
                {quickViewProduct.category}
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-brand-charcoal">
                {quickViewProduct.name}
              </h2>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 pt-1">
              <span className="font-semibold text-lg sm:text-xl text-brand-berry">
                {formatPKR(quickViewProduct.price)}
              </span>
              {quickViewProduct.compareAtPrice && (
                <span className="text-xs text-brand-muted line-through">
                  {formatPKR(quickViewProduct.compareAtPrice)}
                </span>
              )}
            </div>

            <p className="text-xs text-brand-charcoal/80 leading-relaxed font-light">
              {quickViewProduct.shortDescription || quickViewProduct.description}
            </p>

            {/* Color Swatch */}
            {quickViewProduct.availableColors && quickViewProduct.availableColors.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-brand-border/60">
                <span className="text-xs text-brand-charcoal font-medium">
                  Color / Shade: <strong className="font-normal text-brand-muted">{selectedColor?.name}</strong>
                </span>
                <div className="flex items-center gap-2">
                  {quickViewProduct.availableColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-6 h-6 rounded-full border-2 transition p-0.5 ${
                        selectedColor?.name === color.name ? 'border-brand-berry' : 'border-transparent'
                      }`}
                    >
                      <span
                        className="w-full h-full rounded-full border border-black/10 block"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size */}
            {quickViewProduct.availableSizes && quickViewProduct.availableSizes.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-brand-border/60">
                <span className="text-xs text-brand-charcoal font-medium">Size</span>
                <div className="flex flex-wrap gap-1.5">
                  {quickViewProduct.availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1 text-xs rounded-full border transition ${
                        selectedSize === size
                          ? 'bg-brand-berry text-white border-brand-berry'
                          : 'bg-white text-brand-charcoal border-brand-border hover:bg-brand-blush'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="space-y-3 pt-3 border-t border-brand-border">
            <div className="flex items-center gap-2.5">
              {/* Qty */}
              <div className="flex items-center border border-brand-border rounded-full bg-white text-xs">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2.5 py-1 text-brand-charcoal hover:bg-brand-blush transition rounded-l-full"
                >
                  -
                </button>
                <span className="px-2 text-xs font-medium min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2.5 py-1 text-brand-charcoal hover:bg-brand-blush transition rounded-r-full"
                >
                  +
                </button>
              </div>

              {/* Add to bag */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-2.5 px-4 bg-brand-berry hover:bg-brand-berry-dark text-white rounded-full text-xs font-medium tracking-wider transition shadow-xs flex items-center justify-center gap-1.5"
              >
                {addedAnimation ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                <span>Add to Bag • {formatPKR(quickViewProduct.price * quantity)}</span>
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(quickViewProduct)}
                className={`p-2.5 rounded-full border transition ${
                  inWishlist
                    ? 'bg-brand-berry text-white border-brand-berry'
                    : 'bg-white text-brand-charcoal border-brand-border hover:bg-brand-blush'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="text-center">
              <Link
                href={`/product/${quickViewProduct.id}`}
                onClick={closeQuickView}
                className="text-xs text-brand-muted hover:text-brand-berry underline"
              >
                View Full Product Details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
