'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, DollarSign, Clock, Check, X } from 'lucide-react'
import Link from 'next/link'

const MOCK_SERVICES = [
  {
    id: '1',
    name: 'Box Braids',
    description: 'Classic box braids with high-quality hair',
    price: 80,
    duration: 180,
    active: true,
  },
  {
    id: '2',
    name: 'Cornrows',
    description: 'Neat cornrow styles for all occasions',
    price: 45,
    duration: 120,
    active: true,
  },
  {
    id: '3',
    name: 'Weave Installation',
    description: 'Full head weave installation with styling',
    price: 150,
    duration: 240,
    active: true,
  },
  {
    id: '4',
    name: 'Locs Installation',
    description: 'Professional locs installation and maintenance',
    price: 120,
    duration: 200,
    active: true,
  },
]

export default function ServicesPage() {
  const [services, setServices] = useState(MOCK_SERVICES)
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const toggleActive = (id: string) => {
    setServices(services.map(s => 
      s.id === id ? { ...s, active: !s.active } : s
    ))
  }

  const deleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id))
  }

  const activeCount = services.filter(s => s.active).length
  const totalEarningsPotential = services.reduce((sum, s) => sum + s.price, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-surface/95 backdrop-blur-sm border-b border-border">
        <div className="container-custom py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gradient">Manage Services</h1>
            <p className="text-muted text-sm mt-1">{activeCount} active services</p>
          </div>
          <Link href="/dashboard/vendor/services/new" className="btn-primary px-6 py-2 rounded-lg flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Service
          </Link>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <div className="flex items-center gap-4">
              <div className="bg-accent/10 p-3 rounded-lg">
                <Check className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-muted text-sm">Active Services</p>
                <p className="text-3xl font-bold text-text">{activeCount}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <div className="flex items-center gap-4">
              <div className="bg-green-500/10 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-muted text-sm">Earning Potential</p>
                <p className="text-3xl font-bold text-text">£{totalEarningsPotential}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Services List */}
        <div className="space-y-4">
          {services.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-muted mb-4">No services yet</p>
              <Link href="/dashboard/vendor/services/new" className="btn-primary px-6 py-2 rounded-lg inline-flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create Your First Service
              </Link>
            </div>
          ) : (
            services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-text">{service.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        service.active 
                          ? 'bg-green-500/10 text-green-400' 
                          : 'bg-muted/10 text-muted'
                      }`}>
                        {service.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-muted text-sm mb-3">{service.description}</p>
                    <div className="flex gap-6 text-sm">
                      <div className="flex items-center gap-2 text-accent">
                        <DollarSign className="w-4 h-4" />
                        £{service.price}
                      </div>
                      <div className="flex items-center gap-2 text-muted">
                        <Clock className="w-4 h-4" />
                        {service.duration} mins
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleActive(service.id)}
                      className={`p-2 rounded-lg border transition-all ${
                        service.active
                          ? 'border-accent text-accent hover:bg-accent/10'
                          : 'border-muted text-muted hover:text-text'
                      }`}
                      title={service.active ? 'Deactivate' : 'Activate'}
                    >
                      {service.active ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </button>
                    <Link href={`/dashboard/vendor/services/${service.id}/edit`} className="p-2 rounded-lg border border-muted text-muted hover:text-accent hover:border-accent transition-all">
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => deleteService(service.id)}
                      className="p-2 rounded-lg border border-muted text-muted hover:text-red-400 hover:border-red-400 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
