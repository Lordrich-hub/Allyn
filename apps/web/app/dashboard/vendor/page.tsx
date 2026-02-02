'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BarChart3, DollarSign, Calendar, Star, Users, LogOut, Settings, TrendingUp, AlertCircle } from 'lucide-react'

const MOCK_VENDOR = {
  name: 'Divine Hair Studio',
  email: 'hello@divinehair.co.uk',
  avatar: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=200&h=200&fit=crop',
}

const MOCK_STATS = {
  revenue: 4250,
  bookings: 18,
  reviews: 4.9,
  customers: 89,
}

const MOCK_UPCOMING_BOOKINGS = [
  {
    id: '1',
    customerName: 'Zainab M.',
    service: 'Box Braids',
    date: '2026-02-01',
    time: '14:00',
    price: 80,
    status: 'confirmed',
  },
  {
    id: '2',
    customerName: 'Amara P.',
    service: 'Cornrows',
    date: '2026-02-02',
    time: '10:00',
    price: 45,
    status: 'pending',
  },
  {
    id: '3',
    customerName: 'Nora K.',
    service: 'Weave Installation',
    date: '2026-02-03',
    time: '11:00',
    price: 150,
    status: 'confirmed',
  },
]

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-surface/95 backdrop-blur-sm border-b border-border">
        <div className="container-custom py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gradient">Vendor Dashboard</h1>
          <div className="flex gap-2">
            <Link href="/settings" className="p-2 rounded-lg border border-border text-muted hover:text-accent transition-colors">
              <Settings className="w-5 h-5" />
            </Link>
            <button
              className="p-2 rounded-lg border border-border text-muted hover:text-accent transition-colors"
              aria-label="Log out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="container-custom py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-8 flex items-center gap-6"
        >
          <img
            src={MOCK_VENDOR.avatar}
            alt={MOCK_VENDOR.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-text">{MOCK_VENDOR.name}</h2>
            <p className="text-muted">{MOCK_VENDOR.email}</p>
            <p className="text-sm text-green-400 mt-2">✓ Verified Vendor</p>
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard/vendor/services" className="btn-secondary px-6 py-2 rounded-lg text-sm">
              Manage Services
            </Link>
            <Link href="/dashboard/vendor/availability" className="btn-secondary px-6 py-2 rounded-lg text-sm">
              Availability
            </Link>
            <Link href="/dashboard/vendor/edit" className="btn-primary px-6 py-2 rounded-lg text-sm">
              Edit Profile
            </Link>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              icon: DollarSign,
              label: 'Monthly Revenue',
              value: `£${MOCK_STATS.revenue}`,
              change: '+12%',
              positive: true,
            },
            {
              icon: Calendar,
              label: 'Upcoming Bookings',
              value: MOCK_STATS.bookings,
              change: 'This month',
              positive: true,
            },
            {
              icon: Star,
              label: 'Average Rating',
              value: MOCK_STATS.reviews,
              change: '124 reviews',
              positive: true,
            },
            {
              icon: Users,
              label: 'Total Customers',
              value: MOCK_STATS.customers,
              change: '+8 this month',
              positive: true,
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card"
            >
              <div className="flex justify-between items-start mb-4">
                <stat.icon className="w-8 h-8 text-accent" />
                {stat.positive && (
                  <div className="flex items-center gap-1 text-green-400 text-sm font-bold">
                    <TrendingUp className="w-4 h-4" />
                    {stat.change}
                  </div>
                )}
              </div>
              <p className="text-muted text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-text">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-border overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'bookings', label: 'Bookings', icon: Calendar },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-2 font-medium text-sm flex items-center gap-2 border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-accent text-accent'
                  : 'border-transparent text-muted hover:text-text'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-accent/10 border border-accent/30 rounded-xl p-6"
            >
              <h3 className="font-bold text-text mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-accent" />
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Add Service', href: '/dashboard/vendor/services/new' },
                  { label: 'View Messages', href: '/chat' },
                  { label: 'Manage Reviews', href: '/dashboard/vendor/reviews' },
                  { label: 'Edit Hours', href: '/dashboard/vendor/settings' },
                ].map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="btn-secondary py-2 rounded-lg text-sm text-center hover:border-accent"
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <div className="card">
              <h3 className="font-bold text-text mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { action: 'New booking from Zainab M.', time: '2 hours ago' },
                  { action: 'Received 5-star review from Ama K.', time: '4 hours ago' },
                  { action: 'Message from customer about service time', time: '1 day ago' },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-text text-sm">{activity.action}</p>
                      <p className="text-muted text-xs">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {MOCK_UPCOMING_BOOKINGS.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="card"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-text">{booking.customerName}</h3>
                    <p className="text-muted text-sm">{booking.service}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      booking.status === 'confirmed'
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-yellow-500/10 text-yellow-400'
                    }`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-muted text-xs mb-1">Date</p>
                    <p className="text-text font-medium">
                      {new Date(booking.date).toLocaleDateString('en-GB', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted text-xs mb-1">Time</p>
                    <p className="text-text font-medium">{booking.time}</p>
                  </div>
                  <div>
                    <p className="text-muted text-xs mb-1">Earnings</p>
                    <p className="text-accent font-bold">£{booking.price}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {booking.status === 'pending' && (
                    <>
                      <button className="flex-1 btn-primary text-sm py-2 rounded-lg">
                        Accept
                      </button>
                      <button className="flex-1 btn-secondary text-sm py-2 rounded-lg">
                        Decline
                      </button>
                    </>
                  )}
                  {booking.status === 'confirmed' && (
                    <button className="flex-1 btn-primary text-sm py-2 rounded-lg">
                      Message Customer
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
