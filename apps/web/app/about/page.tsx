'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, Users, Zap, Globe } from 'lucide-react'

// About Allyn - Company information page
export default function AboutPage() {
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Community First',
      description: 'We prioritize the African community and support local entrepreneurs and vendors.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Empowerment',
      description: 'We empower service providers to reach more customers and grow their businesses.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Excellence',
      description: 'We maintain high standards of quality and professionalism across our platform.',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Accessibility',
      description: 'We make premium services accessible and affordable for everyone.',
    },
  ]

  const milestones = [
    { year: '2026', title: 'Launch Year', description: 'Allyn officially launched in the UK to connect African entrepreneurs with customers.' },
    { year: '2026', title: 'Early Momentum', description: 'Onboarded our first wave of verified vendors and initial customer bookings.' },
    { year: '2026', title: 'Growing Impact', description: 'Expanding service categories and strengthening community partnerships.' },
  ]

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
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">About Allyn</h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">Connecting African entrepreneurs with customers across the UK, building a thriving community of premium service providers.</p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-text mb-4">Our Mission</h2>
            <p className="text-muted leading-relaxed mb-4">
              Allyn is more than a marketplace. We&apos;re a community platform dedicated to supporting African service providers and connecting them with customers who appreciate quality, authenticity, and excellence.
            </p>
            <p className="text-muted leading-relaxed">
              We believe in the power of community commerce and are committed to creating opportunities that benefit both service providers and customers across the UK.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card p-8 bg-gradient-to-br from-accent/10 to-accent-secondary/10"
          >
            <p className="text-lg font-semibold text-text mb-2">Why Allyn?</p>
            <ul className="space-y-3 text-muted">
              <li className="flex gap-3">
                <span className="text-accent">✓</span>
                <span>Verified African service providers</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">✓</span>
                <span>Transparent pricing and quality standards</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">✓</span>
                <span>24/7 customer support</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent">✓</span>
                <span>Secure payments and reliable booking system</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-text mb-12 text-center">Our Values</h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-8"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mb-4 text-accent">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-text mb-2">{value.title}</h3>
                <p className="text-muted">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Timeline Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-text mb-12 text-center">Our Journey</h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-8 border-l-4 border-accent"
              >
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-accent">{milestone.year}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-text mb-2">{milestone.title}</h3>
                    <p className="text-muted">{milestone.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card p-8 text-center bg-gradient-to-br from-accent/10 to-accent-secondary/10 mb-8"
        >
          <h2 className="text-2xl font-bold text-text mb-4">Meet Our Team</h2>
          <p className="text-muted mb-6 max-w-2xl mx-auto">Our diverse team is passionate about supporting African entrepreneurs and building a marketplace that celebrates excellence and community.</p>
          <p className="text-accent font-semibold">Join us in our mission to empower African businesses!</p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card p-8 text-center bg-gradient-to-br from-accent/10 to-accent-secondary/10"
        >
          <p className="text-muted mb-6">Ready to be part of our growing community?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search" className="btn-primary px-8 py-3 rounded-lg font-semibold inline-block">
              Browse Services
            </Link>
            <Link href="/signup" className="btn-secondary px-8 py-3 rounded-lg font-semibold inline-block">
              Become a Vendor
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
