'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, Star, MapPin, Phone, Clock, CheckCircle, 
  Home, MessageCircle, Calendar 
} from 'lucide-react'
import { mockVendors } from '@/lib/mock-data'
import { Vendor } from '@/lib/types'
import { formatDistance, formatRating } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { VendorProfileSkeleton } from '@/components/ui/Skeleton'
import { useToast } from '@/components/ui/Toast'

export default function VendorPage() {
  const params = useParams()
  const router = useRouter()
  const { showToast } = useToast()
  const [vendor, setVendor] = useState<Vendor | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const foundVendor = mockVendors.find((v) => v.id === params.id)
      setVendor(foundVendor || null)
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [params.id])

  const handleChat = () => {
    showToast('success', 'Opening chat...')
    setTimeout(() => router.push('/chat'), 500)
  }

  const handleBook = () => {
    showToast('success', 'Booking request sent!')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container-custom py-6">
          <VendorProfileSkeleton />
        </div>
      </div>
    )
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text mb-2">Vendor not found</h2>
          <p className="text-muted mb-6">The vendor you're looking for doesn't exist.</p>
          <Button onClick={() => router.push('/search')}>Back to Search</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-32 md:pb-6">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-surface/95 backdrop-blur-sm border-b border-border">
        <div className="container-custom py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted hover:text-text transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded-lg p-2 -ml-2"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="container-custom py-6 space-y-6"
      >
        {/* Hero Image */}
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
          <Image
            src={vendor.image}
            alt={vendor.name}
            fill
            className="object-cover"
            priority
          />
          {vendor.availableToday && (
            <div className="absolute top-4 right-4">
              <Badge variant="available">Available Today</Badge>
            </div>
          )}
        </div>

        {/* Vendor Info */}
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-text mb-2">{vendor.name}</h1>
            <p className="text-muted">{vendor.category}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-accent">
              <Star className="w-5 h-5 fill-current" />
              <span className="text-xl font-bold">{formatRating(vendor.rating)}</span>
            </div>
            <span className="text-muted">({vendor.reviewCount} reviews)</span>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {vendor.verified && (
              <Badge variant="verified" icon={<CheckCircle className="w-4 h-4" />}>
                Verified Business
              </Badge>
            )}
            {vendor.homeService && (
              <Badge variant="homeService" icon={<Home className="w-4 h-4" />}>
                Home Service Available
              </Badge>
            )}
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card hover={false} className="flex items-center gap-3">
            <div className="p-3 bg-accent/10 rounded-lg">
              <MapPin className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted">Distance</p>
              <p className="font-semibold text-text">{formatDistance(vendor.distance)}</p>
            </div>
          </Card>

          <Card hover={false} className="flex items-center gap-3">
            <div className="p-3 bg-accent-secondary/10 rounded-lg">
              <Clock className="w-5 h-5 text-accent-secondary" />
            </div>
            <div>
              <p className="text-xs text-muted">Hours</p>
              <p className="font-semibold text-text text-sm">{vendor.openHours}</p>
            </div>
          </Card>

          <Card hover={false} className="flex items-center gap-3">
            <div className="p-3 bg-accent/10 rounded-lg">
              <Phone className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted">Phone</p>
              <p className="font-semibold text-text text-sm">{vendor.phone}</p>
            </div>
          </Card>
        </div>

        {/* Description */}
        <Card hover={false}>
          <h2 className="text-xl font-bold text-text mb-3">About</h2>
          <p className="text-muted leading-relaxed">{vendor.description}</p>
        </Card>

        {/* Services */}
        {vendor.services && vendor.services.length > 0 && (
          <Card hover={false}>
            <h2 className="text-xl font-bold text-text mb-4">Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {vendor.services.map((service, index) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-2 p-3 bg-primary rounded-lg"
                >
                  <CheckCircle className="w-4 h-4 text-accent-secondary flex-shrink-0" />
                  <span className="text-text">{service}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        )}

        {/* Location */}
        <Card hover={false}>
          <h2 className="text-xl font-bold text-text mb-3">Location</h2>
          <div className="flex items-center gap-2 text-muted">
            <MapPin className="w-5 h-5" />
            <span>{vendor.address}</span>
          </div>
        </Card>
      </motion.div>

      {/* Sticky Bottom Action Bar (Mobile) */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4 md:hidden z-40"
      >
        <div className="flex gap-3">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={handleChat}
          >
            <MessageCircle className="w-5 h-5" />
            Chat
          </Button>
          <Button
            variant="primary"
            className="flex-1"
            onClick={handleBook}
          >
            <Calendar className="w-5 h-5" />
            Book Now
          </Button>
        </div>
      </motion.div>

      {/* Desktop Action Buttons */}
      <div className="hidden md:block fixed bottom-8 right-8 z-40">
        <div className="flex gap-3">
          <Button
            variant="secondary"
            size="lg"
            onClick={handleChat}
            className="shadow-2xl"
          >
            <MessageCircle className="w-5 h-5" />
            Chat
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={handleBook}
            className="shadow-2xl"
          >
            <Calendar className="w-5 h-5" />
            Book Now
          </Button>
        </div>
      </div>
    </div>
  )
}
