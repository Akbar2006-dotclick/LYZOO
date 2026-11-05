'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Truck,
  CreditCard,
  Banknote,
  Building,
  Sparkles,
  ArrowRight,
  Printer,
  Clock,
  ChevronRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '@/context/CartContext';
import { formatPKR } from '@/lib/utils';
import { DemoOrder } from '@/types';

const PAKISTAN_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Abbottabad',
  'Bahawalpur',
  'Other City',
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shipping, discount, total, promoCode, clearCart } = useCart();

  const [formData, setFormData] = useState({
    firstName: 'Sara',
    lastName: 'Ahmed',
    email: 'sara.ahmed@example.com',
    phone: '+92 300 1234567',
    address: 'Apartment 4B, The Oceanfront Suites, Block 4',
    city: 'Karachi',
    province: 'Sindh',
    postalCode: '75600',
    notes: 'Please ring the buzzer on arrival.',
  });

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card_demo' | 'bank_transfer_demo'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<DemoOrder | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderNumber = `LYZ-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder: DemoOrder = {
        orderId: `ord_${Date.now()}`,
        orderNumber,
        createdAt: new Date().toLocaleDateString('en-PK', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        customer: {
          fullName: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          province: formData.province,
          postalCode: formData.postalCode,
          notes: formData.notes,
        },
        items: items.map((i) => ({
          productId: i.productId,
          name: i.product.name,
          price: i.product.price,
          quantity: i.quantity,
          image: i.product.images[0],
          selectedSize: i.selectedSize,
          selectedColor: i.selectedColor?.name,
        })),
        subtotal,
        shipping,
        discount,
        total,
        paymentMethod,
        status: 'confirmed',
        estimatedDelivery: '2 - 3 Business Days via Express Courier',
      };

      try {
        localStorage.setItem('lyzoo_last_order', JSON.stringify(newOrder));
      } catch (err) {
        console.error('Storage error', err);
      }

      setCompletedOrder(newOrder);
      clearCart();
      setIsSubmitting(false);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#9E3D52', '#FBECEE', '#B86B77', '#FFFFFF'],
        });
      } catch (err) {}
    }, 1200);
  };

  // Order Confirmed View
  if (completedOrder) {
    return (
      <div className="bg-[#FAF6F4] min-h-screen py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-brand-border shadow-sm space-y-6 animate-fadeIn">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-brand-blush text-brand-berry mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-brand-berry font-bold">
                DEMO ORDER CONFIRMED ♥
              </span>
              <h1 className="font-serif text-2xl sm:text-4xl font-medium text-brand-charcoal">
                Thank You, {completedOrder.customer.fullName}
              </h1>
              <p className="text-xs text-brand-muted max-w-sm mx-auto">
                Your order <strong className="font-mono text-brand-charcoal">{completedOrder.orderNumber}</strong> has been registered in demo mode.
              </p>
            </div>

            <div className="bg-[#FDF6F7] rounded-2xl p-4 sm:p-5 border border-brand-border/60 text-xs text-brand-charcoal space-y-2">
              <div className="flex justify-between border-b border-brand-border/60 pb-2">
                <span className="text-brand-muted">Delivery Destination</span>
                <span className="font-medium text-right">{completedOrder.customer.city}, {completedOrder.customer.province}</span>
              </div>
              <div className="flex justify-between border-b border-brand-border/60 pb-2">
                <span className="text-brand-muted">Payment Method</span>
                <span className="font-medium capitalize">{completedOrder.paymentMethod === 'cod' ? 'Cash on Delivery (Demo)' : 'Card (Demo)'}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold pt-1">
                <span>Total Amount</span>
                <span className="font-serif text-base text-brand-berry font-bold">{formatPKR(completedOrder.total)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-brand-border text-xs font-medium text-brand-charcoal hover:bg-brand-blush transition flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>

              <Link
                href="/shop"
                className="w-full sm:w-auto px-6 py-2.5 bg-brand-berry hover:bg-brand-berry-dark text-white rounded-full text-xs font-medium transition text-center"
              >
                Continue Shopping →
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Checkout Form View
  return (
    <div className="bg-[#FAF6F4] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-brand-muted uppercase tracking-wider mb-6">
          <Link href="/cart" className="hover:text-brand-charcoal">
            Shopping Bag
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-brand-charcoal font-medium">Demo Checkout</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handlePlaceOrder} id="checkout-form" className="space-y-6">
              {/* Contact */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs space-y-3.5">
                <h2 className="font-serif text-lg sm:text-xl font-medium text-brand-charcoal pb-2 border-b border-brand-border/60">
                  1. Contact Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-brand-charcoal mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 rounded-xl border border-brand-border text-xs text-brand-charcoal bg-[#FAF6F4]/50 focus:outline-none focus:border-brand-berry"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-brand-charcoal mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 rounded-xl border border-brand-border text-xs text-brand-charcoal bg-[#FAF6F4]/50 focus:outline-none focus:border-brand-berry"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Destination */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs space-y-3.5">
                <h2 className="font-serif text-lg sm:text-xl font-medium text-brand-charcoal pb-2 border-b border-brand-border/60">
                  2. Delivery Address
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-brand-charcoal mb-1">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 rounded-xl border border-brand-border text-xs text-brand-charcoal bg-[#FAF6F4]/50 focus:outline-none focus:border-brand-berry"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-brand-charcoal mb-1">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 rounded-xl border border-brand-border text-xs text-brand-charcoal bg-[#FAF6F4]/50 focus:outline-none focus:border-brand-berry"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-brand-charcoal mb-1">Street Address *</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 rounded-xl border border-brand-border text-xs text-brand-charcoal bg-[#FAF6F4]/50 focus:outline-none focus:border-brand-berry"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-brand-charcoal mb-1">City *</label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 rounded-xl border border-brand-border text-xs text-brand-charcoal bg-[#FAF6F4]/50 focus:outline-none focus:border-brand-berry"
                    >
                      {PAKISTAN_CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-brand-charcoal mb-1">Province *</label>
                    <input
                      type="text"
                      name="province"
                      required
                      value={formData.province}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 rounded-xl border border-brand-border text-xs text-brand-charcoal bg-[#FAF6F4]/50 focus:outline-none focus:border-brand-berry"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs space-y-3.5">
                <h2 className="font-serif text-lg sm:text-xl font-medium text-brand-charcoal pb-2 border-b border-brand-border/60">
                  3. Payment Method (Demo)
                </h2>

                <div className="space-y-2.5">
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition ${
                      paymentMethod === 'cod'
                        ? 'border-brand-berry bg-[#FFF9FA]'
                        : 'border-brand-border'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-0.5 accent-brand-berry"
                    />
                    <div>
                      <span className="text-xs font-semibold text-brand-charcoal block">
                        Cash on Delivery (Pakistan COD)
                      </span>
                      <span className="text-[11px] text-brand-muted">
                        Pay upon courier delivery at your doorstep anywhere in Pakistan.
                      </span>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition ${
                      paymentMethod === 'card_demo'
                        ? 'border-brand-berry bg-[#FFF9FA]'
                        : 'border-brand-border'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'card_demo'}
                      onChange={() => setPaymentMethod('card_demo')}
                      className="mt-0.5 accent-brand-berry"
                    />
                    <div>
                      <span className="text-xs font-semibold text-brand-charcoal block">
                        Credit / Debit Card (Interactive Prototype)
                      </span>
                      <span className="text-[11px] text-brand-muted">
                        Simulated card preview. No card number required.
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </form>
          </div>

          {/* Right Summary (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-sm space-y-4 sticky top-24">
            <h2 className="font-serif text-lg font-medium text-brand-charcoal pb-3 border-b border-brand-border/60">
              Order Summary ({items.length} items)
            </h2>

            <div className="max-h-64 overflow-y-auto divide-y divide-brand-border/40">
              {items.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-10 h-12 rounded-lg object-cover bg-brand-blush shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-serif text-xs font-medium text-brand-charcoal truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[10px] text-brand-muted">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-brand-charcoal shrink-0">
                    {formatPKR(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs text-brand-muted pt-3 border-t border-brand-border/60">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-brand-charcoal font-medium">{formatPKR(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-brand-berry font-medium">
                  <span>Discount</span>
                  <span>-{formatPKR(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPKR(shipping)}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-brand-charcoal pt-2 border-t border-brand-border">
                <span>Total Amount</span>
                <span className="font-serif text-lg text-brand-berry font-bold">{formatPKR(total)}</span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              disabled={isSubmitting || items.length === 0}
              className="w-full py-3.5 bg-brand-berry hover:bg-brand-berry-dark disabled:bg-gray-300 text-white rounded-full text-xs uppercase tracking-wider font-semibold transition shadow-xs flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Placing Demo Order...</span>
              ) : (
                <span>Place Demo Order &bull; {formatPKR(total)}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
