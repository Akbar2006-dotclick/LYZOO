'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPKR } from '@/lib/utils';

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    shipping,
    discount,
    total,
    itemCount,
    promoCode,
    promoDiscountPercent,
    applyPromoCode,
    removePromoCode,
    freeShippingThreshold,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; error?: boolean } | null>(null);

  if (!isCartOpen) return null;

  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode);
    setPromoMessage({ text: res.message, error: !res.success });
    if (res.success) setInputCode('');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-slideLeft border-l border-brand-border">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-brand-border flex items-center justify-between bg-[#FDF6F7]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-brand-berry" />
            <h2 className="font-serif text-lg font-medium text-brand-charcoal">
              Shopping Bag
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-berry text-white">
              {itemCount}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close bag"
            className="p-1 rounded-full text-brand-charcoal hover:bg-brand-blush transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#FAF0F2] px-5 py-3 border-b border-brand-border/60">
          <div className="flex items-center justify-between text-xs text-brand-charcoal mb-1.5">
            <span className="flex items-center gap-1 font-medium text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-brand-berry" />
              {amountToFreeShipping === 0
                ? 'Complimentary Delivery unlocked! ♡'
                : `Add ${formatPKR(amountToFreeShipping)} more for Free Shipping`}
            </span>
            <span className="text-[10px] text-brand-muted">
              {Math.round(freeShippingProgress)}%
            </span>
          </div>
          <div className="w-full bg-brand-border h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-brand-berry h-full transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-brand-blush flex items-center justify-center text-brand-berry mb-4">
                <ShoppingBag className="w-8 h-8 stroke-1 text-brand-berry" />
              </div>
              <h3 className="font-serif text-xl text-brand-charcoal font-medium">
                Your Bag is Empty
              </h3>
              <p className="text-xs text-brand-muted mt-1.5 max-w-xs leading-relaxed font-light">
                Discover your everyday essentials, curated just for you.
              </p>
              <Link
                href="/shop"
                onClick={() => setIsCartOpen(false)}
                className="mt-5 px-6 py-2.5 bg-brand-berry text-white text-xs tracking-wider font-medium rounded-full hover:bg-brand-berry-dark transition shadow-xs"
              >
                Shop Now →
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3.5 p-3 bg-[#FFF9FA] rounded-xl border border-brand-border/60 shadow-xs"
              >
                <Link
                  href={`/product/${item.product.id}`}
                  onClick={() => setIsCartOpen(false)}
                  className="w-16 h-20 rounded-lg overflow-hidden bg-brand-blush shrink-0"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <Link
                        href={`/product/${item.product.id}`}
                        onClick={() => setIsCartOpen(false)}
                        className="font-serif text-xs sm:text-sm font-medium text-brand-charcoal hover:text-brand-berry line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-brand-muted hover:text-red-500 transition p-0.5"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-brand-muted">
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      {item.selectedColor && (
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2 h-2 rounded-full border border-black/20"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          {item.selectedColor.name}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center border border-brand-border rounded-full bg-white text-xs">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-brand-charcoal hover:bg-brand-blush transition rounded-l-full"
                      >
                        -
                      </button>
                      <span className="px-2 text-[11px] font-medium min-w-[18px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-brand-charcoal hover:bg-brand-blush transition rounded-r-full"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-semibold text-xs text-brand-charcoal">
                      {formatPKR(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-brand-border bg-[#FDF6F7] space-y-3">
            {/* Promo Code Input */}
            <div>
              {promoCode ? (
                <div className="flex items-center justify-between bg-white border border-brand-berry/40 px-3 py-2 rounded-lg text-xs">
                  <div className="flex items-center gap-1.5 text-brand-berry font-medium">
                    <Tag className="w-3 h-3" />
                    <span>Applied: {promoCode} (-{promoDiscountPercent}%)</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-brand-muted hover:text-brand-charcoal text-[11px] underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (e.g. LYZOO10)"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="flex-1 text-xs uppercase px-3 py-2 bg-white border border-brand-border rounded-full focus:outline-none focus:border-brand-berry"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-berry text-white rounded-full text-xs font-medium hover:bg-brand-berry-dark transition"
                  >
                    Apply
                  </button>
                </form>
              )}

              {promoMessage && (
                <p
                  className={`text-[11px] mt-1 ${
                    promoMessage.error ? 'text-red-500' : 'text-emerald-700'
                  }`}
                >
                  {promoMessage.text}
                </p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-brand-muted pt-2 border-t border-brand-border/60">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="text-brand-charcoal font-medium">{formatPKR(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex items-center justify-between text-brand-berry">
                  <span>Discount</span>
                  <span>-{formatPKR(discount)}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span className="text-brand-charcoal">
                  {shipping === 0 ? <span className="text-emerald-700 font-medium">Free</span> : formatPKR(shipping)}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm font-semibold text-brand-charcoal pt-2 border-t border-brand-border">
                <span>Total Amount</span>
                <span className="font-serif text-base sm:text-lg text-brand-berry font-bold">
                  {formatPKR(total)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3 px-4 bg-brand-berry hover:bg-brand-berry-dark text-white rounded-full text-xs font-medium tracking-wider text-center shadow-sm transition flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="text-center pt-1">
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-xs text-brand-muted hover:text-brand-charcoal transition underline"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
