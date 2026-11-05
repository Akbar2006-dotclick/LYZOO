'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Tag,
  Sparkles,
  ArrowLeft,
  Check,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPKR } from '@/lib/utils';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
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

  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode);
    setPromoMessage({ text: res.message, error: !res.success });
    if (res.success) setInputCode('');
  };

  if (items.length === 0) {
    return (
      <div className="bg-brand-ivory min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Shopping Bag' }]} />

          <div className="bg-white rounded-3xl p-12 sm:p-20 text-center max-w-2xl mx-auto border border-brand-border/70 shadow-luxury">
            <div className="w-20 h-20 rounded-full bg-brand-ivory text-brand-muted mx-auto flex items-center justify-center mb-6">
              <ShoppingBag className="w-10 h-10 stroke-1" />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-brand-charcoal">
              Your Bag is Currently Empty
            </h1>
            <p className="text-xs sm:text-sm text-brand-muted mt-3 max-w-md mx-auto leading-relaxed font-light">
              Explore our new autumn/winter silk collections, clean beauty formulations, and handcrafted 18K vermeil jewellery.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/shop"
                className="px-8 py-3.5 bg-brand-charcoal text-white hover:bg-brand-rose rounded-xl text-xs uppercase tracking-widest font-semibold transition shadow-md"
              >
                Explore Atelier Catalog
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-ivory min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: 'Shopping Bag' }]} />

        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-brand-rose font-semibold">
              Review Curations
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-brand-charcoal mt-1">
              Your Shopping Bag ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-brand-muted hover:text-red-600 transition flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Bag</span>
          </button>
        </div>

        {/* Free Shipping Alert Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-brand-border/70 shadow-sm mb-8">
          <div className="flex items-center justify-between text-xs text-brand-charcoal mb-2 font-medium">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brand-rose" />
              {amountToFreeShipping === 0
                ? 'Complimentary Express Delivery Unlocked Across Pakistan!'
                : `Add ${formatPKR(amountToFreeShipping)} more to qualify for Free Express Shipping`}
            </span>
            <span className="text-brand-muted">{Math.round(freeShippingProgress)}%</span>
          </div>
          <div className="w-full bg-brand-ivory h-2 rounded-full overflow-hidden border border-brand-border/50">
            <div
              className="bg-brand-charcoal h-full transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Main Grid: Items Table + Summary Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Items List (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-brand-border/70 shadow-luxury space-y-6">
            <div className="divide-y divide-brand-border/60">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                >
                  {/* Image & Basic Info */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <Link
                      href={`/product/${item.product.id}`}
                      className="w-20 h-28 sm:w-24 sm:h-32 rounded-xl overflow-hidden bg-brand-beige shrink-0 border border-brand-border/60"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    <div className="space-y-1.5 min-w-0">
                      <span className="text-[10px] uppercase tracking-widest text-brand-muted">
                        {item.product.category}
                      </span>
                      <Link
                        href={`/product/${item.product.id}`}
                        className="block font-serif text-base sm:text-lg font-medium text-brand-charcoal hover:text-brand-rose transition truncate"
                      >
                        {item.product.name}
                      </Link>

                      {/* Variant badges */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-brand-muted">
                        {item.selectedSize && (
                          <span className="px-2 py-0.5 rounded bg-brand-ivory border border-brand-border text-brand-charcoal">
                            Size: {item.selectedSize}
                          </span>
                        )}
                        {item.selectedColor && (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-brand-ivory border border-brand-border text-brand-charcoal">
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-black/20"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            {item.selectedColor.name}
                          </span>
                        )}
                      </div>

                      <p className="text-xs font-semibold text-brand-charcoal pt-1">
                        Unit Price: {formatPKR(item.product.price)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity & Subtotal */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-brand-border/40">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-brand-border rounded-lg bg-brand-ivory text-xs">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1.5 text-brand-charcoal hover:bg-brand-beige transition font-semibold"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-3 font-semibold min-w-[28px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1.5 text-brand-charcoal hover:bg-brand-beige transition font-semibold"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Total item price */}
                    <div className="text-right">
                      <span className="block font-serif text-base sm:text-lg font-semibold text-brand-charcoal">
                        {formatPKR(item.product.price * item.quantity)}
                      </span>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-brand-muted hover:text-red-600 transition"
                      aria-label="Remove item"
                      title="Remove from bag"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-brand-border/60 flex items-center justify-between">
              <Link
                href="/shop"
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-brand-charcoal hover:text-brand-rose transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Curating</span>
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-brand-border/70 shadow-luxury space-y-6 sticky top-28">
            <h2 className="font-serif text-xl sm:text-2xl font-medium text-brand-charcoal pb-4 border-b border-brand-border/60">
              Order Summary
            </h2>

            {/* Promo Code Input */}
            <div>
              {promoCode ? (
                <div className="flex items-center justify-between bg-brand-rose-light/70 border border-brand-rose/40 px-3.5 py-2.5 rounded-xl text-xs">
                  <div className="flex items-center gap-1.5 text-brand-rose-dark font-medium">
                    <Tag className="w-4 h-4" />
                    <span>Promo Applied: {promoCode} (-{promoDiscountPercent}%)</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-brand-muted hover:text-brand-charcoal text-[11px] underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo voucher (e.g. LYZOO10)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="w-full text-xs uppercase px-3.5 py-2.5 bg-brand-ivory border border-brand-border rounded-xl focus:outline-none focus:border-brand-charcoal"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-brand-charcoal text-white rounded-xl text-xs uppercase tracking-wider hover:bg-brand-charcoal/90 transition"
                    >
                      Apply
                    </button>
                  </div>
                  <p className="text-[10px] text-brand-muted">
                    VIP demo voucher: Use code <strong className="text-brand-rose-dark">LYZOO10</strong> for 10% off.
                  </p>
                </form>
              )}

              {promoMessage && (
                <p
                  className={`text-xs mt-2 ${
                    promoMessage.error ? 'text-red-600' : 'text-emerald-700'
                  }`}
                >
                  {promoMessage.text}
                </p>
              )}
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-3 text-xs sm:text-sm text-brand-muted pt-4 border-t border-brand-border/60">
              <div className="flex items-center justify-between">
                <span>Items Subtotal</span>
                <span className="text-brand-charcoal font-medium">{formatPKR(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex items-center justify-between text-brand-rose-dark font-medium">
                  <span>VIP Courtesy Discount ({promoDiscountPercent}%)</span>
                  <span>-{formatPKR(discount)}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span>Express Courier (Pakistan)</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-emerald-700 font-medium">Complimentary</span>
                  ) : (
                    formatPKR(shipping)
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between text-base sm:text-lg font-semibold text-brand-charcoal pt-4 border-t border-brand-border">
                <span>Estimated Total</span>
                <span className="font-serif text-2xl">{formatPKR(total)}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <div className="space-y-3 pt-2">
              <Link
                href="/checkout"
                className="w-full py-4 bg-brand-charcoal text-white hover:bg-brand-rose rounded-xl text-xs uppercase tracking-widest font-semibold text-center transition shadow-luxury flex items-center justify-center gap-2"
              >
                <span>Proceed to Demo Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center gap-2 text-[11px] text-brand-muted/80 pt-2">
                <ShieldCheck className="w-4 h-4 text-brand-rose" />
                <span>Frontend demonstration order flow &bull; No payment card charged</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

