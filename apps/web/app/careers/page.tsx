'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Briefcase, DollarSign, Users } from 'lucide-react'

export default function CareersPage() {
  const jobs = [
    {
      title: 'Customer Support Specialist',
      location: 'London, UK',
      type: 'Full-time',
      description: 'Help our vendors and customers succeed with exceptional support.',
    },
    {
      title: 'Marketing Manager',
      location: 'Remote',
      type: 'Full-time',
      description: 'Lead our marketing strategy to reach more African entrepreneurs.',
    },
    {
      title: 'Product Designer',
      location: 'London, UK',
      type: 'Full-time',
      description: 'Design beautiful and functional user experiences for our platform.',
    },
    {
      title: 'Backend Developer',
      location: 'Remote',
      type: 'Full-time',
      description: 'Build scalable systems that power Allyn\'s growth.',
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
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">Join Our Team</h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">Help us build the future of African services in the UK. We&apos;re looking for talented people who share our mission.</p>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {[
            { icon: <Users className="w-8 h-8" />, title: 'Community', description: 'We prioritize our community' },
            { icon: <Briefcase className="w-8 h-8" />, title: 'Excellence', description: 'We strive for the best' },
            { icon: <DollarSign className="w-8 h-8" />, title: 'Growth', description: 'We invest in our team' },
          ].map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card p-8 text-center"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-accent">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-text mb-2">{value.title}</h3>
              <p className="text-muted">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Open Positions */}
        <div>
          <h2 className="text-3xl font-bold text-text mb-8">Open Positions</h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="space-y-4"
          >
            {jobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 hover:border-accent/50 transition-all group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-text group-hover:text-accent transition-colors">{job.title}</h3>
                  <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full">{job.type}</span>
                </div>
                <p className="text-muted mb-4">{job.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">📍 {job.location}</span>
                  <button className="text-accent hover:underline font-semibold text-sm">Apply Now →</button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 card p-8 text-center bg-gradient-to-br from-accent/10 to-accent-secondary/10"
        >
          <h3 className="text-2xl font-bold text-text mb-4">Don&apos;t see your role?</h3>
          <p className="text-muted mb-6">Send us your CV and tell us what you&apos;re passionate about. We&apos;re always looking for great talent!</p>
          <Link href="/contact" className="btn-primary px-8 py-3 rounded-lg font-semibold inline-block">
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
