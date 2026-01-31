// Shared constants

export const CATEGORIES = [
  'Hair Styling',
  'Catering',
  'Tech Services',
  'Fashion & Tailoring',
  'Education & Tutoring',
  'Transportation',
  'Event Planning',
  'Legal Services',
  'Health & Wellness',
  'Photography',
  'Music & Entertainment',
  'Home Services',
  'Beauty & Makeup',
  'Translation',
  'Other',
] as const

export const DEFAULT_SEARCH_RADIUS_KM = 10
export const MAX_SEARCH_RADIUS_KM = 100
export const MIN_SEARCH_RADIUS_KM = 1

export const BOOKING_STATUSES = [
  'pending',
  'accepted',
  'declined',
  'completed',
  'cancelled',
] as const

export const USER_ROLES = ['customer', 'vendor', 'admin'] as const

export const RATING_OPTIONS = [1, 2, 3, 4, 5] as const

export const MAX_PORTFOLIO_IMAGES = 10
export const MAX_FILE_SIZE_MB = 5

export const POSTCODE_REGEX = /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i
