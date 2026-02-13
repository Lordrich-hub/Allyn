'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Bell, CreditCard, Clock, Percent } from 'lucide-react'

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
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="card p-8">
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
          </div>

          <div className="card p-8">
            <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-accent" />
              Payout Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-text">Bank Name</label>
                <input className="mt-2 w-full border border-border rounded-lg px-3 py-2 bg-transparent" placeholder="Barclays" />
              </div>
              <div>
                <label className="text-sm font-semibold text-text">Account Number</label>
                <input className="mt-2 w-full border border-border rounded-lg px-3 py-2 bg-transparent" placeholder="**** 1432" />
              </div>
              <div>
                <label className="text-sm font-semibold text-text">Payout Schedule</label>
                <select className="mt-2 w-full border border-border rounded-lg px-3 py-2 bg-transparent">
                  <option>Weekly</option>
                  <option>Bi-weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-text">Minimum Payout</label>
                <input className="mt-2 w-full border border-border rounded-lg px-3 py-2 bg-transparent" placeholder="£100" />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button className="btn-primary px-6 py-2 rounded-lg">Save Payout Settings</button>
            </div>
          </div>

          <div className="card p-8">
            <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-accent" />
              Notifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {[
                'New booking requests',
                'Payment processed',
                'Customer messages',
                'Review alerts',
              ].map((item) => (
                <label key={item} className="flex items-center gap-3 border border-border rounded-lg px-4 py-3">
                  <input type="checkbox" defaultChecked className="accent-accent" />
                  <span className="text-text">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="card p-8">
            <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
              <Percent className="w-5 h-5 text-accent" />
              Cancellation Policy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-text">Minimum notice</label>
                <select className="mt-2 w-full border border-border rounded-lg px-3 py-2 bg-transparent">
                  <option>12 hours</option>
                  <option>24 hours</option>
                  <option>48 hours</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-text">Late cancellation fee</label>
                <input className="mt-2 w-full border border-border rounded-lg px-3 py-2 bg-transparent" placeholder="25%" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
