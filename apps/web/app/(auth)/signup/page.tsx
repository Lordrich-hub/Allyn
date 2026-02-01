'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Lock, User, AlertCircle, ArrowRight, CheckCircle, Loader } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUpInput, signUpSchema } from '@afroluxe/lib'
import { signUp } from '@/app/actions/auth'

export default function SignUpPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userType, setUserType] = useState<'customer' | 'vendor'>('customer')
  
  const { register, handleSubmit, formState: { errors }, control } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = async (data: SignUpInput) => {
    try {
      setLoading(true)
      setError('')
      
      const result = await signUp(data)
      
      if (result.error) {
        setError(result.error)
        return
      }
      
      setSuccess(true)
      setTimeout(() => {
        router.push(userType === 'vendor' ? '/dashboard/vendor' : '/dashboard')
      }, 500)
    } catch (err) {
      setError('Failed to create account. Please try again.')
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
        <h1 className="text-3xl font-bold text-gradient mb-2">Join AfroLuxe</h1>
        <p className="text-muted">Create your account in minutes</p>
      </div>

      {/* User Type Selection */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { value: 'customer', label: 'I\'m a Customer', icon: '🛍️' },
          { value: 'vendor', label: 'I\'m a Vendor', icon: '🏢' },
        ].map((type) => (
          <button
            key={type.value}
            onClick={() => setUserType(type.value as 'customer' | 'vendor')}
            className={`p-4 rounded-lg border-2 transition-all text-center font-medium ${
              userType === type.value
                ? 'border-accent bg-accent/10 text-text'
                : 'border-border bg-primary text-muted hover:border-accent/50'
            }`}
          >
            <span className="text-2xl block mb-1">{type.icon}</span>
            {type.label}
          </button>
        ))}
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
          <p className="text-sm">Account created! Redirecting...</p>
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            {userType === 'vendor' ? 'Business Name' : 'Full Name'}
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
            <input
              type="text"
              placeholder={userType === 'vendor' ? 'Your Business' : 'Your Name'}
              {...register('name')}
              className="w-full bg-primary border border-border rounded-lg pl-12 pr-4 py-3 text-text placeholder:text-muted/50 focus-ring"
            />
          </div>
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-text mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
            <input
              type="email"
              placeholder="you@example.com"
              {...register('email')}
              className="w-full bg-primary border border-border rounded-lg pl-12 pr-4 py-3 text-text placeholder:text-muted/50 focus-ring"
            />
          </div>
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-text mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
            <input
              type="password"
              placeholder="••••••••"
              {...register('password')}
              className="w-full bg-primary border border-border rounded-lg pl-12 pr-4 py-3 text-text placeholder:text-muted/50 focus-ring"
            />
          </div>
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-3 pt-2">
          <input
            type="checkbox"
            id="terms"
            required
            className="mt-1 w-4 h-4 accent-accent rounded border-border focus-ring"
          />
          <label htmlFor="terms" className="text-sm text-muted">
            I agree to the{' '}
            <Link href="/terms" className="text-accent hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-accent hover:underline">
              Privacy Policy
            </Link>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary py-3 rounded-lg font-semibold flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Creating Account...
            </>
          ) : (
            <>
              Create Account
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      {/* Sign In Link */}
      <p className="text-center text-sm text-muted">
        Already have an account?{' '}
        <Link href="/auth/signin" className="text-accent hover:underline font-medium">
          Sign In
        </Link>
      </p>
    </motion.div>
  )
}
