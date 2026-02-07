'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock } from 'lucide-react'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function VendorSettingsPage() {
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
          <h1 className="text-2xl font-bold text-text mb-2">Business Hours</h1>
          <p className="text-muted mb-6">Set your weekly availability for bookings.</p>

          <div className="space-y-3">
            {DAYS.map((day) => (
              <div key={day} className="flex items-center justify-between border border-border rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted" />
                  <span className="text-sm font-semibold text-text">{day}</span>
                </div>
                <div className="flex items-center gap-2">
                  <input className="border border-border rounded-lg px-2 py-1 text-sm bg-transparent" placeholder="09:00" />
                  <span className="text-muted text-sm">-</span>
                  <input className="border border-border rounded-lg px-2 py-1 text-sm bg-transparent" placeholder="18:00" />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-8">
            <button className="btn-primary px-6 py-2 rounded-lg">Save Hours</button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
