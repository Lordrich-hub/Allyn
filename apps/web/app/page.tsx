'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Star, Shield, ArrowRight, TrendingUp, Users, Zap, Award, MapPin, Clock, CheckCircle, Heart, Share2, Sparkles } from 'lucide-react'

export default function HomePage() {
  const testimonials = [
    { name: 'Ama K.', role: 'Hair Styling', text: 'Found an amazing stylist within 5 minutes!', rating: 5 },
    { name: 'Kofi A.', role: 'Tech Support', text: 'Highly professional and quick service!', rating: 5 },
    { name: 'Zainab M.', role: 'Event Planning', text: 'Made my event unforgettable!', rating: 5 },
  ]

  const stats = [
    { value: '1,000+', label: 'Verified Vendors' },
    { value: '15,000+', label: 'Happy Customers' },
    { value: '50+', label: 'Service Categories' },
    { value: '24/7', label: 'Customer Support' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent-secondary/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-secondary/5 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container-custom relative py-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent font-medium">Discover Premium African Services</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-text mb-6 leading-tight">
            Find Premium
            <span className="text-gradient"> African Services</span>
            <br />
            Near You
          </h1>

          <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto mb-12 leading-relaxed">
            Connect with verified African service providers across the UK. From hair styling to catering, tech repairs to education. Experience excellence, support your community.
          </p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link
              href="/search"
              className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold hover:scale-105 transition-transform"
            >
              <Search className="w-5 h-5" />
              Browse Vendors
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/signup"
              className="btn-secondary inline-flex items-center justify-center px-8 py-4 rounded-lg text-lg font-semibold hover:scale-105 transition-transform"
            >
              Become a Vendor
            </Link>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat, index) => (
              <div key={index} className="card p-4">
                <p className="text-2xl md:text-3xl font-bold text-gradient mb-1">{stat.value}</p>
                <p className="text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Popular Categories Section */}
      <section className="container-custom py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-text mb-2">Trending Services</h2>
          <p className="text-muted text-lg">Most searched categories this month</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { emoji: '💇', name: 'Hair & Beauty', count: '200+ vendors' },
            { emoji: '🍽️', name: 'Food & Catering', count: '120+ vendors' },
            { emoji: '👗', name: 'Fashion', count: '85+ vendors' },
            { emoji: '💻', name: 'Tech Support', count: '90+ vendors' },
            { emoji: '💪', name: 'Health & Wellness', count: '110+ vendors' },
            { emoji: '📚', name: 'Education', count: '75+ vendors' },
            { emoji: '🏠', name: 'Home Services', count: '65+ vendors' },
            { emoji: '🎉', name: 'Event Planning', count: '50+ vendors' },
          ].map((category, index) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="card p-6 cursor-pointer hover:border-accent/50 transition-all group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{category.emoji}</div>
              <h3 className="text-lg font-bold text-text mb-1">{category.name}</h3>
              <p className="text-sm text-muted">{category.count}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Why Choose Allyn Section */}
      <section className="container-custom py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-text mb-2">Why Choose Allyn?</h2>
          <p className="text-muted text-lg">Trusted marketplace for the African diaspora</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
            {
              icon: <Shield className="w-8 h-8" />,
              title: 'Verified Vendors',
              description: 'All service providers are thoroughly verified and vetted for your peace of mind',
            },
            {
              icon: <Star className="w-8 h-8" />,
              title: 'Top Rated',
              description: 'Browse reviews and ratings from real customers in the community',
            },
            {
              icon: <Zap className="w-8 h-8" />,
              title: 'Quick Booking',
              description: 'Book services in seconds and get instant confirmation',
            },
            {
              icon: <TrendingUp className="w-8 h-8" />,
              title: 'Best Prices',
              description: 'Competitive pricing with no hidden fees or surprise charges',
            },
            {
              icon: <MapPin className="w-8 h-8" />,
              title: 'Easy Search',
              description: 'Find services by location, category, or postcode instantly',
            },
            {
              icon: <Users className="w-8 h-8" />,
              title: 'Community First',
              description: 'Supporting African entrepreneurs and service providers',
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="card p-8 hover:border-accent/50 transition-all"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-accent">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-text mb-3 text-center">{feature.title}</h3>
              <p className="text-muted text-center leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="container-custom py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-text mb-2">What Our Customers Say</h2>
          <p className="text-muted text-lg">Real stories from our happy community</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card p-8 relative"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted mb-6 italic leading-relaxed">&quot;{testimonial.text}&quot;</p>
              <div>
                <p className="font-bold text-text">{testimonial.name}</p>
                <p className="text-sm text-muted">{testimonial.role}</p>
              </div>
              <div className="absolute top-8 right-8 text-4xl opacity-10">❝</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container-custom py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-accent/15 to-accent-secondary/15 border border-accent/30 rounded-3xl p-12 text-center overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent-secondary/5" />
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-text mb-4">Ready to Get Started?</h2>
            <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">
              Join thousands discovering quality services from the African diaspora. Your next favorite vendor is just a few clicks away.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex gap-4"
            >
              <Link href="/search" className="btn-primary px-8 py-4 rounded-lg font-semibold flex items-center gap-2 hover:scale-105 transition-transform">
                <Search className="w-5 h-5" />
                Start Exploring
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-surface/50 mt-20">
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold text-gradient mb-4">Allyn</h3>
              <p className="text-muted text-sm leading-relaxed">Connecting you with premium African services across the UK.</p>
              <div className="flex gap-4 mt-4">
                <Heart className="w-5 h-5 text-muted hover:text-accent cursor-pointer transition-colors" />
                <Share2 className="w-5 h-5 text-muted hover:text-accent cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-text mb-4">Services</h4>
              <ul className="space-y-2">
                {['Hair & Beauty', 'Food & Catering', 'Tech Support', 'Event Planning'].map((link) => (
                  <li key={link}>
                    <Link href="/search" className="text-muted hover:text-accent text-sm transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold text-text mb-4">Company</h4>
              <ul className="space-y-2">
                {['About Us', 'Contact', 'Blog', 'Careers'].map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-muted hover:text-accent text-sm transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold text-text mb-4">Support</h4>
              <ul className="space-y-2">
                {['Help Center', 'Privacy Policy', 'Terms of Service', 'Contact Support'].map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-muted hover:text-accent text-sm transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted text-sm">© 2026 Allyn Marketplace. All rights reserved. Built for the African diaspora in the UK.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <span className="text-muted text-sm">Follow us:</span>
              {['Facebook', 'Instagram', 'Twitter'].map((social) => (
                <Link key={social} href="#" className="text-muted hover:text-accent text-sm transition-colors">
                  {social}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
