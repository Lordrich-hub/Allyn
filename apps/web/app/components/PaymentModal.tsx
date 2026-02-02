'use client'

import React, { useState } from 'react'
import { CreditCard, Apple, Smartphone, DollarSign, Lock, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface PaymentData {
  vendorName: string
  vendorId: string
  serviceName: string
  totalAmount: number
  depositPercentage: number
  platformFee: number
  bookingDate: string
  bookingTime: string
}

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  paymentData: PaymentData
}

export function PaymentModal({ isOpen, onClose, paymentData }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'google' | 'bank' | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const depositAmount = Math.round(paymentData.totalAmount * (paymentData.depositPercentage / 100) * 100) / 100
  const platformFeeAmount = Math.round(paymentData.totalAmount * 0.1 * 100) / 100

  const handlePaymentSubmit = async (method: string) => {
    setIsProcessing(true)
    setErrorMessage('')

    try {
      console.log('Starting payment with method:', method, 'data:', paymentData)
      
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...paymentData,
          paymentMethod: method,
        }),
      })

      const data = await response.json()
      console.log('Checkout response:', data)

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Payment session failed to start.')
      }

      if (data?.url) {
        console.log('Redirecting to Stripe:', data.url)
        window.location.href = data.url
        return
      }

      throw new Error('Invalid payment response - no checkout URL received.')
    } catch (error) {
      console.error('Payment error:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Unable to start payment. Please try again.')
      setIsProcessing(false)
    }
  }

  if (!isOpen) return null

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-background border border-accent/30 rounded-2xl p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto relative"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gradient mb-2">Secure Payment</h2>
          <p className="text-muted text-sm">
            You&apos;ll be redirected to a secure checkout to complete your deposit.
          </p>
        </div>

        {/* Payment Details */}
        <div className="bg-primary/20 rounded-xl p-4 mb-6 space-y-3">
          <div>
            <p className="text-muted text-sm">Service Provider</p>
            <p className="font-bold text-text">{paymentData.vendorName}</p>
          </div>
          <div className="border-t border-primary pt-3">
            <div className="flex justify-between mb-2">
              <span className="text-muted text-sm">Total Service Amount</span>
              <span className="font-semibold text-text">£{paymentData.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2 pb-2 border-b border-primary">
              <span className="text-accent text-sm font-semibold">Deposit Due Now ({paymentData.depositPercentage}%)</span>
              <span className="font-bold text-accent text-lg">£{depositAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-muted mt-2">
              <span>Platform Fee (10% on completion)</span>
              <span>~£{platformFeeAmount.toFixed(2)}</span>
            </div>
          </div>
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 flex gap-2">
            <AlertCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
            <p className="text-xs text-accent">
              Your deposit is held in escrow. Final payment is collected after service completion.
            </p>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3 mb-6">
          <p className="text-sm font-semibold text-text mb-4">Choose Payment Method</p>

          {/* Card Payment */}
          <button
            onClick={() => setPaymentMethod('card')}
            className={`w-full p-4 rounded-xl border-2 transition-all ${
              paymentMethod === 'card'
                ? 'border-accent bg-accent/10'
                : 'border-primary/30 hover:border-accent/50 bg-primary/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-accent" />
              <div className="text-left">
                <p className="font-semibold text-text text-sm">Debit/Credit Card</p>
                <p className="text-xs text-muted">Visa, Mastercard, American Express</p>
              </div>
            </div>
          </button>

          {/* Apple Pay */}
          <button
            onClick={() => setPaymentMethod('apple')}
            className={`w-full p-4 rounded-xl border-2 transition-all ${
              paymentMethod === 'apple'
                ? 'border-accent bg-accent/10'
                : 'border-primary/30 hover:border-accent/50 bg-primary/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <Apple className="w-5 h-5 text-text" />
              <div className="text-left">
                <p className="font-semibold text-text text-sm">Apple Pay</p>
                <p className="text-xs text-muted">Fast and secure</p>
              </div>
            </div>
          </button>

          {/* Google Pay */}
          <button
            onClick={() => setPaymentMethod('google')}
            className={`w-full p-4 rounded-xl border-2 transition-all ${
              paymentMethod === 'google'
                ? 'border-accent bg-accent/10'
                : 'border-primary/30 hover:border-accent/50 bg-primary/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-accent" />
              <div className="text-left">
                <p className="font-semibold text-text text-sm">Google Pay</p>
                <p className="text-xs text-muted">Fast and secure</p>
              </div>
            </div>
          </button>

          {/* Bank Transfer */}
          <button
            onClick={() => setPaymentMethod('bank')}
            className={`w-full p-4 rounded-xl border-2 transition-all ${
              paymentMethod === 'bank'
                ? 'border-accent bg-accent/10'
                : 'border-primary/30 hover:border-accent/50 bg-primary/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-text" />
              <div className="text-left">
                <p className="font-semibold text-text text-sm">Bank Transfer</p>
                <p className="text-xs text-muted">Direct bank deposit</p>
              </div>
            </div>
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
            {errorMessage}
          </div>
        )}

        {/* Security Badge */}
        <div className="flex items-center gap-2 mb-6 p-3 bg-primary/10 rounded-lg">
          <Lock className="w-4 h-4 text-accent" />
          <p className="text-xs text-muted">Secure payment powered by Stripe. Your data is encrypted.</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-lg border border-primary/30 text-text font-semibold hover:bg-primary/20 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => paymentMethod && handlePaymentSubmit(paymentMethod)}
            disabled={!paymentMethod || isProcessing}
            className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-accent to-accent/80 text-primary font-semibold hover:shadow-lg hover:shadow-accent/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isProcessing ? 'Redirecting...' : `Pay £${depositAmount.toFixed(2)}`}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
