'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronDown, HelpCircle, Search } from 'lucide-react'

export default function HelpPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How do I create an account?',
          a: 'Account creation is paused while we finish vendor onboarding. You can still browse services, and we will reopen sign-ups soon.',
        },
        {
          q: 'How do I search for services?',
          a: 'Use the search page to filter by category, location, or price. You can browse all available vendors and their services. Click on any vendor to see detailed information.',
        },
        {
          q: 'How do I become a vendor?',
          a: 'Visit the Become a Vendor page to request onboarding. Our team will follow up with next steps and verification details.',
        },
      ],
    },
    {
      category: 'Booking & Payments',
      questions: [
        {
          q: 'How do I book a service?',
          a: 'Click on a vendor\'s profile, select your desired service and time slot, then click "Book Now". Follow the checkout process to complete your booking.',
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards (Visa, Mastercard), debit cards, and digital wallets. All payments are processed securely through Stripe.',
        },
        {
          q: 'Can I cancel my booking?',
          a: 'Yes! You can cancel within the vendor\'s cancellation window (usually 24 hours before appointment). Visit your bookings page and select "Cancel Booking".',
        },
        {
          q: 'What if the vendor cancels?',
          a: 'If a vendor cancels, you\'ll be notified immediately and receive a full refund. You\'ll also get credit for a future booking on Allyn.',
        },
      ],
    },
    {
      category: 'Vendors',
      questions: [
        {
          q: 'How do I update my service availability?',
          a: 'Once you are onboarded, you can manage availability from the vendor dashboard. We will share access details during onboarding.',
        },
        {
          q: 'How do I receive payments?',
          a: 'Payments are deposited directly to your bank account within 5-7 business days after the service is completed. Set up your payout details in your dashboard.',
        },
        {
          q: 'What are Allyn fees?',
          a: 'Allyn charges a 15% commission on each completed booking. This helps us maintain the platform and provide customer support.',
        },
        {
          q: 'How do I handle a customer complaint?',
          a: 'Contact our support team immediately. We investigate all complaints and work to resolve issues fairly for both vendors and customers.',
        },
      ],
    },
    {
      category: 'Account & Security',
      questions: [
        {
          q: 'How do I reset my password?',
          a: 'Password resets are paused while login is disabled. Contact support if you need urgent access restored.',
        },
        {
          q: 'How is my data protected?',
          a: 'We use industry-standard encryption and security protocols. Your data is stored securely and we never share your information with third parties without permission.',
        },
        {
          q: 'Can I delete my account?',
          a: 'Yes, you can delete your account from your account settings. Note that this action is permanent and cannot be undone.',
        },
      ],
    },
  ]

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-surface/95 backdrop-blur-sm border-b border-border">
        <div className="container-custom py-4 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-accent hover:underline">
            <ArrowLeft className="w-5 h-5" />
            Back Home
          </Link>
        </div>
      </div>

      <div className="container-custom py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="w-8 h-8 text-accent" />
            <h1 className="text-4xl md:text-5xl font-bold text-text">Help Center</h1>
          </div>
          <p className="text-lg text-muted max-w-2xl mx-auto mb-8">Find answers to common questions about using Allyn</p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative max-w-md mx-auto"
          >
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Search help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-surface border border-border rounded-lg text-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
            />
          </motion.div>
        </motion.div>

        {/* FAQ Sections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="space-y-8 max-w-3xl mx-auto"
        >
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <h2 className="text-2xl font-bold text-text mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-accent rounded-full" />
                  {category.category}
                </h2>

                <div className="space-y-3">
                  {category.questions.map((item, qIndex) => {
                    const globalIndex = categoryIndex * 10 + qIndex
                    return (
                      <motion.div
                        key={qIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: qIndex * 0.05 }}
                        className="card border border-border overflow-hidden"
                      >
                        <button
                          onClick={() => setExpandedIndex(expandedIndex === globalIndex ? null : globalIndex)}
                          className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-surface/80 transition-colors group"
                        >
                          <span className="text-lg font-semibold text-text group-hover:text-accent transition-colors">{item.q}</span>
                          <ChevronDown
                            className={`w-5 h-5 text-accent flex-shrink-0 transition-transform duration-300 ${
                              expandedIndex === globalIndex ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {expandedIndex === globalIndex && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="border-t border-border"
                            >
                              <div className="p-6 text-muted leading-relaxed bg-surface/50">
                                {item.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted text-lg mb-6">No results found for &quot;{searchQuery}&quot;</p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-accent hover:underline font-semibold"
              >
                Clear search
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 card p-8 text-center bg-gradient-to-br from-accent/10 to-accent-secondary/10 max-w-2xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-text mb-4">Didn&apos;t find what you need?</h3>
          <p className="text-muted mb-6">Our support team is here to help. Get in touch with us directly.</p>
          <Link href="/contact" className="btn-primary px-8 py-3 rounded-lg font-semibold inline-block">
            Contact Support
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
