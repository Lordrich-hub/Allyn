'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar } from 'lucide-react'

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: 'How to Choose the Right Hair Stylist',
      excerpt: 'Tips and tricks for finding the perfect hair professional for your needs.',
      date: 'Jan 15, 2026',
      author: 'Sarah Mensah',
      category: 'Hair & Beauty',
    },
    {
      id: 2,
      title: 'Supporting Black-Owned Businesses in the UK',
      excerpt: 'Why shopping local matters and how Allyn helps you support African entrepreneurs.',
      date: 'Jan 10, 2026',
      author: 'Kwame Asante',
      category: 'Community',
    },
    {
      id: 3,
      title: 'Event Planning 101: A Complete Guide',
      excerpt: 'Everything you need to know to plan the perfect event with professional help.',
      date: 'Jan 5, 2026',
      author: 'Zainab Ibrahim',
      category: 'Events',
    },
    {
      id: 4,
      title: 'Tech Support Tips for Staying Safe Online',
      excerpt: 'Essential cybersecurity tips to keep your digital life secure and protected.',
      date: 'Dec 28, 2025',
      author: 'Kofi Mensah',
      category: 'Tech',
    },
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">Allyn Blog</h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">Tips, insights, and stories from the African diaspora community in the UK.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6 hover:border-accent/50 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full">{post.category}</span>
              </div>
              <h3 className="text-xl font-bold text-text mb-3 group-hover:text-accent transition-colors">{post.title}</h3>
              <p className="text-muted mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-muted">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                <span>by {post.author}</span>
              </div>
              <button className="mt-4 text-accent hover:underline font-semibold text-sm">Read More →</button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
