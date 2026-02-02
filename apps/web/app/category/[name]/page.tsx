'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Star, MapPin, ArrowLeft, Search } from 'lucide-react'

// Vendor data from search
const ALL_VENDORS = [
  // Hair & Beauty
  { id: '1', name: 'Divine Hair Studio', category: 'Hair & Beauty', location: 'London, E1', rating: 4.9, reviewCount: 124, image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&h=300&fit=crop', price: '£45-£150', verified: true },
  { id: '6', name: 'Royal Braids Salon', category: 'Hair & Beauty', location: 'London, SE1', rating: 4.8, reviewCount: 156, image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop', price: '£50-£180', verified: true },
  { id: '7', name: 'Afro Chic Barbers', category: 'Hair & Beauty', location: 'Birmingham, B2', rating: 4.7, reviewCount: 203, image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop', price: '£25-£60', verified: true },
  { id: '8', name: 'Natural Hair Heaven', category: 'Hair & Beauty', location: 'Manchester, M4', rating: 4.9, reviewCount: 178, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop', price: '£40-£120', verified: true },
  { id: '9', name: 'Elegant Locs Studio', category: 'Hair & Beauty', location: 'Leeds, LS2', rating: 4.6, reviewCount: 91, image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop', price: '£55-£200', verified: false },
  { id: '10', name: 'Beauty Queens Salon', category: 'Hair & Beauty', location: 'London, N1', rating: 4.8, reviewCount: 167, image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop', price: '£45-£160', verified: true },

  // Food & Catering
  { id: '2', name: 'Authentic Jollof Kitchen', category: 'Food & Catering', location: 'Manchester, M1', rating: 4.8, reviewCount: 89, image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop', price: '£15-£50/pp', verified: true },
  { id: '11', name: 'Mama Africa Cuisine', category: 'Food & Catering', location: 'London, SW9', rating: 4.9, reviewCount: 234, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop', price: '£20-£60/pp', verified: true },
  { id: '12', name: 'Suya Spot', category: 'Food & Catering', location: 'Birmingham, B5', rating: 4.7, reviewCount: 145, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop', price: '£12-£35/pp', verified: true },
  { id: '13', name: 'Plantain & Spice Catering', category: 'Food & Catering', location: 'London, E8', rating: 4.8, reviewCount: 198, image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop', price: '£18-£55/pp', verified: false },
  { id: '14', name: 'West African Delights', category: 'Food & Catering', location: 'Leeds, LS6', rating: 4.6, reviewCount: 87, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop', price: '£16-£45/pp', verified: true },

  // Fashion & Clothing
  { id: '3', name: 'Kente Designs Tailor', category: 'Fashion & Clothing', location: 'Birmingham, B1', rating: 4.7, reviewCount: 56, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', price: '£100-£500', verified: true },
  { id: '15', name: 'Ankara Couture', category: 'Fashion & Clothing', location: 'London, W1', rating: 4.9, reviewCount: 178, image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop', price: '£80-£600', verified: true },
  { id: '16', name: 'African Prints Boutique', category: 'Fashion & Clothing', location: 'Manchester, M3', rating: 4.8, reviewCount: 134, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop', price: '£60-£400', verified: true },
  { id: '17', name: 'Royal Threads Custom', category: 'Fashion & Clothing', location: 'London, SE15', rating: 4.7, reviewCount: 92, image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop', price: '£120-£700', verified: false },

  // Tech Support
  { id: '4', name: 'Pro Tech Solutions', category: 'Tech Support', location: 'Leeds, LS1', rating: 4.6, reviewCount: 72, image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop', price: '£40-£100/hr', verified: true },
  { id: '18', name: 'Digital Fix IT', category: 'Tech Support', location: 'London, EC1', rating: 4.8, reviewCount: 156, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop', price: '£35-£90/hr', verified: true },
  { id: '19', name: 'Code Masters Hub', category: 'Tech Support', location: 'Birmingham, B3', rating: 4.7, reviewCount: 98, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop', price: '£45-£120/hr', verified: true },

  // Health & Wellness
  { id: '5', name: 'Nia Wellness Center', category: 'Health & Wellness', location: 'London, SW1', rating: 4.9, reviewCount: 103, image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop', price: '£60-£150', verified: true },
  { id: '20', name: 'Holistic Health Hub', category: 'Health & Wellness', location: 'Manchester, M20', rating: 4.8, reviewCount: 142, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', price: '£50-£140', verified: true },
  { id: '21', name: 'Spa Afrique', category: 'Health & Wellness', location: 'Birmingham, B12', rating: 4.7, reviewCount: 118, image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop', price: '£70-£180', verified: false },
  { id: '22', name: 'Yoga & Mindfulness Studio', category: 'Health & Wellness', location: 'London, E2', rating: 4.9, reviewCount: 167, image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop', price: '£45-£120', verified: true },

  // Education & Training
  { id: '23', name: 'African Languages Academy', category: 'Education & Training', location: 'London, N7', rating: 4.8, reviewCount: 89, image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop', price: '£30-£80/hr', verified: true },
  { id: '24', name: 'Music & Dance Workshop', category: 'Education & Training', location: 'Birmingham, B7', rating: 4.7, reviewCount: 76, image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=400&h=300&fit=crop', price: '£25-£70/hr', verified: true },
  { id: '25', name: 'Professional Skills Training', category: 'Education & Training', location: 'Manchester, M15', rating: 4.9, reviewCount: 134, image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop', price: '£40-£100/hr', verified: true },

  // Home Services
  { id: '26', name: 'Expert Cleaning Services', category: 'Home Services', location: 'London, SE22', rating: 4.8, reviewCount: 201, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop', price: '£25-£60/hr', verified: true },
  { id: '27', name: 'Handyman Solutions', category: 'Home Services', location: 'Birmingham, B11', rating: 4.6, reviewCount: 112, image: 'https://images.unsplash.com/photo-1581578017093-cd30959cfce5?w=400&h=300&fit=crop', price: '£35-£80/hr', verified: false },
  { id: '28', name: 'Garden & Landscaping Pro', category: 'Home Services', location: 'Leeds, LS11', rating: 4.7, reviewCount: 95, image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop', price: '£30-£90/hr', verified: true },

  // Event Planning
  { id: '29', name: 'Afro Events & Weddings', category: 'Event Planning', location: 'London, SW2', rating: 4.9, reviewCount: 187, image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop', price: '£500-£5000', verified: true },
  { id: '30', name: 'Party Perfect Planners', category: 'Event Planning', location: 'Manchester, M21', rating: 4.8, reviewCount: 143, image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop', price: '£300-£3000', verified: true },
]

const categoryNames: { [key: string]: string } = {
  'hair-beauty': 'Hair & Beauty',
  'food-catering': 'Food & Catering',
  'fashion-clothing': 'Fashion & Clothing',
  'tech-support': 'Tech Support',
  'health-wellness': 'Health & Wellness',
  'education-training': 'Education & Training',
  'home-services': 'Home Services',
  'event-planning': 'Event Planning',
}

export default function CategoryPage() {
  const params = useParams()
  const categoryUrl = (params?.name as string) || ''
  const categoryName = categoryNames[categoryUrl] || 'Category'

  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'price'>('rating')

  const categoryVendors = useMemo(() => {
    return ALL_VENDORS.filter(v => v.category === categoryName)
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating
        if (sortBy === 'reviews') return b.reviewCount - a.reviewCount
        return 0
      })
      .filter(v => v.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [searchTerm, sortBy])

  const categoryIcons: { [key: string]: string } = {
    'Hair & Beauty': '✨',
    'Food & Catering': '🍽️',
    'Fashion & Clothing': '👗',
    'Tech Support': '💻',
    'Health & Wellness': '🧘',
    'Education & Training': '📚',
    'Home Services': '🏠',
    'Event Planning': '🎉',
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-primary/10">
        <div className="container-custom py-4">
          <div className="flex items-center gap-4">
            <Link href="/search" className="hover:text-accent transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-3xl font-bold text-gradient">
              {categoryIcons[categoryName]} {categoryName}
            </h1>
            <span className="ml-auto text-muted">{categoryVendors.length} vendors</span>
          </div>
        </div>
      </div>

      {/* Search and Sort */}
      <div className="container-custom py-8">
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              placeholder="Search vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-primary/20 border border-primary/30 rounded-lg pl-10 pr-4 py-3 text-text placeholder:text-muted focus:outline-none focus:border-accent"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-primary/20 border border-primary/30 rounded-lg px-4 py-3 text-text focus:outline-none focus:border-accent"
          >
            <option value="rating">Sort by Rating</option>
            <option value="reviews">Sort by Reviews</option>
          </select>
        </div>

        {/* Vendors Grid */}
        {categoryVendors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted text-lg">No vendors found matching your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryVendors.map((vendor, index) => (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card overflow-hidden hover:shadow-lg hover:shadow-accent/20 group cursor-pointer"
                onClick={() => (window.location.href = `/vendor/${vendor.id}`)}
              >
                <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                  <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {vendor.verified && (
                    <div className="absolute top-3 right-3 bg-accent/90 text-primary px-3 py-1 rounded-full text-xs font-bold">
                      ✓ Verified
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold text-text group-hover:text-accent transition-colors">
                      {vendor.name}
                    </h3>
                    <p className="text-sm text-muted">{vendor.category}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="font-semibold text-text">{vendor.rating}</span>
                    </div>
                    <span className="text-xs text-muted">({vendor.reviewCount} reviews)</span>
                  </div>

                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2 text-muted">
                      <MapPin className="w-4 h-4" />
                      {vendor.location}
                    </div>
                    <p className="text-accent font-semibold">{vendor.price}</p>
                  </div>

                  <Link
                    href={`/vendor/${vendor.id}`}
                    className="block w-full mt-4 btn-primary text-center py-2 rounded-lg text-sm"
                  >
                    View Profile
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
