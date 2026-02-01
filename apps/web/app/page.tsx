'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Star, Shield, ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent-secondary/10" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container-custom relative py-20 text-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-text mb-6 leading-tight">
            Find Premium
            <span className="text-gradient"> African Services</span>
            <br />
            Near You
          </h2>

          <p className="text-xl text-muted max-w-2xl mx-auto mb-10">
            Connect with verified African service providers in the UK.
            From hair styling to catering, tech repairs to education.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/search"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Browse Vendors
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/dashboard/vendor/services"
              className="btn-secondary inline-flex items-center justify-center"
            >
              List Your Services
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container-custom py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-text mb-4">Why Choose Us?</h3>
          <p className="text-muted text-lg">Trusted marketplace for the African diaspora</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Shield className="w-8 h-8" />,
              title: 'Verified Vendors',
              description: 'All service providers are verified for your peace of mind',
            },
            {
              icon: <Star className="w-8 h-8" />,
              title: 'Top Rated',
              description: 'Browse reviews and ratings from the community',
            },
            {
              icon: <Search className="w-8 h-8" />,
              title: 'Easy Search',
              description: 'Find services by location, category, or postcode',
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-accent">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-text mb-3 text-center">
                {feature.title}
              </h4>
              <p className="text-muted text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-custom py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-accent/10 to-accent-secondary/10 border border-accent/20 rounded-2xl p-12 text-center"
        >
          <h3 className="text-3xl font-bold text-text mb-4">Ready to Get Started?</h3>
          <p className="text-muted text-lg mb-8">
            Join thousands discovering quality services from the African diaspora
          </p>
          <Link href="/search" className="btn-primary inline-flex items-center gap-2">
            <Search className="w-5 h-5" />
            Start Exploring
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-surface mt-20">
        <div className="container-custom py-8 text-center text-muted text-sm">
          <p>© 2026 Allyn Marketplace. Built for the African diaspora in the UK.</p>
        </div>
      </footer>
    </div>
  )
}
