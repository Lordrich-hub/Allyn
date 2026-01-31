// Shared TypeScript types across Web & Mobile

export type UserRole = 'customer' | 'vendor' | 'admin'

export type BookingStatus =
  | 'pending'
  | 'accepted'
  | 'declined'
  | 'completed'
  | 'cancelled'

export interface Profile {
  id: string
  role: UserRole
  name: string
  email: string
  phone?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Vendor {
  id: string
  user_id: string
  business_name: string
  bio?: string
  category: string
  postcode: string
  lat: number
  lng: number
  radius_km: number
  home_service: boolean
  verified: boolean
  rating?: number
  review_count?: number
  created_at: string
  updated_at: string
  
  // Relations
  profile?: Profile
  services?: Service[]
  portfolio?: PortfolioImage[]
}

export interface Service {
  id: string
  vendor_id: string
  title: string
  description?: string
  price: number
  duration_mins: number
  active: boolean
  created_at: string
  updated_at: string
}

export interface PortfolioImage {
  id: string
  vendor_id: string
  image_url: string
  caption?: string
  created_at: string
}

export interface Favorite {
  id: string
  customer_id: string
  vendor_id: string
  created_at: string
  
  // Relations
  vendor?: Vendor
}

export interface Conversation {
  id: string
  customer_id: string
  vendor_id: string
  last_message?: string
  last_message_at?: string
  created_at: string
  updated_at: string
  
  // Relations
  customer?: Profile
  vendor?: Profile & { vendors?: Vendor[] }
  messages?: Message[]
}

export interface Message {
  id: string
  conversation_id: string
  sender_id: string
  text: string
  read: boolean
  created_at: string
  
  // Relations
  sender?: Profile
}

export interface Booking {
  id: string
  customer_id: string
  vendor_id: string
  service_id: string
  booking_datetime: string
  duration_mins: number
  note?: string
  status: BookingStatus
  created_at: string
  updated_at: string
  
  // Relations
  customer?: Profile
  vendor?: Profile & { vendors?: Vendor[] }
  service?: Service
  review?: Review
}

export interface Review {
  id: string
  booking_id: string
  customer_id: string
  vendor_id: string
  rating: number
  comment?: string
  created_at: string
  
  // Relations
  customer?: Profile
  vendor?: Profile & { vendors?: Vendor[] }
  booking?: Booking
}

export interface Report {
  id: string
  reporter_id: string
  reported_user_id: string
  reason: string
  details?: string
  status: 'pending' | 'reviewed' | 'resolved'
  created_at: string
  updated_at: string
  
  // Relations
  reporter?: Profile
  reported_user?: Profile
}

// Search & Filter types
export interface VendorSearchParams {
  lat?: number
  lng?: number
  postcode?: string
  radius_km?: number
  category?: string
  home_service?: boolean
  search?: string
}

export interface VendorSearchResult extends Vendor {
  distance_km?: number
}

// API Response types
export interface ApiResponse<T> {
  data?: T
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  pageSize: number
}
