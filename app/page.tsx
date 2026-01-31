'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, Star, Shield, Home as HomeIcon, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export default function HomePage() {
  const router = useRouter()

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Verified Vendors',
      description: 'All service providers are verified for your peace of mind',
    },
    {
      icon: <HomeIcon className="w-8 h-8" />,
      title: 'Home Service',
      description: 'Many vendors offer convenient home service options',
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Top Rated',
      description: 'Browse reviews and ratings from the community',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent-secondary/10" />
        
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-20 pb-32 text-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6 px-4 py-2 bg-accent/20 border border-accent/30 rounded-full"
            >
              <span className="text-accent font-semibold text-sm">
                🌍 Connecting Diaspora Communities
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-text mb-6 leading-tight">
              Find Premium
              <span className="text-gradient"> African Services</span>
              <br />
              Near You
            </h1>

            <p className="text-xl text-muted max-w-2xl mx-auto mb-10">
              Discover verified service providers from the African diaspora. 
              From hair styling to catering, tech repairs to education.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => router.push('/search')}
                className="group"
              >
                <Search className="w-5 h-5" />
                Browse Vendors
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => router.push('/search')}
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container-custom py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Why Choose AfroLuxe?
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            We're building a trusted marketplace for the diaspora community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center h-full">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-accent">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-text mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container-custom py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="text-center bg-gradient-to-br from-accent/10 to-accent-secondary/10 border-accent/20">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-muted text-lg mb-8">
                Join thousands discovering quality services from the African diaspora
              </p>
              <Button
                size="lg"
                onClick={() => router.push('/search')}
                className="group"
              >
                <Search className="w-5 h-5" />
                Start Exploring
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-surface mt-20">
        <div className="container-custom py-8">
          <div className="text-center text-muted text-sm">
            <p>© 2026 AfroLuxe Marketplace. Built with ❤️ for the diaspora.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
