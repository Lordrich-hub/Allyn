'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Calendar,
  CreditCard,
  DollarSign,
  LineChart,
  LogOut,
  MessageSquare,
  Percent,
  Settings,
  Star,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react'

const MOCK_VENDOR = {
  name: 'Divine Hair Studio',
  email: 'hello@divinehair.co.uk',
  avatar: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=200&h=200&fit=crop',
  tier: 'Premium',
}

const MOCK_STATS = {
  revenue: 6420,
  revenueGrowth: 18,
  bookings: 32,
  bookingRate: 92,
  rating: 4.9,
  reviews: 124,
  customers: 214,
  repeatRate: 38,
}

const MOCK_EARNINGS = [420, 560, 640, 580, 720, 860, 940, 880, 1020, 980, 1200, 1360]

const MOCK_UPCOMING_BOOKINGS = [
  {
    id: '1',
    customerName: 'Zainab M.',
    service: 'Box Braids',
    date: '2026-02-21',
    time: '14:00',
    price: 80,
    status: 'confirmed',
  },
  {
    id: '2',
    customerName: 'Amara P.',
    service: 'Cornrows',
    date: '2026-02-22',
    time: '10:00',
    price: 45,
    status: 'pending',
  },
  {
    id: '3',
    customerName: 'Nora K.',
    service: 'Weave Installation',
    date: '2026-02-23',
    time: '11:00',
    price: 150,
    status: 'confirmed',
  },
]

const MOCK_PAYOUTS = [
  { id: 'p1', amount: 920, date: '2026-02-07', status: 'paid', method: 'Bank transfer' },
  { id: 'p2', amount: 780, date: '2026-01-31', status: 'paid', method: 'Bank transfer' },
  { id: 'p3', amount: 640, date: '2026-01-24', status: 'pending', method: 'Bank transfer' },
]

const MOCK_ACTIVITY = [
  { action: 'New booking from Zainab M.', time: '2 hours ago' },
  { action: 'Received 5-star review from Ama K.', time: '4 hours ago' },
  { action: 'Message about service add-ons', time: '1 day ago' },
]

const MOCK_GOALS = [
  { label: 'Monthly revenue goal', current: 6420, target: 8000 },
  { label: 'Bookings target', current: 32, target: 40 },
  { label: 'Repeat customer rate', current: 38, target: 45 },
]

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'payouts'>('overview')

  const earningsPoints = useMemo(() => {
    const max = Math.max(...MOCK_EARNINGS)
    return MOCK_EARNINGS.map((value, index) => {
      const x = (index / (MOCK_EARNINGS.length - 1)) * 100
      const y = 100 - (value / max) * 100
      return `${x},${y}`
    })
  }, [])

  const earningsPath = `M${earningsPoints.join(' L')}`

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-30 bg-surface/95 backdrop-blur-sm border-b border-border">
        <div className="container-custom py-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gradient">Vendor Command Center</h1>
            <p className="text-sm text-muted">Track earnings, bookings, and growth in one place.</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/dashboard/vendor/settings" className="p-2 rounded-lg border border-border text-muted hover:text-accent transition-colors">
              <Settings className="w-5 h-5" />
            </Link>
            <button className="p-2 rounded-lg border border-border text-muted hover:text-accent transition-colors" aria-label="Log out">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-8 flex flex-col gap-6 lg:flex-row lg:items-center"
        >
          <img
            src={MOCK_VENDOR.avatar}
            alt={MOCK_VENDOR.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-text flex items-center gap-2">
              {MOCK_VENDOR.name}
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
                <BadgeCheck className="w-3.5 h-3.5" />
                {MOCK_VENDOR.tier}
              </span>
            </h2>
            <p className="text-muted">{MOCK_VENDOR.email}</p>
            <p className="text-sm text-green-400 mt-2">✓ Verified Vendor</p>
          </div>
          <div className="flex flex-wrap gap-2">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              icon: DollarSign,
              label: 'Monthly Revenue',
              value: `£${MOCK_STATS.revenue}`,
              change: `+${MOCK_STATS.revenueGrowth}%`,
              helper: 'vs last month',
            },
            {
              icon: Calendar,
              label: 'Confirmed Bookings',
              value: MOCK_STATS.bookings,
              change: `${MOCK_STATS.bookingRate}%`,
              helper: 'acceptance rate',
            },
            {
              icon: Star,
              label: 'Average Rating',
              value: MOCK_STATS.rating,
              change: `${MOCK_STATS.reviews} reviews`,
              helper: 'all time',
            },
            {
              icon: Users,
              label: 'Repeat Customers',
              value: `${MOCK_STATS.repeatRate}%`,
              change: `${MOCK_STATS.customers} total`,
              helper: 'customer base',
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
                <div className="flex items-center gap-1 text-green-400 text-sm font-bold">
                  <TrendingUp className="w-4 h-4" />
                  {stat.change}
                </div>
              </div>
              <p className="text-muted text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-text">{stat.value}</p>
              <p className="text-xs text-muted mt-2">{stat.helper}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-4 mb-6 border-b border-border overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'analytics', label: 'Analytics', icon: LineChart },
            { id: 'payouts', label: 'Payouts', icon: Wallet },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
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

        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="card lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-text">Earnings trend</h3>
                    <p className="text-sm text-muted">Last 12 weeks</p>
                  </div>
                  <Link href="/dashboard/vendor/services" className="text-sm text-accent flex items-center gap-1">
                    View services
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="h-48 relative">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <linearGradient id="earningsGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="rgba(226,176,88,0.4)" />
                        <stop offset="100%" stopColor="rgba(226,176,88,0)" />
                      </linearGradient>
                    </defs>
                    <path d={`${earningsPath} L100,100 L0,100 Z`} fill="url(#earningsGradient)" />
                    <path d={earningsPath} fill="none" stroke="rgba(226,176,88,1)" strokeWidth="2" />
                  </svg>
                  <div className="absolute inset-0 flex items-end justify-between text-xs text-muted px-2 pb-2">
                    {['W1', 'W4', 'W8', 'W12'].map((label) => (
                      <span key={label}>{label}</span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted">Avg weekly</p>
                    <p className="text-text font-semibold">£{Math.round(MOCK_STATS.revenue / 4)}</p>
                  </div>
                  <div>
                    <p className="text-muted">Best week</p>
                    <p className="text-text font-semibold">£{Math.max(...MOCK_EARNINGS)}</p>
                  </div>
                  <div>
                    <p className="text-muted">Next payout</p>
                    <p className="text-text font-semibold">£640 · Feb 14</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="font-bold text-text mb-4">Performance goals</h3>
                <div className="space-y-4">
                  {MOCK_GOALS.map((goal) => {
                    const progress = Math.min(100, Math.round((goal.current / goal.target) * 100))
                    return (
                      <div key={goal.label}>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-muted">{goal.label}</span>
                          <span className="text-text font-semibold">{progress}%</span>
                        </div>
                        <div className="h-2 bg-primary rounded-full overflow-hidden">
                          <div className="h-full bg-accent rounded-full" style={{ width: `${progress}%` }} />
                        </div>
                        <p className="text-xs text-muted mt-1">
                          {goal.current} / {goal.target}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="card">
                <h3 className="font-bold text-text mb-4">Quick actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Add service', href: '/dashboard/vendor/services/new' },
                    { label: 'Update availability', href: '/dashboard/vendor/availability' },
                    { label: 'Open messages', href: '/chat' },
                    { label: 'Request payout', href: '/dashboard/vendor/settings' },
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
              </div>

              <div className="card lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-text">Upcoming bookings</h3>
                  <Link href="/dashboard/vendor/services" className="text-sm text-accent flex items-center gap-1">
                    Manage calendar
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="space-y-3">
                  {MOCK_UPCOMING_BOOKINGS.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between border border-border rounded-lg p-4">
                      <div>
                        <p className="font-semibold text-text">{booking.customerName}</p>
                        <p className="text-sm text-muted">{booking.service}</p>
                        <p className="text-xs text-muted">{booking.date} · {booking.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-accent font-semibold">£{booking.price}</p>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold ${
                            booking.status === 'confirmed'
                              ? 'bg-green-500/10 text-green-400'
                              : 'bg-yellow-500/10 text-yellow-400'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="card">
                <div className="flex items-center gap-3 mb-3">
                  <Percent className="w-5 h-5 text-accent" />
                  <h3 className="font-bold text-text">Conversion rate</h3>
                </div>
                <p className="text-3xl font-bold text-text">24.6%</p>
                <p className="text-sm text-muted">Visits to bookings this month</p>
              </div>
              <div className="card">
                <div className="flex items-center gap-3 mb-3">
                  <MessageSquare className="w-5 h-5 text-accent" />
                  <h3 className="font-bold text-text">Response time</h3>
                </div>
                <p className="text-3xl font-bold text-text">18 min</p>
                <p className="text-sm text-muted">Average reply time</p>
              </div>
              <div className="card">
                <div className="flex items-center gap-3 mb-3">
                  <CreditCard className="w-5 h-5 text-accent" />
                  <h3 className="font-bold text-text">Avg order value</h3>
                </div>
                <p className="text-3xl font-bold text-text">£92</p>
                <p className="text-sm text-muted">Across all services</p>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-text">Service performance</h3>
                  <p className="text-sm text-muted">Top services by revenue</p>
                </div>
                <Link href="/dashboard/vendor/services" className="text-sm text-accent flex items-center gap-1">
                  View services
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Box Braids', revenue: 1840, share: 38 },
                  { name: 'Weave Installation', revenue: 1420, share: 28 },
                  { name: 'Cornrows', revenue: 980, share: 20 },
                  { name: 'Locs Maintenance', revenue: 640, share: 14 },
                ].map((service) => (
                  <div key={service.name}>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-text font-medium">{service.name}</span>
                      <span className="text-muted">£{service.revenue}</span>
                    </div>
                    <div className="h-2 bg-primary rounded-full overflow-hidden">
                      <div className="h-full bg-accent" style={{ width: `${service.share}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'payouts' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="card">
                <div className="flex items-center gap-3 mb-3">
                  <Wallet className="w-5 h-5 text-accent" />
                  <h3 className="font-bold text-text">Available balance</h3>
                </div>
                <p className="text-3xl font-bold text-text">£640</p>
                <p className="text-sm text-muted">Ready for withdrawal</p>
                <button className="btn-primary w-full mt-4 py-2 rounded-lg text-sm">Request payout</button>
              </div>
              <div className="card">
                <div className="flex items-center gap-3 mb-3">
                  <DollarSign className="w-5 h-5 text-accent" />
                  <h3 className="font-bold text-text">Pending balance</h3>
                </div>
                <p className="text-3xl font-bold text-text">£420</p>
                <p className="text-sm text-muted">Clears in 2-3 days</p>
              </div>
              <div className="card">
                <div className="flex items-center gap-3 mb-3">
                  <CreditCard className="w-5 h-5 text-accent" />
                  <h3 className="font-bold text-text">Payout method</h3>
                </div>
                <p className="text-lg font-semibold text-text">Barclays ·••• 1432</p>
                <p className="text-sm text-muted">Updated 2 days ago</p>
                <Link href="/dashboard/vendor/settings" className="text-sm text-accent flex items-center gap-1 mt-3">
                  Update payout method
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="card">
              <h3 className="font-bold text-text mb-4">Recent payouts</h3>
              <div className="space-y-3">
                {MOCK_PAYOUTS.map((payout) => (
                  <div key={payout.id} className="flex items-center justify-between border border-border rounded-lg p-4">
                    <div>
                      <p className="text-text font-semibold">£{payout.amount}</p>
                      <p className="text-xs text-muted">{payout.method}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted">{payout.date}</p>
                      <span className={`text-xs font-semibold ${payout.status === 'paid' ? 'text-green-400' : 'text-yellow-400'}`}>
                        {payout.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="font-bold text-text mb-4">Recent activity</h3>
            <div className="space-y-3">
              {MOCK_ACTIVITY.map((activity, i) => (
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
          <div className="card lg:col-span-2">
            <h3 className="font-bold text-text mb-4">Weekly focus</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Boost profile views', value: 'Add 3 new photos', icon: BarChart3 },
                { label: 'Increase bookings', value: 'Enable instant booking', icon: Calendar },
                { label: 'Grow reviews', value: 'Request feedback after each booking', icon: Star },
              ].map((focus) => (
                <div key={focus.label} className="bg-primary/70 rounded-lg p-4">
                  <focus.icon className="w-5 h-5 text-accent mb-2" />
                  <p className="text-sm font-semibold text-text">{focus.label}</p>
                  <p className="text-xs text-muted">{focus.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
