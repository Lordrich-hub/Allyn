'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Lock, User, ArrowRight, CheckCircle, Loader } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function SignUpPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setSuccess(true)
      setLoading(false)
      router.push('/')
    }, 600)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Card className="p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-text">Create Account</h1>
            <p className="text-muted">Join Allyn in seconds</p>
          </div>

          {success && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-sm text-green-400 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Account created. Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-text">Full Name</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="text"
                  required
                  className="w-full bg-primary border border-border rounded-lg pl-10 pr-3 py-2 text-sm text-text"
                  placeholder="Jane Doe"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-text">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="email"
                  required
                  className="w-full bg-primary border border-border rounded-lg pl-10 pr-3 py-2 text-sm text-text"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-text">Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="password"
                  required
                  className="w-full bg-primary border border-border rounded-lg pl-10 pr-3 py-2 text-sm text-text"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button type="submit" className="w-full flex items-center justify-center gap-2" disabled={loading}>
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div className="text-center text-sm text-muted">
            Already have an account?{' '}
            <Link href="/signin" className="text-accent hover:underline font-medium">
              Sign In
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
