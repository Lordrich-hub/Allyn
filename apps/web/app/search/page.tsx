'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, MapPin, Star, Filter, X, ChevronDown } from 'lucide-react'
import { CATEGORIES } from '@afroluxe/lib'

// Mock data - replace with real Supabase data
const MOCK_VENDORS = [
  // Hair & Beauty
  {
    id: '1',
    name: 'Divine Hair Studio',
    category: 'Hair & Beauty',
    location: 'London, E1',
    rating: 4.9,
    reviewCount: 124,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&h=300&fit=crop',
    price: '£45-£150',
    verified: true,
  },
  {
    id: '6',
    name: 'Royal Braids Salon',
    category: 'Hair & Beauty',
    location: 'London, SE1',
    rating: 4.8,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
    price: '£50-£180',
    verified: true,
  },
  {
    id: '7',
    name: 'Afro Chic Barbers',
    category: 'Hair & Beauty',
    location: 'Birmingham, B2',
    rating: 4.7,
    reviewCount: 203,
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop',
    price: '£25-£60',
    verified: true,
  },
  {
    id: '8',
    name: 'Natural Hair Heaven',
    category: 'Hair & Beauty',
    location: 'Manchester, M4',
    rating: 4.9,
    reviewCount: 178,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop',
    price: '£40-£120',
    verified: true,
  },
  {
    id: '9',
    name: 'Elegant Locs Studio',
    category: 'Hair & Beauty',
    location: 'Leeds, LS2',
    rating: 4.6,
    reviewCount: 91,
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop',
    price: '£55-£200',
    verified: false,
  },
  {
    id: '10',
    name: 'Beauty Queens Salon',
    category: 'Hair & Beauty',
    location: 'London, N1',
    rating: 4.8,
    reviewCount: 167,
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop',
    price: '£45-£160',
    verified: true,
  },
  
  // Food & Catering
  {
    id: '2',
    name: 'Authentic Jollof Kitchen',
    category: 'Food & Catering',
    location: 'Manchester, M1',
    rating: 4.8,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop',
    price: '£15-£50/pp',
    verified: true,
  },
  {
    id: '11',
    name: 'Mama Africa Cuisine',
    category: 'Food & Catering',
    location: 'London, SW9',
    rating: 4.9,
    reviewCount: 234,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
    price: '£20-£60/pp',
    verified: true,
  },
  {
    id: '12',
    name: 'Suya Spot',
    category: 'Food & Catering',
    location: 'Birmingham, B5',
    rating: 4.7,
    reviewCount: 145,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
    price: '£12-£35/pp',
    verified: true,
  },
  {
    id: '13',
    name: 'Plantain & Spice Catering',
    category: 'Food & Catering',
    location: 'London, E8',
    rating: 4.8,
    reviewCount: 198,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
    price: '£18-£55/pp',
    verified: false,
  },
  {
    id: '14',
    name: 'West African Delights',
    category: 'Food & Catering',
    location: 'Leeds, LS6',
    rating: 4.6,
    reviewCount: 87,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    price: '£16-£45/pp',
    verified: true,
  },
  
  // Fashion & Clothing
  {
    id: '3',
    name: 'Kente Designs Tailor',
    category: 'Fashion & Clothing',
    location: 'Birmingham, B1',
    rating: 4.7,
    reviewCount: 56,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    price: '£100-£500',
    verified: true,
  },
  {
    id: '15',
    name: 'Ankara Couture',
    category: 'Fashion & Clothing',
    location: 'London, W1',
    rating: 4.9,
    reviewCount: 178,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop',
    price: '£80-£600',
    verified: true,
  },
  {
    id: '16',
    name: 'African Prints Boutique',
    category: 'Fashion & Clothing',
    location: 'Manchester, M3',
    rating: 4.8,
    reviewCount: 134,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    price: '£60-£400',
    verified: true,
  },
  {
    id: '17',
    name: 'Royal Threads Custom',
    category: 'Fashion & Clothing',
    location: 'London, SE15',
    rating: 4.7,
    reviewCount: 92,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
    price: '£120-£700',
    verified: false,
  },
  
  // Tech Support
  {
    id: '4',
    name: 'Pro Tech Solutions',
    category: 'Tech Support',
    location: 'Leeds, LS1',
    rating: 4.6,
    reviewCount: 72,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
    price: '£40-£100/hr',
    verified: true,
  },
  {
    id: '18',
    name: 'Digital Fix IT',
    category: 'Tech Support',
    location: 'London, EC1',
    rating: 4.8,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
    price: '£35-£90/hr',
    verified: true,
  },
  {
    id: '19',
    name: 'Code Masters Hub',
    category: 'Tech Support',
    location: 'Birmingham, B3',
    rating: 4.7,
    reviewCount: 98,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
    price: '£45-£120/hr',
    verified: true,
  },
  
  // Health & Wellness
  {
    id: '5',
    name: 'Nia Wellness Center',
    category: 'Health & Wellness',
    location: 'London, SW1',
    rating: 4.9,
    reviewCount: 103,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop',
    price: '£60-£150',
    verified: true,
  },
  {
    id: '20',
    name: 'Holistic Health Hub',
    category: 'Health & Wellness',
    location: 'Manchester, M20',
    rating: 4.8,
    reviewCount: 142,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    price: '£50-£140',
    verified: true,
  },
  {
    id: '21',
    name: 'Spa Afrique',
    category: 'Health & Wellness',
    location: 'Birmingham, B12',
    rating: 4.7,
    reviewCount: 118,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop',
    price: '£70-£180',
    verified: false,
  },
  {
    id: '22',
    name: 'Yoga & Mindfulness Studio',
    category: 'Health & Wellness',
    location: 'London, E2',
    rating: 4.9,
    reviewCount: 167,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
    price: '£45-£120',
    verified: true,
  },
  
  // Education & Training
  {
    id: '23',
    name: 'African Languages Academy',
    category: 'Education & Training',
    location: 'London, N7',
    rating: 4.8,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
    price: '£30-£80/hr',
    verified: true,
  },
  {
    id: '24',
    name: 'Music & Dance Workshop',
    category: 'Education & Training',
    location: 'Birmingham, B7',
    rating: 4.7,
    reviewCount: 76,
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=400&h=300&fit=crop',
    price: '£25-£70/hr',
    verified: true,
  },
  {
    id: '25',
    name: 'Professional Skills Training',
    category: 'Education & Training',
    location: 'Manchester, M15',
    rating: 4.9,
    reviewCount: 134,
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop',
    price: '£40-£100/hr',
    verified: true,
  },
  
  // Home Services
  {
    id: '26',
    name: 'Expert Cleaning Services',
    category: 'Home Services',
    location: 'London, SE22',
    rating: 4.8,
    reviewCount: 201,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
    price: '£25-£60/hr',
    verified: true,
  },
  {
    id: '27',
    name: 'Handyman Solutions',
    category: 'Home Services',
    location: 'Birmingham, B11',
    rating: 4.6,
    reviewCount: 112,
    image: 'https://images.unsplash.com/photo-1581578017093-cd30959cfce5?w=400&h=300&fit=crop',
    price: '£35-£80/hr',
    verified: false,
  },
  {
    id: '28',
    name: 'Garden & Landscaping Pro',
    category: 'Home Services',
    location: 'Leeds, LS11',
    rating: 4.7,
    reviewCount: 95,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    price: '£30-£90/hr',
    verified: true,
  },
  
  // Event Planning
  {
    id: '29',
    name: 'Afro Events & Weddings',
    category: 'Event Planning',
    location: 'London, SW2',
    rating: 4.9,
    reviewCount: 187,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop',
    price: '£500-£5000',
    verified: true,
  },
  {
    id: '30',
    name: 'Party Perfect Planners',
    category: 'Event Planning',
    location: 'Manchester, M21',
    rating: 4.8,
    reviewCount: 143,
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop',
    price: '£300-£3000',
    verified: true,
  },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedLocation, setSelectedLocation] = useState('')
  const [minRating, setMinRating] = useState(0)
  const [radiusMiles, setRadiusMiles] = useState(25)
  const [showFilters, setShowFilters] = useState(false)
  const [useMyLocation, setUseMyLocation] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'categories'>('categories')

  const filteredVendors = useMemo(() => {
    return MOCK_VENDORS.filter((vendor) => {
      const matchesSearch =
        vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.category.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !selectedCategory || vendor.category === selectedCategory
      const matchesLocation = !selectedLocation || vendor.location.toLowerCase().includes(selectedLocation.toLowerCase())
      const matchesRating = vendor.rating >= minRating

      return matchesSearch && matchesCategory && matchesLocation && matchesRating
    })
  }, [searchQuery, selectedCategory, selectedLocation, minRating])

  // Group vendors by category
  const vendorsByCategory = useMemo(() => {
    const grouped: Record<string, typeof MOCK_VENDORS> = {}
    filteredVendors.forEach((vendor) => {
      if (!grouped[vendor.category]) {
        grouped[vendor.category] = []
      }
      grouped[vendor.category].push(vendor)
    })
    return grouped
  }, [filteredVendors])

  const handleUseMyLocation = () => {
    if ('geolocation' in navigator) {
      setUseMyLocation(true)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSelectedLocation(`Current Location`)
          console.log('Location:', position.coords.latitude, position.coords.longitude)
        },
        (error) => {
          console.error('Error getting location:', error)
          setUseMyLocation(false)
        }
      )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Search Header */}
      <div className="sticky top-0 z-30 bg-surface/95 backdrop-blur-sm border-b border-border">
        <div className="container-custom py-4 space-y-4">
          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
              <input
                type="text"
                placeholder="Search services, vendors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-primary border border-border rounded-lg pl-12 pr-4 py-3 text-text placeholder:text-muted/50 focus-ring"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary px-4 py-3 rounded-lg flex items-center gap-2"
            >
              <Filter className="w-5 h-5" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {/* Mobile Filters Toggle */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 pb-4"
            >
              {/* Category Filter */}
              <div>
                <label className="text-sm font-medium text-text block mb-2">Category</label>
                <select
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                  className="w-full bg-primary border border-border rounded-lg px-4 py-2 text-text focus-ring"
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="text-sm font-medium text-text block mb-2">Location</label>
                <div className="space-y-2">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
                    <input
                      type="text"
                      placeholder="City or postcode"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full bg-primary border border-border rounded-lg pl-12 pr-4 py-2 text-text placeholder:text-muted/50 focus-ring"
                    />
                  </div>
                  <button
                    onClick={handleUseMyLocation}
                    className="text-sm text-accent hover:underline"
                  >
                    {useMyLocation ? '📍 Using current location' : '📍 Use my current location'}
                  </button>
                </div>
              </div>

              {/* Radius Filter */}
              <div>
                <label className="text-sm font-medium text-text block mb-2">
                  Search Radius: {radiusMiles} miles
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={radiusMiles}
                  onChange={(e) => setRadiusMiles(parseInt(e.target.value))}
                  className="w-full accent-accent"
                />
                <div className="flex justify-between text-xs text-muted mt-1">
                  <span>1 mile</span>
                  <span>50 miles</span>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="text-sm font-medium text-text block mb-2">
                  Minimum Rating: {minRating.toFixed(1)}★
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={minRating}
                  onChange={(e) => setMinRating(parseFloat(e.target.value))}
                  className="w-full accent-accent"
                />
              </div>

              {/* Clear Filters */}
              {(selectedCategory || selectedLocation || minRating > 0 || radiusMiles !== 25) && (
                <button
                  onClick={() => {
                    setSelectedCategory(null)
                    setSelectedLocation('')
                    setMinRating(0)
                    setRadiusMiles(25)
                    setUseMyLocation(false)
                  }}
                  className="w-full text-accent hover:underline text-sm font-medium"
                >
                  Clear all filters
                </button>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="container-custom py-8">
        <div className="mb-6 flex justify-between items-center">
          <p className="text-muted">
            Found <span className="text-accent font-semibold">{filteredVendors.length}</span> vendors
            {selectedCategory && ` in ${selectedCategory}`}
            {selectedLocation && ` near ${selectedLocation}`}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('categories')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'categories'
                  ? 'bg-accent text-primary'
                  : 'bg-primary text-muted hover:text-text'
              }`}
            >
              By Category
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-accent text-primary'
                  : 'bg-primary text-muted hover:text-text'
              }`}
            >
              Grid View
            </button>
          </div>
        </div>

        {filteredVendors.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Search className="w-16 h-16 text-muted/30 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-text mb-2">No vendors found</h3>
            <p className="text-muted">Try adjusting your filters or search terms</p>
          </motion.div>
        ) : viewMode === 'categories' ? (
          // Category View
          <div className="space-y-12">
            {Object.entries(vendorsByCategory).map(([category, vendors]) => (
              <div key={category}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gradient">{category}</h2>
                  <span className="text-sm text-muted bg-primary px-3 py-1 rounded-full">
                    {vendors.length} {vendors.length === 1 ? 'vendor' : 'vendors'}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vendors.map((vendor, index) => (
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
              </div>
            ))}
          </div>
        ) : (
          // Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVendors.map((vendor, index) => (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card overflow-hidden hover:shadow-lg hover:shadow-accent/20 group cursor-pointer"
                onClick={() => (window.location.href = `/vendor/${vendor.id}`)}
              >
                {/* Vendor Image */}
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

                {/* Vendor Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold text-text group-hover:text-accent transition-colors">
                      {vendor.name}
                    </h3>
                    <p className="text-sm text-muted">{vendor.category}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="font-semibold text-text">{vendor.rating}</span>
                    </div>
                    <span className="text-xs text-muted">({vendor.reviewCount} reviews)</span>
                  </div>

                  {/* Location & Price */}
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2 text-muted">
                      <MapPin className="w-4 h-4" />
                      {vendor.location}
                    </div>
                    <p className="text-accent font-semibold">{vendor.price}</p>
                  </div>

                  {/* View Button */}
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
