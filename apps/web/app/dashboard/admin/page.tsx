'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Users, ShieldAlert, TrendingUp, Flag, LogOut, Settings } from 'lucide-react'

const MOCK_ADMIN_STATS = {
  totalUsers: 2145,
  activeVendors: 89,
  totalBookings: 5420,
  flaggedReports: 12,
}

const MOCK_REPORTS = [
  {
    id: '1',
    reporter: 'Zainab M.',
    vendor: 'Unknown Vendor',
    reason: 'Poor service quality',
    status: 'pending',
    date: '2 hours ago',
  },
  {
    id: '2',
    reporter: 'Amara P.',
    vendor: 'Tech Scammer',
    reason: 'Fraud suspected',
    status: 'investigating',
    date: '5 hours ago',
  },
  {
    id: '3',
    reporter: 'Nora K.',
    vendor: 'Rude Staff',
    reason: 'Harassment',
    status: 'resolved',
    date: '1 day ago',
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-surface/95 backdrop-blur-sm border-b border-border">
        <div className="container-custom py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gradient">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Link href="/settings" className="p-2 rounded-lg border border-border text-muted hover:text-accent transition-colors">
              <Settings className="w-5 h-5" />
            </Link>
            <button className="p-2 rounded-lg border border-border text-muted hover:text-accent transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              icon: Users,
              label: 'Total Users',
              value: MOCK_ADMIN_STATS.totalUsers,
              color: 'text-blue-400',
            },
            {
              icon: TrendingUp,
              label: 'Active Vendors',
              value: MOCK_ADMIN_STATS.activeVendors,
              color: 'text-green-400',
            },
            {
              icon: Users,
              label: 'Total Bookings',
              value: MOCK_ADMIN_STATS.totalBookings,
              color: 'text-accent',
            },
            {
              icon: Flag,
              label: 'Flagged Reports',
              value: MOCK_ADMIN_STATS.flaggedReports,
              color: 'text-red-400',
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card"
            >
              <stat.icon className={`w-8 h-8 ${stat.color} mb-4`} />
              <p className="text-muted text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-text">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-border">
          {[
            { id: 'reports', label: 'Reports', icon: Flag },
            { id: 'vendors', label: 'Manage Vendors', icon: Users },
            { id: 'users', label: 'Manage Users', icon: Users },
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

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {MOCK_REPORTS.map((report) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="card"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-text">{report.reporter} reported</h3>
                    <p className="text-accent font-semibold">{report.vendor}</p>
                    <p className="text-muted text-sm mt-1">{report.reason}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      report.status === 'pending'
                        ? 'bg-yellow-500/10 text-yellow-400'
                        : report.status === 'investigating'
                        ? 'bg-blue-500/10 text-blue-400'
                        : 'bg-green-500/10 text-green-400'
                    }`}
                  >
                    {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-muted text-sm">{report.date}</p>
                  <div className="flex gap-2">
                    {report.status === 'pending' && (
                      <>
                        <button className="btn-secondary text-sm px-4 py-2 rounded-lg">
                          Investigate
                        </button>
                        <button className="btn-primary text-sm px-4 py-2 rounded-lg">
                          Dismiss
                        </button>
                      </>
                    )}
                    {report.status === 'investigating' && (
                      <>
                        <button className="btn-primary text-sm px-4 py-2 rounded-lg">
                          Suspend Vendor
                        </button>
                        <button className="btn-secondary text-sm px-4 py-2 rounded-lg">
                          Close
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Vendors Tab */}
        {activeTab === 'vendors' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-4 text-muted font-medium">Vendor Name</th>
                    <th className="text-left py-3 px-4 text-muted font-medium">Category</th>
                    <th className="text-left py-3 px-4 text-muted font-medium">Bookings</th>
                    <th className="text-left py-3 px-4 text-muted font-medium">Rating</th>
                    <th className="text-left py-3 px-4 text-muted font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-muted font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Divine Hair Studio', category: 'Hair & Beauty', bookings: 124, rating: 4.9, status: 'active' },
                    { name: 'Authentic Jollof Kitchen', category: 'Food & Catering', bookings: 89, rating: 4.8, status: 'active' },
                    { name: 'Kente Designs Tailor', category: 'Fashion', bookings: 56, rating: 4.7, status: 'suspended' },
                  ].map((vendor, i) => (
                    <tr key={i} className="border-b border-border hover:bg-primary/50 transition-colors">
                      <td className="py-3 px-4 text-text font-medium">{vendor.name}</td>
                      <td className="py-3 px-4 text-muted">{vendor.category}</td>
                      <td className="py-3 px-4 text-text">{vendor.bookings}</td>
                      <td className="py-3 px-4 text-accent font-bold">{vendor.rating}★</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${
                            vendor.status === 'active'
                              ? 'bg-green-500/10 text-green-400'
                              : 'bg-red-500/10 text-red-400'
                          }`}
                        >
                          {vendor.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-accent hover:underline text-xs font-medium">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
