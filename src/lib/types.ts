export interface User {
  id: string;
  email: string;
  is_active: boolean;
  is_customer: boolean;
  is_vendor: boolean;
  date_joined: string;
}

export interface ShippingAddress {
  id: string;
  user?: User;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  country: string;
  state: string;
  lga: string;
  zip_code: string;
  created_at: string;
}

export interface Vendor {
  id: string;
  brand_name: string;
  avatar: string;
  is_activated: boolean;
  total_sales_ever: number;
  created_at: string;
  updated_at: string;
  is_diamond: boolean;
}

export interface Product {
  id: string;
  vendor: Vendor;
  name: string;
  stock: number;
  description: string;
  is_on_flash_sales: boolean;
  current_price: number;
  old_price?: number;
  thumbnail: string;
  created_at: string;
  updated_at: string;
  is_in_stock: boolean;
  percentage_diffrence: number;
}

interface CartItem {
  id: string;
  user?: User;
  product: Product;
  quantity: number;
  added_at: string;
  sub_total: number;
}

export interface Cart {
  id: string;
  user: User;
  cart_items: CartItem[];
  created_at: string;
  updated_at: string;
}

interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  price_per_item: number;
  sub_total: number;
}

export interface Order {
  id: string;
  user: User;
  shipping_address?: ShippingAddress;
  status: string;
  order_items: OrderItem[];
  amount: number;
  readonly order_refrence: string;
  payment_refrence: string;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  user: User;
  order: Order;
  amount: number;
  payment_method?: string;
  payment_status: string;
  payment_refrence?: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export type Lesson = {
  id: string;
  title: string;
  content: string;
  video_url?: string | null;
  created_at?: string;
  updated_at?: string;
  course?: string;
  instructor?: string; // legacy field, often holds tutor name
};

export type Course = {
  id: string;
  title: string;
  description: string;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
  lessons?: Lesson[];
  tutor?: {
    id: string;
    full_name?: string;
    email?: string;
  };
};

export type Enrollment = {
  id: string;
  course: Course;
  progress: number;
};

export type AnalyticsRow = {
  id: string;
  date: string;
  new_users: number;
  new_courses: number;
  new_enrollments: number;
};

export type Application = {
  id: string;
  role: string;
  applicant: { email: string } | string;
  bio?: string;
  status?: 'approved' | 'rejected' | 'pending';
};