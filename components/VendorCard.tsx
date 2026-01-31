'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, MapPin, CheckCircle, Home } from 'lucide-react'
import { motion } from 'framer-motion'
import { Vendor } from '@/lib/types'
import { formatDistance, formatPriceRange, formatRating } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

interface VendorCardProps {
  vendor: Vendor
  className?: string
}

export function VendorCard({ vendor, className }: VendorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className={cn('group', className)}
    >
      <Link href={`/vendor/${vendor.id}`}>
        <div className="bg-surface border border-border rounded-xl overflow-hidden hover:border-accent/30 transition-all hover:shadow-xl hover:shadow-accent/5">
          {/* Image */}
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={vendor.image}
              alt={vendor.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {vendor.availableToday && (
              <div className="absolute top-3 right-3">
                <Badge variant="available">Available Today</Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            {/* Name */}
            <h3 className="text-lg font-semibold text-text group-hover:text-accent transition-colors line-clamp-1">
              {vendor.name}
            </h3>

            {/* Category */}
            <p className="text-sm text-muted">{vendor.category}</p>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-accent">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-semibold">{formatRating(vendor.rating)}</span>
              </div>
              <span className="text-sm text-muted">({vendor.reviewCount} reviews)</span>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {vendor.verified && (
                <Badge variant="verified" icon={<CheckCircle className="w-3.5 h-3.5" />}>
                  Verified
                </Badge>
              )}
              {vendor.homeService && (
                <Badge variant="homeService" icon={<Home className="w-3.5 h-3.5" />}>
                  Home Service
                </Badge>
              )}
            </div>

            {/* Distance & Price */}
            <div className="flex justify-between items-center pt-2 border-t border-border">
              <div className="flex items-center gap-1 text-muted text-sm">
                <MapPin className="w-4 h-4" />
                <span>{formatDistance(vendor.distance)}</span>
              </div>
              <div className="text-accent font-semibold text-sm">
                {formatPriceRange(vendor.priceRange.min, vendor.priceRange.max)}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
