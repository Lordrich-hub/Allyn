'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const serviceSchema = z.object({
  name: z.string().min(3, 'Service name required'),
  description: z.string().min(10, 'Description required'),
  price: z.number().min(1, 'Price required'),
  duration: z.number().min(15, 'Duration required'),
})

type ServiceFormData = z.infer<typeof serviceSchema>

export default function NewServicePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      duration: 60,
    }
  })

  const onSubmit = async (data: ServiceFormData) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    setSuccess(true)
    reset()
    setTimeout(() => setSuccess(false), 3000)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-surface/95 backdrop-blur-sm border-b border-border">
        <div className="container-custom py-4">
          <Link href="/dashboard/vendor/services" className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
        </div>
      </div>

      <div className="container-custom py-8 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h1 className="text-2xl font-bold text-gradient mb-6">Add New Service</h1>

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400"
            >
              ✓ Service created successfully!
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text mb-2">Service Name</label>
              <input
                {...register('name')}
                placeholder="e.g. Box Braids"
                className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-text placeholder-muted focus:outline-none focus:border-accent transition-colors"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">Description</label>
              <textarea
                {...register('description')}
                placeholder="Describe your service in detail..."
                rows={4}
                className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-text placeholder-muted focus:outline-none focus:border-accent transition-colors resize-none"
              />
              {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">Price (£)</label>
                <input
                  {...register('price', { valueAsNumber: true })}
                  type="number"
                  placeholder="80"
                  step="0.01"
                  className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-text placeholder-muted focus:outline-none focus:border-accent transition-colors"
                />
                {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Duration (minutes)</label>
                <input
                  {...register('duration', { valueAsNumber: true })}
                  type="number"
                  placeholder="180"
                  className="w-full px-4 py-2 bg-surface border border-border rounded-lg text-text placeholder-muted focus:outline-none focus:border-accent transition-colors"
                />
                {errors.duration && <p className="text-red-400 text-sm mt-1">{errors.duration.message}</p>}
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Link href="/dashboard/vendor/services" className="flex-1 btn-secondary py-2 rounded-lg text-center">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 btn-primary py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isLoading ? 'Creating...' : 'Create Service'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
