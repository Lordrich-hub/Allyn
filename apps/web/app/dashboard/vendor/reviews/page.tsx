'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Star } from 'lucide-react'

const MOCK_REVIEWS = [
  { id: '1', name: 'Ama K.', rating: 5, text: 'Fantastic service and super professional.' },
  { id: '2', name: 'Kofi A.', rating: 4, text: 'Great experience, will book again.' },
  { id: '3', name: 'Zainab M.', rating: 5, text: 'Highly recommended vendor!' },
]

const RATING_BREAKDOWN = [
  { stars: 5, count: 86 },
  { stars: 4, count: 26 },
  { stars: 3, count: 8 },
  { stars: 2, count: 3 },
  { stars: 1, count: 1 },
]

export default function VendorReviewsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-surface/95 backdrop-blur-sm border-b border-border">
        <div className="container-custom py-4 flex items-center gap-3">
          <Link href="/dashboard/vendor" className="flex items-center gap-2 text-accent hover:underline">
            <ArrowLeft className="w-5 h-5" />
            Back to Vendor Dashboard
          </Link>
        </div>
      </div>

      <div className="container-custom py-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-8"
        >
          <h1 className="text-2xl font-bold text-text mb-2">Customer Reviews</h1>
          <p className="text-muted mb-6">See what customers are saying about your services.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-primary/70 rounded-lg p-4">
              <p className="text-sm text-muted">Average rating</p>
              <p className="text-3xl font-bold text-text">4.9</p>
              <p className="text-xs text-muted">124 total reviews</p>
            </div>
            <div className="md:col-span-2 bg-primary/70 rounded-lg p-4">
              <p className="text-sm text-muted mb-3">Rating breakdown</p>
              <div className="space-y-2">
                {RATING_BREAKDOWN.map((row) => {
                  const percent = Math.round((row.count / 124) * 100)
                  return (
                    <div key={row.stars} className="flex items-center gap-3">
                      <span className="text-sm text-text w-10">{row.stars}★</span>
                      <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
                        <div className="h-full bg-accent" style={{ width: `${percent}%` }} />
                      </div>
                      <span className="text-xs text-muted w-10">{percent}%</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {MOCK_REVIEWS.map((review) => (
              <div key={review.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-semibold text-text">{review.name}</p>
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
                <p className="text-muted text-sm">{review.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
