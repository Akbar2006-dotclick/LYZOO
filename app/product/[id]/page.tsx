'use client';

import React, { useState, useEffect } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Check,
  ChevronDown,
  ChevronUp,
  Share2,
} from 'lucide-react';
import { getProductById, getRelatedProducts } from '@/data/products';
import { formatPKR, calculateDiscount } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ProductCard } from '@/components/ui/ProductCard';
import { ProductVariantColor } from '@/types';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const product = getProductById(id);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<ProductVariantColor | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToast, setIsAddedToast] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('details');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setQuantity(1);
      if (product.availableSizes && product.availableSizes.length > 0) {
        setSelectedSize(product.availableSizes[0]);
      } else {
        setSelectedSize('');
      }
      if (product.availableColors && product.availableColors.length > 0) {
        setSelectedColor(product.availableColors[0]);
      } else {
        setSelectedColor(undefined);
      }
    }
  }, [product]);

  if (!product) {
    return (
      <div className="py-24 text-center">
        <h2 className="font-serif text-3xl text-brand-charcoal">Piece Not Found</h2>
        <p className="text-xs text-brand-muted mt-2">The requested creation is no longer available.</p>
        <Link href="/shop" className="mt-6 inline-block px-6 py-2.5 bg-brand-berry text-white rounded-full text-xs uppercase tracking-widest">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const discount = calculateDiscount(product.price, product.compareAtPrice);
  const related = getRelatedProducts(product.id, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setIsAddedToast(true);
    setTimeout(() => setIsAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    router.push('/checkout');
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const toggleAccordion = (name: string) => {
    setActiveAccordion(activeAccordion === name ? null : name);
  };

  return (
    <div className="bg-[#FAF6F4] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Shop', href: '/shop' },
            { label: product.category, href: `/shop?category=${encodeURIComponent(product.category)}` },
            { label: product.name },
          ]}
        />

        {/* Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-3xl p-6 sm:p-10 border border-brand-border/70 shadow-sm">
          {/* Left: Gallery (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {product.images.length > 1 && (
              <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto max-h-[520px] shrink-0 no-scrollbar">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-20 rounded-xl overflow-hidden border-2 transition shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-brand-berry scale-102'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="relative flex-1 aspect-[3/4] sm:min-h-[520px] rounded-2xl overflow-hidden bg-brand-blush border border-brand-border/60">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {discount > 0 && (
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs bg-brand-berry text-white font-medium">
                  Save {discount}%
                </span>
              )}

              <button
                onClick={handleShare}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-brand-charcoal hover:text-brand-berry transition shadow-xs"
                title="Share link"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Right: Details (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            <div className="space-y-3.5">
              <span className="text-[10px] uppercase tracking-wider text-brand-muted block">
                {product.category}
              </span>

              <h1 className="font-serif text-2xl sm:text-3xl font-medium text-brand-charcoal leading-snug">
                {product.name}
              </h1>

              {product.subtitle && (
                <p className="text-xs text-brand-berry font-medium -mt-1">
                  {product.subtitle}
                </p>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-2.5 pt-1">
                <span className="font-serif text-2xl sm:text-3xl font-semibold text-brand-berry">
                  {formatPKR(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-sm text-brand-muted line-through">
                    {formatPKR(product.compareAtPrice)}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Color Swatch */}
              {product.availableColors && product.availableColors.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-brand-border/60">
                  <span className="text-xs text-brand-charcoal font-medium">
                    Shade / Finish: <strong className="font-normal text-brand-muted">{selectedColor?.name}</strong>
                  </span>
                  <div className="flex items-center gap-2">
                    {product.availableColors.map((color) => (
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
              {product.availableSizes && product.availableSizes.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-brand-border/60">
                  <span className="text-xs text-brand-charcoal font-medium">Select Size</span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.availableSizes.map((size) => (
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

              {/* Quantity */}
              <div className="pt-2 border-t border-brand-border/60 flex items-center gap-3">
                <span className="text-xs text-brand-charcoal font-medium">Quantity:</span>
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
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-3 border-t border-brand-border">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-5 bg-brand-berry hover:bg-brand-berry-dark text-white rounded-full text-xs uppercase tracking-wider font-semibold transition shadow-xs flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag • {formatPKR(product.price * quantity)}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-full border transition ${
                    inWishlist
                      ? 'bg-brand-berry text-white border-brand-berry'
                      : 'bg-white text-brand-charcoal border-brand-border hover:bg-brand-blush'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-3 px-5 bg-[#FAF0F2] hover:bg-[#F8DFE3] text-brand-berry rounded-full text-xs uppercase tracking-wider font-semibold transition border border-brand-border flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                <span>Buy Now (Instant Checkout)</span>
              </button>

              {isAddedToast && (
                <div className="p-2.5 bg-brand-blush border border-brand-berry/40 text-brand-berry rounded-xl text-xs flex items-center justify-between animate-fadeIn">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-brand-berry" />
                    <span>Added {quantity} &times; &ldquo;{product.name}&rdquo; to your bag!</span>
                  </span>
                  <Link href="/checkout" className="underline font-semibold ml-2">
                    Checkout &rarr;
                  </Link>
                </div>
              )}
            </div>

            {/* Accordions */}
            <div className="pt-2 border-t border-brand-border/60 divide-y divide-brand-border/60">
              <div className="py-2.5">
                <button
                  onClick={() => toggleAccordion('details')}
                  className="w-full flex items-center justify-between text-xs font-semibold text-brand-charcoal"
                >
                  <span>Product Specifications</span>
                  {activeAccordion === 'details' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {activeAccordion === 'details' && (
                  <div className="pt-2 text-xs text-brand-muted space-y-1 font-light animate-fadeIn">
                    {product.materials && <p><strong>Material:</strong> {product.materials}</p>}
                    <ul className="list-disc list-inside space-y-0.5 pt-1">
                      {product.details.map((d, i) => <li key={i}>{d}</li>)}
                    </ul>
                  </div>
                )}
              </div>

              <div className="py-2.5">
                <button
                  onClick={() => toggleAccordion('delivery')}
                  className="w-full flex items-center justify-between text-xs font-semibold text-brand-charcoal"
                >
                  <span>Free Shipping & Delivery</span>
                  {activeAccordion === 'delivery' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {activeAccordion === 'delivery' && (
                  <p className="pt-2 text-xs text-brand-muted leading-relaxed font-light animate-fadeIn">
                    Complimentary delivery across Pakistan on orders above 3,000 PKR. Delivered carefully in our signature packaging within 2-3 business days.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Harmonious Pairings */}
        <div className="mt-16 pt-10 border-t border-brand-border/60">
          <div className="text-center mb-8">
            <span className="text-[10px] uppercase tracking-widest text-brand-muted">
              YOU MAY ALSO LOVE
            </span>
            <h3 className="font-serif text-2xl font-medium text-brand-charcoal mt-0.5">
              More Curations
            </h3>
            <div className="text-brand-berry text-xs mt-0.5">♥</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {related.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
