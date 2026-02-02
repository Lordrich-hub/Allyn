'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock, Calendar, MapPin, AlertTriangle, Bell, Mail, Phone } from 'lucide-react'

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
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [channelEmail, setChannelEmail] = useState(true)
  const [channelSms, setChannelSms] = useState(false)
  const [reminders, setReminders] = useState<number[]>([24, 3, 1])
  const [notifyStatus, setNotifyStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default')

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

  useEffect(() => {
    if (typeof Notification !== 'undefined') {
      setNotificationPermission(Notification.permission)
    }
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

  const scheduleBrowserReminders = () => {
    if (!bookingDateTime || notificationPermission !== 'granted') return

    reminders.forEach((hoursBefore) => {
      const remindAt = new Date(bookingDateTime.getTime() - hoursBefore * 60 * 60 * 1000)
      const delay = remindAt.getTime() - Date.now()
      if (delay <= 0) return

      setTimeout(() => {
        new Notification('Upcoming Allyn booking', {
          body: `${session?.metadata?.vendorName} in ${hoursBefore}h (${session?.metadata?.bookingTime})`,
        })
      }, delay)
    })
  }

  const requestNotifications = async () => {
    if (typeof Notification === 'undefined') return
    const permission = await Notification.requestPermission()
    setNotificationPermission(permission)
    if (permission === 'granted') {
      scheduleBrowserReminders()
    }
  }

  const saveNotifications = async () => {
    if (!session?.metadata?.vendorName) return
    setNotifyStatus('saving')

    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          phone,
          channelEmail,
          channelSms,
          vendorName: session.metadata.vendorName,
          serviceName: session.metadata.serviceName,
          bookingDate: session.metadata.bookingDate,
          bookingTime: session.metadata.bookingTime,
        }),
      })

      if (!response.ok) {
        throw new Error('Notification request failed')
      }

      setNotifyStatus('success')
      scheduleBrowserReminders()
    } catch (error) {
      setNotifyStatus('error')
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

              <div className="bg-primary/20 border border-primary/30 rounded-2xl p-6 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Bell className="w-5 h-5 text-accent" />
                  <h3 className="text-lg font-semibold text-text">Get reminders</h3>
                </div>

                <div className="grid gap-4 md:grid-cols-2 mb-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm text-muted mb-2">
                      <Mail className="w-4 h-4" /> Email
                    </label>
                    <input
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@email.com"
                      className="w-full bg-background border border-primary/30 rounded-lg px-3 py-2 text-text text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm text-muted mb-2">
                      <Phone className="w-4 h-4" /> SMS
                    </label>
                    <input
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="+44 7xxx xxx xxx"
                      className="w-full bg-background border border-primary/30 rounded-lg px-3 py-2 text-text text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={channelEmail}
                      onChange={(event) => setChannelEmail(event.target.checked)}
                    />
                    Email reminders
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={channelSms}
                      onChange={(event) => setChannelSms(event.target.checked)}
                    />
                    SMS reminders
                  </label>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {[24, 3, 1].map((hours) => (
                    <button
                      key={hours}
                      onClick={() =>
                        setReminders((current) =>
                          current.includes(hours)
                            ? current.filter((item) => item !== hours)
                            : [...current, hours]
                        )
                      }
                      className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                        reminders.includes(hours)
                          ? 'border-accent bg-accent/20 text-accent'
                          : 'border-primary/30 text-muted hover:border-accent/50'
                      }`}
                    >
                      {hours}h before
                    </button>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={saveNotifications}
                    disabled={notifyStatus === 'saving'}
                    className="btn-primary px-5 py-2 rounded-lg text-sm disabled:opacity-60"
                  >
                    {notifyStatus === 'saving' ? 'Saving...' : 'Save reminder preferences'}
                  </button>
                  <button
                    onClick={requestNotifications}
                    className="btn-secondary px-5 py-2 rounded-lg text-sm"
                  >
                    {notificationPermission === 'granted'
                      ? 'Browser notifications enabled'
                      : 'Enable browser notifications'}
                  </button>
                </div>

                {notifyStatus === 'success' && (
                  <p className="text-green-400 text-sm mt-3">Reminders saved. We&apos;ll notify you.</p>
                )}
                {notifyStatus === 'error' && (
                  <p className="text-red-400 text-sm mt-3">Unable to save reminders. Please try again.</p>
                )}
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
