export interface Vendor {
  id: string
  name: string
  image: string
  rating: number
  reviewCount: number
  distance: number
  priceRange: { min: number; max: number }
  category: string
  verified: boolean
  availableToday: boolean
  homeService: boolean
  description?: string
  services?: string[]
  address?: string
  phone?: string
  openHours?: string
}

export interface Message {
  id: string
  senderId: string
  receiverId: string
  text: string
  timestamp: Date
  read: boolean
}

export interface Conversation {
  id: string
  vendorId: string
  vendorName: string
  vendorImage: string
  lastMessage: string
  timestamp: Date
  unread: number
}

export interface Booking {
  id: string
  vendorId: string
  vendorName: string
  service: string
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
}

export interface FilterOptions {
  category: string[]
  priceRange: [number, number]
  distance: number
  verified: boolean
  homeService: boolean
  availableToday: boolean
}
