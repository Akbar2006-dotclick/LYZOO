export type ProductCategory =
  | "Women's Clothing"
  | 'Makeup'
  | 'Skincare'
  | 'Jewellery'
  | 'Ornaments'
  | 'Handbags'
  | 'Watches'
  | 'Sunglasses'
  | 'Fashion Accessories'
  | 'Lifestyle Products';

export type ProductTag = 'new-arrival' | 'best-seller' | 'trending' | 'limited-edition' | 'sale';

export interface ProductVariantColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  category: ProductCategory;
  subcategory: string;
  price: number; // in PKR
  compareAtPrice?: number;
  discountPercentage?: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  tags?: ProductTag[];
  rating: number; // e.g. 4.9
  reviewCount: number;
  images: string[];
  description: string;
  shortDescription: string;
  details: string[];
  careInstructions?: string[];
  materials?: string;
  availableSizes?: string[];
  availableColors?: ProductVariantColor[];
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  stockQuantity: number;
  sku: string;
}

export interface CategoryInfo {
  id: string;
  name: ProductCategory;
  slug: string;
  description: string;
  image: string;
  bannerImage: string;
  featuredCount?: number;
}

export interface CartItem {
  id: string; // product.id or compound key with variant
  productId: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: ProductVariantColor;
}

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selectedSize?: string;
  selectedColor?: string;
}

export interface DemoOrder {
  orderId: string;
  orderNumber: string;
  createdAt: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    apartment?: string;
    city: string;
    province: string;
    postalCode: string;
    notes?: string;
  };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: 'cod' | 'card_demo' | 'bank_transfer_demo';
  status: 'confirmed' | 'processing' | 'shipped';
  estimatedDelivery: string;
}

