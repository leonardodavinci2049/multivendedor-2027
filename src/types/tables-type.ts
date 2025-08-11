// TypeScript interfaces generated from Prisma schema models

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SELLER = "SELLER",
}

export enum StoreStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  BANNED = "BANNED",
  DISABLED = "DISABLED",
}

export enum ShippingFeeMethod {
  ITEM = "ITEM",
  WEIGHT = "WEIGHT",
  FIXED = "FIXED",
}

export enum OrderStatus {
  Pending = "Pending",
  Confirmed = "Confirmed",
  Processing = "Processing",
  Shipped = "Shipped",
  OutforDelivery = "OutforDelivery",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
  Failed = "Failed",
  Refunded = "Refunded",
  Returned = "Returned",
  PartiallyShipped = "PartiallyShipped",
  OnHold = "OnHold",
}

export enum PaymentStatus {
  Pending = "Pending",
  Paid = "Paid",
  Failed = "Failed",
  Declined = "Declined",
  Cancelled = "Cancelled",
  Refunded = "Refunded",
  PartiallyRefunded = "PartiallyRefunded",
  Chargeback = "Chargeback",
}

export enum PaymentMethod {
  Paypal = "Paypal",
  Stripe = "Stripe",
}

export enum ProductStatus {
  Pending = "Pending",
  Processing = "Processing",
  ReadyForShipment = "ReadyForShipment",
  Shipped = "Shipped",
  Delivered = "Delivered",
  Canceled = "Canceled",
  Returned = "Returned",
  Refunded = "Refunded",
  FailedDelivery = "FailedDelivery",
  OnHold = "OnHold",
  Backordered = "Backordered",
  PartiallyShipped = "PartiallyShipped",
  ExchangeRequested = "ExchangeRequested",
  AwaitingPickup = "AwaitingPickup",
}

export interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  role: Role;

  stores?: Store[];
  following?: Store[];
  reviews?: Review[];
  cart?: Cart;
  shippingAddresses?: ShippingAddress[];
  orders?: Order[];
  wishlist?: Wishlist[];
  payments?: PaymentDetails[];
  coupons?: Coupon[];

  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  url: string;
  featured: boolean;

  subCategories?: SubCategory[];
  products?: Product[];

  createdAt: Date;
  updatedAt: Date;
}

export interface SubCategory {
  id: string;
  name: string;
  image: string;
  url: string;
  featured: boolean;
  categoryId: string;

  category?: Category;
  products?: Product[];

  createdAt: Date;
  updatedAt: Date;
}

export interface Store {
  id: string;
  name: string;
  description: string;
  email: string;
  phone: string;
  url: string;
  logo: string;
  cover: string;
  status: StoreStatus;
  averageRating: number;
  numReviews: number;
  featured: boolean;
  returnPolicy: string;
  defaultShippingService: string;
  defaultShippingFeePerItem: number;
  defaultShippingFeeForAdditionalItem: number;
  defaultShippingFeePerKg: number;
  defaultShippingFeeFixed: number;
  defaultDeliveryTimeMin: number;
  defaultDeliveryTimeMax: number;
  userId: string;

  user?: User;
  products?: Product[];
  shippingRates?: ShippingRate[];
  followers?: User[];
  cartItems?: CartItem[];
  orderGroups?: OrderGroup[];
  coupons?: Coupon[];

  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  slug: string;
  brand: string;
  rating: number;
  sales: number;
  numReviews: number;
  shippingFeeMethod: ShippingFeeMethod;
  views: number;
  freeShippingForAllCountries: boolean;
  storeId: string;
  categoryId: string;
  subCategoryId: string;
  offerTagId?: string;

  store?: Store;
  variants?: ProductVariant[];
  specs?: Spec[];
  questions?: Question[];
  reviews?: Review[];
  wishlist?: Wishlist[];
  category?: Category;
  subCategory?: SubCategory;
  offerTag?: OfferTag;
  freeShipping?: FreeShipping;

  createdAt: Date;
  updatedAt: Date;
}

export interface ProductVariant {
  id: string;
  variantName: string;
  variantDescription?: string;
  variantImage: string;
  slug: string;
  isSale: boolean;
  saleEndDate?: string;
  sku: string;
  keywords: string;
  sales: number;
  weight: number;
  productId: string;

  product?: Product;
  sizes?: Size[];
  images?: ProductVariantImage[];
  colors?: Color[];
  specs?: Spec[];
  wishlist?: Wishlist[];

  createdAt: Date;
  updatedAt: Date;
}

export interface Size {
  id: string;
  size: string;
  quantity: number;
  price: number;
  discount: number;
  productVariantId: string;

  productVariant?: ProductVariant;
  wishlist?: Wishlist[];

  createdAt: Date;
  updatedAt: Date;
}

export interface ProductVariantImage {
  id: string;
  url: string;
  alt: string;
  order?: number;
  productVariantId: string;

  productVariant?: ProductVariant;

  createdAt: Date;
  updatedAt: Date;
}

export interface Color {
  id: string;
  name: string;
  productVariantId: string;

  productVariant?: ProductVariant;

  createdAt: Date;
  updatedAt: Date;
}

export interface OfferTag {
  id: string;
  name: string;
  url: string;

  products?: Product[];

  createdAt: Date;
  updatedAt: Date;
}

export interface Spec {
  id: string;
  name: string;
  value: string;
  productId?: string;
  variantId?: string;

  product?: Product;
  variant?: ProductVariant;

  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  id: string;
  question: string;
  answer: string;
  productId: string;

  product?: Product;

  createdAt: Date;
  updatedAt: Date;
}

export interface Country {
  id: string;
  name: string;
  code: string;

  shippingRates?: ShippingRate[];
  freeShippingCountries?: FreeShippingCountry[];
  shippingAddresses?: ShippingAddress[];

  createdAt: Date;
  updatedAt: Date;
}

export interface ShippingRate {
  id: string;
  shippingService: string;
  shippingFeePerItem: number;
  shippingFeeForAdditionalItem: number;
  shippingFeePerKg: number;
  shippingFeeFixed: number;
  deliveryTimeMin: number;
  deliveryTimeMax: number;
  returnPolicy: string;
  countryId: string;
  storeId: string;

  country?: Country;
  store?: Store;

  createdAt: Date;
  updatedAt: Date;
}

export interface FreeShipping {
  id: string;
  productId: string;

  product?: Product;
  eligibaleCountries?: FreeShippingCountry[];

  createdAt: Date;
  updatedAt: Date;
}

export interface FreeShippingCountry {
  id: string;
  freeShippingId: string;
  countryId: string;

  freeShipping?: FreeShipping;
  country?: Country;

  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  variant: string;
  variantImage: string;
  review: string;
  rating: number;
  color: string;
  size: string;
  quantity: string;
  likes: number;
  userId: string;
  productId: string;

  images?: ReviewImage[];
  user?: User;
  product?: Product;

  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewImage {
  id: string;
  url: string;
  alt: string;
  reviewId: string;

  review?: Review;

  createdAt: Date;
  updatedAt: Date;
}

export interface Cart {
  id: string;
  userId: string;
  couponId?: string;
  shippingFees: number;
  subTotal: number;
  total: number;

  user?: User;
  coupon?: Coupon;
  cartItems?: CartItem[];

  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  sizeId: string;
  productSlug: string;
  variantSlug: string;
  sku: string;
  name: string;
  image: string;
  size: string;
  price: number;
  quantity: number;
  shippingFee: number;
  totalPrice: number;
  cartId: string;
  storeId: string;

  cart?: Cart;
  store?: Store;

  createdAt: Date;
  updatedAt: Date;
}

export interface ShippingAddress {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  address1: string;
  address2?: string;
  state: string;
  city: string;
  zip_code: string;
  default: boolean;
  userId: string;
  countryId: string;

  orders?: Order[];
  user?: User;
  country?: Country;

  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  shippingFees: number;
  subTotal: number;
  total: number;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  shippingAddressId: string;
  userId: string;

  groups?: OrderGroup[];
  paymentDetails?: PaymentDetails;
  shippingAddress?: ShippingAddress;
  user?: User;

  createdAt: Date;
  updatedAt: Date;
}

export interface OrderGroup {
  id: string;
  status: OrderStatus;
  shippingService: string;
  shippingDeliveryMin: number;
  shippingDeliveryMax: number;
  shippingFees: number;
  subTotal: number;
  total: number;
  orderId: string;
  storeId: string;
  couponId?: string;

  items?: OrderItem[];
  order?: Order;
  store?: Store;
  coupon?: Coupon;

  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  productId: string;
  variantId: string;
  sizeId: string;
  productSlug: string;
  variantSlug: string;
  sku: string;
  name: string;
  image: string;
  size: string;
  quantity: number;
  shippingFee: number;
  price: number;
  totalPrice: number;
  orderGroupId: string;
  status: ProductStatus;

  orderGroup?: OrderGroup;

  createdAt: Date;
  updatedAt: Date;
}

export interface Wishlist {
  id: string;
  userId: string;
  productId: string;
  variantId: string;
  sizeId?: string;

  user?: User;
  product?: Product;
  variant?: ProductVariant;
  size?: Size;

  createdAt: Date;
  updatedAt: Date;
}

export interface Coupon {
  id: string;
  code: string;
  startDate: string;
  endDate: string;
  discount: number;
  storeId: string;

  store?: Store;
  orders?: OrderGroup[];
  users?: User[];
  carts?: Cart[];

  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentDetails {
  id: string;
  paymentInetntId: string;
  paymentMethod: string;
  status: string;
  amount: number;
  currency: string;
  orderId: string;
  userId: string;

  order?: Order;
  user?: User;

  createdAt: Date;
  updatedAt: Date;
}
