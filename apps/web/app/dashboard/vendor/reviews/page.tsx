'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Star } from 'lucide-react'

const MOCK_REVIEWS = [
  { id: '1', name: 'Ama K.', rating: 5, text: 'Fantastic service and super professional.' },
  { id: '2', name: 'Kofi A.', rating: 4, text: 'Great experience, will book again.' },
  { id: '3', name: 'Zainab M.', rating: 5, text: 'Highly recommended vendor!' },
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
