import { z } from 'zod'

// Auth schemas
export const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.enum(['customer', 'vendor']),
})

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const profileUpdateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().optional(),
})

// Vendor schemas
export const vendorCreateSchema = z.object({
  business_name: z.string().min(3, 'Business name must be at least 3 characters'),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  category: z.string().min(1, 'Category is required'),
  postcode: z.string().min(5, 'Valid postcode required'),
  radius_km: z.number().min(1).max(100, 'Radius must be between 1 and 100 km'),
  home_service: z.boolean(),
})

export const vendorUpdateSchema = vendorCreateSchema.partial()

// Service schemas
export const serviceCreateSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  price: z.number().min(0, 'Price must be positive'),
  duration_mins: z.number().min(15, 'Minimum duration is 15 minutes').max(480, 'Maximum duration is 8 hours'),
})

export const serviceUpdateSchema = serviceCreateSchema.partial()

// Booking schemas
export const bookingCreateSchema = z.object({
  vendor_id: z.string().uuid(),
  service_id: z.string().uuid(),
  booking_datetime: z.string().datetime(),
  note: z.string().max(500, 'Note must be less than 500 characters').optional(),
})

export const bookingUpdateSchema = z.object({
  status: z.enum(['pending', 'accepted', 'declined', 'completed', 'cancelled']),
})

// Review schemas
export const reviewCreateSchema = z.object({
  booking_id: z.string().uuid(),
  rating: z.number().min(1, 'Minimum rating is 1').max(5, 'Maximum rating is 5'),
  comment: z.string().max(500, 'Comment must be less than 500 characters').optional(),
})

// Message schemas
export const messageCreateSchema = z.object({
  conversation_id: z.string().uuid(),
  text: z.string().min(1, 'Message cannot be empty').max(1000, 'Message too long'),
})

// Search schemas
export const searchVendorsSchema = z.object({
  lat: z.number().optional(),
  lng: z.number().optional(),
  postcode: z.string().optional(),
  radius_km: z.number().min(1).max(100).default(10),
  category: z.string().optional(),
  home_service: z.boolean().optional(),
  search: z.string().optional(),
})

// Report schemas
export const reportCreateSchema = z.object({
  reported_user_id: z.string().uuid(),
  reason: z.string().min(1, 'Reason is required'),
  details: z.string().max(1000, 'Details too long').optional(),
})

// Type exports
export type SignUpInput = z.infer<typeof signUpSchema>
export type SignInInput = z.infer<typeof signInSchema>
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>
export type VendorCreateInput = z.infer<typeof vendorCreateSchema>
export type VendorUpdateInput = z.infer<typeof vendorUpdateSchema>
export type ServiceCreateInput = z.infer<typeof serviceCreateSchema>
export type ServiceUpdateInput = z.infer<typeof serviceUpdateSchema>
export type BookingCreateInput = z.infer<typeof bookingCreateSchema>
export type BookingUpdateInput = z.infer<typeof bookingUpdateSchema>
export type ReviewCreateInput = z.infer<typeof reviewCreateSchema>
export type MessageCreateInput = z.infer<typeof messageCreateSchema>
export type SearchVendorsInput = z.infer<typeof searchVendorsSchema>
export type ReportCreateInput = z.infer<typeof reportCreateSchema>
