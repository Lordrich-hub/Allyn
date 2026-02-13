'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Building2, MapPin, Phone, Globe, Tag } from 'lucide-react'

export default function VendorEditPage() {
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
          <h1 className="text-2xl font-bold text-text mb-2">Edit Vendor Profile</h1>
          <p className="text-muted mb-6">Update your business information and contact details.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text">Business Name</label>
              <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2">
                <Building2 className="w-4 h-4 text-muted" />
                <input className="w-full bg-transparent outline-none text-sm" placeholder="Your business name" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-text">Phone</label>
              <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2">
                <Phone className="w-4 h-4 text-muted" />
                <input className="w-full bg-transparent outline-none text-sm" placeholder="+44 7xxx xxx xxx" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-text">Location</label>
              <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2">
                <MapPin className="w-4 h-4 text-muted" />
                <input className="w-full bg-transparent outline-none text-sm" placeholder="City, Postcode" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-text">Website</label>
              <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2">
                <Globe className="w-4 h-4 text-muted" />
                <input className="w-full bg-transparent outline-none text-sm" placeholder="https://" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-text">Primary Category</label>
              <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2">
                <Tag className="w-4 h-4 text-muted" />
                <input className="w-full bg-transparent outline-none text-sm" placeholder="Hair & Beauty" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-text">Service Area</label>
              <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2">
                <MapPin className="w-4 h-4 text-muted" />
                <input className="w-full bg-transparent outline-none text-sm" placeholder="London · 15 mile radius" />
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <label className="text-sm font-semibold text-text">Business Bio</label>
            <textarea
              className="w-full bg-surface border border-border rounded-lg px-3 py-3 text-sm text-text"
              rows={4}
              placeholder="Share your story, specialties, and what clients can expect."
            />
          </div>

          <div className="flex justify-end mt-8">
            <button className="btn-primary px-6 py-2 rounded-lg">Save Changes</button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
