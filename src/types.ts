export type Page =
  | 'login'
  | 'register'
  | 'marketplace'
  | 'product-detail'
  | 'checkout'
  | 'orders'
  | 'admin';

export type UserRole = 'buyer' | 'admin';
export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';
export type OrderStatus = 'processing' | 'confirmed' | 'shipped' | 'out_for_delivery' | 'delivered';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  farmName?: string;
}

export interface Product {
  id: string;
  productTitle: string;
  productDescription: string;
  itemPrice: number;
  originalPrice?: number;
  category: string;
  brand: string;
  stockStatus: StockStatus;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  specs: Record<string, string>;
  tags: string[];
  isFeatured?: boolean;
  sku: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

export interface Order {
  orderId: string;
  orderDate: string;
  items: CartItem[];
  totalAmount: number;
  orderStatus: OrderStatus;
  shippingAddress: ShippingAddress;
  estimatedDelivery: string;
  trackingNumber: string;
  paymentMethod: string;
}

export interface FilterState {
  category: string;
  brands: string[];
  priceMin: string;
  priceMax: string;
  stockOnly: boolean;
  minRating: number;
}
