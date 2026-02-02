'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Star, MapPin, Phone, Mail, Calendar, DollarSign, ChevronLeft, Heart, Share2, Clock } from 'lucide-react'
import { BeautifulCalendar } from '@/app/components/BeautifulCalendar'
import { PaymentModal } from '@/app/components/PaymentModal'

export const dynamic = 'force-dynamic'
export const dynamicParams = true

// Mock vendor data - all vendors
const ALL_VENDORS = [
  // Vendors 1-4 have full details
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
    name: 'Authentic Jollof Kitchen',
    category: 'Food & Catering',
    location: 'Manchester, M1 2AB',
    phone: '+44 161 234 5678',
    email: 'hello@jollofdkitchen.co.uk',
    image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 89,
    verified: true,
    bio: 'Authentic West African cuisine and professional catering services for all occasions.',
    services: [
      { id: '1', name: 'Jollof Rice Catering', description: 'Traditional jollof rice for events', price: 15, duration: '2-3 hours' },
      { id: '2', name: 'Full Menu Catering', description: 'Complete West African menu', price: 50, duration: '4-6 hours' },
    ],
    reviews: [
      { id: '1', author: 'Kwame O.', rating: 5, date: '1 week ago', text: 'Best jollof I have had in the UK!' },
    ],
    availability: {
      monday: ['10:00', '12:00', '14:00', '16:00'],
      tuesday: ['10:00', '12:00', '14:00', '16:00'],
      wednesday: ['10:00', '12:00', '14:00', '16:00'],
      thursday: ['10:00', '12:00', '14:00', '16:00'],
      friday: ['10:00', '12:00', '14:00', '16:00', '18:00'],
      saturday: ['09:00', '11:00', '13:00', '15:00', '17:00'],
      sunday: ['12:00', '14:00'],
    },
    bookedSlots: [],
  },
  {
    id: '3',
    name: 'Kente Designs Tailor',
    category: 'Fashion & Clothing',
    location: 'Birmingham, B1 3RF',
    phone: '+44 121 456 7890',
    email: 'info@kentedesigns.co.uk',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 56,
    verified: true,
    bio: 'Custom African fashion and traditional wear tailoring services.',
    services: [
      { id: '1', name: 'Custom Suit', description: 'Bespoke African print suit', price: 300, duration: '2 weeks' },
      { id: '2', name: 'Traditional Dress', description: 'Custom traditional outfit', price: 200, duration: '1-2 weeks' },
    ],
    reviews: [
      { id: '1', author: 'Ama T.', rating: 5, date: '2 weeks ago', text: 'Beautiful craftsmanship!' },
    ],
    availability: {
      monday: ['10:00', '14:00', '16:00'],
      tuesday: ['10:00', '14:00', '16:00'],
      wednesday: ['10:00', '14:00', '16:00'],
      thursday: ['10:00', '14:00', '16:00'],
      friday: ['10:00', '14:00', '16:00'],
      saturday: ['10:00', '12:00', '14:00'],
      sunday: [],
    },
    bookedSlots: [],
  },
  {
    id: '4',
    name: 'Pro Tech Solutions',
    category: 'Tech Support',
    location: 'Leeds, LS1 4AP',
    phone: '+44 113 234 5678',
    email: 'support@protech.co.uk',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 72,
    verified: true,
    bio: 'Professional IT support and computer repair services.',
    services: [
      { id: '1', name: 'Computer Repair', description: 'Hardware and software fixes', price: 60, duration: '1-2 hours' },
      { id: '2', name: 'IT Consultation', description: 'Technology consulting', price: 100, duration: '1 hour' },
    ],
    reviews: [
      { id: '1', author: 'John M.', rating: 5, date: '1 week ago', text: 'Fixed my laptop quickly!' },
    ],
    availability: {
      monday: ['09:00', '11:00', '14:00', '16:00'],
      tuesday: ['09:00', '11:00', '14:00', '16:00'],
      wednesday: ['09:00', '11:00', '14:00', '16:00'],
      thursday: ['09:00', '11:00', '14:00', '16:00'],
      friday: ['09:00', '11:00', '14:00', '16:00'],
      saturday: ['10:00', '12:00'],
      sunday: [],
    },
    bookedSlots: [],
  },
  // Vendor 5
  {
    id: '5',
    name: 'Nia Wellness Center',
    category: 'Health & Wellness',
    location: 'London, SW1 2AB',
    phone: '+44 20 7946 0321',
    email: 'info@niawellness.co.uk',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop',
    rating: 4.9,
    reviewCount: 103,
    verified: true,
    bio: 'Holistic health and wellness services focused on mind, body, and spirit.',
    services: [
      { id: '1', name: 'Massage Therapy', description: 'Full body therapeutic massage', price: 80, duration: '1 hour' },
      { id: '2', name: 'Wellness Consultation', description: 'Personalized health plan', price: 60, duration: '1 hour' },
    ],
    reviews: [
      { id: '1', author: 'Sarah L.', rating: 5, date: '1 week ago', text: 'Amazing experience!' },
    ],
    availability: {
      monday: ['10:00', '12:00', '14:00', '16:00'],
      tuesday: ['10:00', '12:00', '14:00', '16:00'],
      wednesday: ['10:00', '12:00', '14:00', '16:00'],
      thursday: ['10:00', '12:00', '14:00', '16:00'],
      friday: ['10:00', '12:00', '14:00', '16:00'],
      saturday: ['10:00', '12:00', '14:00'],
      sunday: [],
    },
    bookedSlots: [],
  },
  // Vendor 6
  {
    id: '6',
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
      { id: '1', name: 'Box Braids', description: 'Professional box braiding', price: 90, duration: '4-5 hours' },
      { id: '2', name: 'Cornrows', description: 'Traditional cornrow styling', price: 50, duration: '2-3 hours' },
    ],
    reviews: [
      { id: '1', author: 'Ama T.', rating: 5, date: '1 week ago', text: 'Top quality work!' },
    ],
    availability: {
      monday: ['10:00', '12:00', '14:00', '16:00'],
      tuesday: ['10:00', '12:00', '14:00', '16:00'],
      wednesday: ['10:00', '12:00', '14:00', '16:00'],
      thursday: ['10:00', '12:00', '14:00', '16:00'],
      friday: ['10:00', '12:00', '14:00', '16:00'],
      saturday: ['09:00', '11:00', '13:00', '15:00', '17:00'],
      sunday: [],
    },
    bookedSlots: [],
  },
  // Vendor 7
  {
    id: '7',
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
      monday: ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00'],
      tuesday: ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00'],
      wednesday: ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00'],
      thursday: ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00'],
      friday: ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00'],
      saturday: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      sunday: [],
    },
    bookedSlots: [],
  },
  // Vendor 8
  {
    id: '8',
    name: 'Natural Hair Heaven',
    category: 'Hair & Beauty',
    location: 'Manchester, M4 1AE',
    phone: '+44 161 833 9999',
    email: 'care@naturalhair.co.uk',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=400&fit=crop',
    rating: 4.9,
    reviewCount: 178,
    verified: true,
    bio: 'Specialists in natural hair care and protective styling.',
    services: [
      { id: '1', name: 'Protective Styling', description: 'Protective braids and twists', price: 85, duration: '4-5 hours' },
      { id: '2', name: 'Deep Conditioning', description: 'Hair treatment therapy', price: 50, duration: '1 hour' },
    ],
    reviews: [
      { id: '1', author: 'Joy M.', rating: 5, date: '2 weeks ago', text: 'Love my hair!' },
    ],
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
  // Vendor 9
  {
    id: '9',
    name: 'Elegant Locs Studio',
    category: 'Hair & Beauty',
    location: 'Leeds, LS2 7DF',
    phone: '+44 113 245 6789',
    email: 'hello@elegantlocs.co.uk',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 91,
    verified: false,
    bio: 'Professional locs installation and maintenance services.',
    services: [
      { id: '1', name: 'Locs Installation', description: 'New locs setup', price: 120, duration: '5-6 hours' },
      { id: '2', name: 'Locs Maintenance', description: 'Retwist and care', price: 65, duration: '2 hours' },
    ],
    reviews: [
      { id: '1', author: 'Marcus W.', rating: 5, date: '1 month ago', text: 'Great work on my locs!' },
    ],
    availability: {
      monday: ['10:00', '14:00', '16:00'],
      tuesday: ['10:00', '14:00', '16:00'],
      wednesday: ['10:00', '14:00', '16:00'],
      thursday: ['10:00', '14:00', '16:00'],
      friday: ['10:00', '14:00', '16:00'],
      saturday: ['10:00', '12:00', '14:00'],
      sunday: [],
    },
    bookedSlots: [],
  },
  // Vendor 10
  {
    id: '10',
    name: 'Beauty Queens Salon',
    category: 'Hair & Beauty',
    location: 'London, N1 9JA',
    phone: '+44 20 7354 8888',
    email: 'info@beautyqueens.co.uk',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 167,
    verified: true,
    bio: 'Full-service beauty salon for all your hair and beauty needs.',
    services: [
      { id: '1', name: 'Hair Styling', description: 'Professional styling service', price: 55, duration: '1-2 hours' },
      { id: '2', name: 'Makeup Application', description: 'Professional makeup', price: 45, duration: '1 hour' },
    ],
    reviews: [
      { id: '1', author: 'Linda O.', rating: 5, date: '5 days ago', text: 'Beautiful results!' },
    ],
    availability: {
      monday: ['10:00', '12:00', '14:00', '16:00'],
      tuesday: ['10:00', '12:00', '14:00', '16:00'],
      wednesday: ['10:00', '12:00', '14:00', '16:00'],
      thursday: ['10:00', '12:00', '14:00', '16:00'],
      friday: ['10:00', '12:00', '14:00', '16:00', '18:00'],
      saturday: ['09:00', '11:00', '13:00', '15:00', '17:00'],
      sunday: [],
    },
    bookedSlots: [],
  },
  // Vendor 11
  {
    id: '11',
    name: 'Mama Africa Cuisine',
    category: 'Food & Catering',
    location: 'London, SW9 8PR',
    phone: '+44 20 7274 5555',
    email: 'hello@mamaafrica.co.uk',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=400&fit=crop',
    rating: 4.9,
    reviewCount: 234,
    verified: true,
    bio: 'Traditional African home cooking and event catering services.',
    services: [
      { id: '1', name: 'Event Catering', description: 'Full menu catering', price: 40, duration: '4-6 hours' },
      { id: '2', name: 'Meal Prep', description: 'Weekly meal preparation', price: 120, duration: '1 day' },
    ],
    reviews: [
      { id: '1', author: 'Kwame O.', rating: 5, date: '1 week ago', text: 'Delicious authentic food!' },
    ],
    availability: {
      monday: ['10:00', '12:00', '14:00', '16:00'],
      tuesday: ['10:00', '12:00', '14:00', '16:00'],
      wednesday: ['10:00', '12:00', '14:00', '16:00'],
      thursday: ['10:00', '12:00', '14:00', '16:00'],
      friday: ['10:00', '12:00', '14:00', '16:00'],
      saturday: ['09:00', '11:00', '13:00', '15:00'],
      sunday: ['12:00', '14:00'],
    },
    bookedSlots: [],
  },
  // Vendor 12
  {
    id: '12',
    name: 'Suya Spot',
    category: 'Food & Catering',
    location: 'Birmingham, B5 4RN',
    phone: '+44 121 643 7777',
    email: 'orders@suyaspot.co.uk',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 145,
    verified: true,
    bio: 'Authentic Nigerian suya and street food catering.',
    services: [
      { id: '1', name: 'Suya Catering', description: 'Fresh suya for events', price: 25, duration: '2-3 hours' },
      { id: '2', name: 'Party Packages', description: 'Complete party menu', price: 150, duration: '4-5 hours' },
    ],
    reviews: [
      { id: '1', author: 'Tunde A.', rating: 5, date: '3 days ago', text: 'Best suya in Birmingham!' },
    ],
    availability: {
      monday: ['12:00', '14:00', '16:00', '18:00'],
      tuesday: ['12:00', '14:00', '16:00', '18:00'],
      wednesday: ['12:00', '14:00', '16:00', '18:00'],
      thursday: ['12:00', '14:00', '16:00', '18:00'],
      friday: ['12:00', '14:00', '16:00', '18:00'],
      saturday: ['10:00', '12:00', '14:00', '16:00', '18:00'],
      sunday: ['12:00', '14:00', '16:00'],
    },
    bookedSlots: [],
  },
  // Vendor 13
  {
    id: '13',
    name: 'Plantain & Spice Catering',
    category: 'Food & Catering',
    location: 'London, E8 3DL',
    phone: '+44 20 7254 6666',
    email: 'bookings@plantainspice.co.uk',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 198,
    verified: false,
    bio: 'Caribbean and West African fusion catering for all occasions.',
    services: [
      { id: '1', name: 'Wedding Catering', description: 'Full wedding menu', price: 60, duration: '6-8 hours' },
      { id: '2', name: 'Corporate Events', description: 'Business catering', price: 35, duration: '3-4 hours' },
    ],
    reviews: [
      { id: '1', author: 'Grace M.', rating: 5, date: '2 weeks ago', text: 'Amazing flavors!' },
    ],
    availability: {
      monday: ['10:00', '14:00', '16:00'],
      tuesday: ['10:00', '14:00', '16:00'],
      wednesday: ['10:00', '14:00', '16:00'],
      thursday: ['10:00', '14:00', '16:00'],
      friday: ['10:00', '14:00', '16:00'],
      saturday: ['10:00', '12:00', '14:00'],
      sunday: [],
    },
    bookedSlots: [],
  },
  // Vendor 14
  {
    id: '14',
    name: 'West African Delights',
    category: 'Food & Catering',
    location: 'Leeds, LS6 2UE',
    phone: '+44 113 278 4444',
    email: 'info@wadelights.co.uk',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 87,
    verified: true,
    bio: 'Authentic West African cuisine with modern presentation.',
    services: [
      { id: '1', name: 'Private Dining', description: 'Intimate dining experience', price: 45, duration: '3 hours' },
      { id: '2', name: 'Buffet Catering', description: 'Buffet for events', price: 30, duration: '4 hours' },
    ],
    reviews: [
      { id: '1', author: 'Fatima S.', rating: 5, date: '1 month ago', text: 'Wonderful food!' },
    ],
    availability: {
      monday: ['11:00', '14:00', '17:00'],
      tuesday: ['11:00', '14:00', '17:00'],
      wednesday: ['11:00', '14:00', '17:00'],
      thursday: ['11:00', '14:00', '17:00'],
      friday: ['11:00', '14:00', '17:00'],
      saturday: ['11:00', '13:00', '15:00', '17:00'],
      sunday: [],
    },
    bookedSlots: [],
  },
  // Vendor 15
  {
    id: '15',
    name: 'Ankara Couture',
    category: 'Fashion & Clothing',
    location: 'London, W1F 8DH',
    phone: '+44 20 7437 3333',
    email: 'design@ankaracouture.co.uk',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=400&fit=crop',
    rating: 4.9,
    reviewCount: 178,
    verified: true,
    bio: 'Luxury African print fashion and bespoke tailoring.',
    services: [
      { id: '1', name: 'Bespoke Suit', description: 'Custom-made African suit', price: 350, duration: '2-3 weeks' },
      { id: '2', name: 'Traditional Outfit', description: 'Custom traditional wear', price: 250, duration: '1-2 weeks' },
    ],
    reviews: [
      { id: '1', author: 'Chioma N.', rating: 5, date: '1 week ago', text: 'Stunning designs!' },
    ],
    availability: {
      monday: ['10:00', '14:00', '16:00'],
      tuesday: ['10:00', '14:00', '16:00'],
      wednesday: ['10:00', '14:00', '16:00'],
      thursday: ['10:00', '14:00', '16:00'],
      friday: ['10:00', '14:00', '16:00'],
      saturday: ['10:00', '12:00', '14:00'],
      sunday: [],
    },
    bookedSlots: [],
  },
  // Vendor 16
  {
    id: '16',
    name: 'African Prints Boutique',
    category: 'Fashion & Clothing',
    location: 'Manchester, M3 2JA',
    phone: '+44 161 839 2222',
    email: 'shop@africanprints.co.uk',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 134,
    verified: true,
    bio: 'Ready-to-wear African fashion and accessories boutique.',
    services: [
      { id: '1', name: 'Personal Shopping', description: 'Styling consultation', price: 50, duration: '1 hour' },
      { id: '2', name: 'Alterations', description: 'Clothing adjustments', price: 30, duration: '30 mins' },
    ],
    reviews: [
      { id: '1', author: 'Yemi B.', rating: 5, date: '4 days ago', text: 'Great selection!' },
    ],
    availability: {
      monday: ['10:00', '12:00', '14:00', '16:00'],
      tuesday: ['10:00', '12:00', '14:00', '16:00'],
      wednesday: ['10:00', '12:00', '14:00', '16:00'],
      thursday: ['10:00', '12:00', '14:00', '16:00'],
      friday: ['10:00', '12:00', '14:00', '16:00'],
      saturday: ['10:00', '12:00', '14:00', '16:00'],
      sunday: [],
    },
    bookedSlots: [],
  },
  // Vendor 17
  {
    id: '17',
    name: 'Royal Threads Custom',
    category: 'Fashion & Clothing',
    location: 'London, SE15 4ST',
    phone: '+44 20 7639 1111',
    email: 'custom@royalthreads.co.uk',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 92,
    verified: false,
    bio: 'High-end custom tailoring and African fashion design.',
    services: [
      { id: '1', name: 'Wedding Attire', description: 'Custom wedding outfit', price: 450, duration: '3-4 weeks' },
      { id: '2', name: 'Casual Wear', description: 'Custom casual clothing', price: 180, duration: '1-2 weeks' },
    ],
    reviews: [
      { id: '1', author: 'Emmanuel K.', rating: 5, date: '2 weeks ago', text: 'Perfect fit!' },
    ],
    availability: {
      monday: ['11:00', '14:00', '16:00'],
      tuesday: ['11:00', '14:00', '16:00'],
      wednesday: ['11:00', '14:00', '16:00'],
      thursday: ['11:00', '14:00', '16:00'],
      friday: ['11:00', '14:00', '16:00'],
      saturday: ['11:00', '13:00', '15:00'],
      sunday: [],
    },
    bookedSlots: [],
  },
  // Vendor 18
  {
    id: '18',
    name: 'Digital Fix IT',
    category: 'Tech Support',
    location: 'London, EC1V 2NX',
    phone: '+44 20 7253 9999',
    email: 'support@digitalfixit.co.uk',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 156,
    verified: true,
    bio: 'Professional IT support and computer repair services.',
    services: [
      { id: '1', name: 'Computer Repair', description: 'Hardware and software fixes', price: 60, duration: '1-2 hours' },
      { id: '2', name: 'Network Setup', description: 'Home/office networking', price: 100, duration: '2-3 hours' },
    ],
    reviews: [
      { id: '1', author: 'David M.', rating: 5, date: '3 days ago', text: 'Quick and professional!' },
    ],
    availability: {
      monday: ['09:00', '11:00', '14:00', '16:00'],
      tuesday: ['09:00', '11:00', '14:00', '16:00'],
      wednesday: ['09:00', '11:00', '14:00', '16:00'],
      thursday: ['09:00', '11:00', '14:00', '16:00'],
      friday: ['09:00', '11:00', '14:00', '16:00'],
      saturday: ['10:00', '12:00', '14:00'],
      sunday: [],
    },
    bookedSlots: [],
  },
  // Vendor 19
  {
    id: '19',
    name: 'Code Masters Hub',
    category: 'Tech Support',
    location: 'Birmingham, B3 2TA',
    phone: '+44 121 236 8888',
    email: 'hello@codemasters.co.uk',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 98,
    verified: true,
    bio: 'Software development and technical consulting services.',
    services: [
      { id: '1', name: 'Web Development', description: 'Website creation', price: 500, duration: '1-2 weeks' },
      { id: '2', name: 'Tech Consultation', description: 'Technology advice', price: 80, duration: '1 hour' },
    ],
    reviews: [
      { id: '1', author: 'Peter S.', rating: 5, date: '1 week ago', text: 'Excellent developers!' },
    ],
    availability: {
      monday: ['10:00', '14:00', '16:00'],
      tuesday: ['10:00', '14:00', '16:00'],
      wednesday: ['10:00', '14:00', '16:00'],
      thursday: ['10:00', '14:00', '16:00'],
      friday: ['10:00', '14:00', '16:00'],
      saturday: [],
      sunday: [],
    },
    bookedSlots: [],
  },
  // Vendor 20
  {
    id: '20',
    name: 'Holistic Health Hub',
    category: 'Health & Wellness',
    location: 'Manchester, M20 2RW',
    phone: '+44 161 445 7777',
    email: 'info@holistichealth.co.uk',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 142,
    verified: true,
    bio: 'Comprehensive holistic health and alternative therapy services.',
    services: [
      { id: '1', name: 'Acupuncture', description: 'Traditional acupuncture', price: 70, duration: '1 hour' },
      { id: '2', name: 'Herbal Medicine', description: 'Natural remedies', price: 60, duration: '45 mins' },
    ],
    reviews: [
      { id: '1', author: 'Rachel T.', rating: 5, date: '5 days ago', text: 'Feeling much better!' },
    ],
    availability: {
      monday: ['10:00', '12:00', '14:00', '16:00'],
      tuesday: ['10:00', '12:00', '14:00', '16:00'],
      wednesday: ['10:00', '12:00', '14:00', '16:00'],
      thursday: ['10:00', '12:00', '14:00', '16:00'],
      friday: ['10:00', '12:00', '14:00', '16:00'],
      saturday: ['10:00', '12:00', '14:00'],
      sunday: [],
    },
    bookedSlots: [],
  },
  // Vendor 21
  {
    id: '21',
    name: 'Spa Afrique',
    category: 'Health & Wellness',
    location: 'Birmingham, B12 9QY',
    phone: '+44 121 446 6666',
    email: 'bookings@spaafrique.co.uk',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 118,
    verified: false,
    bio: 'Luxury spa treatments inspired by African wellness traditions.',
    services: [
      { id: '1', name: 'Spa Package', description: 'Full spa treatment', price: 120, duration: '2-3 hours' },
      { id: '2', name: 'Facial Treatment', description: 'Deep cleanse facial', price: 65, duration: '1 hour' },
    ],
    reviews: [
      { id: '1', author: 'Angela P.', rating: 5, date: '1 week ago', text: 'So relaxing!' },
    ],
    availability: {
      monday: ['10:00', '13:00', '15:00'],
      tuesday: ['10:00', '13:00', '15:00'],
      wednesday: ['10:00', '13:00', '15:00'],
      thursday: ['10:00', '13:00', '15:00'],
      friday: ['10:00', '13:00', '15:00'],
      saturday: ['10:00', '12:00', '14:00', '16:00'],
      sunday: [],
    },
    bookedSlots: [],
  },
  // Vendor 22
  {
    id: '22',
    name: 'Yoga & Mindfulness Studio',
    category: 'Health & Wellness',
    location: 'London, E2 8HD',
    phone: '+44 20 7739 5555',
    email: 'hello@yogamindful.co.uk',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop',
    rating: 4.9,
    reviewCount: 167,
    verified: true,
    bio: 'Yoga classes and mindfulness meditation sessions for all levels.',
    services: [
      { id: '1', name: 'Group Yoga Class', description: 'Group yoga session', price: 15, duration: '1 hour' },
      { id: '2', name: 'Private Session', description: 'One-on-one yoga', price: 60, duration: '1 hour' },
    ],
    reviews: [
      { id: '1', author: 'Maya L.', rating: 5, date: '2 days ago', text: 'Amazing classes!' },
    ],
    availability: {
      monday: ['07:00', '09:00', '12:00', '17:00', '19:00'],
      tuesday: ['07:00', '09:00', '12:00', '17:00', '19:00'],
      wednesday: ['07:00', '09:00', '12:00', '17:00', '19:00'],
      thursday: ['07:00', '09:00', '12:00', '17:00', '19:00'],
      friday: ['07:00', '09:00', '12:00', '17:00'],
      saturday: ['08:00', '10:00', '12:00', '14:00'],
      sunday: ['09:00', '11:00', '13:00'],
    },
    bookedSlots: [],
  },
  // Vendor 23
  {
    id: '23',
    name: 'African Languages Academy',
    category: 'Education & Training',
    location: 'London, N7 8HL',
    phone: '+44 20 7263 4444',
    email: 'learn@africanlanguages.co.uk',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 89,
    verified: true,
    bio: 'Learn African languages with native speakers and certified instructors.',
    services: [
      { id: '1', name: 'Language Course', description: 'Weekly language lessons', price: 50, duration: '1 hour' },
      { id: '2', name: 'Intensive Program', description: 'Full course package', price: 400, duration: '8 weeks' },
    ],
    reviews: [
      { id: '1', author: 'James K.', rating: 5, date: '1 week ago', text: 'Great teachers!' },
    ],
    availability: {
      monday: ['10:00', '14:00', '16:00', '18:00'],
      tuesday: ['10:00', '14:00', '16:00', '18:00'],
      wednesday: ['10:00', '14:00', '16:00', '18:00'],
      thursday: ['10:00', '14:00', '16:00', '18:00'],
      friday: ['10:00', '14:00', '16:00'],
      saturday: ['10:00', '12:00', '14:00'],
      sunday: [],
    },
    bookedSlots: [],
  },
  // Vendor 24
  {
    id: '24',
    name: 'Music & Dance Workshop',
    category: 'Education & Training',
    location: 'Birmingham, B7 4BJ',
    phone: '+44 121 359 3333',
    email: 'info@musicdanceworkshop.co.uk',
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=800&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 76,
    verified: true,
    bio: 'African drumming, dance classes, and cultural workshops.',
    services: [
      { id: '1', name: 'Drumming Class', description: 'African drum lessons', price: 35, duration: '1 hour' },
      { id: '2', name: 'Dance Workshop', description: 'Traditional dance', price: 40, duration: '1.5 hours' },
    ],
    reviews: [
      { id: '1', author: 'Sophie H.', rating: 5, date: '3 weeks ago', text: 'So much fun!' },
    ],
    availability: {
      monday: ['16:00', '18:00', '19:00'],
      tuesday: ['16:00', '18:00', '19:00'],
      wednesday: ['16:00', '18:00', '19:00'],
      thursday: ['16:00', '18:00', '19:00'],
      friday: ['16:00', '18:00'],
      saturday: ['10:00', '12:00', '14:00', '16:00'],
      sunday: ['11:00', '13:00'],
    },
    bookedSlots: [],
  },
  // Vendor 25
  {
    id: '25',
    name: 'Professional Skills Training',
    category: 'Education & Training',
    location: 'Manchester, M15 6BH',
    phone: '+44 161 275 2222',
    email: 'training@profskills.co.uk',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=400&fit=crop',
    rating: 4.9,
    reviewCount: 134,
    verified: true,
    bio: 'Professional development and skills training for career advancement.',
    services: [
      { id: '1', name: 'Business Skills', description: 'Professional training', price: 75, duration: '2 hours' },
      { id: '2', name: 'Career Coaching', description: 'One-on-one coaching', price: 90, duration: '1 hour' },
    ],
    reviews: [
      { id: '1', author: 'Michael B.', rating: 5, date: '4 days ago', text: 'Very helpful!' },
    ],
    availability: {
      monday: ['09:00', '11:00', '14:00', '16:00'],
      tuesday: ['09:00', '11:00', '14:00', '16:00'],
      wednesday: ['09:00', '11:00', '14:00', '16:00'],
      thursday: ['09:00', '11:00', '14:00', '16:00'],
      friday: ['09:00', '11:00', '14:00', '16:00'],
      saturday: [],
      sunday: [],
    },
    bookedSlots: [],
  },
  // Vendor 26
  {
    id: '26',
    name: 'Expert Cleaning Services',
    category: 'Home Services',
    location: 'London, SE22 8EF',
    phone: '+44 20 8693 1111',
    email: 'bookings@expertcleaning.co.uk',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 201,
    verified: true,
    bio: 'Professional home and office cleaning services with eco-friendly products.',
    services: [
      { id: '1', name: 'Deep Cleaning', description: 'Thorough home cleaning', price: 120, duration: '4 hours' },
      { id: '2', name: 'Regular Cleaning', description: 'Weekly cleaning service', price: 50, duration: '2 hours' },
    ],
    reviews: [
      { id: '1', author: 'Claire W.', rating: 5, date: '1 week ago', text: 'Spotless results!' },
    ],
    availability: {
      monday: ['09:00', '11:00', '13:00', '15:00'],
      tuesday: ['09:00', '11:00', '13:00', '15:00'],
      wednesday: ['09:00', '11:00', '13:00', '15:00'],
      thursday: ['09:00', '11:00', '13:00', '15:00'],
      friday: ['09:00', '11:00', '13:00', '15:00'],
      saturday: ['09:00', '11:00', '13:00'],
      sunday: [],
    },
    bookedSlots: [],
  },
  // Vendor 27
  {
    id: '27',
    name: 'Handyman Solutions',
    category: 'Home Services',
    location: 'Birmingham, B11 1AR',
    phone: '+44 121 772 9999',
    email: 'fix@handymansolutions.co.uk',
    image: 'https://images.unsplash.com/photo-1581578017093-cd30959cfce5?w=800&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 112,
    verified: false,
    bio: 'Reliable handyman services for all your home repair needs.',
    services: [
      { id: '1', name: 'General Repairs', description: 'Home maintenance', price: 50, duration: '1-2 hours' },
      { id: '2', name: 'Installation Service', description: 'Furniture assembly', price: 40, duration: '1 hour' },
    ],
    reviews: [
      { id: '1', author: 'Robert M.', rating: 5, date: '2 weeks ago', text: 'Quick and efficient!' },
    ],
    availability: {
      monday: ['09:00', '11:00', '14:00', '16:00'],
      tuesday: ['09:00', '11:00', '14:00', '16:00'],
      wednesday: ['09:00', '11:00', '14:00', '16:00'],
      thursday: ['09:00', '11:00', '14:00', '16:00'],
      friday: ['09:00', '11:00', '14:00', '16:00'],
      saturday: ['09:00', '11:00', '13:00'],
      sunday: [],
    },
    bookedSlots: [],
  },
  // Vendor 28
  {
    id: '28',
    name: 'Garden & Landscaping Pro',
    category: 'Home Services',
    location: 'Leeds, LS11 8PG',
    phone: '+44 113 270 8888',
    email: 'green@gardenlandscaping.co.uk',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 95,
    verified: true,
    bio: 'Professional garden maintenance and landscaping design services.',
    services: [
      { id: '1', name: 'Garden Maintenance', description: 'Regular upkeep', price: 60, duration: '2-3 hours' },
      { id: '2', name: 'Landscape Design', description: 'Garden redesign', price: 200, duration: '1 day' },
    ],
    reviews: [
      { id: '1', author: 'Helen S.', rating: 5, date: '5 days ago', text: 'Beautiful garden!' },
    ],
    availability: {
      monday: ['08:00', '10:00', '13:00', '15:00'],
      tuesday: ['08:00', '10:00', '13:00', '15:00'],
      wednesday: ['08:00', '10:00', '13:00', '15:00'],
      thursday: ['08:00', '10:00', '13:00', '15:00'],
      friday: ['08:00', '10:00', '13:00', '15:00'],
      saturday: ['08:00', '10:00', '12:00'],
      sunday: [],
    },
    bookedSlots: [],
  },
  // Vendor 29
  {
    id: '29',
    name: 'Afro Events & Weddings',
    category: 'Event Planning',
    location: 'London, SW2 1DP',
    phone: '+44 20 8674 7777',
    email: 'events@afroevents.co.uk',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=400&fit=crop',
    rating: 4.9,
    reviewCount: 187,
    verified: true,
    bio: 'Full-service event planning specializing in African and multicultural celebrations.',
    services: [
      { id: '1', name: 'Wedding Planning', description: 'Complete wedding coordination', price: 2000, duration: '6 months' },
      { id: '2', name: 'Event Coordination', description: 'Party planning service', price: 800, duration: '1-2 months' },
    ],
    reviews: [
      { id: '1', author: 'Aisha R.', rating: 5, date: '1 month ago', text: 'Perfect wedding!' },
    ],
    availability: {
      monday: ['10:00', '14:00', '16:00'],
      tuesday: ['10:00', '14:00', '16:00'],
      wednesday: ['10:00', '14:00', '16:00'],
      thursday: ['10:00', '14:00', '16:00'],
      friday: ['10:00', '14:00', '16:00'],
      saturday: ['10:00', '12:00'],
      sunday: [],
    },
    bookedSlots: [],
  },
  // Vendor 30
  {
    id: '30',
    name: 'Party Perfect Planners',
    category: 'Event Planning',
    location: 'Manchester, M21 0RY',
    phone: '+44 161 881 6666',
    email: 'plan@partyperfect.co.uk',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 143,
    verified: true,
    bio: 'Creative event planning and party coordination for all occasions.',
    services: [
      { id: '1', name: 'Birthday Parties', description: 'Complete party planning', price: 500, duration: '1 month' },
      { id: '2', name: 'Corporate Events', description: 'Business event planning', price: 1200, duration: '2 months' },
    ],
    reviews: [
      { id: '1', author: 'Lisa J.', rating: 5, date: '2 weeks ago', text: 'Amazing party!' },
    ],
    availability: {
      monday: ['10:00', '14:00', '16:00'],
      tuesday: ['10:00', '14:00', '16:00'],
      wednesday: ['10:00', '14:00', '16:00'],
      thursday: ['10:00', '14:00', '16:00'],
      friday: ['10:00', '14:00', '16:00'],
      saturday: [],
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
  const [showPaymentModal, setShowPaymentModal] = useState(false)

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

  const handlePaymentConfirm = (method: string, depositAmount: number) => {
    setBookingSuccess(true)
    setTimeout(() => {
      setBookingSuccess(false)
      setBookingDate('')
      setBookingTime('')
    }, 3000)
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
            className="lg:col-span-1"
          >
            <div className="card sticky top-20 h-fit">
              <h3 className="text-xl font-bold text-text mb-6">Book Service</h3>

              <div className="bg-primary border border-border rounded-lg p-4 mb-6">
                <p className="text-sm text-muted mb-1">Selected Service</p>
                <h4 className="font-bold text-text mb-1">{selectedService.name}</h4>
                <p className="text-2xl font-bold text-accent">£{selectedService.price}</p>
                <p className="text-xs text-muted mt-2">+ 10% platform fee on completion</p>
              </div>

              <div className="mb-6">
                <p className="text-sm font-semibold text-text mb-3">Select Date</p>
                <BeautifulCalendar
                  onDateSelect={setBookingDate}
                  selectedDate={bookingDate}
                />
              </div>

              {bookingDate && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-text mb-3">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Select Time Slot
                  </label>
                  {availableTimeSlots.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {availableTimeSlots.map((time) => (
                        <motion.button
                          key={time}
                          onClick={() => setBookingTime(time)}
                          whileHover={{ scale: 1.05 }}
                          className={`px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                            bookingTime === time
                              ? 'border-accent bg-gradient-to-r from-accent/20 to-accent/10 text-accent'
                              : 'border-border/50 text-muted hover:border-accent/50 hover:text-accent hover:bg-accent/5'
                          }`}
                        >
                          {time}
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted text-sm bg-primary/50 rounded-lg p-4 text-center">
                      No available slots for this date
                    </p>
                  )}
                </div>
              )}

              {!bookingDate && (
                <div className="mb-6">
                  <p className="text-muted text-sm bg-primary/50 rounded-lg p-4 text-center">
                    👆 Select a date to see available times
                  </p>
                </div>
              )}

              {bookingSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4 text-green-400 text-sm text-center"
                >
                  ✓ Booking confirmed! Payment deposit reserved.
                </motion.div>
              )}

              <motion.button
                onClick={() => bookingDate && bookingTime && setShowPaymentModal(true)}
                disabled={!bookingDate || !bookingTime}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Proceed to Payment
              </motion.button>

              <p className="text-xs text-muted text-center mt-4">
                💳 Secure payment powered by Stripe
              </p>
            </div>

            <PaymentModal
              isOpen={showPaymentModal}
              onClose={() => setShowPaymentModal(false)}
              paymentData={{
                vendorName: VENDOR.name,
                totalAmount: selectedService.price,
                depositPercentage: 30,
                platformFee: Math.round(selectedService.price * 0.1 * 100) / 100,
              }}
              onConfirm={handlePaymentConfirm}
            />
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
