'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, MapPin, Phone, Mail, Calendar, DollarSign, ChevronLeft, Heart, Share2, Clock } from 'lucide-react'

// Mock vendor data
const VENDOR = {
  id: '1',
  name: 'Divine Hair Studio',
  category: 'Hair & Beauty',
  location: 'London, E1 2QQ',
  phone: '+44 20 1234 5678',
  email: 'hello@divinehair.co.uk',
  image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=400&fit=crop',
  rating: 4.9,
  reviewCount: 124,
  verified: true,
  bio: 'Professional hair braiding, weaving, and natural hair care specialists. Over 10 years of experience serving the London community.',
  hours: {
    monday: '10:00 - 18:00',
    tuesday: '10:00 - 18:00',
    wednesday: '10:00 - 20:00',
    thursday: '10:00 - 20:00',
    friday: '10:00 - 20:00',
    saturday: '09:00 - 19:00',
    sunday: 'Closed',
  },
  services: [
    { id: '1', name: 'Box Braids', description: 'Professional box braids with various styles', price: 80, duration: '4-6 hours' },
    { id: '2', name: 'Cornrows', description: 'Traditional cornrow styling', price: 45, duration: '2-3 hours' },
    { id: '3', name: 'Weave Installation', description: 'High-quality weave installation', price: 150, duration: '5-7 hours' },
    { id: '4', name: 'Natural Hair Treatment', description: 'Deep conditioning and care', price: 60, duration: '2 hours' },
  ],
  reviews: [
    {
      id: '1',
      author: 'Ama K.',
      rating: 5,
      date: '2 weeks ago',
      text: 'Excellent service! The braids are beautiful and they took great care of my hair.',
    },
    {
      id: '2',
      author: 'Zainab M.',
      rating: 5,
      date: '1 month ago',
      text: 'Professional and welcoming environment. Highly recommend!',
    },
    {
      id: '3',
      author: 'Patience O.',
      rating: 4,
      date: '1 month ago',
      text: 'Great work. Could be a bit faster but overall very satisfied.',
    },
  ],
}

export default function VendorPage({ params }: { params: { id: string } }) {
  const [selectedService, setSelectedService] = useState(VENDOR.services[0])
  const [bookingDate, setBookingDate] = useState('')
  const [bookingTime, setBookingTime] = useState('')
  const [isFavorited, setIsFavorited] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  const handleBooking = () => {
    if (bookingDate && bookingTime) {
      setBookingSuccess(true)
      setTimeout(() => {
        setBookingSuccess(false)
        setBookingDate('')
        setBookingTime('')
      }, 3000)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-surface/95 backdrop-blur-sm border-b border-border">
        <div className="container-custom py-3 flex items-center justify-between">
          <Link href="/search" className="flex items-center gap-2 text-accent hover:underline">
            <ChevronLeft className="w-5 h-5" />
            Back to Search
          </Link>
          <div className="flex gap-2">
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className={`p-2 rounded-lg border transition-all ${
                isFavorited
                  ? 'bg-accent/10 border-accent text-accent'
                  : 'border-border text-muted hover:border-accent'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 rounded-lg border border-border text-muted hover:border-accent transition-all">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-80 overflow-hidden">
        <img src={VENDOR.image} alt={VENDOR.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container-custom -mt-32 relative z-10 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-border rounded-2xl p-8 mb-8"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-text">{VENDOR.name}</h1>
                {VENDOR.verified && <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-bold">✓ Verified</span>}
              </div>
              <p className="text-muted text-lg mb-4">{VENDOR.category}</p>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(VENDOR.rating)
                            ? 'fill-accent text-accent'
                            : 'text-border'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 font-bold text-text">{VENDOR.rating}</span>
                </div>
                <p className="text-muted">
                  <span className="text-text font-semibold">{VENDOR.reviewCount}</span> reviews
                </p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="text-muted text-lg mb-8 leading-relaxed">{VENDOR.bio}</p>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: MapPin, label: 'Location', value: VENDOR.location },
              { icon: Phone, label: 'Phone', value: VENDOR.phone },
              { icon: Mail, label: 'Email', value: VENDOR.email },
            ].map((info, i) => (
              <div key={i} className="flex gap-3">
                <info.icon className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider">{info.label}</p>
                  <p className="text-text font-medium">{info.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Services & Booking */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Services List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-text mb-6">Services</h2>
            <div className="space-y-3">
              {VENDOR.services.map((service) => (
                <motion.button
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    selectedService.id === service.id
                      ? 'border-accent bg-accent/5'
                      : 'border-border hover:border-accent/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-text">{service.name}</h3>
                    <span className="text-accent font-bold text-lg">£{service.price}</span>
                  </div>
                  <p className="text-muted text-sm mb-2">{service.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <Clock className="w-4 h-4" />
                    {service.duration}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Booking Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 card sticky top-20 h-fit"
          >
            <h3 className="text-xl font-bold text-text mb-6">Book Service</h3>

            {/* Selected Service Display */}
            <div className="bg-primary border border-border rounded-lg p-4 mb-6">
              <p className="text-sm text-muted mb-1">Selected</p>
              <h4 className="font-bold text-text mb-1">{selectedService.name}</h4>
              <p className="text-2xl font-bold text-accent">£{selectedService.price}</p>
            </div>

            {/* Date Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-text mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Preferred Date
              </label>
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full bg-primary border border-border rounded-lg px-3 py-2 text-text focus-ring"
              />
            </div>

            {/* Time Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-text mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Preferred Time
              </label>
              <select
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                className="w-full bg-primary border border-border rounded-lg px-3 py-2 text-text focus-ring"
              >
                <option value="">Select a time</option>
                <option value="09:00">09:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="14:00">2:00 PM</option>
                <option value="16:00">4:00 PM</option>
              </select>
            </div>

            {/* Success Message */}
            {bookingSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm"
              >
                ✓ Booking confirmed! Check your messages.
              </motion.div>
            )}

            {/* Book Button */}
            <button
              onClick={handleBooking}
              disabled={!bookingDate || !bookingTime}
              className="w-full btn-primary py-3 rounded-lg font-semibold disabled:opacity-50 transition-all"
            >
              Continue to Booking
            </button>

            {/* Message Vendor */}
            <Link href="/chat" className="w-full mt-3 btn-secondary py-3 rounded-lg font-semibold text-center block">
              Message Vendor
            </Link>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-text mb-6">Reviews</h2>
          <div className="space-y-4">
            {VENDOR.reviews.map((review) => (
              <div key={review.id} className="card">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-bold text-text">{review.author}</p>
                    <p className="text-xs text-muted">{review.date}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'fill-accent text-accent'
                            : 'text-border'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-muted">{review.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
