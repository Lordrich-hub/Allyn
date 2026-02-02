'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Star, MapPin, Phone, Mail, Calendar, DollarSign, ChevronLeft, Heart, Share2, Clock } from 'lucide-react'

// Mock vendor data - all vendors
const ALL_VENDORS = [
  {
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
    services: [
      { id: '1', name: 'Box Braids', description: 'Professional box braids with various styles', price: 80, duration: '4-6 hours' },
      { id: '2', name: 'Cornrows', description: 'Traditional cornrow styling', price: 45, duration: '2-3 hours' },
      { id: '3', name: 'Weave Installation', description: 'High-quality weave installation', price: 150, duration: '5-7 hours' },
      { id: '4', name: 'Natural Hair Treatment', description: 'Deep conditioning and care', price: 60, duration: '2 hours' },
    ],
    reviews: [
      { id: '1', author: 'Ama K.', rating: 5, date: '2 weeks ago', text: 'Excellent service! The braids are beautiful and they took great care of my hair.' },
      { id: '2', author: 'Zainab M.', rating: 5, date: '1 month ago', text: 'Professional and welcoming environment. Highly recommend!' },
      { id: '3', author: 'Patience O.', rating: 4, date: '1 month ago', text: 'Great work. Could be a bit faster but overall very satisfied.' },
    ],
    availability: {
      monday: ['09:00', '11:00', '14:00', '16:00'],
      tuesday: ['09:00', '11:00', '14:00', '16:00'],
      wednesday: ['09:00', '11:00', '14:00', '16:00', '18:00'],
      thursday: ['09:00', '11:00', '14:00', '16:00', '18:00'],
      friday: ['09:00', '11:00', '14:00', '16:00', '18:00'],
      saturday: ['09:00', '11:00', '13:00', '15:00', '17:00'],
      sunday: [],
    },
    bookedSlots: [
      { date: '2026-02-05', time: '11:00' },
      { date: '2026-02-05', time: '14:00' },
      { date: '2026-02-06', time: '09:00' },
    ],
  },
  {
    id: '2',
    name: 'Royal Braids Salon',
    category: 'Hair & Beauty',
    location: 'London, SE1 7PB',
    phone: '+44 20 7946 0958',
    email: 'hello@royalbraids.co.uk',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 156,
    verified: true,
    bio: 'Expert braiding salon specializing in traditional and modern styles.',
    services: [
      { id: '1', name: 'Micro Braids', description: 'Detailed micro braiding', price: 95, duration: '5-7 hours' },
      { id: '2', name: 'Twists', description: 'Beautiful two-strand twists', price: 70, duration: '3-4 hours' },
    ],
    reviews: [
      { id: '1', author: 'Ama T.', rating: 5, date: '1 week ago', text: 'Top quality work!' },
    ],
    availability: {
      monday: ['10:00', '12:00', '14:00', '16:00', '18:00'],
      tuesday: ['10:00', '12:00', '14:00', '16:00', '18:00'],
      wednesday: ['10:00', '12:00', '14:00', '16:00', '18:00'],
      thursday: ['10:00', '12:00', '14:00', '16:00', '18:00'],
      friday: ['10:00', '12:00', '14:00', '16:00', '18:00'],
      saturday: ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00'],
      sunday: ['12:00', '14:00', '16:00'],
    },
    bookedSlots: [],
  },
  {
    id: '3',
    name: 'Afro Chic Barbers',
    category: 'Hair & Beauty',
    location: 'Birmingham, B2 4BF',
    phone: '+44 121 632 1234',
    email: 'info@afrochic.co.uk',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 203,
    verified: true,
    bio: 'Premium barbershop for men seeking authentic African grooming.',
    services: [
      { id: '1', name: 'Fade Cut', description: 'Sharp fade haircut', price: 25, duration: '30 mins' },
      { id: '2', name: 'Line-up', description: 'Perfect line-up service', price: 15, duration: '15 mins' },
    ],
    reviews: [
      { id: '1', author: 'Kofi A.', rating: 5, date: '3 days ago', text: 'Best barber in town!' },
    ],
    availability: {
      monday: ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'],
      tuesday: ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'],
      wednesday: ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'],
      thursday: ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'],
      friday: ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'],
      saturday: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
      sunday: ['11:00', '12:00', '13:00', '14:00', '15:00'],
    },
    bookedSlots: [],
  },
  {
    id: '4',
    name: 'Natural Hair Heaven',
    category: 'Hair & Beauty',
    location: 'Manchester, M4 1AE',
    phone: '+44 161 833 9999',
    email: 'care@naturalhair.co.uk',
    image: 'https://images.unsplash.com/photo-1596449379191-20dc8d9dfd00?w=800&h=400&fit=crop',
    rating: 4.9,
    reviewCount: 89,
    verified: true,
    bio: 'Specialists in natural hair care and protective styling.',
    services: [
      { id: '1', name: 'Protective Styling', description: 'Protective braids and twists', price: 85, duration: '4-5 hours' },
    ],
    reviews: [],
    availability: {
      monday: ['10:00', '12:00', '14:00', '16:00'],
      tuesday: ['10:00', '12:00', '14:00', '16:00'],
      wednesday: [],
      thursday: ['10:00', '12:00', '14:00', '16:00'],
      friday: ['10:00', '12:00', '14:00', '16:00'],
      saturday: ['09:00', '11:00', '13:00', '15:00', '17:00'],
      sunday: [],
    },
    bookedSlots: [],
  },
];

function getVendorById(id: string) {
  const vendor = ALL_VENDORS.find(v => v.id === id);
  if (!vendor) {
    // Return a default vendor with basic info for IDs 5-30 that don't have full details yet
    return {
      id,
      name: 'Vendor Not Found',
      category: 'General',
      location: 'London, UK',
      phone: '+44 20 1234 5678',
      email: 'info@allyn.co.uk',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=400&fit=crop',
      rating: 4.5,
      reviewCount: 0,
      verified: false,
      bio: 'This vendor profile is being updated. Please check back soon for full details.',
      services: [
        { id: '1', name: 'General Service', description: 'Service details coming soon', price: 50, duration: '1 hour' },
      ],
      reviews: [],
      availability: {
        monday: ['10:00', '14:00'],
        tuesday: ['10:00', '14:00'],
        wednesday: ['10:00', '14:00'],
        thursday: ['10:00', '14:00'],
        friday: ['10:00', '14:00'],
        saturday: ['10:00', '14:00'],
        sunday: [],
      },
      bookedSlots: [],
    };
  }
  return vendor;
}

export default function VendorPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const routeParams = useParams()
  const vendorId = routeParams?.id as string || '1'
  const VENDOR = getVendorById(vendorId)
  const [selectedService, setSelectedService] = useState(VENDOR.services[0])
  const [bookingDate, setBookingDate] = useState('')
  const [bookingTime, setBookingTime] = useState('')
  const [isFavorited, setIsFavorited] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  // Get available time slots for selected date
  const availableTimeSlots = useMemo(() => {
    if (!bookingDate) return []
    
    const date = new Date(bookingDate)
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
    const daySlots = VENDOR.availability[dayName as keyof typeof VENDOR.availability] || []
    
    // Filter out already booked slots
    return daySlots.filter(time => {
      const isBooked = VENDOR.bookedSlots.some(
        slot => slot.date === bookingDate && slot.time === time
      )
      return !isBooked
    })
  }, [bookingDate])

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
      <div className="sticky top-0 z-30 bg-surface/95 backdrop-blur-sm border-b border-border">
        <div className="container-custom py-3 flex items-center justify-between">
          <Link href="/search" className="flex items-center gap-2 text-accent hover:underline">
            <ChevronLeft className="w-5 h-5" />
            Back to Search
          </Link>
          <div className="flex gap-2">
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className="p-2 rounded-lg border border-border hover:border-accent transition-colors"
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-accent text-accent' : 'text-muted'}`} />
            </button>
            <button className="p-2 rounded-lg border border-border hover:border-accent transition-colors">
              <Share2 className="w-5 h-5 text-muted" />
            </button>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <img
            src={VENDOR.image}
            alt={VENDOR.name}
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-start gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gradient">{VENDOR.name}</h1>
                {VENDOR.verified && (
                  <span className="text-sm bg-green-500/10 text-green-400 px-3 py-1 rounded-full">
                    ✓ Verified
                  </span>
                )}
              </div>
              <p className="text-muted mb-4">{VENDOR.bio}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted">
                  <MapPin className="w-4 h-4" />
                  {VENDOR.location}
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="text-text font-semibold">{VENDOR.rating}</span>
                  <span className="text-muted">({VENDOR.reviewCount} reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 card sticky top-20 h-fit"
          >
            <h3 className="text-xl font-bold text-text mb-6">Book Service</h3>

            <div className="bg-primary border border-border rounded-lg p-4 mb-6">
              <p className="text-sm text-muted mb-1">Selected</p>
              <h4 className="font-bold text-text mb-1">{selectedService.name}</h4>
              <p className="text-2xl font-bold text-accent">£{selectedService.price}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-text mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Preferred Date
              </label>
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => {
                  setBookingDate(e.target.value)
                  setBookingTime('')
                }}
                min={new Date().toISOString().split('T')[0]}
                className="w-full bg-primary border border-border rounded-lg px-3 py-2 text-text focus-ring"
              />
            </div>

            {bookingDate && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-text mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Available Time Slots
                </label>
                {availableTimeSlots.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {availableTimeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setBookingTime(time)}
                        className={`px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                          bookingTime === time
                            ? 'border-accent bg-accent/10 text-accent'
                            : 'border-border text-muted hover:border-accent/50 hover:text-text'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted text-sm bg-primary/50 rounded-lg p-4 text-center">
                    No available slots for this date. Please select another date.
                  </p>
                )}
              </div>
            )}

            {!bookingDate && (
              <div className="mb-6">
                <p className="text-muted text-sm bg-primary/50 rounded-lg p-4 text-center">
                  Please select a date to see available time slots
                </p>
              </div>
            )}

            {bookingSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4 text-green-400 text-sm text-center"
              >
                ✓ Booking request sent! We&apos;ll confirm shortly.
              </motion.div>
            )}

            <button
              onClick={handleBooking}
              disabled={!bookingDate || !bookingTime}
              className="w-full btn-primary py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Book Now
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card mt-8"
        >
          <h2 className="text-2xl font-bold text-text mb-6">Reviews</h2>
          <div className="space-y-6">
            {VENDOR.reviews.map((review) => (
              <div key={review.id} className="border-b border-border last:border-0 pb-6 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-text">{review.author}</h4>
                    <span className="text-sm text-muted">{review.date}</span>
                  </div>
                  <div className="flex gap-1">
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
