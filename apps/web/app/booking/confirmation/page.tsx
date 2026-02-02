'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock, Calendar, MapPin, AlertTriangle } from 'lucide-react'

interface SessionData {
  id: string
  amount_total: number | null
  currency: string | null
  payment_status: string | null
  customer_email: string | null
  metadata?: Record<string, string>
  payment_intent?: string | null
}

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  const [session, setSession] = useState<SessionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [refundStatus, setRefundStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const fetchSession = async () => {
      if (!sessionId) return
      try {
        const response = await fetch(`/api/checkout/session?session_id=${sessionId}`)
        const data = await response.json()
        setSession(data)
      } finally {
        setLoading(false)
      }
    }

    fetchSession()
  }, [sessionId])

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(interval)
  }, [])

  const bookingDateTime = useMemo(() => {
    if (!session?.metadata?.bookingDate || !session?.metadata?.bookingTime) return null
    return new Date(`${session.metadata.bookingDate}T${session.metadata.bookingTime}:00`)
  }, [session])

  const timeRemaining = useMemo(() => {
    if (!bookingDateTime) return null
    const diff = bookingDateTime.getTime() - now.getTime()
    if (diff <= 0) return 'Today'

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((diff / (1000 * 60)) % 60)

    return `${days}d ${hours}h ${minutes}m`
  }, [bookingDateTime, now])

  const handleCancel = async () => {
    if (!session?.payment_intent) return
    setRefundStatus('processing')

    try {
      const response = await fetch('/api/refund', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payment_intent: session.payment_intent }),
      })

      if (!response.ok) throw new Error('Refund failed')
      setRefundStatus('success')
    } catch (error) {
      setRefundStatus('error')
    }
  }

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted">Missing booking session.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-8 max-w-3xl mx-auto"
        >
          {loading ? (
            <p className="text-muted">Loading confirmation...</p>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
                <div>
                  <h1 className="text-2xl font-bold text-text">Booking Confirmed</h1>
                  <p className="text-muted text-sm">Deposit received and held in escrow.</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 mb-8">
                <div className="bg-primary/20 rounded-xl p-4">
                  <p className="text-xs text-muted">Vendor</p>
                  <p className="text-lg font-semibold text-text">{session?.metadata?.vendorName}</p>
                  <p className="text-sm text-muted">Service: {session?.metadata?.serviceName}</p>
                </div>
                <div className="bg-primary/20 rounded-xl p-4">
                  <p className="text-xs text-muted">Deposit Paid</p>
                  <p className="text-lg font-semibold text-text">
                    £{((session?.amount_total || 0) / 100).toFixed(2)}
                  </p>
                  <p className="text-sm text-muted">Payment status: {session?.payment_status}</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 mb-8">
                <div className="flex items-center gap-3 bg-primary/10 rounded-xl p-4">
                  <Calendar className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted">Scheduled Date</p>
                    <p className="font-semibold text-text">{session?.metadata?.bookingDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-primary/10 rounded-xl p-4">
                  <Clock className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted">Scheduled Time</p>
                    <p className="font-semibold text-text">{session?.metadata?.bookingTime}</p>
                  </div>
                </div>
              </div>

              <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 mb-8 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm text-accent font-semibold">Reminder</p>
                  <p className="text-sm text-muted">
                    Your booking starts in {timeRemaining || '—'}. We&apos;ll send reminders as your appointment approaches.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/search" className="btn-secondary px-6 py-3 rounded-lg text-center">
                  Browse More Services
                </Link>
                <button
                  onClick={handleCancel}
                  disabled={refundStatus === 'processing' || refundStatus === 'success'}
                  className="btn-primary px-6 py-3 rounded-lg text-center disabled:opacity-60"
                >
                  {refundStatus === 'processing' ? 'Processing Refund...' : refundStatus === 'success' ? 'Refunded' : 'Cancel Booking & Refund'}
                </button>
              </div>

              {refundStatus === 'error' && (
                <p className="text-red-400 text-sm mt-4">Refund failed. Please contact support.</p>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}
