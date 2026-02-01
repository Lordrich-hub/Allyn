'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Lock, ArrowRight, AlertCircle, CheckCircle, Loader } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignInInput, signInSchema } from '@afroluxe/lib'
import { signIn } from '@/app/actions/auth'

export default function SignInPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const { register, handleSubmit, formState: { errors } } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = async (data: SignInInput) => {
    try {
      setLoading(true)
      setError('')
      
      const result = await signIn(data)
      
      if (result.error) {
        setError(result.error)
        return
      }
      
      setSuccess(true)
      setTimeout(() => {
        router.push('/dashboard')
      }, 500)
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gradient mb-2">Welcome Back</h1>
        <p className="text-muted">Sign in to your Allyn account</p>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex gap-3 text-red-400"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm">{error}</p>
        </motion.div>
      )}

      {/* Success Message */}
      {success && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex gap-3 text-green-400"
        >
          <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm">Sign in successful! Redirecting...</p>
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-text mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
            <input
              type="email"
              placeholder="you@example.com"
              {...register('email')}
              className="w-full bg-primary border border-border rounded-lg pl-12 pr-4 py-3 text-text placeholder:text-muted/50 focus-ring transition-colors"
            />
          </div>
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-text">Password</label>
            <Link href="/auth/reset" className="text-sm text-accent hover:underline">
              Forgot?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
            <input
              type="password"
              placeholder="••••••••"
              {...register('password')}
              className="w-full bg-primary border border-border rounded-lg pl-12 pr-4 py-3 text-text placeholder:text-muted/50 focus-ring transition-colors"
            />
          </div>
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 bg-background text-muted">New to AfroLuxe?</span>
        </div>
      </div>

      {/* Sign Up Link */}
      <Link
        href="/auth/signup"
        className="w-full btn-secondary py-3 rounded-lg font-semibold text-center"
      >
        Create Account
      </Link>
    </motion.div>
  )
}
