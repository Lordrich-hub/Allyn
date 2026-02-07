'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft } from 'lucide-react'

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-8 w-full max-w-md"
      >
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text mb-2">Reset Password</h1>
          <p className="text-muted text-sm">Enter your email and we&apos;ll send you reset instructions.</p>
        </div>

        <div className="space-y-2 mb-6">
          <label className="text-sm font-medium text-text">Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full bg-primary border border-border rounded-lg pl-12 pr-4 py-3 text-text placeholder:text-muted/50 focus-ring transition-colors"
            />
          </div>
        </div>

        <button className="w-full btn-primary py-3 rounded-lg font-semibold">Send Reset Link</button>

        <Link href="/signin" className="mt-6 inline-flex items-center gap-2 text-sm text-accent hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to Sign In
        </Link>
      </motion.div>
    </div>
  )
}
