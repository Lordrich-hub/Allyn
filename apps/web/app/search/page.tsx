'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, MapPin, Star, Filter, X, ChevronDown } from 'lucide-react'
import { CATEGORIES } from '@afroluxe/lib'

// Mock data - replace with real Supabase data
const MOCK_VENDORS = [
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
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedLocation, setSelectedLocation] = useState('')
  const [minRating, setMinRating] = useState(0)
  const [showFilters, setShowFilters] = useState(false)

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
              {(selectedCategory || selectedLocation || minRating > 0) && (
                <button
                  onClick={() => {
                    setSelectedCategory(null)
                    setSelectedLocation('')
                    setMinRating(0)
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
        <div className="mb-6">
          <p className="text-muted">
            Found <span className="text-accent font-semibold">{filteredVendors.length}</span> vendors
            {selectedCategory && ` in ${selectedCategory}`}
            {selectedLocation && ` near ${selectedLocation}`}
          </p>
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
        ) : (
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
