'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ProductVariantColor } from '@/types';

interface CartContextType {
  items: CartItem[];
  addToCart: (
    product: Product,
    quantity?: number,
    selectedSize?: string,
    selectedColor?: ProductVariantColor
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  itemCount: number;
  promoCode: string | null;
  promoDiscountPercent: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  freeShippingThreshold: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 3000; // Matching screenshot: "Free Shipping on Orders Above 3000 PKR"
const STANDARD_SHIPPING_FEE = 300;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoDiscountPercent, setPromoDiscountPercent] = useState<number>(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('lyzoo_cart');
      if (stored) {
        setItems(JSON.parse(stored));
      }
      const storedPromo = localStorage.getItem('lyzoo_promo');
      if (storedPromo) {
        const promo = JSON.parse(storedPromo);
        setPromoCode(promo.code);
        setPromoDiscountPercent(promo.percent);
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem('lyzoo_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items, isInitialized]);

  const addToCart = (
    product: Product,
    quantity: number = 1,
    selectedSize?: string,
    selectedColor?: ProductVariantColor
  ) => {
    const size = selectedSize || (product.availableSizes && product.availableSizes[0]);
    const color = selectedColor || (product.availableColors && product.availableColors[0]);
    const cartItemId = `${product.id}-${size || 'nosize'}-${color?.name || 'nocolor'}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          product,
          quantity,
          selectedSize: size,
          selectedColor: color,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    setPromoCode(null);
    setPromoDiscountPercent(0);
    localStorage.removeItem('lyzoo_cart');
    localStorage.removeItem('lyzoo_promo');
  };

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'LYZOO10') {
      setPromoCode('LYZOO10');
      setPromoDiscountPercent(10);
      localStorage.setItem('lyzoo_promo', JSON.stringify({ code: 'LYZOO10', percent: 10 }));
      return { success: true, message: 'VIP Promo Code applied: 10% off your entire order.' };
    }
    if (clean === 'FIRST15') {
      setPromoCode('FIRST15');
      setPromoDiscountPercent(15);
      localStorage.setItem('lyzoo_promo', JSON.stringify({ code: 'FIRST15', percent: 15 }));
      return { success: true, message: 'Welcome code applied: 15% off first order.' };
    }
    return { success: false, message: 'Invalid promo code. Try LYZOO10 or FIRST15.' };
  };

  const removePromoCode = () => {
    setPromoCode(null);
    setPromoDiscountPercent(0);
    localStorage.removeItem('lyzoo_promo');
  };

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = Math.round((subtotal * promoDiscountPercent) / 100);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : STANDARD_SHIPPING_FEE;
  const total = Math.max(0, subtotal - discount + shipping);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        subtotal,
        discount,
        shipping,
        total,
        itemCount,
        promoCode,
        promoDiscountPercent,
        applyPromoCode,
        removePromoCode,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
