'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function ResetPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Card className="p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-text">Reset Password</h1>
            <p className="text-muted">We&apos;ll send a reset link to your email.</p>
          </div>

          <div>
            <label className="text-sm font-medium text-text">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="email"
                className="w-full bg-primary border border-border rounded-lg pl-10 pr-3 py-2 text-sm text-text"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <Button className="w-full">Send Reset Link</Button>

          <Link href="/signin" className="inline-flex items-center gap-2 text-sm text-accent hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>
        </Card>
      </motion.div>
    </div>
  )
}
