'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LogOut, Settings, Heart, Calendar, MessageSquare, Clock, CheckCircle, AlertCircle } from 'lucide-react'

const MOCK_USER = {
  name: 'Ama Johnson',
  email: 'ama@example.com',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  joinDate: 'Joined January 2024',
}

const MOCK_BOOKINGS = [
  {
    id: '1',
    vendor: 'Divine Hair Studio',
    service: 'Box Braids',
    date: '2026-02-15',
    time: '14:00',
    status: 'confirmed',
    price: 80,
  },
  {
    id: '2',
    vendor: 'Authentic Jollof Kitchen',
    service: 'Catering (20 ppl)',
    date: '2026-02-22',
    time: '12:00',
    status: 'pending',
    price: 400,
  },
  {
    id: '3',
    vendor: 'Kente Designs Tailor',
    service: 'Custom Outfit',
    date: '2026-01-25',
    time: '10:00',
    status: 'completed',
    price: 250,
  },
]

const MOCK_FAVORITES = [
  { id: '1', name: 'Divine Hair Studio', category: 'Hair & Beauty', rating: 4.9 },
  { id: '2', name: 'Nia Wellness Center', category: 'Health & Wellness', rating: 4.9 },
  { id: '3', name: 'Pro Tech Solutions', category: 'Tech Support', rating: 4.6 },
]

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('bookings')

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-surface/95 backdrop-blur-sm border-b border-border">
        <div className="container-custom py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gradient">Dashboard</h1>
          <div className="flex gap-2">
            <Link href="/chat" className="p-2 rounded-lg border border-border text-muted hover:text-accent transition-colors">
              <MessageSquare className="w-5 h-5" />
            </Link>
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
            src={MOCK_USER.avatar}
            alt={MOCK_USER.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-text">{MOCK_USER.name}</h2>
            <p className="text-muted">{MOCK_USER.email}</p>
            <p className="text-sm text-accent mt-2">{MOCK_USER.joinDate}</p>
          </div>
          <Link href="/settings" className="btn-secondary px-6 py-2 rounded-lg">
            Edit Profile
          </Link>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: Calendar, label: 'Upcoming Bookings', value: '2' },
            { icon: CheckCircle, label: 'Completed', value: '5' },
            { icon: Heart, label: 'Favorites', value: '3' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card text-center"
            >
              <stat.icon className="w-8 h-8 text-accent mx-auto mb-3" />
              <p className="text-muted text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-text">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-border overflow-x-auto">
          {[
            { id: 'bookings', label: 'My Bookings', icon: Calendar },
            { id: 'favorites', label: 'Favorites', icon: Heart },
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

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {MOCK_BOOKINGS.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="card"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-text text-lg">{booking.vendor}</h3>
                    <p className="text-muted text-sm">{booking.service}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      booking.status === 'confirmed'
                        ? 'bg-green-500/10 text-green-400'
                        : booking.status === 'pending'
                        ? 'bg-yellow-500/10 text-yellow-400'
                        : 'bg-muted/20 text-muted'
                    }`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
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
                    <p className="text-muted text-xs mb-1">Price</p>
                    <p className="text-accent font-bold">£{booking.price}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/vendor/${booking.id}`}
                    className="flex-1 btn-secondary text-sm py-2 rounded-lg text-center"
                  >
                    View Details
                  </Link>
                  <button className="flex-1 btn-primary text-sm py-2 rounded-lg">
                    Message
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {MOCK_FAVORITES.map((fav) => (
              <motion.div
                key={fav.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-text">{fav.name}</h3>
                    <p className="text-muted text-sm">{fav.category}</p>
                  </div>
                  <Heart className="w-5 h-5 fill-accent text-accent" />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-sm ${
                        i < Math.floor(fav.rating)
                          ? 'bg-accent'
                          : 'bg-border'
                      }`}
                    />
                  ))}
                  <span className="font-bold text-text ml-2">{fav.rating}</span>
                </div>
                <Link href={`/vendor/${fav.id}`} className="w-full btn-primary text-center py-2 rounded-lg">
                  View Profile
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
