'use client'

import { useState, useEffect } from 'react'
import { Search, SlidersHorizontal, MapIcon, List, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { VendorCard } from '@/components/VendorCard'
import { VendorCardSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { FilterChip, FilterPanel } from '@/components/FilterChip'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { Button } from '@/components/ui/Button'
import { mockVendors, categories } from '@/lib/mock-data'
import { Vendor } from '@/lib/types'

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['All'])
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [vendors, setVendors] = useState<Vendor[]>([])

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setVendors(mockVendors)
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const toggleCategory = (category: string) => {
    if (category === 'All') {
      setSelectedCategories(['All'])
    } else {
      const newSelection = selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories.filter((c) => c !== 'All'), category]
      
      setSelectedCategories(newSelection.length === 0 ? ['All'] : newSelection)
    }
  }

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategories.includes('All') || 
                           selectedCategories.includes(vendor.category)
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Search Header */}
      <div className="sticky top-0 z-30 bg-surface/95 backdrop-blur-sm border-b border-border">
        <div className="container-custom py-4 space-y-4">
          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
              <input
                type="text"
                placeholder="Search vendors, services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-primary border border-border rounded-lg pl-12 pr-4 py-3 text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                aria-label="Search vendors and services"
              />
            </div>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setIsFilterOpen(true)}
              className="md:hidden"
              aria-label="Open filters"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </Button>
          </div>

          {/* Category Chips */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <FilterChip
                key={category}
                label={category}
                selected={selectedCategories.includes(category)}
                onToggle={() => toggleCategory(category)}
              />
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted">
              {filteredVendors.length} {filteredVendors.length === 1 ? 'vendor' : 'vendors'} found
            </p>
            <SegmentedControl
              options={[
                { value: 'list', label: 'List', icon: <List className="w-4 h-4" /> },
                { value: 'map', label: 'Map', icon: <MapIcon className="w-4 h-4" /> },
              ]}
              value={viewMode}
              onChange={(value) => setViewMode(value as 'list' | 'map')}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-6">
        {viewMode === 'list' ? (
          <>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <VendorCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredVendors.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredVendors.map((vendor, index) => (
                  <motion.div
                    key={vendor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <VendorCard vendor={vendor} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <EmptyState
                icon={<Search className="w-8 h-8" />}
                title="No vendors found"
                description="Try adjusting your search or filters to find what you're looking for."
                action={{
                  label: 'Clear Filters',
                  onClick: () => {
                    setSearchQuery('')
                    setSelectedCategories(['All'])
                  },
                }}
              />
            )}
          </>
        ) : (
          <div className="bg-surface border border-border rounded-2xl p-12 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto">
                <MapPin className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-text">Map View Coming Soon</h3>
              <p className="text-muted">
                We're working on an interactive map to help you find vendors near you. 
                Stay tuned for this exciting feature!
              </p>
              <Button onClick={() => setViewMode('list')}>
                Back to List View
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Filter Panel */}
      <FilterPanel isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-text mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <FilterChip
                  key={category}
                  label={category}
                  selected={selectedCategories.includes(category)}
                  onToggle={() => toggleCategory(category)}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-text mb-3">Quick Filters</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 bg-primary rounded-lg cursor-pointer hover:bg-surface transition-colors">
                <input type="checkbox" className="w-4 h-4 text-accent focus:ring-accent" />
                <span className="text-text text-sm">Verified only</span>
              </label>
              <label className="flex items-center gap-3 p-3 bg-primary rounded-lg cursor-pointer hover:bg-surface transition-colors">
                <input type="checkbox" className="w-4 h-4 text-accent focus:ring-accent" />
                <span className="text-text text-sm">Available today</span>
              </label>
              <label className="flex items-center gap-3 p-3 bg-primary rounded-lg cursor-pointer hover:bg-surface transition-colors">
                <input type="checkbox" className="w-4 h-4 text-accent focus:ring-accent" />
                <span className="text-text text-sm">Home service</span>
              </label>
            </div>
          </div>

          <Button className="w-full" onClick={() => setIsFilterOpen(false)}>
            Apply Filters
          </Button>
        </div>
      </FilterPanel>
    </div>
  )
}
